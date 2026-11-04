"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Aperture, 
  ShieldCheck, 
  Sparkles, 
  HeartHandshake, 
  Mail, 
  ArrowRight 
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="w-full border-t border-neutral-200/80 bg-white text-neutral-600 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400">
      
      {/* 1. Value Proposition Strip */}
      <div className="border-b border-neutral-100 dark:border-neutral-800/80">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            
            <div className="flex items-center gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-500 dark:bg-amber-950/40">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-neutral-900 dark:text-white">Host Guarantee</h4>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">Comprehensive liability & gear protection</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-500 dark:bg-amber-950/40">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-neutral-900 dark:text-white">Verified Workspaces</h4>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">Inspected acoustics, power, & gear</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-500 dark:bg-amber-950/40">
                <HeartHandshake className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-neutral-900 dark:text-white">Creator First</h4>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">Zero hidden fees, transparent booking</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2. Main Footer Grid */}
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-5 space-y-5">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-white shadow-sm shadow-amber-500/20">
                <Aperture className="h-5 w-5 stroke-[2.2]" />
              </div>
              <span className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
                Studio<span className="text-amber-500">Space</span>
              </span>
            </Link>

            <p className="max-w-sm text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              StudioSpace is the premier peer-to-peer workspace sharing marketplace connecting filmmakers, photographers, musicians, and creators with world-class production facilities.
            </p>

            {/* Newsletter Input Form */}
            <div className="pt-2">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-200">
                Join Our Creator Newsletter
              </span>
              <form onSubmit={handleSubscribe} className="mt-2.5 flex max-w-sm items-center gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter creator email..."
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 pl-9 pr-3 text-xs text-neutral-900 placeholder-neutral-400 focus:border-amber-500 focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-amber-500"
                  />
                </div>
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-neutral-950 hover:bg-amber-400 active:scale-95 transition"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
              {subscribed && (
                <p className="mt-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  Thanks for subscribing to our production drops!
                </p>
              )}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/studios" className="hover:text-amber-500 transition">
                  All Workspaces
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:text-amber-500 transition">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/add-studio" className="hover:text-amber-500 transition">
                  Host Your Studio
                </Link>
              </li>
              <li>
                <Link href="/my-bookings" className="hover:text-amber-500 transition">
                  Booking History
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/studios?category=Photo%20Studios" className="hover:text-amber-500 transition">
                  Photo Studios
                </Link>
              </li>
              <li>
                <Link href="/studios?category=Sound%20Stages" className="hover:text-amber-500 transition">
                  Cinema & Sound Stages
                </Link>
              </li>
              <li>
                <Link href="/studios?category=Podcast%20Rooms" className="hover:text-amber-500 transition">
                  Podcast Lounges
                </Link>
              </li>
              <li>
                <Link href="/studios?category=Music%20Suites" className="hover:text-amber-500 transition">
                  Music & Dolby Suites
                </Link>
              </li>
              <li>
                <Link href="/studios?category=Art%20Workshops" className="hover:text-amber-500 transition">
                  Art & Ceramic Workshops
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Icons (Inline SVGs to prevent missing export errors) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              Connect With Us
            </h4>
            
            <div className="flex items-center gap-2 pt-1">
              {/* Official X Logo */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (formerly Twitter)"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-900 hover:text-neutral-950 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-neutral-200 dark:hover:text-white transition"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram SVG */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-rose-500 hover:text-rose-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-rose-400 dark:hover:text-rose-400 transition"
              >
                <svg className="h-4 w-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>

              {/* YouTube SVG */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-red-600 hover:text-red-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-red-500 dark:hover:text-red-500 transition"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>

            <p className="pt-2 text-[11px] leading-relaxed text-neutral-400 dark:text-neutral-500">
              Need assistance? Email support: <br />
              <span className="font-semibold text-neutral-600 dark:text-neutral-300">support@studiospace.io</span>
            </p>
          </div>

        </div>
      </div>

      {/* 3. Bottom Legal Notice */}
      <div className="border-t border-neutral-100 py-6 dark:border-neutral-800/80">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-[11px] text-neutral-400 sm:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} StudioSpace Platform Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-neutral-600 dark:text-neutral-300 transition">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-neutral-600 dark:text-neutral-300 transition">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-neutral-600 dark:text-neutral-300 transition">
              Security Protocol
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
}