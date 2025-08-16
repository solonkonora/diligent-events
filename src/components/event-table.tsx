import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabaseClient";

type Event = {
  id: string;
  event_type: string;
  date: string;
  services: string;
  status: string;
};

interface EventsTableProps {
  events: Event[];
  loading: boolean;
  onRefresh: () => void;
}

const EventsTable: React.FC<EventsTableProps> = ({
  events,
  loading,
  onRefresh,
}) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [cancelling, setCancelling] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editEvent, setEditEvent] = useState<Event | null>(null);
  const [availableServices, setAvailableServices] = useState<
    { id: string; name: string }[]
  >([]);
  const [editForm, setEditForm] = useState({
    event_type: "",
    date: "",
    status: "pending",
    services: [] as string[],
  });
  const [updating, setUpdating] = useState(false);

  // Fetch available services for the multi-select
  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("id, name");
      if (!error && data) setAvailableServices(data);
    };
    fetchServices();
  }, []);

  const handleView = (event: Event) => {
    setSelectedEvent(event);
    setModalOpen(true);
    setEditMode(false);
  };

  const openEditModal = (event: Event) => {
    if (!availableServices.length) {
      toast.error("Services not loaded yet. Please try again in a moment.");
      return;
    }

    const selectedServiceIds: string[] = [];

    if (event.services) {
      const serviceNames = event.services.split(/,\s*/);

      for (const name of serviceNames) {
        const svc = availableServices.find(
          (s) => s.name.trim() === name.trim()
        );
        if (svc) selectedServiceIds.push(svc.id);
      }
    }

    setEditEvent(event);
    setEditForm({
      event_type: event.event_type,
      date: event.date ? event.date.slice(0, 10) : "",
      status: event.status,
      services: selectedServiceIds,
    });
    setEditMode(true);
    setModalOpen(true);
  };
  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editEvent) return;
    setUpdating(true);
    let updateError = null;
    let serviceError = null;
    // update the booking fields
    const { error: bookingError } = await supabase
      .from("bookings")
      .update({
        event_type: editForm.event_type,
        event_date: editForm.date,
        status: editForm.status,
      })
      .eq("id", editEvent.id);
    updateError = bookingError;
    // replace all services for this booking
    if (!updateError) {
      // Remove all old services
      const { error: deleteError } = await supabase
        .from("bookings_services")
        .delete()
        .eq("booking_id", editEvent.id);
      if (deleteError) {
        serviceError = deleteError;
        toast.error("Failed to remove old services");
      } else if (editForm.services.length > 0) {
        // Insert new services if any
        const newRows = editForm.services.map((service_id) => ({
          booking_id: editEvent.id,
          service_id,
        }));
        const { error: insertError } = await supabase
          .from("bookings_services")
          .insert(newRows);
        if (insertError) {
          serviceError = insertError;
          toast.error("Failed to update services");
        }
      }
    }
    setUpdating(false);
    setEditMode(false);
    setModalOpen(false);
    setEditEvent(null);
    if (!updateError && !serviceError) {
      toast.success("Event updated!");
      onRefresh();
    } else if (updateError) {
      toast.error("Failed to update event");
    }
  };

  const handleCancel = async (event: Event) => {
    if (!event || event.status === "cancelled") {
      toast("Event already cancelled");
      return;
    }

    setCancelling(event.id);

    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: "cancelled" })
        .eq("id", event.id);

      if (error) {
        console.error("Error cancelling event:", error);
        toast.error("Failed to cancel event: " + error.message);
      } else {
        toast.success("Event cancelled");
        onRefresh(); // this function actually refetches data
      }
    } catch (e) {
      console.error("Exception cancelling event:", e);
      toast.error("An unexpected error occurred");
    } finally {
      setCancelling(null);
    }
  };

  useEffect(() => {
    console.log("onRefresh function received:", onRefresh);
    console.log("Is onRefresh a function?", typeof onRefresh === "function");
  }, [onRefresh]);

  return (
    <section>
      <div className="mb-4 flex flex-col items-center justify-between gap-2 sm:flex-row">
        <h2 className="text-foreground text-lg font-semibold sm:text-xl">
          My Bookings
        </h2>
        <button
          className="bg-primary text-primary-foreground hover:bg-primary/80 w-full rounded px-4 py-2 sm:w-auto"
          onClick={onRefresh}
        >
          Refresh
        </button>
      </div>
      {/* Responsive: Table on md+, cards on mobile */}
      <div className="bg-card hidden overflow-x-auto rounded shadow md:block">
        {loading ? (
          <div className="p-4">Loading events...</div>
        ) : (
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-muted">
                <th className="text-muted-foreground px-4 py-2 text-left">
                  Event
                </th>
                <th className="text-muted-foreground px-4 py-2 text-left">
                  Date
                </th>
                <th className="text-muted-foreground px-4 py-2 text-left">
                  Services
                </th>
                <th className="text-muted-foreground px-4 py-2 text-left">
                  Status
                </th>
                <th className="text-muted-foreground px-4 py-2 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr
                  key={event.id}
                  className="border-border hover:bg-muted/50 border-b"
                >
                  <td className="text-foreground px-4 py-2">
                    {event.event_type}
                  </td>
                  <td className="text-muted-foreground px-4 py-2">
                    {new Date(event.date).toLocaleDateString()}
                  </td>
                  <td className="text-muted-foreground px-4 py-2">
                    {event.services || "—"}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        event.status === "confirmed"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                          : event.status === "cancelled"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                      }`}
                    >
                      {event.status.charAt(0).toUpperCase() +
                        event.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-primary text-primary-foreground hover:bg-primary/80 mr-2 rounded px-2 py-1 text-xs"
                      onClick={() => handleView(event)}
                    >
                      View
                    </button>
                    <button
                      className="mr-2 rounded bg-green-600 px-2 py-1 text-xs text-white hover:bg-green-700"
                      onClick={() => openEditModal(event)}
                      disabled={event.status === "cancelled"}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-muted text-muted-foreground hover:bg-destructive focus:ring-muted rounded px-2 py-1 text-xs focus:ring-2 focus:ring-offset-1 focus:outline-none disabled:opacity-50"
                      onClick={() => handleCancel(event)}
                      disabled={
                        cancelling === event.id || event.status === "cancelled"
                      }
                    >
                      {cancelling === event.id ? "Cancelling..." : "Cancel"}
                    </button>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-muted-foreground p-4 text-center"
                  >
                    No services found. Book your first service!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      {/* Mobile cards */}
      <div className="space-y-4 md:hidden">
        {loading ? (
          <div className="bg-card rounded p-4 shadow">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="bg-card text-muted-foreground rounded p-4 text-center shadow">
            No services found. Book your first service!
          </div>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="bg-card flex flex-col gap-2 rounded p-4 shadow"
            >
              <div className="flex items-center justify-between">
                <span className="text-foreground font-semibold">
                  {event.event_type}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    event.status === "confirmed"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                      : event.status === "cancelled"
                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                  }`}
                >
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </span>
              </div>
              <div className="text-muted-foreground text-sm">
                <span className="font-medium">Date:</span>{" "}
                {new Date(event.date).toLocaleDateString()}
              </div>
              <div className="text-muted-foreground text-sm">
                <span className="font-medium">Services:</span>{" "}
                {event.services || "—"}
              </div>
              <div className="mt-2 flex gap-2">
                <button
                  className="bg-primary text-primary-foreground hover:bg-primary/80 flex-1 rounded px-2 py-1 text-xs"
                  onClick={() => handleView(event)}
                >
                  View
                </button>
                <button
                  className="flex-1 rounded bg-green-600 px-2 py-1 text-xs text-white hover:bg-green-700"
                  onClick={() => openEditModal(event)}
                  disabled={event.status === "cancelled"}
                >
                  Edit
                </button>
                <button
                  className="bg-muted text-muted-foreground hover:bg-destructive focus:ring-muted flex-1 rounded px-2 py-1 text-xs focus:ring-2 focus:ring-offset-1 focus:outline-none disabled:opacity-50"
                  onClick={() => handleCancel(event)}
                  disabled={
                    cancelling === event.id || event.status === "cancelled"
                  }
                >
                  {cancelling === event.id ? "Cancelling..." : "Cancel"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Modal for event details or edit */}
      {modalOpen && (selectedEvent || editEvent) && (
        <div className="bg-opacity-40 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="bg-card relative w-full max-w-md rounded-lg p-4 shadow-lg sm:p-6">
            <button
              className="text-muted-foreground hover:text-foreground absolute top-3 right-3 text-2xl"
              onClick={() => {
                setModalOpen(false);
                setEditMode(false);
                setEditEvent(null);
                setSelectedEvent(null);
              }}
              aria-label="Close"
            >
              ×
            </button>
            {editMode && editEvent ? (
              <>
                <h3 className="text-foreground mb-4 text-lg font-bold sm:text-xl">
                  Edit Service
                </h3>
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  {/* Event Type */}
                  <div>
                    <label className="text-muted-foreground block text-sm font-medium">
                      Event Type
                    </label>
                    <input
                      type="text"
                      name="event_type"
                      value={editForm.event_type}
                      onChange={handleEditChange}
                      className="border-border bg-background text-foreground mt-1 w-full rounded border px-3 py-2"
                      required
                    />
                  </div>
                  {/* Date */}
                  <div>
                    <label className="text-muted-foreground block text-sm font-medium">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={editForm.date}
                      onChange={handleEditChange}
                      className="border-border bg-background text-foreground mt-1 w-full rounded border px-3 py-2"
                      required
                    />
                  </div>
                  {/* Status */}
                  <div>
                    <label className="text-muted-foreground block text-sm font-medium">
                      Status
                    </label>
                    <select
                      name="status"
                      value={editForm.status}
                      onChange={handleEditChange}
                      className="border-border bg-background text-foreground mt-1 w-full rounded border px-3 py-3"
                      required
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  {/* Services */}
                  <div>
                    <label className="text-muted-foreground block text-sm font-medium">
                      Services
                    </label>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {availableServices.map((svc) => (
                        <label key={svc.id} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            value={svc.id}
                            checked={editForm.services.includes(svc.id)}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setEditForm((prev) => ({
                                ...prev,
                                services: checked
                                  ? [...prev.services, svc.id]
                                  : prev.services.filter((id) => id !== svc.id),
                              }));
                            }}
                            className="border-border text-primary focus:ring-primary rounded"
                          />
                          <span className="text-foreground">{svc.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="bg-primary text-primary-foreground hover:bg-primary/80 w-full rounded py-2"
                    disabled={updating}
                  >
                    {updating ? "Updating..." : "Save Changes"}
                  </button>
                </form>
              </>
            ) : selectedEvent ? (
              <>
                <h3 className="text-foreground mb-4 text-lg font-bold sm:text-xl">
                  Event Details
                </h3>
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold">Type:</span>{" "}
                    {selectedEvent.event_type}
                  </div>
                  <div>
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date(selectedEvent.date).toLocaleString()}
                  </div>
                  <div>
                    <span className="font-semibold">Services:</span>{" "}
                    {selectedEvent.services || "—"}
                  </div>
                  <div>
                    <span className="font-semibold">Status:</span>{" "}
                    {selectedEvent.status.charAt(0).toUpperCase() +
                      selectedEvent.status.slice(1)}
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
    </section>
  );
};

export default EventsTable;
