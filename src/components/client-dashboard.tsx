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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsLoading, setEventsLoading] = useState(false);

  // Fetch bookings with joined services
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

      console.log("Raw bookings data:", data);

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
        .select("*")
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

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
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SidebarNav
        sidebarOpen={sidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main content */}
      <div className="flex flex-1 flex-col">
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

        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === "dashboard" && (
            <>
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

              {/* Quick Actions */}
              <section>
                <h2 className="mb-4 text-xl font-semibold text-gray-700">
                  Quick Actions
                </h2>
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <button
                    onClick={() => setActiveTab("newBooking")}
                    className="rounded bg-blue-500 p-4 text-left text-white hover:bg-blue-600"
                  >
                    <h3 className="text-lg font-semibold">Book for Services</h3>
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
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Book a Service
              </h2>
              <div className="rounded-xl bg-white p-6 shadow-md">
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
