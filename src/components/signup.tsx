"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signupSchema } from "@/lib/zod";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/bookings";

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

    const { error: supabaseError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role: "user" }, // Add any additional user metadata here
      },
    });

    if (!supabaseError) {
      toast.success("Signup successful! Check your email to confirm.", {
        id: "signup",
      });
      setEmailSent(true);
    } else {
      setError(supabaseError.message);
      toast.error(supabaseError.message, { id: "signup" });
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
        </div>
      </form>
    </div>
  );
}
