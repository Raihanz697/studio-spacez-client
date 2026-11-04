"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const slides = [
  {
    id: 1,
    tagline: "NEXT-GEN CREATIVE STUDIOS",
    title: "Reserve Production Spaces Built for",
    highlight: "Visionary Creators",
    description:
      "Step into pre-rigged cyclorama soundstages, 4K multi-cam podcast lounges, and Dolby Atmos mixing suites across the continent.",
    primaryCta: "Explore All Studios",
    secondaryCta: "Host Your Space",
    bgImage:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    tagline: "CINEMATIC SOUNDSTAGES",
    title: "Acoustic Excellence & Sound Isolation for",
    highlight: "Top Producers",
    description:
      "Engineered acoustic control rooms with analog mixing desks, vintage vocal microphones, and dedicated live tracking booths.",
    primaryCta: "Find Sound Stages",
    secondaryCta: "List Your Studio",
    bgImage:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2074&auto=format&fit=crop",
  },
  {
    id: 3,
    tagline: "PHOTO CYC & NATURAL LIGHT",
    title: "Infinity Cyc Walls & Lighting Grids for",
    highlight: "High-Fashion Shoots",
    description:
      "High-ceiling warehouses equipped with Profoto strobe packs, continuous DMX lights, motorized backdrops, and dressing rooms.",
    primaryCta: "Browse Photography Stages",
    secondaryCta: "Earn with Your Loft",
    bgImage:
      "https://images.unsplash.com/photo-1520523839898-50712825e3a7?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);
  const nextSlide = () => setCurrent(current === slides.length - 1 ? 0 : current + 1);

  return (
    <section className="relative h-[680px] w-full overflow-hidden bg-neutral-950">
      {/* Background Slides with Zoom Transition */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <img
            src={slide.bgImage}
            alt={slide.title}
            className="h-full w-full object-cover object-center filter brightness-[0.45]"
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
        </div>
      ))}

      {/* Slide Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md hover:bg-black/60 transition"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md hover:bg-black/60 transition"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-8">
        <div className="max-w-2xl space-y-6">
          
          {/* Tagline Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold tracking-wider text-amber-400">
            <Sparkles className="h-3.5 w-3.5" />
            {slides[current].tagline}
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl leading-[1.12]">
            {slides[current].title}{" "}
            <span className="text-amber-500">{slides[current].highlight}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base text-neutral-300 sm:text-lg leading-relaxed">
            {slides[current].description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/studios"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-bold text-neutral-950 shadow-lg shadow-amber-500/25 hover:bg-amber-400 transition"
            >
              {slides[current].primaryCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/add-studio"
              className="inline-flex items-center rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/20 transition"
            >
              {slides[current].secondaryCta}
            </Link>
          </div>

        </div>
      </div>

      {/* Slider Pagination Bars */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === current ? "w-8 bg-amber-500" : "w-2.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}