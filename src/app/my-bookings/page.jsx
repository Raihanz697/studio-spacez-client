
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Calendar,
  Clock,
  MapPin,
  Trash2,
  AlertTriangle,
  X,
  ArrowRight,
  Sparkles,
  Loader2,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "../../lib/getTokenFromClient";


const INITIAL_DEMO_BOOKINGS = [
  {
    _id: "book-1",
    studioName: "Neon Vault 4K Cinema Soundstage & Cyclorama",
    studioImage:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop",
    studioLocation: "Downtown Creative District, Dhaka",
    shootDate: "2026-10-29",
    startTime: "10:00 AM",
    endTime: "02:00 PM",
    durationHours: 4,
    crewCount: 4,
    totalCost: 690,
    status: "confirmed",
  },
];

function MyBookingsPage() {
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const user = session?.user;

  const [bookings, setBookings] = useState(INITIAL_DEMO_BOOKINGS);
  const [loading, setLoading] = useState(true);

  // Cancel Confirmation Popup State
  const [selectedBookingToCancel, setSelectedBookingToCancel] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    async function fetchUserBookings() {
      if (!user?.email) return;

      try {
        const token = await getTokenFromClient();
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";
        
        const res = await fetch(`${serverUrl}/bookings?email=${user.email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setBookings(data);
          }
        }
      } catch (err) {
        // ব্যাকএন্ড অফ থাকলে ডিফল্ট ডেমো ডাটা থাকবে
      } finally {
        setLoading(false);
      }
    }

    if (user?.email) {
      fetchUserBookings();
    } else if (!sessionLoading && !user) {
      setLoading(false);
    }
  }, [user, sessionLoading]);

  // বুকিং বাতিল কনফার্ম হ্যান্ডলার (With Token)
  const handleConfirmCancel = async () => {
    if (!selectedBookingToCancel) return;
    setCancelling(true);

    try {
      const token = await getTokenFromClient();
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

      const res = await fetch(`${serverUrl}/bookings/${selectedBookingToCancel._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to cancel booking");
      }

      setBookings((prev) =>
        prev.filter((item) => item._id !== selectedBookingToCancel._id)
      );

      toast.success("Booking cancelled successfully.");
      setSelectedBookingToCancel(null);
    } catch (error) {
      toast.error("Failed to cancel booking. Please try again.");
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-neutral-50/50 py-10 px-4 sm:px-6 lg:px-8 dark:bg-neutral-950 transition-colors">
      <div className="mx-auto max-w-5xl">
        
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            Your Reserved Slots
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            My Studio Bookings
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            Manage your upcoming production shoots, schedules, and active reservations.
          </p>
        </div>

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <div className="py-20 text-center rounded-3xl border border-dashed border-neutral-300 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/40">
            <Calendar className="mx-auto h-12 w-12 text-neutral-400 mb-3 stroke-[1.5]" />
            <h3 className="text-base font-bold text-neutral-800 dark:text-neutral-200">
              No active reservations found
            </h3>
            <p className="mt-1 text-xs text-neutral-400 max-w-sm mx-auto">
              You haven't reserved any creative studios yet. Explore available spaces and schedule your next shoot!
            </p>
            <Link
              href="/studios"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-neutral-950 hover:bg-amber-400 transition"
            >
              Explore Studios
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-5 rounded-3xl border border-neutral-200/80 bg-white p-5 shadow-sm hover:shadow-md transition-all dark:border-neutral-800 dark:bg-neutral-900"
              >
                {/* Image & Main Info */}
                <div className="flex items-center gap-4">
                  <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800">
                    <img
                      src={booking.studioImage || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800"}
                      alt={booking.studioName}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div>
                    <span className="inline-block rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
                      {booking.status || "Confirmed"}
                    </span>
                    <h3 className="text-base font-bold text-neutral-900 dark:text-white line-clamp-1">
                      {booking.studioName}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-1">
                      <MapPin className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                      <span className="truncate">{booking.studioLocation || "Dhaka, Bangladesh"}</span>
                    </div>
                  </div>
                </div>

                {/* Details Breakdown */}
                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-4 sm:pt-0 border-neutral-100 dark:border-neutral-800">
                  
                  {/* Date & Time */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                      <Calendar className="h-3.5 w-3.5 text-neutral-400" />
                      <span>{booking.shootDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                      <Clock className="h-3.5 w-3.5 text-neutral-400" />
                      <span>{booking.startTime} - {booking.endTime} ({booking.durationHours || 4}h)</span>
                    </div>
                  </div>

                  {/* Cost */}
                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Total Paid</p>
                    <p className="text-base font-black text-amber-500">
                      ${booking.totalCost}
                    </p>
                  </div>

                  {/* Cancel Button */}
                  <button
                    onClick={() => setSelectedBookingToCancel(booking)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-bold text-rose-600 hover:bg-rose-500 hover:text-white transition-all dark:border-rose-900/30 dark:bg-rose-950/20 dark:text-rose-400 dark:hover:bg-rose-600 dark:hover:text-white"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Cancel Booking
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}

        {/* CANCEL CONFIRMATION POPUP MODAL */}
        {selectedBookingToCancel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-neutral-950/70 backdrop-blur-sm transition-opacity"
              onClick={() => !cancelling && setSelectedBookingToCancel(null)}
            />

            <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:bg-neutral-900 dark:border dark:border-neutral-800 z-10 text-center">
              
              <button
                onClick={() => setSelectedBookingToCancel(null)}
                disabled={cancelling}
                className="absolute right-4 top-4 rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 mb-4">
                <AlertTriangle className="h-7 w-7 stroke-[2]" />
              </div>

              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Cancel this reservation?
              </h3>
              
              <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed px-2">
                Are you sure you want to cancel your slot for{" "}
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                  {selectedBookingToCancel.studioName}
                </span>{" "}
                scheduled on{" "}
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                  {selectedBookingToCancel.shootDate}
                </span>
                ? This action cannot be undone.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  disabled={cancelling}
                  onClick={() => setSelectedBookingToCancel(null)}
                  className="flex-1 rounded-xl border border-neutral-200 py-2.5 text-xs font-bold text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-800 transition"
                >
                  Keep Reservation
                </button>

                <button
                  type="button"
                  disabled={cancelling}
                  onClick={handleConfirmCancel}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-rose-600 py-2.5 text-xs font-bold text-white hover:bg-rose-700 shadow-md shadow-rose-600/20 transition disabled:opacity-60"
                >
                  {cancelling ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Cancelling...
                    </>
                  ) : (
                    "Confirm Cancel"
                  )}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default MyBookingsPage;