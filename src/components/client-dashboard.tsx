// Protect Client Dashboard
// -check if the user is logged in (using your context).
// -check the user's role (from user_metadata or your profiles table).
// -redirect if not authorized.

"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppContent } from "@/lib/context";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

export function ClientDashboard() {
  const { isLoggedin } = useContext(AppContent);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkRole = async () => {
      if (!isLoggedin) {
        router.push("/auth/login");
        return;
      }
      const { data } = await supabase.auth.getUser();
      const role = data.user?.user_metadata?.role;
      if (role !== "user" && role !== "client") {
        toast.error("Unauthorized");
        router.push("/auth/login");
      } else {
        setLoading(false);
      }
    };
    checkRole();
  }, [isLoggedin, router]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <div>client dashboard...</div>
      {/* ...rest of your client dashboard... */}
    </div>
  );
}
