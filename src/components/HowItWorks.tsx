"use client";

import Link from "next/link";
import { Search, CalendarDays, Zap, Sparkles, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Discover Spaces",
    description:
      "Filter verified cyc walls, podcast lounges, soundstages, and mixing suites by location, gear inventory, and creator reviews.",
    icon: Search,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50 dark:bg-amber-950/40",
  },
  {
    step: "02",
    title: "Select Shoot Hours",
    description:
      "Inspect live calendar availability, choose precise hourly blocks, and review transparent breakdown rates with zero surprise fees.",
    icon: CalendarDays,
    iconColor: "text-sky-500",
    iconBg: "bg-sky-50 dark:bg-sky-950/40",
  },
  {
    step: "03",
    title: "Book Instantly",
    description:
      "Lock in your reservation with double-booking collision prevention, instant host confirmation, and downloadable invoice vouchers.",
    icon: Zap,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
  },
  {
    step: "04",
    title: "Create & Produce",
    description:
      "Arrive at the stage with verified access codes, plug into ready-calibrated equipment grids, and bring your vision to life.",
    icon: Sparkles,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-50 dark:bg-purple-950/40",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
            Frictionless Booking
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            How StudioSpace Works
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-500 dark:text-neutral-400">
            Four simple steps from pre-production concept to rolling camera in world-class creative facilities.
          </p>
        </div>

        {/* 4-Step Cards Layout */}
        <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="relative flex items-center">
                <div className="w-full h-full flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-7 shadow-sm hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/60 transition-all duration-300">
                  <div>
                    {/* Header: Icon & Step Number */}
                    <div className="flex items-center justify-between">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.iconBg} ${item.iconColor}`}>
                        <Icon className="h-6 w-6 stroke-[2]" />
                      </div>
                      <span className="text-2xl font-black text-neutral-300 dark:text-neutral-700 select-none">
                        {item.step}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="mt-6 text-lg font-bold text-neutral-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Connecting Arrow between cards (Desktop view) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-neutral-300 dark:text-neutral-700 pointer-events-none">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/studios"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-8 py-3.5 text-sm font-bold text-neutral-950 shadow-lg shadow-amber-500/25 hover:bg-amber-400 active:scale-95 transition-all"
          >
            Start Exploring Workspaces
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}