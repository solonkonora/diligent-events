"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "../../../auth";
import { handleSignOut } from "@/app/actions/authActions";

export default async function Navbar() {
  const session = await auth();
  console.log({ session });
  return (
    <nav className="flex items-center justify-between bg-white px-4 py-3 shadow-md">
      <Link href="/" className="text-xl font-bold">
        Auth.js
      </Link>
      {!session ? (
        <Link href="/auth/signin">
          <Button variant="default">Sign In</Button>
        </Link>
      ) : (
        <form action={handleSignOut}>
          <Button variant="default" type="submit">
            Sign Out
          </Button>
        </form>
      )}
    </nav>
  );
}
