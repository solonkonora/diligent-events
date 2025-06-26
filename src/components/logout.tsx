"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error("Logout failed: " + error.message);
      } else {
        toast.success("Logged out successfully!");
        router.push("/auth/login");
      }
    };
    logout();
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <span className="text-gray-500">Logging out...</span>
    </div>
  );
}
