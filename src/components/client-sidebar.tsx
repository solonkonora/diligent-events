import React from "react";

interface SidebarNavProps {
  sidebarOpen: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setSidebarOpen: (open: boolean) => void;
}

const SidebarNav: React.FC<SidebarNavProps> = ({
  sidebarOpen,
  activeTab,
  setActiveTab,
  setSidebarOpen,
}) => (
  <div
    className={`${
      sidebarOpen ? "w-64" : "w-20"
    } bg-blue-800 text-white transition-all duration-300 ease-in-out`}
  >
    <div className="flex h-20 items-center justify-between px-4">
      <h1 className={`${sidebarOpen ? "block" : "hidden"} text-xl font-bold`}>
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
            className={`flex w-full items-center px-6 py-3 ${
              activeTab === "dashboard" ? "bg-blue-900" : "hover:bg-blue-700"
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
            {sidebarOpen && <span className="ml-3">Dashboard</span>}
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`flex w-full items-center px-6 py-3 ${
              activeTab === "bookings" ? "bg-blue-900" : "hover:bg-blue-700"
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
            {sidebarOpen && <span className="ml-3">My Events</span>}
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab("newBooking")}
            className={`flex w-full items-center px-6 py-3 ${
              activeTab === "newBooking" ? "bg-blue-900" : "hover:bg-blue-700"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            {sidebarOpen && <span className="ml-3">New Booking</span>}
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex w-full items-center px-6 py-3 ${
              activeTab === "profile" ? "bg-blue-900" : "hover:bg-blue-700"
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            {sidebarOpen && <span className="ml-3">My Profile</span>}
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab("help")}
            className={`flex w-full items-center px-6 py-3 ${
              activeTab === "help" ? "bg-blue-900" : "hover:bg-blue-700"
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
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {sidebarOpen && <span className="ml-3">Help & Support</span>}
          </button>
        </li>
      </ul>
    </nav>
  </div>
);

export default SidebarNav;
