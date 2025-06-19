// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabaseClient";
// import toast from "react-hot-toast";

// export default function ClientDashboard() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   type Profile = {
//     id: string;
//     full_name: string;
//     role: string;
//   };
//   const [profile, setProfile] = useState<Profile | null>(null);

//   useEffect(() => {
//     const checkSessionAndProfile = async () => {
//       // Wait for Supabase to initialize session
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();
//       if (!user) {
//         // Wait a bit and try again (handles OAuth session propagation delay)
//         setTimeout(checkSessionAndProfile, 500);
//         return;
//       }
//       // Fetch profile
//       const { data: profile } = await supabase
//         .from("profiles")
//         .select("*")
//         .eq("id", user.id)
//         .single();

//       if (!profile || (profile.role !== "user" && profile.role !== "client")) {
//         toast.error("Unauthorized");
//         router.replace("/auth/login");
//       } else {
//         setProfile(profile);
//         setLoading(false);
//       }
//     };
//     checkSessionAndProfile();
//   }, [router]);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div>
//       Welcome, {profile?.full_name} (Client)
//       {/* ...rest of your dashboard... */}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

type Profile = {
  id: string;
  full_name: string;
  role: string;
  phone?: string;
  created_at?: string;
};

type Event = {
  id: string;
  title: string;
  date: string;
  status: string;
};

