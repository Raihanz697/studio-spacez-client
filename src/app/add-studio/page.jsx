

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Building2, 
  Layers, 
  DollarSign, 
  ShieldCheck, 
  Users, 
  MapPin, 
  Image as ImageIcon, 
  FileText, 
  User, 
  Mail, 
  ArrowRight,
  Check,
  Loader2
} from "lucide-react";
import { toast } from "react-hot-toast"; // অথবা তোমার প্রোজেক্টে sonner থাকলে: import { toast } from "sonner";
import { authClient } from "@/lib/auth-client"; // তোমার প্রোজেক্টের better-auth ক্লায়েন্ট পাথ

const AMENITIES_LIST = [
  "Cyclorama Wall",
  "Soundproofing",
  "DMX Lighting Grid",
  "High-Speed Wi-Fi",
  "Air Conditioning",
  "Dressing & Makeup Room",
  "Audio Interface & Mics",
  "Prop Selection",
  "Freight Elevator",
  "Free Parking"
];

const CATEGORIES = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop"
];

function AddStudioPage() {
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const user = session?.user;

  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    hourlyRate: "",
    deposit: "",
    capacity: "",
    location: "",
    image: "",
    amenities: [],
    rules: ""
  });

  // প্রাইভেট রাউট প্রটেকশন
  useEffect(() => {
    if (!sessionLoading && !user) {
      toast.error("Please login first to add a studio!");
      router.push("/login");
    }
  }, [user, sessionLoading, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleAmenity = (item) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(item);
      return {
        ...prev,
        amenities: exists 
          ? prev.amenities.filter((a) => a !== item)
          : [...prev.amenities, item]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.email) {
      toast.error("User session not found.");
      return;
    }

    setSubmitting(true);

    const studioPayload = {
      ...formData,
      hourlyRate: Number(formData.hourlyRate),
      deposit: Number(formData.deposit || 0),
      capacity: Number(formData.capacity),
      userEmail: user.email,
      userName: user.name || "Studio Owner",
      createdAt: new Date().toISOString()
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/studios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studioPayload)
      });

      if (res.ok) {
        toast.success("Studio published successfully!");
        router.push("/my-listings");
      } else {
        const errorData = await res.json().catch(() => ({}));
        toast.error(errorData.message || "Failed to publish studio space.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to connect to the server.");
    } finally {
      setSubmitting(false);
    }
  };

  if (sessionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Add New Studio Space
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          List your studio space for creatives to book.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Read-Only User Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
              Host Name (Read-only)
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                readOnly
                value={user?.name || ""}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-300 text-sm cursor-not-allowed select-none outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
              Host Email (Read-only)
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="email"
                readOnly
                value={user?.email || ""}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-300 text-sm cursor-not-allowed select-none outline-none"
              />
            </div>
          </div>
        </div>

        {/* Studio Title */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-2">
            Studio Title / Space Name
          </label>
          <div className="relative">
            <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Apex 4K Soundstage & Cyclorama"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Category & Hourly Rate */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-2">
              Category
            </label>
            <div className="relative">
              <Layers className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full pl-10 pr-8 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none"
              >
                <option value="">Select studio type</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-2">
              Hourly Rate ($)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="number"
                name="hourlyRate"
                required
                min="1"
                value={formData.hourlyRate}
                onChange={handleChange}
                placeholder="e.g. 65"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Security Deposit & Max Crew Capacity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-2">
              Security Deposit ($)
            </label>
            <div className="relative">
              <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="number"
                name="deposit"
                min="0"
                value={formData.deposit}
                onChange={handleChange}
                placeholder="e.g. 100"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-2">
              Max Crew Capacity
            </label>
            <div className="relative">
              <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="number"
                name="capacity"
                required
                min="1"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="e.g. 20"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-2">
            Location / Physical Address
          </label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. 42 Creative District, Banani, Dhaka"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Studio Image URL */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-2">
            Studio Image URL
          </label>
          <div className="relative">
            <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="url"
              name="image"
              required
              value={formData.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Amenities */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-3">
            Available Amenities & Gear (Select all that apply)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {AMENITIES_LIST.map((item) => {
              const selected = formData.amenities.includes(item);
              return (
                <button
                  type="button"
                  key={item}
                  onClick={() => toggleAmenity(item)}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-xs font-medium transition text-left ${
                    selected
                      ? "border-amber-500 bg-amber-50 text-amber-900 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-500"
                      : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 text-neutral-700 dark:text-neutral-300"
                  }`}
                >
                  <div className={`h-4 w-4 rounded border flex items-center justify-center transition ${
                    selected 
                      ? "bg-amber-500 border-amber-500 text-white" 
                      : "border-neutral-300 dark:border-neutral-700"
                  }`}>
                    {selected && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Overview */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-2">
            Detailed Overview & Rules
          </label>
          <div className="relative">
            <FileText className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-400" />
            <textarea
              name="rules"
              rows={4}
              required
              value={formData.rules}
              onChange={handleChange}
              placeholder="Detail ceiling height, electrical outlets, access instructions, soundproofing specs, and gear lists..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Publishing...
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
  );
}

export default AddStudioPage;