"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import {
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
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
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

export default function EditStudioPage() {
  const router = useRouter();
  const routeParams = useParams();
  const studioId = routeParams?.id;

  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const user = session?.user;

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    pricePerHour: "",
    deposit: "",
    maxCrew: "",
    location: "",
    image: "",
    description: "",
    amenities: [],
    host: { name: "", email: "" },
  });

  // ১. Private Route Guard
  useEffect(() => {
    if (!sessionLoading && !user) {
      toast.error("Please login to update your studio!");
      router.push(`/login?callbackUrl=/studios/edit/${studioId}`);
    }
  }, [sessionLoading, user, router, studioId]);

  
 
  useEffect(() => {
    async function fetchStudioDetails() {
      
      if (!studioId || studioId === "undefined") return;

      try {
        const serverUrl =
          `${process.env.NEXT_PUBLIC_SERVER_URL}`;
        const res = await fetch(`${serverUrl}/studios/${studioId}`);
        
        if (!res.ok) {
          throw new Error("Studio not found on server");
        }

        const data = await res.json();
        setFormData({
          name: data.name || "",
          category: data.category || "",
          pricePerHour: data.pricePerHour || "",
          deposit: data.deposit || 100,
          maxCrew: data.maxCrew || 15,
          location: data.location || "",
          image: data.image || "",
          description: data.description || "",
          amenities: Array.isArray(data.amenities) ? data.amenities : [],
          host: data.host || {
            name: user?.name || "Host",
            email: user?.email || "",
          },
        });
      } catch (err) {
        console.error("Fetch studio details error:", err);
        toast.error("Failed to load studio details");
        router.push("/my-listings");
      } finally {
        setLoading(false);
      }
    }

    if (studioId && user?.email) {
      fetchStudioDetails();
    }
  }, [studioId, user?.email, router]);

  
  const handleAmenityToggle = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((item) => item !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const updatePayload = {
      name: formData.name.trim(),
      category: formData.category,
      location: formData.location.trim(),
      pricePerHour: Number(formData.pricePerHour),
      deposit: Number(formData.deposit),
      maxCrew: Number(formData.maxCrew),
      image: formData.image.trim(),
      description: formData.description.trim(),
      amenities: formData.amenities,
    };

    try {
      const serverUrl =
        process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";
      const res = await fetch(`${serverUrl}/studios/${studioId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatePayload),
      });

      if (!res.ok) {
        throw new Error("Failed to update studio");
      }

      toast.success("Studio specifications updated successfully!");
      router.push("/my-listings");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Update failed. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (sessionLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <main className="w-full min-h-screen bg-neutral-50/50 py-12 px-4 sm:px-6 lg:px-8 dark:bg-neutral-950 transition-colors">
      <div className="max-w-3xl mx-auto">
        
        
        <Link
          href="/my-listings"
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 hover:text-amber-500 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to My Listings
        </Link>

        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Update Studio Specifications
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            Edit rates, photos, amenities, and workspace rules for your listing.
          </p>
        </div>

        
        <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-10 shadow-xl shadow-neutral-200/40 dark:border-neutral-800 dark:bg-neutral-900/90 dark:shadow-none">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            
            <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-950/60">
              <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                Listing Host (Read-Only)
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-amber-500/20 text-amber-600 flex items-center justify-center font-bold text-sm uppercase">
                  {formData.host?.name?.charAt(0) || user.name?.charAt(0) || "H"}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                    {formData.host?.name || user.name}
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {formData.host?.email || user.email}
                  </p>
                </div>
              </div>
            </div>

           
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                Studio Title
              </label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 py-3 pl-10 pr-4 text-sm text-neutral-900 focus:border-amber-500 focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-amber-500 transition-all"
                />
              </div>
            </div>

           
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Category
                </label>
                <div className="relative">
                  <Layers className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    required
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 py-3 pl-10 pr-4 text-sm text-neutral-900 focus:border-amber-500 focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-amber-500 transition-all"
                  >
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
                    min="1"
                    value={formData.pricePerHour}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pricePerHour: e.target.value,
                      })
                    }
                    required
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 py-3 pl-10 pr-4 text-sm text-neutral-900 focus:border-amber-500 focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-amber-500 transition-all"
                  />
                </div>
              </div>
            </div>

            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Security Deposit ($)
                </label>
                <div className="relative">
                  <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <input
                    type="number"
                    min="0"
                    value={formData.deposit}
                    onChange={(e) =>
                      setFormData({ ...formData, deposit: e.target.value })
                    }
                    required
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 py-3 pl-10 pr-4 text-sm text-neutral-900 focus:border-amber-500 focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-amber-500 transition-all"
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
                    min="1"
                    value={formData.maxCrew}
                    onChange={(e) =>
                      setFormData({ ...formData, maxCrew: e.target.value })
                    }
                    required
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 py-3 pl-10 pr-4 text-sm text-neutral-900 focus:border-amber-500 focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-amber-500 transition-all"
                  />
                </div>
              </div>
            </div>

            
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                Location / Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  required
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 py-3 pl-10 pr-4 text-sm text-neutral-900 focus:border-amber-500 focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-amber-500 transition-all"
                />
              </div>
            </div>

            
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                Studio Image URL
              </label>
              <div className="relative">
                <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  required
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 py-3 pl-10 pr-4 text-sm text-neutral-900 focus:border-amber-500 focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-amber-500 transition-all"
                />
              </div>

              {formData.image && (
                <div className="mt-3 overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 aspect-[16/8] max-h-48 w-full bg-neutral-100 dark:bg-neutral-950">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                Amenities & Gear
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {AVAILABLE_AMENITIES.map((amenity) => {
                  const isChecked = formData.amenities?.includes(amenity);
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

            
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                Detailed Description & Rules
              </label>
              <div className="relative">
                <FileText className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-400" />
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 py-3 pl-10 pr-4 text-sm text-neutral-900 focus:border-amber-500 focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-amber-500 transition-all"
                />
              </div>
            </div>

            
            <div className="flex items-center gap-4 pt-2">
              <Link
                href="/my-listings"
                className="flex-1 text-center rounded-xl border border-neutral-200 py-3.5 text-xs font-bold text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-800 transition"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={updating}
                className="flex-[2] flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-3.5 text-xs font-bold text-neutral-950 shadow-md shadow-amber-500/20 hover:bg-amber-400 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {updating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    Save & Update Studio
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>
    </main>
  );
}