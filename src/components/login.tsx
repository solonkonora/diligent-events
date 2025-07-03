"use client";

import { useContext, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loginSchema } from "@/lib/zod";
import { AppContent } from "@/lib/context";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const { setIsLoggedin } = useContext(AppContent);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/client";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const message = result.error.errors[0].message;
      setError(message);
      toast.error(message);
      return;
    }

    toast.loading("Logging in...", { id: "login" });

    try {
      const { data, error: supabaseError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (!supabaseError) {
        // Fetch user profile from profiles table
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();

          setIsLoggedin(true);

          if (profile?.role === "admin") {
            router.push("/admin");
          } else {
            router.push("/client");
          }

          toast.success("Login successful!", { id: "login" });
        } else {
          setError("User not found after login.");
          toast.error("User not found after login.", { id: "login" });
        }
      } else {
        setError(supabaseError.message);
        toast.error(supabaseError.message, { id: "login" });
      }
    } catch {
      toast.error("An error occurred. Please try again.", { id: "login" });
    }
  };

  const goToSignup = () => {
    router.push(`/auth/signup?redirect=${redirect}`);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-200 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-md"
      >
        <h2 className="mb-4 text-center text-3xl font-bold text-blue-600">
          Login
        </h2>
        <p className="mb-4 cursor-pointer text-center text-gray-400">
          login to your account
        </p>

        {error && (
          <p className="mb-4 text-center text-sm text-red-500">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-4 w-full rounded-xl border border-gray-300 p-3 text-black"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mb-6 w-full rounded-xl border border-gray-300 p-3 text-black"
        />

        <p
          onClick={() => router.push("/auth/reset-password")}
          className="mb-6 cursor-pointer text-gray-400"
        >
          Forgot password?
        </p>

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 py-3 text-white hover:bg-blue-700"
        >
          Login
        </button>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={goToSignup}
            className="text-blue-600 underline hover:text-blue-800"
          >
            Sign up
          </button>
        </div>
        <div className="my-4 flex items-center">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-sm text-gray-400">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <button
          type="button"
          onClick={async () => {
            const { error } = await supabase.auth.signInWithOAuth({
              provider: "google",
              options: {
                redirectTo: window.location.origin + "/client",
              },
            });
            if (error) {
              toast.error(error.message);
            }
          }}
          className="mt-4 mb-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-300 py-3 text-black hover:bg-red-700"
        >
          <svg width="20" height="20" viewBox="0 0 48 48">
            <g>
              <path
                fill="#4285F4"
                d="M44.5 20H24v8.5h11.7C34.1 33.1 29.6 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.4l6.4-6.4C34.1 5.1 29.3 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z"
              />
              <path
                fill="#34A853"
                d="M6.3 14.7l7 5.1C15.2 17.1 19.2 14 24 14c2.7 0 5.2.9 7.2 2.4l6.4-6.4C34.1 5.1 29.3 3 24 3 15.7 3 8.6 8.6 6.3 14.7z"
              />
              <path
                fill="#FBBC05"
                d="M24 43c5.3 0 10.1-1.7 13.8-4.7l-6.4-5.2C29.2 35.1 26.7 36 24 36c-5.6 0-10.1-2.9-11.7-7.5l-7 5.4C8.6 39.4 15.7 43 24 43z"
              />
              <path
                fill="#EA4335"
                d="M44.5 20H24v8.5h11.7c-1.2 3.2-4.1 5.5-7.7 5.5-4.6 0-8.4-3.8-8.4-8.5s3.8-8.5 8.4-8.5c2.1 0 4 .7 5.5 2.1l6.6-6.6C34.1 5.1 29.3 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z"
              />
            </g>
          </svg>
          Continue with Google
        </button>
      </form>
    </div>
  );
}
