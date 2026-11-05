"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import toast from "react-hot-toast";
import {
  Building2,
  MapPin,
  DollarSign,
  Users,
  Image as ImageIcon,
  FileText,
  Sparkles,
  PlusCircle,
  Loader2,
} from "lucide-react";

export default function AddStudioPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "Photography",
    location: "",
    pricePerHour: "",
    deposit: "100",
    maxCrew: "15",
    image: "",
    description: "",
    amenities: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = await getTokenFromClient();

      const payload = {
        name: formData.name.trim(),
        category: formData.category,
        location: formData.location.trim(),
        pricePerHour: Number(formData.pricePerHour),
        deposit: Number(formData.deposit) || 100,
        maxCrew: Number(formData.maxCrew) || 15,
        image: formData.image.trim(),
        description: formData.description.trim(),
        amenities: formData.amenities
          ? formData.amenities.split(",").map((a) => a.trim()).filter(Boolean)
          : [],
        rating: 5.0,
        reviewsCount: 0,
        host: {
          name: session?.user?.name || "Host",
          email: session?.user?.email,
          image: session?.user?.image || "",
        },
        createdAt: new Date().toISOString(),
      };

      const serverUrl =
        process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

      const res = await fetch(`${serverUrl}/studios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message || "Failed to publish studio space");
      }

      toast.success("Studio published successfully!");
      router.push("/my-listings");
      router.refresh();
    } catch (error) {
      console.error("Create error:", error);
      toast.error(error.message || "Failed to create studio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-neutral-50/50 py-10 px-4 sm:px-6 lg:px-8 dark:bg-neutral-950 transition-colors">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            Host Workspace Portal
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            List a New Creative Studio
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            Publish your creative production facility, soundstage, or photography loft to our creator network.
          </p>
        </div>

        {/* Clean Light Card Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:p-8"
        >
          {/* Studio Name */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
              <Building2 className="h-4 w-4 text-amber-500" />
              Studio Title
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Apex Motion Daylight Loft"
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
            />
          </div>

          {/* Category & Location */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
              >
                <option value="Photography">Photography Studio</option>
                <option value="Music">Music / Recording Suite</option>
                <option value="Dance">Dance / Rehearsal Hall</option>
                <option value="Podcast">Podcast Loft</option>
                <option value="Art">Art & Ceramic Workshop</option>
              </select>
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                <MapPin className="h-4 w-4 text-amber-500" />
                Location
              </label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Banani, Dhaka"
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
              />
            </div>
          </div>

          {/* Pricing & Capacity */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                <DollarSign className="h-4 w-4 text-amber-500" />
                Price / Hour ($)
              </label>
              <input
                type="number"
                name="pricePerHour"
                required
                min="1"
                value={formData.pricePerHour}
                onChange={handleChange}
                placeholder="45"
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                <DollarSign className="h-4 w-4 text-amber-500" />
                Deposit ($)
              </label>
              <input
                type="number"
                name="deposit"
                value={formData.deposit}
                onChange={handleChange}
                placeholder="100"
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                <Users className="h-4 w-4 text-amber-500" />
                Max Crew
              </label>
              <input
                type="number"
                name="maxCrew"
                value={formData.maxCrew}
                onChange={handleChange}
                placeholder="15"
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
              <ImageIcon className="h-4 w-4 text-amber-500" />
              Cover Image URL
            </label>
            <input
              type="url"
              name="image"
              required
              value={formData.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
            />
          </div>

          {/* Amenities */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
              <Sparkles className="h-4 w-4 text-amber-500" />
              Amenities (comma separated)
            </label>
            <input
              type="text"
              name="amenities"
              value={formData.amenities}
              onChange={handleChange}
              placeholder="WiFi, Cyclorama Wall, AC, Sound System"
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
              <FileText className="h-4 w-4 text-amber-500" />
              Studio Description
            </label>
            <textarea
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe gear specifications, ambient acoustics, natural lighting, and floor plans..."
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-xs font-bold text-neutral-950 shadow-md shadow-amber-500/20 hover:bg-amber-400 active:scale-[0.99] transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Publishing Workspace...
              </>
            ) : (
              <>
                <PlusCircle className="h-4 w-4" />
                Publish Studio Listing
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}