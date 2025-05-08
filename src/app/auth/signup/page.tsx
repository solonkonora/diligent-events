"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signupSchema } from "@/lib/zod";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/bookings";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = signupSchema.safeParse({ email, password });
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    const res = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (data.success) {
      router.push(redirect);
    } else {
      setError(data.message);
    }
  };

  const goToLogin = () => {
    router.push(`/auth/login?redirect=${redirect}`);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-md"
      >
        <h2 className="mb-6 text-center text-3xl font-bold text-blue-600">
          SignUp
        </h2>
        {error && (
          <p className="mb-4 text-center text-sm text-red-500">{error}</p>
        )}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mb-4 w-full rounded-xl border border-gray-300 p-3 text-gray-400"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-4 w-full rounded-xl border border-gray-300 p-3 text-gray-400"
        />

        <input
          type="password"
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
