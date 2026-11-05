"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  Search,
  MapPin,
  Star,
  SlidersHorizontal,
  ArrowRight,
  Sparkles,
  Loader2,
} from "lucide-react";

const CATEGORIES = ["All", "Photography", "Music", "Dance", "Podcast", "Art"];

export default function StudiosPage() {
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    async function loadStudios() {
      try {
        const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}`;
        const res = await fetch(`${serverUrl}/studios`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setStudios(data);
          }
        }
      } catch (err) {
        console.error("Backend fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStudios();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category !== "All") {
      toast.success(`Showing ${category} studios`);
    }
  };

  const filteredStudios = useMemo(() => {
    return studios
      .filter((studio) => {
        const matchesCategory =
          selectedCategory === "All" ||
          studio.category?.toLowerCase() === selectedCategory.toLowerCase();

        const matchesSearch =
          studio.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          studio.location?.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return (a.pricePerHour || 0) - (b.pricePerHour || 0);
        if (sortBy === "price-high") return (b.pricePerHour || 0) - (a.pricePerHour || 0);
        if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
        return 0;
      });
  }, [studios, searchTerm, selectedCategory, sortBy]);

  return (
    <div className="w-full min-h-screen bg-neutral-50/50 py-10 px-4 sm:px-6 lg:px-8 dark:bg-neutral-950 transition-colors">
      <div className="mx-auto max-w-7xl">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              Verified Workspaces
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              Explore Studios
            </h1>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 max-w-xl">
              Book professionally equipped creative spaces, photography lofts, podcast rooms, and soundstages by the hour.
            </p>
          </div>

          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Showing <span className="text-amber-500 font-bold">{filteredStudios.length}</span> spaces
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mb-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by studio name or location..."
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 py-2.5 pl-10 pr-4 text-sm text-neutral-900 placeholder-neutral-400 focus:border-amber-500 focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-amber-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-amber-500 text-neutral-950 shadow-sm shadow-amber-500/20"
                    : "border border-neutral-200 bg-neutral-50 text-neutral-600 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-neutral-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-neutral-200 bg-neutral-50/50 py-2.5 px-3 text-xs font-semibold text-neutral-700 focus:border-amber-500 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300 dark:focus:border-amber-500"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Studios Grid */}
        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
          </div>
        ) : filteredStudios.length === 0 ? (
          <div className="py-20 text-center rounded-3xl border border-dashed border-neutral-300 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/40">
            <h3 className="text-base font-bold text-neutral-800 dark:text-neutral-200">
              No studios match your filter
            </h3>
            <p className="mt-1 text-xs text-neutral-400">
              Try searching for different keywords or explore other categories.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStudios.map((studio) => (
              <div
                key={studio._id}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-neutral-200/80 bg-white shadow-sm hover:shadow-xl hover:shadow-neutral-200/50 transition-all dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:shadow-none"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                  <img
                    src={studio.image}
                    alt={studio.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 rounded-lg bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold text-white">
                    {studio.category}
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1 rounded-lg bg-white/90 backdrop-blur-md px-2 py-1 text-[11px] font-bold text-neutral-900 shadow-sm dark:bg-neutral-950/90 dark:text-white">
                    <Star className="h-3 w-3 fill-amber-400 stroke-amber-400" />
                    <span>{studio.rating || "5.0"}</span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-2">
                    <MapPin className="h-3.5 w-3.5 text-amber-500" />
                    <span className="truncate">{studio.location}</span>
                  </div>

                  <h3 className="text-base font-bold text-neutral-900 group-hover:text-amber-500 dark:text-white transition-colors">
                    {studio.name}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {studio.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4 dark:border-neutral-800">
                    <div>
                      <span className="text-lg font-black text-neutral-900 dark:text-white">
                        ${studio.pricePerHour}
                      </span>
                      <span className="text-[11px] text-neutral-400 font-medium"> / hour</span>
                    </div>

                    <Link
                      href={`/studios/${studio._id}`}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500/10 px-3.5 py-2 text-xs font-bold text-amber-600 hover:bg-amber-500 hover:text-neutral-950 transition-all dark:bg-amber-500/20 dark:text-amber-400 dark:hover:bg-amber-500 dark:hover:text-neutral-950"
                    >
                      View Details
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}