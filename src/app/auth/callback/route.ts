import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const error = requestUrl.searchParams.get("error");

  console.log("Server-side auth callback received:", {
    code: !!code,
    error,
    url: requestUrl.toString(),
  });

  // Handle OAuth errors
  if (error) {
    console.error("OAuth error received:", error);
    return NextResponse.redirect(
      `${requestUrl.origin}/auth/login?error=oauth_error&details=${error}`
    );
  }

  // Only handle authorization code flow on server-side
  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    try {
      console.log("Exchanging code for session...");
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("Error exchanging code for session:", error);
        return NextResponse.redirect(
          `${requestUrl.origin}/auth/login?error=oauth_error&details=${error.message}`
        );
      }

      console.log("OAuth exchange successful, user:", data.user?.email);
      return await handleUserRedirect(supabase, data.user, requestUrl.origin);
    } catch (error) {
      console.error("Error in OAuth callback:", error);
      return NextResponse.redirect(
        `${requestUrl.origin}/auth/login?error=oauth_error&details=callback_exception`
      );
    }
  }

  // No code - redirect to client-side page to handle fragment tokens
  console.log("No code received, redirecting to client-side callback page");
  return NextResponse.redirect(`${requestUrl.origin}/auth/callback-client`);
}

// Helper function to handle user profile and redirect
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleUserRedirect(supabase: any, user: any, origin: string) {
  if (!user) {
    return NextResponse.redirect(`${origin}/auth/login?error=no_user`);
  }

  console.log("Fetching user profile...");
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.error("Error fetching profile:", profileError);
    // Create profile if it doesn't exist
    const { error: insertError } = await supabase.from("profiles").insert({
      id: user.id,
      full_name: user.user_metadata?.full_name || user.email,
      role: "client",
    });

    if (insertError) {
      console.error("Error creating profile:", insertError);
    }
  }

  // Redirect based on role
  const userRole = profile?.role || "client";
  console.log("Redirecting user with role:", userRole);

  if (userRole === "admin") {
    return NextResponse.redirect(`${origin}/admin`);
  } else {
    return NextResponse.redirect(`${origin}/client`);
  }
}
