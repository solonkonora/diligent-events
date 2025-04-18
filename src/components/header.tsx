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
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b px-6 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl font-bold text-blue-800">
            Hostess<span className="text-orange-500">Agency</span>
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
            href="/events"
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

          <ThemeSwitcher />
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
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
                href="/events"
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
