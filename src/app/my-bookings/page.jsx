"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  CalendarDays,
  Clock,
  MapPin,
  Building2,
  DollarSign,
  AlertTriangle,
  X,
  Sparkles,
  Loader2,
  ArrowRight,
  Ban
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function MyBookingsPage() {
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const user = session?.user;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cancellation Modal State
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  // Route Protection
  useEffect(() => {
    if (!sessionLoading && !user) {
      toast.error("Please login to view your studio bookings!");
      router.push("/login?callbackUrl=/my-bookings");
    }
  }, [sessionLoading, user, router]);

  // Fetch Current User Bookings
  useEffect(() => {
    async function fetchUserBookings() {
      if (!user?.email) return;

      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings?email=${encodeURIComponent(user.email)}`
        );
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setBookings(data);
          }
        } else {
          toast.error("Failed to load booking history.");
        }
      } catch (err) {
        console.error("Failed to load bookings:", err);
        toast.error("Failed to connect to the server.");
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

  // Handle Cancel Booking
  const handleConfirmCancel = async () => {
    if (!bookingToCancel) return;
    setCancelling(true);

    try {
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
      const res = await fetch(`${serverUrl}/bookings/${bookingToCancel._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Cancelled" })
      });

      if (!res.ok) {
        throw new Error("Failed to cancel the booking");
      }

      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingToCancel._id ? { ...b, status: "Cancelled" } : b
        )
      );

      toast.success("Reservation cancelled successfully.");
      setBookingToCancel(null);
    } catch (error) {
      toast.error(error.message || "Failed to cancel reservation.");
    } finally {
      setCancelling(false);
    }
  };

  const renderStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return (
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            Confirmed
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
            Completed
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
            Cancelled
          </span>
        );
      case "pending":
      default:
        return (
          <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
            Pending
          </span>
        );
    }
  };

  if (sessionLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="w-full min-h-screen bg-neutral-50/50 py-10 px-4 sm:px-6 lg:px-8 dark:bg-neutral-950 transition-colors">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              Creator Reservations
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              My Bookings
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
              Track studio schedules, manage active reservations, and view booking statuses.
            </p>
          </div>

          <Link
            href="/studios"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-neutral-950 shadow-md shadow-amber-500/20 hover:bg-amber-400 active:scale-95 transition-all self-start sm:self-auto"
          >
            Explore More Studios
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Content */}
        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
          </div>
        ) : bookings.length === 0 ? (
          /* Empty State */
          <div className="py-20 text-center rounded-3xl border border-dashed border-neutral-300 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/40">
            <CalendarDays className="mx-auto h-12 w-12 text-neutral-400 mb-3 stroke-[1.5]" />
            <h3 className="text-base font-bold text-neutral-800 dark:text-neutral-200">
              You haven&apos;t booked any studio slots yet
            </h3>
            <p className="mt-1 text-xs text-neutral-400 max-w-sm mx-auto">
              Find the perfect space for your upcoming production, podcast, or photography shoot.
            </p>
            <Link
              href="/studios"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-neutral-950 hover:bg-amber-400 transition"
            >
              Browse Studios Now
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : (
          /* Shadcn Style Table */
          <div className="overflow-hidden rounded-3xl border border-neutral-200/80 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200/80 bg-neutral-50/50 text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:border-neutral-800 dark:bg-neutral-950/40 dark:text-neutral-400">
                    <th className="py-4 px-6">Reserved Studio</th>
                    <th className="py-4 px-6">Schedule / Date</th>
                    <th className="py-4 px-6">Total Cost</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60 text-sm">
                  {bookings.map((booking) => (
                    <tr
                      key={booking._id}
                      className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors"
                    >
                      {/* Studio Details */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800">
                            <img
                              src={
                                booking.studioImage ||
                                booking.image ||
                                "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04"
                              }
                              alt={booking.studioTitle || booking.studioName || "Studio"}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <Link
                              href={`/studios/${booking.studioId || ""}`}
                              className="font-bold text-neutral-900 hover:text-amber-500 dark:text-white dark:hover:text-amber-400 transition-colors line-clamp-1"
                            >
                              {booking.studioTitle || booking.studioName || "Creative Workspace"}
                            </Link>
                            <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-0.5">
                              <MapPin className="h-3 w-3 text-amber-500 shrink-0" />
                              <span className="line-clamp-1">
                                {booking.location || "Banani, Dhaka"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Schedule / Time */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-neutral-800 dark:text-neutral-200 font-medium">
                          <CalendarDays className="h-4 w-4 text-neutral-400" />
                          <span>{booking.date || booking.bookingDate || "N/A"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-neutral-400 mt-1">
                          <Clock className="h-3.5 w-3.5 text-neutral-400" />
                          <span>
                            {booking.startTime && booking.endTime
                              ? `${booking.startTime} - ${booking.endTime}`
                              : `${booking.durationHours || 1} hr session`}
                          </span>
                        </div>
                      </td>

                      {/* Pricing */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="text-neutral-900 dark:text-white font-bold">
                          ${booking.totalPrice || booking.amount || 0}
                        </div>
                        <p className="text-[11px] text-neutral-400">
                          Rate: ${booking.hourlyRate || 0}/hr
                        </p>
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        {renderStatusBadge(booking.status)}
                      </td>

                      {/* Cancel Action */}
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        {booking.status?.toLowerCase() === "pending" ? (
                          <button
                            type="button"
                            onClick={() => setBookingToCancel(booking)}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-500 hover:text-white dark:border-rose-900/30 dark:bg-rose-950/20 dark:text-rose-400 dark:hover:bg-rose-600 dark:hover:text-white transition"
                          >
                            <Ban className="h-3 w-3" />
                            Cancel Booking
                          </button>
                        ) : (
                          <span className="text-xs text-neutral-400 italic">No action</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Shadcn-like Cancellation Modal Dialog */}
        {bookingToCancel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-neutral-950/70 backdrop-blur-sm transition-opacity"
              onClick={() => !cancelling && setBookingToCancel(null)}
            />

            <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:bg-neutral-900 dark:border dark:border-neutral-800 z-10 text-center">
              <button
                onClick={() => setBookingToCancel(null)}
                disabled={cancelling}
                className="absolute right-4 top-4 rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 mb-4">
                <AlertTriangle className="h-7 w-7 stroke-[2]" />
              </div>

              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Cancel Studio Reservation?
              </h3>

              <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed px-2">
                Are you sure you want to cancel your reservation for{" "}
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                  {`"${bookingToCancel.studioTitle || bookingToCancel.studioName || "Studio Space"}"`}
                </span>
                ? This pending slot will be released for other creators.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  disabled={cancelling}
                  onClick={() => setBookingToCancel(null)}
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