export default function ClientDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsLoading, setEventsLoading] = useState(false);

  // Placeholder events - will replace with real data from your database
  const mockEvents = [
    {
      id: "1",
      title: "Company Conference",
      date: "2025-07-15",
      status: "confirmed",
    },
    { id: "2", title: "Team Building", date: "2025-07-22", status: "pending" },
    {
      id: "3",
      title: "Product Launch",
      date: "2025-08-05",
      status: "confirmed",
    },
  ];

  const fetchEvents = async () => {
    setEventsLoading(true);
    // will fetch from your database
    setTimeout(() => {
      setEvents(mockEvents);
      setEventsLoading(false);
    }, 500);
  };

  useEffect(() => {
    const checkSessionAndProfile = async () => {
      // Wait for Supabase to initialize session
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        // Wait a bit and try again (handles OAuth session propagation delay)
        setTimeout(checkSessionAndProfile, 500);
        return;
      }
      // Fetch profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!profile || (profile.role !== "user" && profile.role !== "client")) {
        toast.error("Unauthorized");
        router.replace("/auth/login");
      } else {
        setProfile(profile);
        setLoading(false);
        fetchEvents();
      }
    };
    checkSessionAndProfile();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!profile?.id) return;

    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", profile.id);

    if (error) {
      toast.error("Failed to update profile");
    } else {
      toast.success("Profile updated successfully");
      setProfile({ ...profile, ...updates });
    }
  };

  const createBooking = async () => {
    toast.success("Booking request sent! We'll be in touch soon.");
    // In a real app, you would insert into your bookings table
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-blue-800 text-white transition-all duration-300 ease-in-out`}
      >
        <div className="flex h-20 items-center justify-between px-4">
          <h1
            className={`${sidebarOpen ? "block" : "hidden"} text-xl font-bold`}
          >
            Diligent Events
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-full p-2 hover:bg-blue-700"
          >
            {sidebarOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              </svg>
            )}
          </button>
        </div>
        <nav className="mt-8">
          <ul>
            <li>
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex w-full items-center px-6 py-3 ${activeTab === "dashboard" ? "bg-blue-900" : "hover:bg-blue-700"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10-10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
                {sidebarOpen && <span className="ml-3">Dashboard</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("bookings")}
                className={`flex w-full items-center px-6 py-3 ${activeTab === "bookings" ? "bg-blue-900" : "hover:bg-blue-700"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {sidebarOpen && <span className="ml-3">My Events</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("newBooking")}
                className={`flex w-full items-center px-6 py-3 ${activeTab === "newBooking" ? "bg-blue-900" : "hover:bg-blue-700"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                {sidebarOpen && <span className="ml-3">New Booking</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex w-full items-center px-6 py-3 ${activeTab === "profile" ? "bg-blue-900" : "hover:bg-blue-700"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {sidebarOpen && <span className="ml-3">My Profile</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("help")}
                className={`flex w-full items-center px-6 py-3 ${activeTab === "help" ? "bg-blue-900" : "hover:bg-blue-700"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {sidebarOpen && <span className="ml-3">Help & Support</span>}
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Top navbar */}
        <header className="flex h-20 items-center justify-between bg-white px-6 shadow">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              Client Portal
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {profile?.full_name}</span>
            <button
              onClick={handleLogout}
              className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === "dashboard" && (
            <>
              {/* Welcome Card */}
              <section className="mb-8">
                <div className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white shadow-lg">
                  <h2 className="text-2xl font-bold">
                    Welcome back, {profile?.full_name}!
                  </h2>
                  <p className="mt-2">
                    Manage your events and bookings from your personalized
                    dashboard.
                  </p>
                </div>
              </section>

              {/* Upcoming Events */}
              <section className="mb-8">
                <h2 className="mb-4 text-xl font-semibold text-gray-700">
                  Your Upcoming Events
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="rounded-lg bg-white p-4 shadow"
                    >
                      <h3 className="font-semibold">{event.title}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(event.date).toLocaleDateString()}
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

              {/* Quick Actions */}
              <section>
                <h2 className="mb-4 text-xl font-semibold text-gray-700">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <button
                    onClick={() => setActiveTab("newBooking")}
                    className="rounded bg-blue-500 p-4 text-left text-white hover:bg-blue-600"
                  >
                    <h3 className="text-lg font-semibold">Book an Event</h3>
                    <p className="mt-1 text-sm">
                      Schedule your next event with us
                    </p>
                  </button>
                  <button
                    onClick={() => setActiveTab("profile")}
                    className="rounded bg-purple-500 p-4 text-left text-white hover:bg-purple-600"
                  >
                    <h3 className="text-lg font-semibold">Update Profile</h3>
                    <p className="mt-1 text-sm">Manage your account details</p>
                  </button>
                  <button
                    onClick={() => setActiveTab("help")}
                    className="rounded bg-blue-500 p-4 text-left text-white hover:bg-blue-600"
                  >
                    <h3 className="text-lg font-semibold">Get Help</h3>
                    <p className="mt-1 text-sm">Contact our support team</p>
                  </button>
                </div>
              </section>
            </>
          )}

          {activeTab === "bookings" && (
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-700">
                  My Events
                </h2>
                <button
                  className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                  onClick={fetchEvents}
                >
                  Refresh
                </button>
              </div>
              <div className="overflow-x-auto rounded bg-white shadow">
                {eventsLoading ? (
                  <div className="p-4">Loading events...</div>
                ) : (
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left">Event</th>
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.map((event) => (
                        <tr
                          key={event.id}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="px-4 py-2">{event.title}</td>
                          <td className="px-4 py-2">
                            {new Date(event.date).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-2">
                            <span
                              className={`rounded-full px-3 py-1 text-xs ${
                                event.status === "confirmed"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {event.status === "confirmed"
                                ? "Confirmed"
                                : "Pending"}
                            </span>
                          </td>
                          <td className="px-4 py-2">
                            <button
                              className="mr-2 rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
                              onClick={() =>
                                toast.success("Event details coming soon!")
                              }
                            >
                              View
                            </button>
                            <button
                              className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600"
                              onClick={() =>
                                toast.success("Cancel request sent!")
                              }
                            >
                              Cancel
                            </button>
                          </td>
                        </tr>
                      ))}
                      {events.length === 0 && (
                        <tr>
                          <td
                            colSpan={4}
                            className="p-4 text-center text-gray-500"
                          >
                            No events found. Book your first event!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </section>
          )}

          {activeTab === "newBooking" && (
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Book a Service
              </h2>

              <div className="rounded-xl bg-white p-6 shadow-md">
                <form
                  className="grid grid-cols-1 gap-6 md:grid-cols-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    createBooking();
                  }}
                >
                  {/* Service Type */}
                  <div className="col-span-1">
                    <label
                      htmlFor="serviceType"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Select Service
                    </label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                    >
                      <option value="">Choose a Service</option>
                      <option value="hostesses">
                        Hostesses & Protocol Services
                      </option>
                      <option value="hostesses">
                        People to clean event venue before & after event
                      </option>
                      <option value="rentals">
                        Event Rentals (Chairs, Tents, etc.)
                      </option>
                      <option value="planning">
                        Event Planning & Execution
                      </option>
                      <option value="private">
                        Private Functions (e.g., Cleaning, Errands)
                      </option>
                      <option value="other">Other Custom Services</option>
                    </select>
                  </div>

                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Event Type
                    </label>
                    <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none">
                      <option>select event type</option>
                      <option>Corporate Event</option>
                      <option>Wedding</option>
                      <option>Birthday Party</option>
                      <option>Conference</option>
                      <option>Anniversaries</option>
                      <option>Graduation Celebrations</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Date
                    </label>
                    <input
                      type="date"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Number of Guests
                    </label>
                    <input
                      type="number"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Budget Range
                    </label>
                    <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none">
                      <option>select you amount range</option>
                      <option>Under 100,000FCFA</option>
                      <option>100,000FCFA - 200,000FCFA</option>
                      <option>300,000FCFA - 500,000FCFA</option>
                      <option>Over 800,000FCFA</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Event Details
                    </label>
                    <textarea
                      rows={4}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                      placeholder="Tell us about your event..."
                    ></textarea>
                  </div>

                  <div className="flex justify-end md:col-span-2">
                    <button
                      type="submit"
                      className="rounded-md bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
                    >
                      Submit Request
                    </button>
                  </div>
                </form>
              </div>
            </section>
          )}

          {activeTab === "profile" && (
            <section>
              <h2 className="mb-6 text-xl font-semibold text-gray-700">
                My Profile
              </h2>
              <div className="rounded-lg bg-white p-6 shadow-md">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                      defaultValue={profile?.full_name || ""}
                      onChange={(e) =>
                        setProfile((p) =>
                          p ? { ...p, full_name: e.target.value } : p
                        )
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                      defaultValue={profile?.phone || ""}
                      onChange={(e) =>
                        setProfile((p) =>
                          p ? { ...p, phone: e.target.value } : p
                        )
                      }
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button
                      onClick={() =>
                        profile &&
                        updateProfile({
                          full_name: profile.full_name,
                          phone: profile.phone,
                        })
                      }
                      className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    >
                      Update Profile
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-700">
                    Password
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    For security reasons, you can't view your current password.
                  </p>
                  <button
                    onClick={() => toast.success("Password reset email sent!")}
                    className="mt-4 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    Reset Password
                  </button>
                </div>
              </div>
            </section>
          )}

          {activeTab === "help" && (
            <section>
              <h2 className="mb-6 text-xl font-semibold text-gray-700">
                Help & Support
              </h2>
              <div className="rounded-lg bg-white p-6 shadow-md">
                <div className="mb-8">
                  <h3 className="mb-4 text-lg font-medium text-gray-700">
                    Contact Us
                  </h3>
                  <div className="mb-4 flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span>support@diligent-events.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span>+237-676 717 626</span>
                    <span>+237-675 591 505</span>
                    <span>+237-676 326 908</span>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-medium text-gray-700">
                    Send a Message
                  </h3>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                      placeholder="Type your message here..."
                    ></textarea>
                  </div>
                  <button
                    onClick={() =>
                      toast.success("Message sent! We'll respond shortly.")
                    }
                    className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
