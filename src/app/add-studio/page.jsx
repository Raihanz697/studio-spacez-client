"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Aperture,
  Building2,
  DollarSign,
  MapPin,
  Image as ImageIcon,
  FileText,
  Layers,
  ArrowRight,
  Loader2,
  Users,
  ShieldCheck,
  CheckSquare,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const CATEGORIES = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop & Art",
  "Dance & Rehearsal",
];

const AVAILABLE_AMENITIES = [
  "Cyclorama Wall",
  "Soundproofing",
  "DMX Lighting Grid",
  "High-Speed Wi-Fi",
  "Air Conditioning",
  "Dressing & Makeup Room",
  "Audio Interface & Mics",
  "Prop Selection",
  "Freight Elevator",
  "Free Parking",
];

export default function AddStudioPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  // ১. Private Route Guard: আন-অথেন্টিকেটেড ইউজার সরাসরি ঢুকলে লগইনে রিডাইরেক্ট করবে
  useEffect(() => {
    if (!isPending && !user) {
      toast.error("Please login to list a new studio workspace!");
      router.push("/login?callbackUrl=/add-studio");
    }
  }, [isPending, user, router]);

  // Amenity Checkbox টগল হ্যান্ডলার
  const handleAmenityToggle = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  // লোডিং স্টেট
  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
      </div>
    );
  }

  // ইউজার না থাকলে রেন্ডার হবে না
  if (!user) return null;

  // ফর্ম সাবমিট
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const studioData = {
      name: formData.get("name")?.trim(),
      category: formData.get("category"),
      location: formData.get("location")?.trim(),
      pricePerHour: Number(formData.get("pricePerHour")),
      deposit: Number(formData.get("deposit")) || 100,
      maxCrew: Number(formData.get("maxCrew")) || 15,
      image: formData.get("image")?.trim(),
      description: formData.get("description")?.trim(),
      amenities: selectedAmenities,
      rating: 5.0,
      reviewsCount: 0,
      createdAt: new Date().toISOString(),
      // হোস্ট ইনফো (সেশন থেকে অটোমেটিক যুক্ত হবে)
      host: {
        name: user?.name || "Verified Host",
        email: user?.email,
        image: user?.image || null,
      },
      ownerEmail: user?.email, // my-listings এ ফিল্টার করার জন্য
    };

    try {
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";
      const response = await fetch(`${serverUrl}/studios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studioData),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error(err?.message || "Failed to list studio");
      }

      toast.success("Studio published successfully!");
      form.reset();
      setImageUrl("");
      setSelectedAmenities([]);

      // রিকোয়ারমেন্ট অনুযায়ী সাবমিশনের পর /my-listings এ যাবে
      router.push("/my-listings");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to create studio. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full min-h-screen bg-neutral-50/50 py-12 px-4 sm:px-6 lg:px-8 dark:bg-neutral-950 transition-colors">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 text-neutral-950 shadow-md shadow-amber-500/20 mb-3">
            <Aperture className="h-6 w-6 stroke-[2.2]" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            List a New Creative Studio
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            Publish your production stage, cyc wall, podcast lounge, or music room for fellow creators.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-10 shadow-xl shadow-neutral-200/40 dark:border-neutral-800 dark:bg-neutral-900/90 dark:shadow-none">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Read-Only Host Credentials */}
            <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-950/60">
              <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                Listing Host (Read-Only)
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-amber-500/20 text-amber-600 flex items-center justify-center font-bold text-sm uppercase">
                  {user.name?.charAt(0) || "U"}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                    {user.name}
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Studio Title */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                Studio Title / Space Name
              </label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Apex 4K Soundstage & Cyclorama"
                  required
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 py-3 pl-10 pr-4 text-sm text-neutral-900 placeholder-neutral-400 focus:border-amber-500 focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-amber-500 transition-all"
                />
              </div>
            </div>

            {/* Category & Hourly Rate */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Category
                </label>
                <div className="relative">
                  <Layers className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <select
                    name="category"
                    required
                    defaultValue=""
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 py-3 pl-10 pr-4 text-sm text-neutral-900 focus:border-amber-500 focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-amber-500 transition-all"
                  >
                    <option value="" disabled>Select studio type</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Hourly Rate ($)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <input
                    type="number"
                    name="pricePerHour"
                    min="1"
                    placeholder="e.g. 65"
                    required
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 py-3 pl-10 pr-4 text-sm text-neutral-900 placeholder-neutral-400 focus:border-amber-500 focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-amber-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Security Deposit & Max Crew Capacity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Security Deposit ($)
                </label>
                <div className="relative">
                  <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <input
                    type="number"
                    name="deposit"
                    min="0"
                    placeholder="e.g. 100"
                    required
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 py-3 pl-10 pr-4 text-sm text-neutral-900 placeholder-neutral-400 focus:border-amber-500 focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-amber-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Max Crew Capacity
                </label>
                <div className="relative">
                  <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <input
                    type="number"
                    name="maxCrew"
                    min="1"
                    placeholder="e.g. 20"
                    required
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 py-3 pl-10 pr-4 text-sm text-neutral-900 placeholder-neutral-400 focus:border-amber-500 focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-amber-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Address / Location */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                Location / Physical Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  name="location"
                  placeholder="e.g. 42 Creative District, Banani, Dhaka"
                  required
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 py-3 pl-10 pr-4 text-sm text-neutral-900 placeholder-neutral-400 focus:border-amber-500 focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-amber-500 transition-all"
                />
              </div>
            </div>

            {/* Cover Image URL */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                Studio Image URL
              </label>
              <div className="relative">
                <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="url"
                  name="image"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  required
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 py-3 pl-10 pr-4 text-sm text-neutral-900 placeholder-neutral-400 focus:border-amber-500 focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-amber-500 transition-all"
                />
              </div>

              {imageUrl && (
                <div className="mt-3 overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 aspect-[16/8] max-h-48 w-full bg-neutral-100 dark:bg-neutral-950">
                  <img
                    src={imageUrl}
                    alt="Cover preview"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Amenities Checkboxes */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                Available Amenities & Gear (Select all that apply)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {AVAILABLE_AMENITIES.map((amenity) => {
                  const isChecked = selectedAmenities.includes(amenity);
                  return (
                    <button
                      type="button"
                      key={amenity}
                      onClick={() => handleAmenityToggle(amenity)}
                      className={`flex items-center gap-2 rounded-xl border p-2.5 text-xs font-medium text-left transition-all ${
                        isChecked
                          ? "border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-400"
                          : "border-neutral-200 bg-neutral-50/50 text-neutral-600 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400"
                      }`}
                    >
                      <CheckSquare
                        className={`h-4 w-4 shrink-0 ${
                          isChecked ? "text-amber-500" : "text-neutral-400"
                        }`}
                      />
                      <span className="truncate">{amenity}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Detailed Description */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                Detailed Overview & Rules
              </label>
              <div className="relative">
                <FileText className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-400" />
                <textarea
                  name="description"
                  rows={4}
                  placeholder="Detail ceiling height, electrical outlets, access instructions, soundproofing specs, and gear lists..."
                  required
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 py-3 pl-10 pr-4 text-sm text-neutral-900 placeholder-neutral-400 focus:border-amber-500 focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-amber-500 transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-3.5 text-sm font-bold text-neutral-950 shadow-md shadow-amber-500/20 hover:bg-amber-400 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Publishing Space...
                </>
              ) : (
                <>
                  Publish Studio Space
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}