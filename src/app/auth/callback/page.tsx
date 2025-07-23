"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [hasProcessed, setHasProcessed] = useState(false);

  useEffect(() => {
    if (hasProcessed) return;
    setHasProcessed(true);

    const handleAuthCallback = async () => {
      try {
        console.log("Client-side callback page loaded");
        console.log("Full URL:", window.location.href);
        console.log("Hash:", window.location.hash);
        console.log("Search:", window.location.search);

        const hash = window.location.hash;
        if (!hash) {
          // No tokens in fragment, check session
          const {
            data: { session },
          } = await supabase.auth.getSession();
          if (session?.user) {
            const { data: profile } = await supabase
              .from("profiles")
              .select("role")
              .eq("id", session.user.id)
              .single();
            const userRole = profile?.role || "client";
            router.replace(userRole === "admin" ? "/admin" : "/client");
            return;
          } else {
            router.replace("/auth/login?error=no_session");
            return;
          }
        }

        // Parse tokens from fragment
        const urlParams = new URLSearchParams(hash.substring(1));
        const accessToken = urlParams.get("access_token");
        const refreshToken = urlParams.get("refresh_token");
        const error = urlParams.get("error");

        if (error) {
          router.replace(`/auth/login?error=oauth_error&details=${error}`);
          return;
        }

        if (accessToken) {
          // Set session
          const { data, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || "",
          });
          if (sessionError) {
            router.replace(
              `/auth/login?error=session_error&details=${sessionError.message}`
            );
            return;
          }
          if (data.user) {
            // Get profile and redirect
            const { data: profile, error: profileError } = await supabase
              .from("profiles")
              .select("role")
              .eq("id", data.user.id)
              .single();
            if (profileError) {
              await supabase.from("profiles").insert({
                id: data.user.id,
                full_name:
                  data.user.user_metadata?.full_name || data.user.email,
                role: "client",
              });
            }
            const userRole = profile?.role || "client";
            // Clean the URL to remove tokens
            window.history.replaceState({}, document.title, "/");
            router.replace(userRole === "admin" ? "/admin" : "/client");
            return;
          } else {
            router.replace("/auth/login?error=no_user");
            return;
          }
        } else {
          // No tokens, check for code param
          const urlSearchParams = new URLSearchParams(window.location.search);
          const code = urlSearchParams.get("code");
          if (code) {
            // Only redirect to /auth/callback if code is present
            window.location.href = `/auth/callback?code=${code}`;
            return;
          } else {
            router.replace("/auth/login?error=no_auth_data");
            return;
          }
        }
      } catch (error) {
        router.replace("/auth/login?error=callback_exception");
      }
    };
    handleAuthCallback();
  }, [router, hasProcessed]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
        <p className="text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
}
