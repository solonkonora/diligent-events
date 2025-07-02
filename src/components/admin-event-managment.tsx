"use client";

import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

interface EventManagementProps {
  profileId: string;
}

export function EventManagement({ profileId }: EventManagementProps) {
  // State for bookings
  const [bookings, setBookings] = useState<any[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // State for viewing/editing
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  // State for services
  const [services, setServices] = useState<any[]>([]);
  const [availableServices, setAvailableServices] = useState<any[]>([]);
  const [newServiceName, setNewServiceName] = useState("");
  const [addingService, setAddingService] = useState(false);
  const [deletingService, setDeletingService] = useState<string | null>(null);

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
        setServices(data);
        setAvailableServices(data);
      }
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  };

  // Add a new service
  const handleAddService = async () => {
    if (!newServiceName.trim()) return;

    setAddingService(true);
    try {
      const { error } = await supabase
        .from("services")
        .insert([{ name: newServiceName.trim() }]);

      if (error) {
        toast.error("Failed to add service");
      } else {
        toast.success("Service added");
        setNewServiceName("");
        fetchServices();
      }
    } catch (err) {
      console.error("Error adding service:", err);
      toast.error("Something went wrong");
    } finally {
      setAddingService(false);
    }
  };

  // Delete a service
  const handleDeleteService = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    setDeletingService(id);
    try {
      const { error } = await supabase.from("services").delete().eq("id", id);

      if (error) {
        toast.error("Failed to delete service");
      } else {
        toast.success("Service deleted");
        fetchServices();
      }
    } catch (err) {
      console.error("Error deleting service:", err);
      toast.error("Something went wrong");
    } finally {
      setDeletingService(null);
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

      // Update services
      // First delete all existing services
      await supabase
        .from("bookings_services")
        .delete()
        .eq("booking_id", selectedBooking.id);

      // Then insert new ones
      if (editForm.services.length > 0) {
        const servicesToInsert = editForm.services.map((serviceId) => ({
          booking_id: selectedBooking.id,
          service_id: serviceId,
        }));

        const { error: servicesError } = await supabase
          .from("bookings_services")
          .insert(servicesToInsert);

        if (servicesError) {
          toast.error("Failed to update services");
          console.error(servicesError);
        }
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
                    {booking.status !== "cancelled" && (
                      <button
                        className="rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
                        onClick={() => handleCancelBooking(booking.id)}
                        disabled={cancellingId === booking.id}
                      >
                        {cancellingId === booking.id ? "..." : "Cancel"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Service Management Section */}
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-semibold text-gray-700">
          Service Management
        </h3>
        <div className="rounded bg-white p-4 shadow">
          <div className="mb-4 flex items-center gap-2">
            <input
              type="text"
              placeholder="New service name"
              className="flex-1 rounded border px-3 py-2"
              value={newServiceName}
              onChange={(e) => setNewServiceName(e.target.value)}
            />
            <button
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              onClick={handleAddService}
              disabled={!newServiceName.trim() || addingService}
            >
              {addingService ? "Adding..." : "Add Service"}
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex items-center justify-between rounded border p-2"
              >
                <span>{service.name}</span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteService(service.id)}
                  disabled={deletingService === service.id}
                >
                  {deletingService === service.id ? "..." : "×"}
                </button>
              </div>
            ))}
          </div>
        </div>
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
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
