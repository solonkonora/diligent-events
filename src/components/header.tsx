"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import ThemeSwitcher from "./theme-switcher";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b px-6 backdrop-blur">
    <header className="sticky top-0 z-50 w-full border-b bg-blue-800 px-6 text-white backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <img
              src="/assets/images/logo.png"
              alt="HostessAgency Logo"
              className="h-16 w-auto"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium transition-colors hover:text-blue-600"
          >
            About Us
          </Link>
          <Link
            href="/services"
            className="text-sm font-medium transition-colors hover:text-blue-600"
          >
            Services
          </Link>
          <Link
            href="/gallery"
            className="text-sm font-medium transition-colors hover:text-blue-600"
          >
            Events
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium transition-colors hover:text-blue-600"
          >
            Contact
          </Link>

          <Link
            href="/auth/login"
            className="rounded border px-4 py-2 text-sm font-medium transition-colors hover:text-orange-600"
          >
            Signup
          </Link>

          <ThemeSwitcher />
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5 text-black" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="mt-8 flex flex-col gap-4">
              <Link
                href="/"
                className="text-lg font-medium transition-colors hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-lg font-medium transition-colors hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/services"
                className="text-lg font-medium transition-colors hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/gallery"
                className="text-lg font-medium transition-colors hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Events
              </Link>
              <Link
                href="/contact"
                className="text-lg font-medium transition-colors hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>

              <ThemeSwitcher />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
