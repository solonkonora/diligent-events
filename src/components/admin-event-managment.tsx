"use client";

import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

interface EventManagementProps {
  profileId: string;
}

export function EventManagement({ profileId }: EventManagementProps) {
  // state for bookings
  const [bookings, setBookings] = useState<any[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [availableServices, setAvailableServices] = useState<any[]>([]);

  // Edit form state
  const [editForm, setEditForm] = useState({
    event_type: "",
    event_date: "",
    status: "",
    services: [] as string[],
  });

  // Fetch bookings with user profiles and services
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

      // Format bookings with client name and services
      const formattedBookings = data?.map((booking) => ({
        ...booking,
        client_name: booking.profiles?.full_name || "Unknown",
        services: booking.bookings_services
          ?.map((bs: any) => bs.services?.name)
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

  // Fetch services
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

  // View booking details
  const handleViewBooking = (booking: any) => {
    setSelectedBooking(booking);
    setEditMode(false);
    setModalOpen(true);
  };

  // Open edit modal
  const handleEditBooking = (booking: any) => {
    // Map booking services to IDs
    const serviceIds =
      booking.bookings_services
        ?.map((bs: any) => bs.service_id)
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

  // Handle form field changes
  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // Save booking changes
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;

    setUpdating(true);
    try {
      console.log("Updating booking:", selectedBooking.id);
      console.log("New services to add:", editForm.services);

      // Update booking
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

      // Clear existing services first
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

  // Cancel a booking
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

    setDeletingId(id); // Set the deleting state

    try {
      console.log("Deleting booking services for booking ID:", id);
      // First delete related bookings_services records
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
      // Then delete the booking itself
      const { error: bookingError } = await supabase
        .from("bookings")
        .delete()
        .eq("id", id);

      if (bookingError) {
        toast.error("Failed to delete booking");
        console.error(bookingError);
      } else {
        toast.success("Booking permanently deleted");
        fetchBookings(); // Refresh the list
      }
    } catch (err) {
      console.error("Error deleting booking:", err);
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null); // clear the deleting state in all cases
    }
  };

  // Filtered bookings based on search and status
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

  // Load data on mount
  useEffect(() => {
    if (profileId) {
      fetchBookings();
      fetchServices();
    }
  }, [profileId]);

  return (
    <section>
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Stats Cards */}
        <div className="rounded bg-white p-4 shadow">
          <h3 className="mb-2 text-lg font-medium text-gray-700">
            Upcoming Events
          </h3>
          <p className="text-3xl font-bold text-blue-600">
            {
              bookings.filter(
                (b) =>
                  new Date(b.event_date) >= new Date() &&
                  b.status !== "cancelled"
              ).length
            }
          </p>
        </div>
        <div className="rounded bg-white p-4 shadow">
          <h3 className="mb-2 text-lg font-medium text-gray-700">
            Event Status
          </h3>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-800">
              Pending: {bookings.filter((b) => b.status === "pending").length}
            </span>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
              Confirmed:{" "}
              {bookings.filter((b) => b.status === "confirmed").length}
            </span>
            <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-800">
              Cancelled:{" "}
              {bookings.filter((b) => b.status === "cancelled").length}
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <div>
          <input
            type="text"
            placeholder="Search by name or event type"
            className="rounded border px-3 py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <select
            className="rounded border px-3 py-2"
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
          className="ml-auto rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          onClick={fetchBookings}
        >
          Refresh
        </button>
      </div>

      {/* Bookings Table */}
      <div className="overflow-x-auto rounded bg-white shadow">
        {bookingsLoading ? (
          <div className="p-4">Loading bookings...</div>
        ) : (
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Client</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Event Type</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Services</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{booking.client_name}</td>
                  <td className="px-4 py-2">{booking.phone || "—"}</td>
                  <td className="px-4 py-2">{booking.event_type}</td>
                  <td className="px-4 py-2">
                    {new Date(booking.event_date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{booking.services || "—"}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs ${
                        booking.status === "confirmed"
                          ? "bg-blue-100 text-blue-800"
                          : booking.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="mr-2 rounded bg-blue-500 px-2 py-1 text-xs text-white hover:bg-blue-600"
                      onClick={() => handleViewBooking(booking)}
                    >
                      View
                    </button>
                    <button
                      className="mr-2 rounded bg-green-500 px-2 py-1 text-xs text-white hover:bg-green-600"
                      onClick={() => handleEditBooking(booking)}
                    >
                      Edit
                    </button>

                    {booking.status !== "cancelled" ? (
                      <button
                        className="rounded bg-gray-500 px-2 py-1 text-xs text-white hover:bg-red-600"
                        onClick={() => handleCancelBooking(booking.id)}
                        disabled={cancellingId === booking.id}
                      >
                        {cancellingId === booking.id ? "..." : "Cancel"}
                      </button>
                    ) : (
                      <button
                        className="rounded bg-red-700 px-2 py-1 text-xs text-white hover:bg-red-800"
                        onClick={() => {
                          handleDeleteBooking(booking.id);
                        }}
                        disabled={deletingId === booking.id}
                      >
                        {deletingId === booking.id ? "Deleting..." : "Delete"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* View/Edit Modal */}
      {modalOpen && selectedBooking && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">
                {editMode ? "Edit Booking" : "Booking Details"}
              </h3>
              <button
                onClick={() => {
                  setModalOpen(false);
                  setEditMode(false);
                  setSelectedBooking(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            {editMode ? (
              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Event Type
                  </label>
                  <input
                    type="text"
                    name="event_type"
                    value={editForm.event_type}
                    onChange={handleEditChange}
                    className="mt-1 w-full rounded border px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    type="date"
                    name="event_date"
                    value={editForm.event_date}
                    onChange={handleEditChange}
                    className="mt-1 w-full rounded border px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    name="status"
                    value={editForm.status}
                    onChange={handleEditChange}
                    className="mt-1 w-full rounded border px-3 py-2"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Services
                  </label>
                  <div className="mt-1 flex max-h-36 flex-wrap gap-2 overflow-y-auto rounded border p-2">
                    {availableServices.map((service) => (
                      <label
                        key={service.id}
                        className="flex items-center gap-2"
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
                        />
                        <span>{service.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    disabled={updating}
                  >
                    {updating ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-3">
                <div>
                  <span className="font-semibold">Client:</span>{" "}
                  {selectedBooking.client_name}
                </div>
                <div>
                  <span className="font-semibold">Phone:</span>{" "}
                  {selectedBooking.phone || "—"}
                </div>
                <div>
                  <span className="font-semibold">Event Type:</span>{" "}
                  {selectedBooking.event_type}
                </div>
                <div>
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(selectedBooking.event_date).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-semibold">Services:</span>{" "}
                  {selectedBooking.services || "—"}
                </div>
                <div>
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      selectedBooking.status === "confirmed"
                        ? "bg-blue-100 text-blue-800"
                        : selectedBooking.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {selectedBooking.status.charAt(0).toUpperCase() +
                      selectedBooking.status.slice(1)}
                  </span>
                </div>
                {selectedBooking.details && (
                  <div>
                    <span className="font-semibold">Details:</span>
                    <p className="mt-1 rounded bg-gray-50 p-2 text-sm whitespace-pre-wrap">
                      {selectedBooking.details}
                    </p>
                  </div>
                )}
                <div>
                  <span className="font-semibold">Created:</span>{" "}
                  {new Date(selectedBooking.created_at).toLocaleString()}
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  <button
                    className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setModalOpen(false)}
                  >
                    Close
                  </button>
                  <button
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    onClick={() => setEditMode(true)}
                  >
                    Edit
                  </button>
                  {selectedBooking.status === "cancelled" && (
                    <button
                      className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
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
      )}
    </section>
  );
}
