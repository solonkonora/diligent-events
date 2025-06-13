"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const router = useRouter();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    toast.loading("Sending reset email...", { id: "reset" });

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    });

    if (!error) {
      setSent(true);
      toast.success("Password reset email sent!", { id: "reset" });
    } else {
      setError(error.message);
      toast.error(error.message, { id: "reset" });
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-200 px-4">
      <form
        onSubmit={handleReset}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-md"
      >
        <h2 className="mb-4 text-center text-2xl font-bold text-blue-600">
          Reset Password
        </h2>
        {error && (
          <p className="mb-4 text-center text-sm text-red-500">{error}</p>
        )}
        {sent ? (
          <p className="mb-4 text-center text-green-600">
            Check your email for a reset link.
          </p>
        ) : (
          <>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mb-4 w-full rounded-xl border border-gray-300 p-3 text-gray-400"
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-3 text-white hover:bg-blue-700"
            >
              Send Reset Link
            </button>
          </>
        )}
        <div className="mt-6 text-center text-sm text-gray-600">
          <button
            type="button"
            onClick={() => router.push("/auth/login")}
            className="text-blue-600 underline hover:text-blue-800"
          >
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
}
