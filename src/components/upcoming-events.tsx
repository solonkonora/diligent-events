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
    <h2 className="text-foreground mb-4 text-xl font-semibold">My Bookings</h2>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <div key={event.id} className="bg-card rounded-lg p-4 shadow">
          <h3 className="text-foreground font-semibold">{event.event_type}</h3>
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
        </div>
      ))}
      {events.length === 0 && (
        <p className="text-muted-foreground col-span-full text-center">
          No upcoming events. Book your first event now!
        </p>
      )}
    </div>
  </section>
);

export default UpcomingEvents;
