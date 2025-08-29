/* eslint-disable prettier/prettier */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";
import { EventManagement } from "./admin-event-managment";
import AdminSidebar from "./admin-sidebar";

type Profile = {
  id: string;
  full_name: string;
  role: string;
  created_at?: string;
  bookingCount?: number;
  lastBooking?: string | null;
  bookings?: Array<{
    id: string;
    created_at: string;
    status: string;
  }>;
};

export function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [users, setUsers] = useState<Profile[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [analytics, setAnalytics] = useState<{
    total: number;
    admins: number;
    clients: number;
  }>({
    total: 0,
    admins: 0,
    clients: 0,
  });
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userFilter, setUserFilter] = useState<"all" | "active" | "recent">(
    "active"
  );

  // fetch only business-relevant users (those with bookings or interactions)
  const fetchUsers = async () => {
    setUsersLoading(true);

    try {
      let query = supabase.from("profiles").select(
        `
          id, 
          full_name, 
          role, 
          created_at,
          bookings(id, created_at, status)
        `
      );
      // .neq("role", "admin"); // Exclude other admins

      // apply filters based on userFilter state
      if (userFilter === "active") {
        // Only users with bookings
        query = query.not("bookings", "is", null);
      } else if (userFilter === "recent") {
        // users with activity in last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        query = query.gte("bookings.created_at", thirtyDaysAgo.toISOString());
      }

      const { data, error } = await query.order("created_at", {
        ascending: false,
      });

      if (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users");
        setUsers([]);
      } else {
        // transform data to include booking metrics
        const processedUsers =
          data?.map((user) => ({
            ...user,
            bookingCount: user.bookings?.length || 0,
            lastBooking: user.bookings?.[0]?.created_at || null,
          })) || [];

        setUsers(processedUsers);
      }
    } catch (err) {
      console.error("Error in fetchUsers:", err);
      toast.error("Failed to fetch users");
      setUsers([]);
    }

    setUsersLoading(false);
  };

  const fetchAnalytics = async () => {
    const { data, error } = await supabase.from("profiles").select("role"); // Do not exclude admins here

    if (!error && data) {
      const total = data.length;
      const admins = data.filter((u) => u.role === "admin").length;
      const clients = data.filter((u) => u.role === "client").length;
      setAnalytics({ total, admins, clients });
    }
  };

  useEffect(() => {
    const checkRoleAndFetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth/login");
        return;
      }
      // fetch profile from profiles table
      const { data: profile } = await supabase
        .from("profiles")
        .select("id, full_name, role, created_at")
        .eq("id", user.id)
        .single();

      if (!profile || profile.role !== "admin") {
        toast.error("Unauthorized");
        router.push("/client");
      } else {
        setProfile(profile);
        setLoading(false);
        fetchUsers();
        fetchAnalytics();
      }
    };

    checkRoleAndFetchProfile();
  }, [router]);

  // re-fetch users when filter changes
  useEffect(() => {
    if (profile && profile.role === "admin") {
      fetchUsers();
    }
  }, [userFilter]);

  // handle window resize for sidebar behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // set initial state
    handleResize();
    window.addEventListener("resize", handleResize);

    // cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // change user role
  const handleRoleChange = async (id: string, newRole: string) => {
    if (!window.confirm("Are you sure you want to change this user's role?"))
      return;
    const { error } = await supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("id", id);
    if (error) {
      toast.error("Failed to update role");
    } else {
      toast.success("Role updated");
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
      );
      fetchAnalytics();
    }
  };

  // delete user (soft delete: just remove from profiles)
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    const { error } = await supabase.from("profiles").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete user");
    } else {
      toast.success("User deleted");
      setUsers((prev) => prev.filter((u) => u.id !== id));
      fetchAnalytics();
    }
  };

  // const handleLogout = async () => {
  //   await supabase.auth.signOut();
  //   router.push("/auth/login");
  // };

  if (loading)
    return (
      <div className="bg-background text-foreground flex h-screen items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="bg-background flex h-screen">
      {/* mobile overlay */}
      {sidebarOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-20 bg-white/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* sidebar */}
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* main content */}
      <div className="flex flex-1 flex-col">
        <header className="bg-card flex h-16 items-center justify-between px-4 shadow lg:h-20 lg:px-4">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="hover:bg-muted mr-3 rounded-md p-2 lg:hidden"
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-foreground text-lg font-semibold sm:text-xl">
              Admin Portal
            </h1>
          </div>
          <span className="mr-8 text-muted-foreground hidden text-sm sm:block lg:text-base">
            Welcome, {profile?.full_name}
          </span>
        </header>

        {/* content area */}
        <main className="flex-1 overflow-y-auto">
          {activeTab === "dashboard" && (
            <>
              <section className="m-6 lg:mb-8">
                <h2 className="text-foreground mb-4 text-lg font-semibold lg:text-xl">
                  Analytics
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="bg-card rounded p-4 shadow lg:p-6">
                    <div className="text-primary text-2xl font-bold lg:text-3xl">
                      {analytics.total}
                    </div>
                    <div className="text-muted-foreground text-sm lg:text-base">
                      Total Users
                    </div>
                  </div>
                  <div className="bg-card rounded p-4 shadow lg:p-6">
                    <div className="text-2xl font-bold text-green-600 lg:text-3xl">
                      {analytics.admins}
                    </div>
                    <div className="text-muted-foreground text-sm lg:text-base">
                      Admins
                    </div>
                  </div>
                  <div className="bg-card rounded p-4 shadow sm:col-span-2 lg:col-span-1 lg:p-6">
                    <div className="text-2xl font-bold text-purple-600 lg:text-3xl">
                      {analytics.clients}
                    </div>
                    <div className="text-muted-foreground text-sm lg:text-base">
                      Clients
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-foreground m-6 text-lg font-semibold lg:text-xl">
                  Recent Activity
                </h2>
                <div className="bg-card rounded p-4 shadow lg:p-6">
                  <p className="text-muted-foreground text-sm lg:text-base">
                    No recent activity to display.
                  </p>
                </div>
              </section>
            </>
          )}

          {activeTab === "users" && (
            <section>
              <div className="m-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-foreground text-lg font-semibold lg:text-xl">
                  User Management
                </h2>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <select
                    value={userFilter}
                    onChange={(e) =>
                      setUserFilter(
                        e.target.value as "all" | "active" | "recent"
                      )
                    }
                    className="border-border bg-background text-foreground rounded border px-3 py-2 text-sm lg:text-base"
                  >
                    <option value="active">Active Users (with bookings)</option>
                    <option value="recent">
                      Recent Activity (last 30 days)
                    </option>
                    <option value="all">All Users</option>
                  </select>
                  <button
                    className="bg-primary text-primary-foreground hover:bg-primary/80 rounded px-4 py-2 text-sm lg:text-base"
                    onClick={fetchUsers}
                  >
                    Refresh
                  </button>
                </div>
              </div>
              {/* mobile Cards View */}
              <div className="block lg:hidden">
                {usersLoading ? (
                  <div className="bg-card rounded p-4 shadow">
                    Loading users...
                  </div>
                ) : (
                  <div className="space-y-4">
                    {users.map((u) => (
                      <div key={u.id} className="bg-card rounded p-4 shadow">
                        <div className="mb-3 flex items-start justify-between">
                          <div>
                            <h3 className="text-foreground font-medium">
                              {u.full_name}
                            </h3>
                            <div className="mt-1 flex items-center gap-2">
                              <select
                                value={u.role}
                                onChange={(e) =>
                                  handleRoleChange(u.id, e.target.value)
                                }
                                className="border-border bg-background text-foreground rounded border px-2 py-1 text-sm"
                                disabled={u.id === profile?.id}
                              >
                                <option value="admin">admin</option>
                                <option value="client">client</option>
                              </select>
                            </div>
                          </div>
                          <button
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/80 rounded px-3 py-1 text-sm disabled:opacity-50"
                            onClick={() => handleDelete(u.id)}
                            disabled={u.id === profile?.id}
                          >
                            Delete
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">
                              Bookings:
                            </span>
                            <div className="mt-1">
                              <span className="rounded bg-blue-100 px-2 py-1 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                                {u.bookingCount || 0} bookings
                              </span>
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Last Activity:
                            </span>
                            <div className="text-foreground mt-1">
                              {u.lastBooking
                                ? new Date(u.lastBooking).toLocaleDateString()
                                : "No activity"}
                            </div>
                          </div>
                          <div className="col-span-2">
                            <span className="text-muted-foreground">
                              Joined:
                            </span>
                            <div className="text-foreground mt-1">
                              {u.created_at
                                ? new Date(u.created_at).toLocaleDateString()
                                : ""}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* desktop table view */}
              <div className="bg-card hidden overflow-x-auto rounded shadow lg:block">
                {usersLoading ? (
                  <div className="p-4">Loading users...</div>
                ) : (
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr className="bg-muted">
                        <th className="text-muted-foreground px-4 py-2 text-left lg:px-6 lg:py-3">
                          Name
                        </th>
                        <th className="text-muted-foreground px-4 py-2 text-left lg:px-6 lg:py-3">
                          Role
                        </th>
                        <th className="text-muted-foreground px-4 py-2 text-left lg:px-6 lg:py-3">
                          Bookings
                        </th>
                        <th className="text-muted-foreground px-4 py-2 text-left lg:px-6 lg:py-3">
                          Last Activity
                        </th>
                        <th className="text-muted-foreground px-4 py-2 text-left lg:px-6 lg:py-3">
                          Joined
                        </th>
                        <th className="text-muted-foreground px-4 py-2 text-left lg:px-6 lg:py-3">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr
                          key={u.id}
                          className="border-border hover:bg-muted/50 border-b"
                        >
                          <td className="text-foreground px-4 py-2 lg:px-6 lg:py-3">
                            {u.full_name}
                          </td>
                          <td className="px-4 py-2 lg:px-6 lg:py-3">
                            <select
                              value={u.role}
                              onChange={(e) =>
                                handleRoleChange(u.id, e.target.value)
                              }
                              className="border-border bg-background text-foreground rounded border px-2 py-1 text-sm"
                              disabled={u.id === profile?.id}
                            >
                              <option value="admin">admin</option>
                              <option value="client">client</option>
                            </select>
                          </td>
                          <td className="px-4 py-2 lg:px-6 lg:py-3">
                            <span className="rounded bg-blue-100 px-2 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                              {u.bookingCount || 0} bookings
                            </span>
                          </td>
                          <td className="px-4 py-2 lg:px-6 lg:py-3">
                            {u.lastBooking
                              ? new Date(u.lastBooking).toLocaleDateString()
                              : "No activity"}
                          </td>
                          <td className="px-4 py-2 lg:px-6 lg:py-3">
                            {u.created_at
                              ? new Date(u.created_at).toLocaleDateString()
                              : ""}
                          </td>
                          <td className="px-4 py-2 lg:px-6 lg:py-3">
                            <button
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/80 rounded px-3 py-1 text-sm disabled:opacity-50"
                              onClick={() => handleDelete(u.id)}
                              disabled={u.id === profile?.id}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </section>
          )}

          {activeTab === "events" && (
            <section>
              <h2 className="text-foreground my-4 ml-4 text-lg font-semibold lg:text-xl">
                Event Management
              </h2>
              <div className="bg-card m-0 rounded p-0 shadow">
                {profile?.id && <EventManagement profileId={profile.id} />}
              </div>
            </section>
          )}

          {activeTab === "settings" && (
            <section>
              <h2 className="text-foreground p-4 text-lg font-semibold lg:text-xl">
                Settings
              </h2>
              <div className="bg-card rounded p-4 shadow lg:p-6">
                <p className="text-muted-foreground text-sm lg:text-base">
                  Settings and preferences coming soon.
                </p>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
