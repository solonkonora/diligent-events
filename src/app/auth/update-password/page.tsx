"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    toast.loading("Updating password...", { id: "update" });
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(error.message);
      toast.error(error.message, { id: "update" });
    } else {
      setSuccess(true);
      toast.success("Password updated! Redirecting to login...", {
        id: "update",
      });
      setTimeout(() => router.replace("/auth/login"), 2000);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-200 px-4">
      <form
        onSubmit={handleUpdate}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-md"
      >
        <h2 className="mb-4 text-center text-2xl font-bold text-blue-600">
          Set New Password
        </h2>
        {error && (
          <p className="mb-4 text-center text-sm text-red-500">{error}</p>
        )}
        {success ? (
          <p className="mb-4 text-center text-green-600">
            Password updated! Redirecting to login...
          </p>
        ) : (
          <>
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mb-4 w-full rounded-xl border border-gray-300 p-3 text-gray-400"
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-3 text-white hover:bg-blue-700"
            >
              Update Password
            </button>
          </>
        )}
      </form>
    </div>
  );
}
