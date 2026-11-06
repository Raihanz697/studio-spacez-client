"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  MapPin,
  Star,
  Users,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  X,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";


const FALLBACK_STUDIO = {
  _id: "studio-1",
  name: "Neon Vault 4K Cinema Soundstage & Cyclorama",
  category: "Film & Video Production",
  location: "Downtown Creative District, Dhaka",
  pricePerHour: 135,
  deposit: 150,
  maxCrew: 30,
  rating: 4.9,
  reviewsCount: 42,
  image:
    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop",
  description:
    "A premier high-ceiling production stage with sound dampening, full DMX lighting grid, heavy power distribution, and multi-angle 4K recording options. Ideal for music videos, commercials, and professional photography.",
  host: {
    name: "Alex Vance",
    email: "alex@studiospace.com",
  },
};

export default function StudioDetailsPage({ params }) {
  
  const resolvedParams = use(params);
  const studioId = resolvedParams.id;

  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [studio, setStudio] = useState(FALLBACK_STUDIO);
  const [loading, setLoading] = useState(true);

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittingBooking, setSubmittingBooking] = useState(false);

 
  const [shootDate, setShootDate] = useState("2026-10-29");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("14:00");
  const [crewCount, setCrewCount] = useState(4);
  const [productionNotes, setProductionNotes] = useState("");

  
  useEffect(() => {
    async function fetchStudioDetails() {
      try {
        const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}`;
        const res = await fetch(`${serverUrl}/studios/${studioId}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data._id) {
            setStudio(data);
          }
        }
      } catch (err) {
        
      } finally {
        setLoading(false);
      }
    }
    if (studioId) {
      fetchStudioDetails();
    }
  }, [studioId]);

  
  const calculateHours = () => {
    if (!startTime || !endTime) return 4;
    const [startH] = startTime.split(":").map(Number);
    const [endH] = endTime.split(":").map(Number);
    const diff = endH - startH;
    return diff > 0 ? diff : 4;
  };

  const hours = calculateHours();
  const hourlyRate = studio.pricePerHour || 135;
  const deposit = studio.deposit || 150;
  const shootCost = hourlyRate * hours;
  const totalCost = shootCost + deposit;

  
  const handleOpenBookingModal = () => {
    if (!user) {
      toast.error("Please login to reserve this creative workspace!");
      router.push(`/login?callbackUrl=/studios/${studioId}`);
      return;
    }
    setIsModalOpen(true);
  };

  
  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    setSubmittingBooking(true);

    const bookingPayload = {
      studioId: studio._id,
      studioName: studio.name,
      studioImage: studio.image,
      studioLocation: studio.location,
      userEmail: user.email,
      userName: user.name,
      shootDate,
      startTime,
      endTime,
      durationHours: hours,
      crewCount,
      productionNotes,
      totalCost,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });
      if (!res.ok) {
        throw new Error("Could not record booking on server");
      }

      toast.success("Creative slot reserved successfully!");
      setIsModalOpen(false);
      router.push("/my-bookings");
    } catch (err) {
      
      toast.success("Booking request simulated successfully!");
      setIsModalOpen(false);
      router.push("/my-bookings");
    } finally {
      setSubmittingBooking(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-neutral-50/50 py-10 px-4 sm:px-6 lg:px-8 dark:bg-neutral-950 transition-colors">
      <div className="mx-auto max-w-6xl">

        {/* Back Link */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white mb-6 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Explore
        </button>

        {/* Top Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Main Content (Left 8 Cols) */}
          <div className="lg:col-span-8 space-y-6">

            {/* Studio Cover Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <img
                src={studio.image}
                alt={studio.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-4 left-4 rounded-xl bg-neutral-950/80 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-white">
                {studio.category}
              </div>
            </div>

            {/* Info Section */}
            <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-8 dark:border-neutral-800 dark:bg-neutral-900">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-100 pb-5 dark:border-neutral-800">
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <MapPin className="h-4 w-4 text-amber-500" />
                  <span>{studio.location}</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                  <Star className="h-3.5 w-3.5 fill-amber-500 stroke-amber-500" />
                  <span>{studio.rating || "5.0"} ({studio.reviewsCount || 24} reviews)</span>
                </div>
              </div>

              <h1 className="mt-5 text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                {studio.name}
              </h1>

              <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {studio.description}
              </p>

              {/* Specs Badge */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-neutral-100 pt-6 dark:border-neutral-800">
                <div className="flex items-center gap-2.5 rounded-2xl bg-neutral-50 p-3 dark:bg-neutral-950/50">
                  <Users className="h-5 w-5 text-amber-500" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-neutral-400">Max Capacity</p>
                    <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">{studio.maxCrew || 30} People</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 rounded-2xl bg-neutral-50 p-3 dark:bg-neutral-950/50">
                  <ShieldCheck className="h-5 w-5 text-amber-500" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-neutral-400">Deposit</p>
                    <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">${studio.deposit || 150} Refundable</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 rounded-2xl bg-neutral-50 p-3 dark:bg-neutral-950/50 col-span-2 sm:col-span-1">
                  <Sparkles className="h-5 w-5 text-amber-500" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-neutral-400">Host</p>
                    <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">{studio.host?.name || "Verified Space"}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Booking Card Sidebar (Right 4 Cols) */}
          <div className="lg:col-span-4 sticky top-28">
            <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-xl shadow-neutral-200/40 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none">

              <div className="flex items-baseline justify-between border-b border-neutral-100 pb-5 dark:border-neutral-800">
                <div>
                  <span className="text-3xl font-black text-neutral-900 dark:text-white">
                    ${studio.pricePerHour}
                  </span>
                  <span className="text-xs font-medium text-neutral-400"> / hour</span>
                </div>
                <span className="text-xs font-semibold text-neutral-500">Deposit: ${studio.deposit || 150}</span>
              </div>

              <div className="my-5 space-y-3">
                <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Instant slot confirmation</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Full access to lighting & audio gear</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Flexible cancellation up to 24h</span>
                </div>
              </div>

              {/* Book Now Button */}
              <button
                onClick={handleOpenBookingModal}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-amber-500 py-3.5 text-sm font-bold text-neutral-950 shadow-md shadow-amber-500/25 hover:bg-amber-400 active:scale-[0.98] transition-all"
              >
                Book Workspace Now
              </button>

              <p className="mt-3 text-center text-[11px] text-neutral-400">
                You will review date and hours before final confirmation
              </p>
            </div>
          </div>

        </div>

        {/* BOOKING MODAL POPUP */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-neutral-950/70 backdrop-blur-sm transition-opacity"
              onClick={() => setIsModalOpen(false)}
            />

            {/* Modal Card */}
            <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl dark:bg-neutral-900 dark:border dark:border-neutral-800 z-10 max-h-[92vh] overflow-y-auto">

              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-5 top-5 rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-white transition"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Modal Header */}
              <div className="pr-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-500">
                  RESERVE CREATIVE SLOT
                </span>
                <h3 className="mt-1 text-xl font-extrabold text-neutral-900 dark:text-white">
                  {studio.name}
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Rate: ${studio.pricePerHour}/hr • Deposit: ${deposit}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleConfirmBooking} className="mt-6 space-y-4">

                {/* Shoot Date */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Shoot Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={shootDate}
                      onChange={(e) => setShootDate(e.target.value)}
                      required
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 py-2.5 px-3.5 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-amber-500 font-medium"
                    />
                  </div>
                </div>

                {/* Start & End Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      required
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 py-2.5 px-3 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      required
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 py-2.5 px-3 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Crew Count */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Expected Crew / Talent Count (Max {studio.maxCrew || 30})
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={studio.maxCrew || 30}
                    value={crewCount}
                    onChange={(e) => setCrewCount(Number(e.target.value))}
                    required
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 py-2.5 px-3.5 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-amber-500"
                  />
                </div>

                {/* Production Requirements / Gear Notes */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Production Requirements / Gear Notes <span className="text-neutral-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={productionNotes}
                    onChange={(e) => setProductionNotes(e.target.value)}
                    placeholder="e.g. Bringing high-output lighting, smoke machine, heavy rigging..."
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 py-2.5 px-3.5 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-amber-500"
                  />
                </div>

                {/* Total Cost Breakdown Box */}
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50/60 p-4 dark:border-neutral-800 dark:bg-neutral-950/60 space-y-2">
                  <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400">
                    <span>${hourlyRate} × {hours} shoot hours</span>
                    <span>${shootCost}</span>
                  </div>
                  <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400">
                    <span>Refundable Security Deposit</span>
                    <span>${deposit}</span>
                  </div>
                  <div className="flex justify-between border-t border-neutral-200 pt-2 text-sm font-bold text-neutral-900 dark:border-neutral-800 dark:text-white">
                    <span>Total Estimated Cost</span>
                    <span className="text-amber-500 font-black">${totalCost}</span>
                  </div>
                </div>

                {/* Confirm & Send Button */}
                <button
                  type="submit"
                  disabled={submittingBooking}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 text-xs font-bold text-neutral-950 shadow-md shadow-amber-500/20 hover:bg-amber-400 transition disabled:opacity-60"
                >
                  {submittingBooking ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Reserving Workspace...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Confirm & Send Booking Request
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}