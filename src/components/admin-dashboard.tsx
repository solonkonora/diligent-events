/* eslint-disable prettier/prettier */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";
import { EventManagement } from "./admin-event-managment";

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

  // Fetch only business-relevant users (those with bookings or interactions)
  const fetchUsers = async () => {
    setUsersLoading(true);

    try {
      let query = supabase
        .from("profiles")
        .select(
          `
          id, 
          full_name, 
          role, 
          created_at,
          bookings(id, created_at, status)
        `
        )
        .neq("role", "admin"); // Exclude other admins

      // Apply filters based on userFilter state
      if (userFilter === "active") {
        // Only users with bookings
        query = query.not("bookings", "is", null);
      } else if (userFilter === "recent") {
        // Users with activity in last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        query = query.gte("bookings.created_at", thirtyDaysAgo.toISOString());
      }
      // "all" filter doesn't add any constraints

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
    // Analytics based on business-relevant users only
    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .neq("role", "admin"); // Exclude admins from analytics

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
      // On large screens, keep sidebar open by default
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // set initial state
    handleResize();

    // add event listener
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-20 bg-black lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-30 w-64 transform bg-blue-800 text-white transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          sidebarOpen ? "lg:w-64" : "lg:w-20"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4 lg:h-20">
          <h1
            className={`${
              sidebarOpen ? "block" : "hidden lg:hidden"
            } text-lg font-bold lg:text-xl`}
          >
            Diligent Services
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-full p-2 hover:bg-blue-700"
          >
            {sidebarOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 lg:h-6 lg:w-6"
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
                className="h-5 w-5 lg:h-6 lg:w-6"
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
        <nav className="mt-4 lg:mt-8">
          <ul>
            <li>
              <button
                onClick={() => {
                  setActiveTab("dashboard");
                  // Close sidebar on mobile after selection
                  if (window.innerWidth < 1024) setSidebarOpen(false);
                }}
                className={`flex w-full items-center px-4 py-3 lg:px-6 ${
                  activeTab === "dashboard"
                    ? "bg-blue-900"
                    : "hover:bg-blue-700"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 lg:h-6 lg:w-6"
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
                {(sidebarOpen || window.innerWidth < 1024) && (
                  <span className="ml-3">Dashboard</span>
                )}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab("users");
                  if (window.innerWidth < 1024) setSidebarOpen(false);
                }}
                className={`flex w-full items-center px-4 py-3 lg:px-6 ${
                  activeTab === "users" ? "bg-blue-900" : "hover:bg-blue-700"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 lg:h-6 lg:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292m0 0a4 4 0 100 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                {(sidebarOpen || window.innerWidth < 1024) && (
                  <span className="ml-3">Users</span>
                )}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab("events");
                  if (window.innerWidth < 1024) setSidebarOpen(false);
                }}
                className={`flex w-full items-center px-4 py-3 lg:px-6 ${
                  activeTab === "events" ? "bg-blue-900" : "hover:bg-blue-700"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 lg:h-6 lg:w-6"
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
                {(sidebarOpen || window.innerWidth < 1024) && (
                  <span className="ml-3">Bookings</span>
                )}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab("settings");
                  if (window.innerWidth < 1024) setSidebarOpen(false);
                }}
                className={`flex w-full items-center px-4 py-3 lg:px-6 ${
                  activeTab === "settings" ? "bg-blue-900" : "hover:bg-blue-700"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 lg:h-6 lg:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {(sidebarOpen || window.innerWidth < 1024) && (
                  <span className="ml-3">Settings</span>
                )}
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between bg-white px-4 shadow lg:h-20 lg:px-4">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="mr-3 rounded-md p-2 hover:bg-gray-100 lg:hidden"
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
            <h1 className="text-lg font-semibold text-gray-800 sm:text-xl">
              Admin Portal
            </h1>
          </div>
          <div className="flex items-center gap-2 lg:gap-2">
            <span className="hidden text-sm text-gray-600 sm:block lg:text-base">
              Welcome, {profile?.full_name}
            </span>
            <button
              onClick={handleLogout}
              className="rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-red-600 hover:text-white lg:px-2 lg:py-2 lg:text-base"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {activeTab === "dashboard" && (
            <>
              <section className="mb-6 lg:mb-8">
                <h2 className="mb-4 text-lg font-semibold text-gray-700 lg:text-xl">
                  Analytics
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded bg-white p-4 shadow lg:p-6">
                    <div className="text-2xl font-bold text-blue-600 lg:text-3xl">
                      {analytics.total}
                    </div>
                    <div className="text-sm text-gray-500 lg:text-base">
                      Total Users
                    </div>
                  </div>
                  <div className="rounded bg-white p-4 shadow lg:p-6">
                    <div className="text-2xl font-bold text-green-600 lg:text-3xl">
                      {analytics.admins}
                    </div>
                    <div className="text-sm text-gray-500 lg:text-base">
                      Admins
                    </div>
                  </div>
                  <div className="rounded bg-white p-4 shadow sm:col-span-2 lg:col-span-1 lg:p-6">
                    <div className="text-2xl font-bold text-purple-600 lg:text-3xl">
                      {analytics.clients}
                    </div>
                    <div className="text-sm text-gray-500 lg:text-base">
                      Clients
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="mb-4 text-lg font-semibold text-gray-700 lg:text-xl">
                  Recent Activity
                </h2>
                <div className="rounded bg-white p-4 shadow lg:p-6">
                  <p className="text-sm text-gray-500 lg:text-base">
                    No recent activity to display.
                  </p>
                </div>
              </section>
            </>
          )}

          {activeTab === "users" && (
            <section>
              <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-semibold text-gray-700 lg:text-xl">
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
                    className="rounded border px-3 py-2 text-sm lg:text-base"
                  >
                    <option value="active">Active Users (with bookings)</option>
                    <option value="recent">
                      Recent Activity (last 30 days)
                    </option>
                    <option value="all">All Users</option>
                  </select>
                  <button
                    className="rounded bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600 lg:text-base"
                    onClick={fetchUsers}
                  >
                    Refresh
                  </button>
                </div>
              </div>
              {/* Mobile Cards View */}
              <div className="block lg:hidden">
                {usersLoading ? (
                  <div className="rounded bg-white p-4 shadow">
                    Loading users...
                  </div>
                ) : (
                  <div className="space-y-4">
                    {users.map((u) => (
                      <div key={u.id} className="rounded bg-white p-4 shadow">
                        <div className="mb-3 flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">{u.full_name}</h3>
                            <div className="mt-1 flex items-center gap-2">
                              <select
                                value={u.role}
                                onChange={(e) =>
                                  handleRoleChange(u.id, e.target.value)
                                }
                                className="rounded border px-2 py-1 text-sm"
                                disabled={u.id === profile?.id}
                              >
                                <option value="admin">admin</option>
                                <option value="client">client</option>
                              </select>
                            </div>
                          </div>
                          <button
                            className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-700 disabled:opacity-50"
                            onClick={() => handleDelete(u.id)}
                            disabled={u.id === profile?.id}
                          >
                            Delete
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Bookings:</span>
                            <div className="mt-1">
                              <span className="rounded bg-blue-100 px-2 py-1 text-blue-800">
                                {u.bookingCount || 0} bookings
                              </span>
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500">Last Activity:</span>
                            <div className="mt-1 text-gray-900">
                              {u.lastBooking
                                ? new Date(u.lastBooking).toLocaleDateString()
                                : "No activity"}
                            </div>
                          </div>
                          <div className="col-span-2">
                            <span className="text-gray-500">Joined:</span>
                            <div className="mt-1 text-gray-900">
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
              <div className="hidden overflow-x-auto rounded bg-white shadow lg:block">
                {usersLoading ? (
                  <div className="p-4">Loading users...</div>
                ) : (
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left lg:px-6 lg:py-3">Name</th>
                        <th className="px-4 py-2 text-left lg:px-6 lg:py-3">Role</th>
                        <th className="px-4 py-2 text-left lg:px-6 lg:py-3">Bookings</th>
                        <th className="px-4 py-2 text-left lg:px-6 lg:py-3">Last Activity</th>
                        <th className="px-4 py-2 text-left lg:px-6 lg:py-3">Joined</th>
                        <th className="px-4 py-2 text-left lg:px-6 lg:py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2 lg:px-6 lg:py-3">{u.full_name}</td>
                          <td className="px-4 py-2 lg:px-6 lg:py-3">
                            <select
                              value={u.role}
                              onChange={(e) =>
                                handleRoleChange(u.id, e.target.value)
                              }
                              className="rounded border px-2 py-1 text-sm"
                              disabled={u.id === profile?.id}
                            >
                              <option value="admin">admin</option>
                              <option value="client">client</option>
                            </select>
                          </td>
                          <td className="px-4 py-2 lg:px-6 lg:py-3">
                            <span className="rounded bg-blue-100 px-2 py-1 text-sm text-blue-800">
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
                              className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-700 disabled:opacity-50"
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
              <h2 className="mb-4 text-lg font-semibold text-gray-700 lg:text-xl">
                Event Management
              </h2>
              <div className="rounded bg-white p-4 shadow lg:p-6">
                {profile?.id && <EventManagement profileId={profile.id} />}
              </div>
            </section>
          )}

          {activeTab === "settings" && (
            <section>
              <h2 className="mb-4 text-lg font-semibold text-gray-700 lg:text-xl">
                Settings
              </h2>
              <div className="rounded bg-white p-4 shadow lg:p-6">
                <p className="text-sm text-gray-500 lg:text-base">
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
