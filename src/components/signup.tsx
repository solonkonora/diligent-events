"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signupSchema } from "@/lib/zod";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/client";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = signupSchema.safeParse({ name, email, password });
    if (!result.success) {
      setError(result.error.errors[0].message);
      toast.error(result.error.errors[0].message);
      return;
    }

    toast.loading("Signing up...", { id: "signup" });

    const { data, error: supabaseError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role: "client" }, // or "client"
      },
    });

    if (!supabaseError && data?.user) {
      toast.success("Signup successful! Check your email to confirm.", {
        id: "signup",
      });
      setEmailSent(true);
    } else {
      setError(supabaseError?.message || "Signup failed");
      toast.error(supabaseError?.message || "Signup failed", { id: "signup" });
    }
  };

  const goToLogin = () => {
    router.push(`/auth/login?redirect=${redirect}`);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-200 px-4">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-md"
      >
        <h2 className="mb-4 text-center text-3xl font-bold text-blue-600">
          Create Account
        </h2>
        {error && (
          <p className="mb-4 text-center text-sm text-red-500">{error}</p>
        )}
        {emailSent ? (
          <p className="mb-4 text-center text-green-600">
            Signup successful! Please check your email to confirm your account
            before logging in.
          </p>
        ) : (
          <>
            <p className="mb-4 cursor-pointer text-center text-gray-400">
              create your account
            </p>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mb-4 w-full rounded-xl border border-gray-300 p-3 text-gray-400"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mb-4 w-full rounded-xl border border-gray-300 p-3 text-gray-400"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mb-6 w-full rounded-xl border border-gray-300 p-3 text-gray-400"
            />

            <button
              type="submit"
              className="w-full rounded-xl bg-green-600 py-3 text-white hover:bg-green-700"
            >
              Sign Up
            </button>
          </>
        )}
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={goToLogin}
            className="text-blue-600 underline hover:text-blue-800"
          >
            Log in
          </button>
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
            Sign up with Google
          </button>
        </div>
      </form>
    </div>
  );
}
