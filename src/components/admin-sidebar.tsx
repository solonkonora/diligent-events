import React from "react";
import ThemeSwitcher from "./theme-switcher";

interface AdminSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  activeTab,
  setActiveTab,
}) => {
  // responsive sidebar: overlay on mobile/tablet, static on desktop
  return (
    <>
      {/* Overlay for mobile/tablet */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity lg:hidden ${sidebarOpen ? "block" : "hidden"}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />
      {/* Sidebar */}
      <aside
        className={`bg-primary text-primary-foreground fixed inset-y-0 left-0 z-50 flex h-screen flex-col transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} w-64 lg:static lg:w-64 lg:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="flex h-20 items-center justify-between px-4">
          <h1 className="text-xl font-bold">Diligent Services</h1>
          {/* Close button for overlay mode */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="hover:bg-primary/80 rounded-full p-2 lg:hidden"
            aria-label="Close sidebar"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="mt-8 flex-1">
          <ul>
            <li>
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex w-full items-center rounded px-6 py-3 transition-colors ${
                  activeTab === "dashboard"
                    ? "bg-primary/80 text-primary-foreground"
                    : "hover:bg-primary/60 hover:text-primary-foreground"
                }`}
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
                <span className="ml-3">Dashboard</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("users")}
                className={`flex w-full items-center rounded px-6 py-3 transition-colors ${
                  activeTab === "users"
                    ? "bg-primary/80 text-primary-foreground"
                    : "hover:bg-primary/60 hover:text-primary-foreground"
                }`}
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
                <span className="ml-3">Users</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("events")}
                className={`flex w-full items-center rounded px-6 py-3 transition-colors ${
                  activeTab === "events"
                    ? "bg-primary/80 text-primary-foreground"
                    : "hover:bg-primary/60 hover:text-primary-foreground"
                }`}
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
                <span className="ml-3">Bookings</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("settings")}
                className={`flex w-full items-center rounded px-6 py-3 transition-colors ${
                  activeTab === "settings"
                    ? "bg-primary/80 text-primary-foreground"
                    : "hover:bg-primary/60 hover:text-primary-foreground"
                }`}
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
                <span className="ml-3">Settings</span>
              </button>
            </li>
          </ul>
        </nav>
        <div className="mt-auto mb-4 flex items-center justify-center">
          <ThemeSwitcher />
        </div>
        <div className="mb-4 flex items-center justify-center">
          <a
            href="/auth/logout"
            className="flex items-center gap-1 rounded px-3 py-2 text-sm font-semibold text-red-300 transition-colors hover:bg-blue-700 hover:text-red-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
              />
            </svg>
            <span className="hidden sm:inline">Logout</span>
          </a>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
