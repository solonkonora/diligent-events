"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

export default function ClientDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  type Profile = {
    id: string;
    full_name: string;
    role: string;
  };
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const checkSessionAndProfile = async () => {
      // Wait for Supabase to initialize session
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        // Wait a bit and try again (handles OAuth session propagation delay)
        setTimeout(checkSessionAndProfile, 500);
        return;
      }
      // Fetch profile
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
      }
    };
    checkSessionAndProfile();
  }, [router]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      Welcome, {profile?.full_name} (Client)
      {/* ...rest of your dashboard... */}
    </div>
  );
}
