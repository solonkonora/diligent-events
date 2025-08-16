/* eslint-disable prettier/prettier */
"use client";

import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

interface EventManagementProps {
  profileId: string;
}

interface Booking {
  id: string;
  event_type: string;
  event_date: string;
  status: string;
  created_at: string;
  details?: string;
  client_name: string;
  services: string;
  profiles?: { full_name: string };
  bookings_services?: Array<{
    service_id: string;
    services?: { id: string; name: string };
  }>;
}

interface Service {
  id: string;
  name: string;
}

export function EventManagement({ profileId }: EventManagementProps) {
  // state for bookings
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [availableServices, setAvailableServices] = useState<Service[]>([]);

  // edit form state
  const [editForm, setEditForm] = useState({
    event_type: "",
    event_date: "",
    status: "",
    services: [] as string[],
  });

  // fetch bookings with user profiles and services
  const fetchBookings = async () => {
    setBookingsLoading(true);
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select(
          `
          *,
          profiles (full_name),
          bookings_services (
            service_id,
            services (id, name)
          )
        `
        )
        .order("event_date", { ascending: true });

      if (error) {
        toast.error("Failed to load bookings");
        console.error(error);
        return;
      }

      // format bookings with client name and services
      const formattedBookings = data?.map((booking) => ({
        ...booking,
        client_name: booking.profiles?.full_name || "Unknown",
        services: booking.bookings_services
          ?.map((bs: { services?: { name: string } }) => bs.services?.name)
          .filter(Boolean)
          .join(", "),
      }));

      setBookings(formattedBookings || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      toast.error("Something went wrong");
    } finally {
      setBookingsLoading(false);
    }
  };

  // fetch services
  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("name");

      if (!error && data) {
        setAvailableServices(data);
      }
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  };

  // view booking details
  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setEditMode(false);
    setModalOpen(true);
  };

  // open edit modal
  const handleEditBooking = (booking: Booking) => {
    // map booking services to IDs
    const serviceIds =
      booking.bookings_services
        ?.map((bs: { service_id: string }) => bs.service_id)
        .filter(Boolean) || [];

    setSelectedBooking(booking);
    setEditForm({
      event_type: booking.event_type,
      event_date: booking.event_date ? booking.event_date.slice(0, 10) : "",
      status: booking.status,
      services: serviceIds,
    });
    setEditMode(true);
    setModalOpen(true);
  };

  // handle form field changes
  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // save booking changes
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;

    setUpdating(true);
    try {
      console.log("Updating booking:", selectedBooking.id);
      console.log("New services to add:", editForm.services);

      // update booking
      const { error: bookingError } = await supabase
        .from("bookings")
        .update({
          event_type: editForm.event_type,
          event_date: editForm.event_date,
          status: editForm.status,
        })
        .eq("id", selectedBooking.id);

      if (bookingError) {
        toast.error("Failed to update booking");
        console.error(bookingError);
        return;
      }

      // clear existing services first
      console.log("Removing existing booking services");
      const { error: deleteError } = await supabase
        .from("bookings_services")
        .delete()
        .eq("booking_id", selectedBooking.id);

      if (deleteError) {
        console.error("Error deleting existing services:", deleteError);
        toast.error("Failed to update services");
        return;
      }

      // Only insert new services if there are any selected
      if (editForm.services.length > 0) {
        // Make sure we have unique service IDs
        const uniqueServiceIds = [...new Set(editForm.services)];
        console.log("Adding new services:", uniqueServiceIds);

        const servicesToInsert = uniqueServiceIds.map((serviceId) => ({
          booking_id: selectedBooking.id,
          service_id: serviceId,
        }));

        const { error: servicesError } = await supabase
          .from("bookings_services")
          .insert(servicesToInsert);

        if (servicesError) {
          console.error("Error adding new services:", servicesError);
          toast.error("Failed to update services");
        }
      } else {
        console.log("No services selected, skipping service update");
      }

      toast.success("Booking updated");
      setModalOpen(false);
      setEditMode(false);
      fetchBookings();
    } catch (err) {
      console.error("Error updating booking:", err);
      toast.error("Something went wrong");
    } finally {
      setUpdating(false);
    }
  };

  // cancel a booking
  const handleCancelBooking = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    setCancellingId(id);
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: "cancelled" })
        .eq("id", id);

      if (error) {
        toast.error("Failed to cancel booking");
        console.error(error);
      } else {
        toast.success("Booking cancelled");
        fetchBookings();
      }
    } catch (err) {
      console.error("Error cancelling booking:", err);
      toast.error("Something went wrong");
    } finally {
      setCancellingId(null);
    }
  };

  // delete cancelled bookings
  const handleDeleteBooking = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to permanently delete this booking? This action cannot be undone."
      )
    )
      return;

    setDeletingId(id);

    try {
      console.log("Deleting booking services for booking ID:", id);
      // first delete related bookings_services records
      const { error: servicesError } = await supabase
        .from("bookings_services")
        .delete()
        .eq("booking_id", id);

      if (servicesError) {
        console.error("Error deleting booking services:", servicesError);
        toast.error("Failed to delete related services");
        return;
      }

      console.log("Deleting booking with ID:", id);
      // then delete the booking itself
      const { error: bookingError } = await supabase
        .from("bookings")
        .delete()
        .eq("id", id);

      if (bookingError) {
        toast.error("Failed to delete booking");
        console.error(bookingError);
      } else {
        toast.success("Booking permanently deleted");
        fetchBookings();
      }
    } catch (err) {
      console.error("Error deleting booking:", err);
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  // filtered bookings based on search and status
  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesSearch =
        searchTerm === "" ||
        booking.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.event_type.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "" || booking.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, searchTerm, statusFilter]);

  // load data on mount
  useEffect(() => {
    if (profileId) {
      fetchBookings();
      fetchServices();
    }
  }, [profileId]);

  return (
    <section className="space-y-4 p-4 lg:space-y-6 lg:p-1">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-card p-4 shadow-md lg:p-6">
          <h3 className="mb-2 text-sm font-medium text-muted-foreground sm:text-base lg:text-lg">
            Upcoming Events
          </h3>
          <p className="text-xl font-bold text-primary sm:text-2xl lg:text-3xl">
            {
              bookings.filter(
                (b) =>
                  new Date(b.event_date) >= new Date() &&
                  b.status !== "cancelled"
              ).length
            }
          </p>
        </div>
        <div className="rounded-lg bg-card p-4 shadow-md lg:p-6">
          <h3 className="mb-2 text-sm font-medium text-muted-foreground sm:text-base lg:text-lg">
            Event Status
          </h3>
          <div className="flex flex-wrap gap-1 lg:gap-2">
            <span className="rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 px-2 py-1 text-xs sm:px-3 sm:text-sm">
              Pending: {bookings.filter((b) => b.status === "pending").length}
            </span>
            <span className="rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 px-2 py-1 text-xs sm:px-3 sm:text-sm">
              Confirmed: {bookings.filter((b) => b.status === "confirmed").length}
            </span>
            <span className="rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 px-2 py-1 text-xs sm:px-3 sm:text-sm">
              Cancelled: {bookings.filter((b) => b.status === "cancelled").length}
            </span>
          </div>
        </div>
      </div>

      {/* filters */}
      <div className="rounded-lg bg-card p-4 shadow-md lg:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="text"
              placeholder="Search by name or event type"
              className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2 text-sm ring-1 focus:border-primary focus:ring-primary focus:outline-none sm:w-64 lg:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2 text-sm ring-1 focus:border-primary focus:ring-primary focus:outline-none sm:w-auto lg:text-base"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <button
            className="w-full rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm ring-2 transition-colors hover:bg-primary/80 focus:ring-primary focus:ring-offset-2 focus:outline-none sm:w-auto lg:text-base"
            onClick={fetchBookings}
          >
            Refresh
          </button>
        </div>
      </div>

      {/* bookings - mobile card view & desktop table */}
      <div className="rounded-lg bg-card shadow-md">
        {bookingsLoading ? (
          <div className="p-6 text-center">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            <p className="mt-2 text-muted-foreground">Loading bookings...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            No bookings found matching your criteria.
          </div>
        ) : (
          <>
            {/* mobile card View */}
            <div className="block lg:hidden">
              <div className="divide-y divide-border">
                {filteredBookings.map((booking) => (
                  <div key={booking.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium text-foreground truncate">
                            {booking.client_name}
                          </h3>
                          <span
                            className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                              booking.status === "confirmed"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                                : booking.status === "cancelled"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                            }`}
                          >
                            {booking.status.charAt(0).toUpperCase() +
                              booking.status.slice(1)}
                          </span>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p>
                            <span className="font-medium">Event:</span>{" "}
                            {booking.event_type}
                          </p>
                          <p>
                            <span className="font-medium">Date:</span>{" "}
                            {new Date(booking.event_date).toLocaleDateString()}
                          </p>
                          {booking.services && (
                            <p>
                              <span className="font-medium">Services:</span>{" "}
                              {booking.services}
                            </p>
                          )}
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <button
                            className="rounded-lg bg-primary text-primary-foreground px-3 py-1.5 text-xs font-medium hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                            onClick={() => handleViewBooking(booking)}
                          >
                            View
                          </button>
                          <button
                            className="rounded-lg bg-green-600 text-white px-3 py-1.5 text-xs font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-1"
                            onClick={() => handleEditBooking(booking)}
                          >
                            Edit
                          </button>
                          {booking.status !== "cancelled" ? (
                            <button
                              className="rounded-lg bg-muted text-muted-foreground px-3 py-1.5 text-xs font-medium hover:bg-destructive focus:outline-none focus:ring-2 focus:ring-muted focus:ring-offset-1"
                              onClick={() => handleCancelBooking(booking.id)}
                              disabled={cancellingId === booking.id}
                            >
                              {cancellingId === booking.id ? "..." : "Cancel"}
                            </button>
                          ) : (
                            <button
                              className="rounded-lg bg-destructive text-destructive-foreground px-3 py-1.5 text-xs font-medium hover:bg-destructive/80 focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-offset-1"
                              onClick={() => handleDeleteBooking(booking.id)}
                              disabled={deletingId === booking.id}
                            >
                              {deletingId === booking.id ? "Deleting..." : "Delete"}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* desktop table view */}
            <div className="hidden lg:block overflow-x-auto w-full" style={{ maxWidth: "calc(100vw - 280px)" }}>
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Event Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Services
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-card divide-y divide-border">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-muted/50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                        {booking.client_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {booking.event_type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {new Date(booking.event_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground max-w-xs truncate">
                        {booking.services || "—"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                            booking.status === "confirmed"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                              : booking.status === "cancelled"
                                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                          }`}
                        >
                          {booking.status.charAt(0).toUpperCase() +
                            booking.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            className="rounded bg-primary text-primary-foreground px-3 py-1 text-xs hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                            onClick={() => handleViewBooking(booking)}
                          >
                            View
                          </button>
                          <button
                            className="rounded bg-green-600 text-white px-3 py-1 text-xs hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-1"
                            onClick={() => handleEditBooking(booking)}
                          >
                            Edit
                          </button>
                          {booking.status !== "cancelled" ? (
                            <button
                              className="rounded bg-muted text-muted-foreground px-3 py-1 text-xs hover:bg-destructive focus:outline-none focus:ring-2 focus:ring-muted focus:ring-offset-1"
                              onClick={() => handleCancelBooking(booking.id)}
                              disabled={cancellingId === booking.id}
                            >
                              {cancellingId === booking.id ? "..." : "Cancel"}
                            </button>
                          ) : (
                            <button
                              className="rounded bg-destructive text-destructive-foreground px-3 py-1 text-xs hover:bg-destructive/80 focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-offset-1"
                              onClick={() => handleDeleteBooking(booking.id)}
                              disabled={deletingId === booking.id}
                            >
                              {deletingId === booking.id ? "Deleting..." : "Delete"}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* view/edit modal */}
      {modalOpen && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-lg bg-card shadow-xl sm:max-w-lg">
            <div className="sticky top-0 z-10 bg-card border-b border-border px-4 py-3 sm:px-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                  {editMode ? "Edit Booking" : "Booking Details"}
                </h3>
                <button
                  onClick={() => {
                    setModalOpen(false);
                    setEditMode(false);
                    setSelectedBooking(null);
                  }}
                  className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              {editMode ? (
                <form onSubmit={handleSaveEdit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Event Type
                    </label>
                    <input
                      type="text"
                      name="event_type"
                      value={editForm.event_type}
                      onChange={handleEditChange}
                      className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      name="event_date"
                      value={editForm.event_date}
                      onChange={handleEditChange}
                      className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      value={editForm.status}
                      onChange={handleEditChange}
                      className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Services
                    </label>
                    <div className="max-h-40 overflow-y-auto rounded-lg border border-border bg-background p-3 space-y-2">
                      {availableServices.map((service) => (
                        <label
                          key={service.id}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={editForm.services.includes(service.id)}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setEditForm((prev) => ({
                                ...prev,
                                services: checked
                                  ? [...prev.services, service.id]
                                  : prev.services.filter(
                                    (id) => id !== service.id
                                  ),
                              }));
                            }}
                            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                          />
                          <span className="text-sm text-foreground">{service.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={() => setEditMode(false)}
                      className="w-full rounded-lg border border-border bg-background text-foreground px-4 py-2 text-sm font-medium hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-full rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto"
                      disabled={updating}
                    >
                      {updating ? (
                        <>
                          <svg className="mr-2 inline h-4 w-4 animate-spin" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Client</span>
                      <p className="mt-1 text-sm text-foreground">{selectedBooking.client_name}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Status</span>
                      <p className="mt-1">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                            selectedBooking.status === "confirmed"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                              : selectedBooking.status === "cancelled"
                                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                          }`}
                        >
                          {selectedBooking.status.charAt(0).toUpperCase() +
                            selectedBooking.status.slice(1)}
                        </span>
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Event Type</span>
                      <p className="mt-1 text-sm text-foreground">{selectedBooking.event_type}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Date</span>
                      <p className="mt-1 text-sm text-foreground">
                        {new Date(selectedBooking.event_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Services</span>
                    <p className="mt-1 text-sm text-foreground">{selectedBooking.services || "—"}</p>
                  </div>
                  {selectedBooking.details && (
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Details</span>
                      <p className="mt-1 rounded-lg bg-muted p-3 text-sm text-foreground whitespace-pre-wrap">
                        {selectedBooking.details}
                      </p>
                    </div>
                  )}
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Created</span>
                    <p className="mt-1 text-sm text-foreground">
                      {new Date(selectedBooking.created_at).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 pt-4 border-t border-border sm:flex-row sm:justify-end">
                    <button
                      className="w-full rounded-lg border border-border bg-background text-foreground px-4 py-2 text-sm font-medium hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto"
                      onClick={() => setModalOpen(false)}
                    >
                      Close
                    </button>
                    <button
                      className="w-full rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto"
                      onClick={() => setEditMode(true)}
                    >
                      Edit
                    </button>
                    {selectedBooking.status === "cancelled" && (
                      <button
                        className="w-full rounded-lg bg-destructive text-destructive-foreground px-4 py-2 text-sm font-medium hover:bg-destructive/80 focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-offset-2 sm:w-auto"
                        onClick={() => {
                          if (
                            confirm(
                              "Are you sure you want to permanently delete this booking?"
                            )
                          ) {
                            handleDeleteBooking(selectedBooking.id);
                            setModalOpen(false);
                          }
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
