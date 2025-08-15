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
    <header className="border-border bg-background text-foreground sticky top-0 z-50 w-full border-b px-0 backdrop-blur md:px-6">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-0">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <img
              src="/assets/images/logo.png"
              alt="HostessAgency Logo"
              className="h-16 w-auto"
            />
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-4 md:flex lg:gap-6">
          <Link
            href="/"
            className="hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/40 rounded bg-transparent px-2 py-1 text-sm font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/40 rounded bg-transparent px-2 py-1 text-sm font-medium transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/services"
            className="hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/40 rounded bg-transparent px-2 py-1 text-sm font-medium transition-colors"
          >
            Services
          </Link>
          <Link
            href="/gallery"
            className="hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/40 rounded bg-transparent px-2 py-1 text-sm font-medium transition-colors"
          >
            Events
          </Link>
          <Link
            href="/contact"
            className="hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/40 rounded bg-transparent px-2 py-1 text-sm font-medium transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/auth/signup"
            className="border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground dark:bg-primary dark:text-primary-foreground rounded border px-4 py-2 text-sm font-medium transition-colors"
          >
            SignUp
          </Link>
          <Link
            href="/auth/login"
            className="border-secondary bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:text-secondary-foreground dark:bg-secondary dark:text-secondary-foreground rounded border px-4 py-2 text-sm font-medium transition-colors"
          >
            Login
          </Link>
          <div className="ml-2 flex items-center">
            <ThemeSwitcher />
          </div>
        </nav>

        {/* Mobile navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="text-foreground h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="mt-8 ml-8 flex flex-col gap-4">
              <Link
                href="/"
                className="hover:text-accent-foreground hover:bg-accent dark:hover:bg-accent/40 text-lg font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="hover:text-accent-foreground hover:bg-accent dark:hover:bg-accent/40 text-lg font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/services"
                className="hover:text-accent-foreground hover:bg-accent dark:hover:bg-accent/40 text-lg font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/gallery"
                className="hover:text-accent-foreground hover:bg-accent dark:hover:bg-accent/40 text-lg font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Events
              </Link>
              <Link
                href="/contact"
                className="hover:text-accent-foreground hover:bg-accent dark:hover:bg-accent/40 text-lg font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/auth/login"
                className="hover:text-accent-foreground hover:bg-accent dark:hover:bg-accent/40 text-lg font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="hover:text-accent-foreground hover:bg-accent dark:hover:bg-accent/40 text-lg font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Signup
              </Link>
              <div className="mt-4 flex items-center">
                <ThemeSwitcher />
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
