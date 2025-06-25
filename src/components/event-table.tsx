import React from "react";
import toast from "react-hot-toast";

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
}) => (
  <section>
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-xl font-semibold text-gray-700">My Events</h2>
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={onRefresh}
      >
        Refresh
      </button>
    </div>
    <div className="overflow-x-auto rounded bg-white shadow">
      {loading ? (
        <div className="p-4">Loading events...</div>
      ) : (
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Event</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Services</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{event.event_type}</td>
                <td className="px-4 py-2">
                  {new Date(event.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{event.services || "—"}</td>
                <td className="px-4 py-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      event.status === "confirmed"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {event.status === "confirmed" ? "Confirmed" : "Pending"}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button
                    className="mr-2 rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
                    onClick={() => toast.success("Event details coming soon!")}
                  >
                    View
                  </button>
                  <button
                    className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600"
                    onClick={() => toast.success("Cancel request sent!")}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No events found. Book your first event!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  </section>
);

export default EventsTable;
