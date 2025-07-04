import React from "react";

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

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => (
  <section className="mb-8">
    <h2 className="mb-4 text-xl font-semibold text-gray-700">My Bookings</h2>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <div key={event.id} className="rounded-lg bg-white p-4 shadow">
          <h3 className="font-semibold">{event.event_type}</h3>
          <p className="text-sm text-gray-600">
            {new Date(event.date).toLocaleDateString()}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Services: {event.services || "—"}
          </p>
          <span
            className={`mt-2 inline-block rounded-full px-3 py-1 text-xs ${
              event.status === "confirmed"
                ? "bg-blue-100 text-blue-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {event.status === "confirmed" ? "Confirmed" : "Pending"}
          </span>
        </div>
      ))}
      {events.length === 0 && (
        <p className="col-span-full text-center text-gray-500">
          No upcoming events. Book your first event now!
        </p>
      )}
    </div>
  </section>
);

export default UpcomingEvents;
