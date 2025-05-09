"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage("A password reset link has been sent to your email.");
        setEmail("");
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to send reset email. Please try again later.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleResetPassword}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-md"
      >
        <h2 className="mb-4 text-center text-2xl font-bold text-blue-600">
          Reset Password
        </h2>
        <p className="mb-4 text-center text-gray-500">
          Enter your email to receive a reset link.
        </p>

        {message && (
          <p className="mb-4 text-center text-sm text-green-600">{message}</p>
        )}
        {error && (
          <p className="mb-4 text-center text-sm text-red-500">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-6 w-full rounded-xl border border-gray-300 p-3"
        />

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 py-3 text-white hover:bg-blue-700"
        >
          Send Reset Link
        </button>

        <div className="mt-6 text-center text-sm text-gray-600">
          Remembered your password?{" "}
          <button
            type="button"
            onClick={() => router.push("/auth/login")}
            className="text-blue-600 underline hover:text-blue-800"
          >
            Go back to login
          </button>
        </div>
      </form>
    </div>
  );
}
