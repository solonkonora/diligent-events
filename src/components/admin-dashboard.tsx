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

  // Move fetchUsers and fetchAnalytics outside useEffect
  const fetchUsers = async () => {
    setUsersLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, role, created_at");
    if (error) {
      toast.error("Failed to fetch users");
    } else {
      setUsers(data || []);
    }
    setUsersLoading(false);
  };

  const fetchAnalytics = async () => {
    // Basic analytics: total users, admins, clients
    const { data, error } = await supabase.from("profiles").select("role");
    if (!error && data) {
      const total = data.length;
      const admins = data.filter((u: any) => u.role === "admin").length;
      const clients = data.filter((u: any) => u.role === "client").length;
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
      // Fetch profile from profiles table
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
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

  // Change user role
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

  // Delete user (soft delete: just remove from profiles)
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
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-blue-800 text-white transition-all duration-300 ease-in-out`}
      >
        <div className="flex h-20 items-center justify-between px-4">
          <h1
            className={`${sidebarOpen ? "block" : "hidden"} text-xl font-bold`}
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
                onClick={() => setActiveTab("users")}
                className={`flex w-full items-center px-6 py-3 ${activeTab === "users" ? "bg-blue-900" : "hover:bg-blue-700"}`}
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
                    d="M12 4.354a4 4 0 110 5.292m0 0a4 4 0 100 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                {sidebarOpen && <span className="ml-3">Users</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("events")}
                className={`flex w-full items-center px-6 py-3 ${activeTab === "events" ? "bg-blue-900" : "hover:bg-blue-700"}`}
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
                {sidebarOpen && <span className="ml-3">Bookings</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("settings")}
                className={`flex w-full items-center px-6 py-3 ${activeTab === "settings" ? "bg-blue-900" : "hover:bg-blue-700"}`}
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
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {sidebarOpen && <span className="ml-3">Settings</span>}
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-20 items-center justify-between bg-white px-6 shadow">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {profile?.full_name}</span>
            <button
              onClick={handleLogout}
              className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === "dashboard" && (
            <>
              <section className="mb-8">
                <h2 className="mb-4 text-xl font-semibold text-gray-700">
                  Analytics
                </h2>
                <div className="flex gap-4">
                  <div className="flex-1 rounded bg-white p-6 shadow">
                    <div className="text-3xl font-bold text-blue-600">
                      {analytics.total}
                    </div>
                    <div className="text-gray-500">Total Users</div>
                  </div>
                  <div className="flex-1 rounded bg-white p-6 shadow">
                    <div className="text-3xl font-bold text-green-600">
                      {analytics.admins}
                    </div>
                    <div className="text-gray-500">Admins</div>
                  </div>
                  <div className="flex-1 rounded bg-white p-6 shadow">
                    <div className="text-3xl font-bold text-purple-600">
                      {analytics.clients}
                    </div>
                    <div className="text-gray-500">Clients</div>
                  </div>
                </div>
              </section>

              {/* Recent Activity (placeholder) */}
              <section>
                <h2 className="mb-4 text-xl font-semibold text-gray-700">
                  Recent Activity
                </h2>
                <div className="rounded bg-white p-6 shadow">
                  <p className="text-gray-500">
                    No recent activity to display.
                  </p>
                </div>
              </section>
            </>
          )}

          {activeTab === "users" && (
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-700">
                  User Management
                </h2>
                <button
                  className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                  onClick={fetchUsers}
                >
                  Refresh
                </button>
              </div>
              <div className="overflow-x-auto rounded bg-white shadow">
                {usersLoading ? (
                  <div className="p-4">Loading users...</div>
                ) : (
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Role</th>
                        <th className="px-4 py-2 text-left">Joined</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2">{u.full_name}</td>
                          <td className="px-4 py-2">
                            <select
                              value={u.role}
                              onChange={(e) =>
                                handleRoleChange(u.id, e.target.value)
                              }
                              className="rounded border px-2 py-1"
                              disabled={u.id === profile?.id}
                            >
                              <option value="admin">admin</option>
                              <option value="client">client</option>
                            </select>
                          </td>
                          <td className="px-4 py-2">
                            {u.created_at
                              ? new Date(u.created_at).toLocaleDateString()
                              : ""}
                          </td>
                          <td className="px-4 py-2">
                            <button
                              className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-700 disabled:opacity-50"
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
              <h2 className="mb-4 text-xl font-semibold text-gray-700">
                Event Management
              </h2>
              {profile?.id && <EventManagement profileId={profile.id} />}
            </section>
          )}

          {activeTab === "settings" && (
            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-700">
                Settings
              </h2>
              <div className="rounded bg-white p-6 shadow">
                <p className="text-gray-500">
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
