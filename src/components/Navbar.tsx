"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Aperture,
  Moon,
  Sun,
  ChevronDown,
  PlusCircle,
  LayoutDashboard,
  Calendar,
  LogOut,
  FolderKanban,
  Menu,
  X,
} from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [userDropdown, setUserDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Authenticated User State (set to null to see unauthenticated state)
  const [user, setUser] = useState<UserProfile | null>({
    name: "Alex",
    email: "alex@studiospace.io",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  });

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Studios", href: "/studios" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "About Us", href: "/#about-us" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200/80 bg-white/95 backdrop-blur-md transition-colors dark:border-neutral-800 dark:bg-neutral-950/95">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        
        {/* 1. Brand Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 text-white shadow-md shadow-amber-500/20 transition-transform group-hover:scale-105">
            <Aperture className="h-6 w-6 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Studio<span className="text-amber-500">Space</span>
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
              Creative Marketplace
            </span>
          </div>
        </Link>

        {/* 2. Desktop Navigation with Active Indicator */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-sm font-medium transition-colors ${
                  isActive
                    ? "font-semibold text-amber-500"
                    : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-amber-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* 3. Right Controls (Theme Toggle & User Menu) */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 text-neutral-600 transition-all hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900"
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>

          {/* Conditional Rendering: Authenticated vs Unauthenticated */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-2.5 rounded-full border border-neutral-200 p-1 pr-3 transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700"
              >
                <div className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-amber-500/30">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={32}
                    height={32}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                  {user.name}
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-neutral-500" />
              </button>

              {/* User Dropdown Menu */}
              {userDropdown && (
                <>
                  {/* Backdrop overlay to close dropdown when clicking outside */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setUserDropdown(false)}
                  />

                  <div className="absolute right-0 z-50 mt-2 w-56 rounded-2xl border border-neutral-100 bg-white p-2 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900">
                    <div className="border-b border-neutral-100 px-3 py-2 dark:border-neutral-800">
                      <p className="text-xs font-semibold text-neutral-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="truncate text-[11px] text-neutral-400">
                        {user.email}
                      </p>
                    </div>

                    <div className="py-1 text-xs text-neutral-700 dark:text-neutral-200">
                      <Link
                        href="/dashboard"
                        onClick={() => setUserDropdown(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 transition hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      >
                        <LayoutDashboard className="h-4 w-4 text-neutral-400" />
                        Dashboard
                      </Link>

                      <Link
                        href="/add-studio"
                        onClick={() => setUserDropdown(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 transition hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      >
                        <PlusCircle className="h-4 w-4 text-neutral-400" />
                        Add New Studio
                      </Link>

                      <Link
                        href="/my-listings"
                        onClick={() => setUserDropdown(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 transition hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      >
                        <FolderKanban className="h-4 w-4 text-neutral-400" />
                        My Studio Listings
                      </Link>

                      <Link
                        href="/my-bookings"
                        onClick={() => setUserDropdown(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 transition hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      >
                        <Calendar className="h-4 w-4 text-neutral-400" />
                        My Bookings
                      </Link>
                    </div>

                    {/* Logout Button */}
                    <div className="border-t border-neutral-100 pt-1 dark:border-neutral-800">
                      <button
                        onClick={() => {
                          setUser(null);
                          setUserDropdown(false);
                        }}
                        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-rose-500 transition hover:bg-rose-50 dark:hover:bg-rose-950/30"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() =>
                  setUser({
                    name: "Alex",
                    email: "alex@studiospace.io",
                    avatar:
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
                  })
                }
                className="rounded-xl px-3 py-2 text-xs font-semibold text-neutral-700 transition hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
              >
                Log In
              </button>

              <Link
                href="/register"
                className="rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-neutral-950 shadow-md shadow-amber-500/20 transition hover:bg-amber-400"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 text-neutral-700 md:hidden dark:border-neutral-800 dark:text-neutral-300"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

        </div>
      </div>

      {/* 4. Mobile Responsive Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-neutral-200 bg-white px-6 py-4 md:hidden dark:border-neutral-800 dark:bg-neutral-950">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-medium ${
                  pathname === link.href ? "text-amber-500 font-semibold" : "text-neutral-600 dark:text-neutral-300"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}