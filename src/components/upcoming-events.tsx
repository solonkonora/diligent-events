import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

type Event = {
  id: string;
  event_type: string;
  date: string;
  services: string;
  status: string;
};

interface UpcomingEventsProps {
  events: Event[];
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    event_type: "",
    date: "",
    status: "pending",
    services: "",
  });
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);

  const handleCardClick = (event: Event) => {
    setSelectedEvent(event);
    setEditMode(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
    setEditMode(false);
  };

  const handleEdit = () => {
    if (!selectedEvent) return;
    setEditForm({
      event_type: selectedEvent.event_type,
      date: selectedEvent.date.slice(0, 10),
      status: selectedEvent.status,
      services: selectedEvent.services,
    });
    setEditMode(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;
    setUpdating(true);
    const { error } = await supabase
      .from("bookings")
      .update({
        event_type: editForm.event_type,
        event_date: editForm.date,
        status: editForm.status,
      })
      .eq("id", selectedEvent.id);
    setUpdating(false);
    if (error) {
      toast.error("Failed to update event");
    } else {
      toast.success("Event updated!");
      closeModal();
      // Optionally, trigger a refresh in parent via props
      window.location.reload();
    }
  };

  const handleDelete = async () => {
    if (!selectedEvent) return;
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    setDeleting(true);
    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", selectedEvent.id);
    setDeleting(false);
    if (error) {
      toast.error("Failed to delete event");
    } else {
      toast.success("Event deleted!");
      closeModal();
      window.location.reload();
    }
  };

  return (
    <section className="mb-8">
      <h2 className="text-foreground mb-4 text-xl font-semibold">
        My Bookings
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <button
            key={event.id}
            className="bg-card hover:ring-primary/60 rounded-lg p-4 text-left shadow transition hover:ring-2 focus:outline-none"
            onClick={() => handleCardClick(event)}
            type="button"
          >
            <h3 className="text-foreground font-semibold">
              {event.event_type}
            </h3>
            <p className="text-muted-foreground text-sm">
              {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              Services: {event.services || "—"}
            </p>
            <span
              className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                event.status === "confirmed"
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
              }`}
            >
              {event.status === "confirmed" ? "Confirmed" : "Pending"}
            </span>
          </button>
        ))}
        {events.length === 0 && (
          <p className="text-muted-foreground col-span-full text-center">
            No upcoming events. Book your first event now!
          </p>
        )}
      </div>

      {/* Modal */}
      {modalOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-card relative w-full max-w-md rounded-lg p-6 shadow-xl">
            <button
              className="text-muted-foreground hover:text-foreground absolute top-3 right-3 text-xl"
              onClick={closeModal}
              aria-label="Close"
            >
              &times;
            </button>
            {editMode ? (
              <>
                <h3 className="text-foreground mb-4 text-lg font-bold">Edit Event</h3>
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div>
                    <label className="text-muted-foreground block text-sm font-medium">Event Type</label>
                    <input
                      type="text"
                      name="event_type"
                      value={editForm.event_type}
                      onChange={handleEditChange}
                      className="border-border bg-background text-foreground mt-1 w-full rounded border px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-muted-foreground block text-sm font-medium">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={editForm.date}
                      onChange={handleEditChange}
                      className="border-border bg-background text-foreground mt-1 w-full rounded border px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-muted-foreground block text-sm font-medium">Status</label>
                    <select
                      name="status"
                      value={editForm.status}
                      onChange={handleEditChange}
                      className="border-border bg-background text-foreground mt-1 w-full rounded border px-3 py-2"
                      required
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                  {/* Services editing can be added here if needed */}
                  <button
                    type="submit"
                    className="bg-primary text-primary-foreground hover:bg-primary/80 w-full rounded py-2"
                    disabled={updating}
                  >
                    {updating ? "Saving..." : "Save Changes"}
                  </button>
                </form>
              </>
            ) : (
              <>
                <h3 className="text-foreground mb-2 text-lg font-bold">
                  {selectedEvent.event_type}
                </h3>
                <p className="text-muted-foreground mb-1 text-sm">
                  Date: {new Date(selectedEvent.date).toLocaleDateString()}
                </p>
                <p className="text-muted-foreground mb-1 text-sm">
                  Services: {selectedEvent.services || "—"}
                </p>
                <span
                  className={`mb-4 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                    selectedEvent.status === "confirmed"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                  }`}
                >
                  {selectedEvent.status === "confirmed" ? "Confirmed" : "Pending"}
                </span>
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    className="bg-primary text-primary-foreground hover:bg-primary/80 rounded px-4 py-2"
                    onClick={closeModal}
                  >
                    View
                  </button>
                  <button
                    className="rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/80 rounded px-4 py-2"
                    onClick={handleDelete}
                    disabled={deleting}
                  >
                    {deleting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default UpcomingEvents;
