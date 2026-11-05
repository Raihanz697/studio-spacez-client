"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
    Building2,
    MapPin,
    Pencil,
    Trash2,
    Plus,
    AlertTriangle,
    X,
    Sparkles,
    Loader2,
    Layers,
    ArrowRight,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function MyListingsPage() {
    const router = useRouter();
    const { data: session, isPending: sessionLoading } = authClient.useSession();
    const user = session?.user;

    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);


    const [selectedStudioToDelete, setSelectedStudioToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);


    useEffect(() => {
        if (!sessionLoading && !user) {
            toast.error("Please login to view your studio listings!");
            router.push("/login?callbackUrl=/my-listings");
        }
    }, [sessionLoading, user, router]);


    useEffect(() => {
        async function fetchMyStudios() {
            if (!user?.email) return;

            try {
                const serverUrl =
                    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";
                const res = await fetch(
                    `${serverUrl}/my-studios?email=${encodeURIComponent(user.email)}`
                );
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data)) {
                        setListings(data);
                    }
                }
            } catch (err) {
                console.error("Failed to load listings:", err);
            } finally {
                setLoading(false);
            }
        }

        if (user?.email) {
            fetchMyStudios();
        } else if (!sessionLoading && !user) {
            setLoading(false);
        }
    }, [user, sessionLoading]);


    const handleConfirmDelete = async () => {
        if (!selectedStudioToDelete) return;
        setDeleting(true);

        try {
            const serverUrl =
                process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";
            const res = await fetch(
                `${serverUrl}/studios/${selectedStudioToDelete._id}`,
                {
                    method: "DELETE",
                }
            );

            if (!res.ok) {
                throw new Error("Failed to delete studio");
            }


            setListings((prev) =>
                prev.filter((item) => item._id !== selectedStudioToDelete._id)
            );

            toast.success("Studio listing removed successfully.");
            setSelectedStudioToDelete(null);
        } catch (error) {
            toast.error(error.message || "Could not delete studio. Please try again.");
        } finally {
            setDeleting(false);
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


                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-3">
                            <Sparkles className="h-3.5 w-3.5" />
                            Host Workspace Control Panel
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                            My Studio Listings
                        </h1>
                        <p className="mt-1 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                            Manage, update workspace specifications, and control your active creative spaces.
                        </p>
                    </div>

                    <Link
                        href="/add-studio"
                        className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-neutral-950 shadow-md shadow-amber-500/20 hover:bg-amber-400 active:scale-95 transition-all self-start sm:self-auto"
                    >
                        <Plus className="h-4 w-4 stroke-[2.5]" />
                        Add New Studio
                    </Link>
                </div>


                {loading ? (
                    <div className="py-20 flex justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
                    </div>
                ) : listings.length === 0 ? (
                    /* Empty State */
                    <div className="py-20 text-center rounded-3xl border border-dashed border-neutral-300 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/40">
                        <Building2 className="mx-auto h-12 w-12 text-neutral-400 mb-3 stroke-[1.5]" />
                        <h3 className="text-base font-bold text-neutral-800 dark:text-neutral-200">
                            You haven&apos;t listed any creative studios yet
                        </h3>
                        <p className="mt-1 text-xs text-neutral-400 max-w-sm mx-auto">
                            Start earning by sharing your sound stage, photography cyclorama, or rehearsal space with creators.
                        </p>
                        <Link
                            href="/add-studio"
                            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-neutral-950 hover:bg-amber-400 transition"
                        >
                            List Your First Studio
                            <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>
                ) : (
                    /* Responsive  */
                    <div className="overflow-hidden rounded-3xl border border-neutral-200/80 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-neutral-200/80 bg-neutral-50/50 text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:border-neutral-800 dark:bg-neutral-950/40 dark:text-neutral-400">
                                        <th className="py-4 px-6">Studio Workspace</th>
                                        <th className="py-4 px-6">Category</th>
                                        <th className="py-4 px-6">Pricing</th>
                                        <th className="py-4 px-6">Location</th>
                                        <th className="py-4 px-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60 text-sm">
                                    {listings.map((studio) => (
                                        <tr
                                            key={studio._id}
                                            className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors"
                                        >
                                            {/* Image & Title */}
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800">
                                                        <img
                                                            src={studio.image}
                                                            alt={studio.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <Link
                                                            href={`/studios/${studio._id}`}
                                                            className="font-bold text-neutral-900 hover:text-amber-500 dark:text-white dark:hover:text-amber-400 transition-colors line-clamp-1"
                                                        >
                                                            {studio.name}
                                                        </Link>
                                                        <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1">
                                                            Max Crew: {studio.maxCrew || 15} creators
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Category */}
                                            <td className="py-4 px-6 whitespace-nowrap">
                                                <span className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-100 px-2.5 py-1 text-xs font-semibold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                                                    <Layers className="h-3 w-3 text-amber-500" />
                                                    {studio.category}
                                                </span>
                                            </td>

                                            {/* Pricing */}
                                            <td className="py-4 px-6 whitespace-nowrap">
                                                <div className="text-neutral-900 dark:text-white font-bold">
                                                    ${studio.pricePerHour}{" "}
                                                    <span className="text-xs font-normal text-neutral-400">
                                                        / hr
                                                    </span>
                                                </div>
                                                <p className="text-[11px] text-neutral-400">
                                                    Deposit: ${studio.deposit || 100}
                                                </p>
                                            </td>

                                            {/* Location */}
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 max-w-xs truncate">
                                                    <MapPin className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                                                    <span className="truncate">{studio.location}</span>
                                                </div>
                                            </td>

                                            {/* Actions */}
                                            <td className="py-4 px-6 text-right whitespace-nowrap">
                                                <div className="inline-flex items-center gap-2">
                                                    {/* Update Link */}
                                                    <Link
                                                        href={`/studios/edit/${studio._id}`}
                                                        className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3 py-1.5 text-xs font-bold text-neutral-700 hover:bg-neutral-100 hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 transition"
                                                    >
                                                        <Pencil className="h-3 w-3 text-amber-500" />
                                                        Update
                                                    </Link>

                                                    {/* Delete Action (Triggers Confirmation Modal) */}
                                                    <button
                                                        type="button"
                                                        onClick={() => setSelectedStudioToDelete(studio)}
                                                        className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-500 hover:text-white dark:border-rose-900/30 dark:bg-rose-950/20 dark:text-rose-400 dark:hover:bg-rose-600 dark:hover:text-white transition"
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* DELETE CONFIRMATION MODAL DIALOG */}
                {selectedStudioToDelete && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 bg-neutral-950/70 backdrop-blur-sm transition-opacity"
                            onClick={() => !deleting && setSelectedStudioToDelete(null)}
                        />

                        {/* Modal Box */}
                        <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:bg-neutral-900 dark:border dark:border-neutral-800 z-10 text-center">

                            <button
                                onClick={() => setSelectedStudioToDelete(null)}
                                disabled={deleting}
                                className="absolute right-4 top-4 rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-white"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 mb-4">
                                <AlertTriangle className="h-7 w-7 stroke-[2]" />
                            </div>

                            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                                Delete Studio Listing?
                            </h3>

                            <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed px-2">
                                Are you sure you want to permanently remove{" "}
                                <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                                    {`"${selectedStudioToDelete.name}"`}
                                </span>
                                ? This will remove the workspace from public discovery and search.
                            </p>

                            <div className="mt-6 flex items-center gap-3">
                                <button
                                    type="button"
                                    disabled={deleting}
                                    onClick={() => setSelectedStudioToDelete(null)}
                                    className="flex-1 rounded-xl border border-neutral-200 py-2.5 text-xs font-bold text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-800 transition"
                                >
                                    Keep Listing
                                </button>

                                <button
                                    type="button"
                                    disabled={deleting}
                                    onClick={handleConfirmDelete}
                                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-rose-600 py-2.5 text-xs font-bold text-white hover:bg-rose-700 shadow-md shadow-rose-600/20 transition disabled:opacity-60"
                                >
                                    {deleting ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Deleting...
                                        </>
                                    ) : (
                                        "Confirm Delete"
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