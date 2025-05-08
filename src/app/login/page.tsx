"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (data.success) {
      router.push("/bookings");
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-md"
      >
        <h2 className="mb-6 text-center text-2xl font-bold">Login</h2>
        {error && (
          <p className="mb-4 text-center text-sm text-red-500">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-4 w-full rounded-xl border border-gray-300 p-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mb-6 w-full rounded-xl border border-gray-300 p-3"
        />

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 py-3 text-white hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
