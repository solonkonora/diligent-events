"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";
import BookingForm from "./booking-form";
import ProfileSection from "./profile";
import HelpSupportSection from "./help-section";
import UpcomingEvents from "./upcoming-events";
import EventsTable from "./event-table";
import SidebarNav from "./client-sidebar";

type Profile = {
  id: string;
  full_name: string;
  role: string;
  phone?: string;
  created_at?: string;
};

type Event = {
  id: string;
  event_type: string;
  services: string;
  date: string;
  status: string;
  created?: string;
};

export default function ClientDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false); // default to closed on mobile
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsLoading, setEventsLoading] = useState(false);

  useEffect(() => {
    // clean URL if it contains auth tokens
    if (window.location.hash && window.location.hash.includes("access_token")) {
      // remove the hash fragment without reloading the page
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // also checking for query parameters
    if (
      window.location.search &&
      window.location.search.includes("access_token")
    ) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // fetch bookings with joined services
  const fetchEvents = async () => {
    setEventsLoading(true);
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select(
          `
          id, event_type, event_date, status, created_at,
          bookings_services (
            service_id, services ( name )
          )
        `
        )
        .eq("user_id", profile?.id)
        .order("event_date", { ascending: true });

      if (error) {
        toast.error("Failed to load events");
        console.error("Error fetching events:", error);
        return;
      }

      const formattedEvents = (data || []).map((booking: any) => ({
        id: booking.id,
        event_type: booking.event_type,
        date: booking.event_date,
        status: booking.status,
        created: booking.created_at,
        services: (booking.bookings_services || [])
          .map((bs: any) => bs.services?.name)
          .filter(Boolean)
          .join(", "),
      }));

      setEvents(formattedEvents);
    } catch (err) {
      console.error("Exception:", err);
      toast.error("Something went wrong loading your events");
    } finally {
      setEventsLoading(false);
    }
  };

  useEffect(() => {
    const checkSessionAndProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setTimeout(checkSessionAndProfile, 500);
        return;
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("id, full_name, role, created_at")
        .eq("id", user.id)
        .single();

      if (!profile || (profile.role !== "user" && profile.role !== "client")) {
        toast.error("Unauthorized");
        router.replace("/auth/login");
      } else {
        setProfile(profile);
        setLoading(false);
        // fetchEvents();
      }
    };
    checkSessionAndProfile();
  }, [router]);

  useEffect(() => {
    if (profile?.id) {
      fetchEvents();
    }
  }, [profile]);

  // subscribe to Supabase Realtime for bookings changes
  useEffect(() => {
    if (!profile?.id) return;

    // subscribe to realtime changes in bookings for this user
    const channel = supabase
      .channel("realtime:bookings")
      .on(
        "postgres_changes",
        {
          event: "*", // listen to all events
          schema: "public",
          table: "bookings",
          filter: `user_id=eq.${profile.id}`,
        },
        (payload) => {
          fetchEvents(); // Refresh bookings on any change
        }
      )
      .subscribe();

    // Cleanup on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [profile]);

  // subscribing to supabase realtime for bookings_services changes
  useEffect(() => {
    if (!profile?.id) return;

    const channel = supabase
      .channel("realtime:bookings_services")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookings_services",
        },
        (payload) => {
          fetchEvents(); // refresh bookings on any change in bookings_services
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [profile]);

  // const handleLogout = async () => {
  //   await supabase.auth.signOut();
  //   router.push("/auth/login");
  // };

  // Todo: Update profile function
  // This function updates the profile in the database and updates the local state
  // It should handle partial updates and show success/error messages
  // It should also validate the input data before sending the update request
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

  if (loading)
    return (
      <div className="bg-background text-foreground flex h-screen items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="bg-background flex h-screen">
      {/* Sidebar overlay for mobile */}
      <div
        className={`bg-opacity-40 fixed inset-0 z-40 bg-black/60 transition-opacity lg:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setSidebarOpen(false)}
      />
      {/* Sidebar */}
      <div
        className={`fixed z-50 h-full transition-transform duration-300 lg:static ${
          sidebarOpen ? "w-64 translate-x-0" : "w-20 -translate-x-full lg:w-20"
        } lg:translate-x-0`}
      >
        <SidebarNav
          sidebarOpen={sidebarOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setSidebarOpen={setSidebarOpen}
        />
      </div>

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col transition-all duration-300">
        <header className="bg-card flex h-16 items-center justify-between px-4 shadow sm:px-6">
          <div className="flex items-center gap-2">
            {/* Sidebar toggle for mobile and desktop */}
            <button
              className="rounded-md p-2 hover:bg-gray-200 focus:outline-none lg:hidden"
              onClick={() => setSidebarOpen((open) => !open)}
              aria-label="Open sidebar"
            >
              <svg
                className="text-foreground h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-foreground text-lg font-semibold sm:text-xl">
              Client Portal
            </h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-muted-foreground hidden sm:inline">
              Welcome, {profile?.full_name}
            </span>
            {/* <button
              onClick={handleLogout}
              className="border-border text-foreground hover:bg-destructive hover:text-destructive-foreground rounded-md border px-3 py-2 text-sm sm:px-4 sm:py-2"
            >
              Logout
            </button> */}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-6">
          {activeTab === "dashboard" && (
            <>
              <section className="mb-4 sm:mb-8">
                <div className="from-primary to-primary/80 text-primary-foreground rounded-lg bg-gradient-to-r p-4 shadow-lg sm:p-6">
                  <h2 className="text-xl font-bold sm:text-2xl">
                    Welcome back, {profile?.full_name}!
                  </h2>
                  <p className="mt-2 text-sm sm:text-base">
                    Manage your events and bookings from your personalized
                    dashboard.
                  </p>
                </div>
              </section>

              {/* Quick Actions */}
              <section>
                <h2 className="text-foreground mb-2 text-lg font-semibold sm:mb-4 sm:text-xl">
                  Quick Actions
                </h2>
                <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                  <button
                    onClick={() => setActiveTab("newBooking")}
                    className="bg-primary text-primary-foreground hover:bg-primary/80 rounded p-3 text-left sm:p-4"
                  >
                    <h3 className="text-base font-semibold sm:text-lg">
                      Book for Services
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm">
                      Schedule your next event with us
                    </p>
                  </button>
                  <button
                    onClick={() => setActiveTab("profile")}
                    className="rounded bg-purple-600 p-3 text-left text-white hover:bg-purple-700 sm:p-4"
                  >
                    <h3 className="text-base font-semibold sm:text-lg">
                      Update Profile
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm">
                      Manage your account details
                    </p>
                  </button>
                  <button
                    onClick={() => setActiveTab("help")}
                    className="bg-primary text-primary-foreground hover:bg-primary/80 rounded p-3 text-left sm:p-4"
                  >
                    <h3 className="text-base font-semibold sm:text-lg">
                      Get Help
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm">
                      Contact our support team
                    </p>
                  </button>
                </div>
              </section>

              {/* Upcoming Events */}
              <UpcomingEvents events={events} />
            </>
          )}

          {activeTab === "bookings" && (
            <EventsTable
              events={events}
              loading={eventsLoading}
              onRefresh={fetchEvents}
            />
          )}

          {activeTab === "newBooking" && (
            <section className="space-y-4 sm:space-y-6">
              <h2 className="text-foreground text-xl font-semibold sm:text-2xl">
                Book a Service
              </h2>
              <div className="bg-card rounded-xl p-4 shadow-md sm:p-6">
                {profile && (
                  <BookingForm userId={profile.id} onSuccess={fetchEvents} />
                )}
              </div>
            </section>
          )}

          {activeTab === "profile" && profile && (
            <ProfileSection profile={profile} onProfileUpdate={setProfile} />
          )}

          {activeTab === "help" && <HelpSupportSection />}
        </main>
      </div>
    </div>
  );
}
