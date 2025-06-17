"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

export function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  type Profile = {
    id: string;
    full_name: string;
    role: string;
  };

  const [profile, setProfile] = useState<Profile | null>(null);

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
        router.push("/client"); // Redirect to client dashboard if not admin
      } else {
        setProfile(profile);
        setLoading(false);
      }
    };
    checkRoleAndFetchProfile();
  }, [router]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <div>Welcome, {profile?.full_name} (Admin)</div>
      {/* ...rest of your admin dashboard... */}
    </div>
  );
}
