"use client";

import React, { useContext } from "react";
import { AppContent } from "@/lib/context";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

export function AdminDashboard() {
  const { setIsLoggedin } = useContext(AppContent);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/bookings";

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Logout failed: " + error.message);
    } else {
      toast.success("Logged out successfully!");
      setIsLoggedin(false);
      router.push(redirect);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <div>admin dashboard...</div>
      <button onClick={handleLogout} className="btn btn-primary">
        Logout
      </button>
    </div>
  );
}
