"use client";

import { useContext, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loginSchema } from "@/lib/zod";
import { AppContent } from "@/lib/context";
import toast from "react-hot-toast";

export default function LoginPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { backendUrl, setIsLoggedin } = useContext(AppContent);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/books";

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
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Login successful!", { id: "login" });
        setIsLoggedin(true);
        router.push(redirect);
      } else {
        setError(data.message);
        toast.error(data.message, { id: "login" });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
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
      </form>
    </div>
  );
}
