"use client";

import Link from "next/link";
import { ShieldCheck, UserCheck, Wrench, Headphones } from "lucide-react";

const assurances = [
  {
    title: "$1,000,000 Host Liability Protection",
    description:
      "Comprehensive property and stage damage coverage backed by top-tier creative insurance underwriters for every booking.",
    icon: ShieldCheck,
  },
  {
    title: "Identity & Professional Verification",
    description:
      "Every studio host and booking creator undergoes rigorous ID and portfolio verification to ensure professional workspace safety.",
    icon: UserCheck,
  },
  {
    title: "Production Equipment Safeguard",
    description:
      "High-value cinema lenses, vintage microphones, and lighting grids are protected with itemized check-in/out protocols.",
    icon: Wrench,
  },
  {
    title: "24/7 Dedicated Production Concierge",
    description:
      "Direct on-call dispatch assistance for technical access, power hookups, acoustic calibration, and emergency reschedules.",
    icon: Headphones,
  },
];

export default function AboutUs() {
  return (
    <section id="about-us" className="py-24 bg-neutral-50/60 dark:bg-neutral-950/60 border-t border-neutral-100 dark:border-neutral-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column: Heading, Subtext & Action Buttons */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
              Trust, Safety & Peace of Mind
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl leading-[1.18]">
              Built on Uncompromising Protection for Both Hosts & Creators
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
              We understand creative production is unpredictable. StudioSpace provides enterprise-grade safety umbrellas, verified host guarantees, and around-the-clock technical support so you can focus entirely on craft.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/add-studio"
                className="inline-flex items-center justify-center rounded-xl bg-neutral-950 px-6 py-3.5 text-xs font-bold text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 transition"
              >
                Become a Verified Host
              </Link>
              <Link
                href="/studios"
                className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-6 py-3.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 transition"
              >
                Browse Protected Spaces
              </Link>
            </div>
          </div>

          {/* Right Column: 2x2 Bento Feature Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {assurances.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-neutral-200/80 bg-white p-7 shadow-sm hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/80 transition-all duration-300"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-500">
                    <Icon className="h-5 w-5 stroke-[2]" />
                  </div>
                  <h3 className="mt-5 text-sm font-bold text-neutral-900 dark:text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}