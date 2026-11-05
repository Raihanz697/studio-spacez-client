"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
// import { getTokenFromClient } from "@/lib/getTokenFromClient";

const CATEGORIES = [
  "Photography",
  "Music & Sound",
  "Dance & Rehearsal",
  "Podcast & Broadcast",
  "Art & Pottery",
  "Film & Video Production",
];

// Backend API Call
const addStudio = async (studioData) => {
  let token = null;
  try {
    if (typeof getTokenFromClient === "function") {
      token = await getTokenFromClient();
    }
  } catch (err) {
    console.warn("Could not retrieve token:", err);
  }

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL ;

  const response = await fetch(`${serverUrl}/studios`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(studioData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to add studio!");
  }

  return response.json();
};

export default function AddStudioPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

 

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

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
      image: formData.get("image")?.trim(),
      description: formData.get("description")?.trim(),
      rating: 5.0,
      reviewsCount: 0,
      createdAt: new Date().toISOString(),
      // Host info automatically attached from session
      host: {
        name: user?.name || "Anonymous Host",
        email: user?.email || "host@studiospace.com",
        image: user?.image || null,
      },
    };

    try {
      await addStudio(studioData);
      toast.success("Studio listed successfully!");
      form.reset();
      setImageUrl("");

      // Success hole studios page ba my-listings page-e niye jabe
      router.push("/studios");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to add studio. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full min-h-screen bg-neutral-50/50 py-12 px-4 sm:px-6 lg:px-8 dark:bg-neutral-950 transition-colors">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 text-neutral-950 shadow-md shadow-amber-500/20 mb-3">
            <Aperture className="h-6 w-6 stroke-[2.2]" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            List a New Studio
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            Share your creative space with photographers, musicians, and creators worldwide.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-10 shadow-xl shadow-neutral-200/40 dark:border-neutral-800 dark:bg-neutral-900/90 dark:shadow-none">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Studio Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                Studio Name
              </label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Lumina Daylight Loft"
                  required
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 py-3 pl-10 pr-4 text-sm text-neutral-900 placeholder-neutral-400 focus:border-amber-500 focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-amber-500 transition-all"
                />
              </div>
            </div>

            {/* Category & Price Per Hour */}
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
                    <option value="" disabled>Select category</option>
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
                    placeholder="e.g. 50"
                    required
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 py-3 pl-10 pr-4 text-sm text-neutral-900 placeholder-neutral-400 focus:border-amber-500 focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-amber-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                Location / Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Gulshan 2, Dhaka"
                  required
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 py-3 pl-10 pr-4 text-sm text-neutral-900 placeholder-neutral-400 focus:border-amber-500 focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-amber-500 transition-all"
                />
              </div>
            </div>

            {/* Image URL & Live Preview */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                Cover Image URL
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
                    alt="Preview"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                Description & Amenities
              </label>
              <div className="relative">
                <FileText className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-400" />
                <textarea
                  name="description"
                  rows={4}
                  placeholder="Describe lighting gear, acoustics, backdrop colors, air conditioning, and access guidelines..."
                  required
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 py-3 pl-10 pr-4 text-sm text-neutral-900 placeholder-neutral-400 focus:border-amber-500 focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-amber-500 transition-all"
                />
              </div>
            </div>

            {/* Host Preview Badge */}
            {user && (
              <div className="flex items-center gap-3 rounded-xl border border-neutral-100 bg-neutral-50/50 p-3 dark:border-neutral-800 dark:bg-neutral-950/50">
                <div className="h-8 w-8 rounded-full bg-amber-500/20 text-amber-600 flex items-center justify-center font-bold text-xs uppercase">
                  {user.name?.charAt(0) || "U"}
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-neutral-800 dark:text-neutral-200">
                    Listing as: {user.name}
                  </p>
                  <p className="text-neutral-400 text-[11px]">{user.email}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-3.5 text-sm font-bold text-neutral-950 shadow-md shadow-amber-500/20 hover:bg-amber-400 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Publishing Studio...
                </>
              ) : (
                <>
                  Publish Studio Listing
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