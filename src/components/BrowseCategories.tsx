"use client";

import Link from "next/link";
import { Camera, Clapperboard, Mic2, Music, Palette, ArrowRight } from "lucide-react";

const categories = [
  {
    id: "photo-studios",
    name: "Photo Studios",
    description: "Cyclorama walls, natural daylight lofts, and profoto lighting setups.",
    spacesCount: "24+ Spaces",
    icon: Camera,
    iconColor: "text-sky-500",
    iconBg: "bg-sky-50 dark:bg-sky-950/40",
  },
  {
    id: "sound-stages",
    name: "Sound Stages",
    description: "Acoustic blackboxes, green screens, camlock power, and drive-in access.",
    spacesCount: "16+ Spaces",
    icon: Clapperboard,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-50 dark:bg-purple-950/40",
  },
  {
    id: "podcast-rooms",
    name: "Podcast Rooms",
    description: "Turnkey audio/video recording with multi-cam 4K switchers and Shure mics.",
    spacesCount: "19+ Spaces",
    icon: Mic2,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
  },
  {
    id: "music-suites",
    name: "Music Suites",
    description: "Dolby Atmos monitoring, analog consoles, vocal booths, and live rooms.",
    spacesCount: "14+ Spaces",
    icon: Music,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50 dark:bg-amber-950/40",
  },
  {
    id: "art-workshops",
    name: "Art Workshops",
    description: "Ceramic kilns, pottery wheels, printmaking presses, and raw maker space.",
    spacesCount: "11+ Spaces",
    icon: Palette,
    iconColor: "text-rose-500",
    iconBg: "bg-rose-50 dark:bg-rose-950/40",
  },
];

export default function BrowseCategories() {
  return (
    <section className="py-20 bg-neutral-50/60 dark:bg-neutral-950/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
              Curated Production Categories
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              Browse by Creative Discipline
            </h2>
          </div>
          <Link
            href="/studios"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-500 transition-colors"
          >
            Explore All Workspaces
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 5-Column Responsive Cards Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <Link
                key={cat.id}
                href={`/studios?category=${encodeURIComponent(cat.name)}`}
                className="group relative flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm hover:shadow-md hover:border-amber-500/40 dark:border-neutral-800 dark:bg-neutral-900/80 transition-all duration-300"
              >
                <div>
                  {/* Soft Tinted Icon Container */}
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${cat.iconBg} ${cat.iconColor} transition-transform duration-300 group-hover:scale-110`}>
                    <IconComponent className="h-6 w-6 stroke-[2]" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="mt-5 text-base font-bold text-neutral-900 dark:text-white group-hover:text-amber-500 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                    {cat.description}
                  </p>
                </div>

                {/* Bottom Spaces Count and Arrow */}
                <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-4 dark:border-neutral-800">
                  <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500">
                    {cat.spacesCount}
                  </span>
                  <ArrowRight className="h-4 w-4 text-neutral-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-amber-500" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}