import Link from "next/link";
import { Aperture, ArrowLeft, Compass, Film } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[85vh] w-full flex-col items-center justify-center bg-white px-4 py-16 dark:bg-neutral-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        
        {/* Creative Visual Icon Badge */}
        <div className="relative mx-auto mb-8 flex h-28 w-28 items-center justify-center">
          <div className="absolute inset-0 rounded-3xl bg-amber-500/15 blur-xl dark:bg-amber-500/10" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-neutral-200 bg-neutral-50 shadow-inner dark:border-neutral-800 dark:bg-neutral-900">
            <Aperture className="h-12 w-12 text-amber-500 stroke-[1.8] animate-[spin_12s_linear_infinite]" />
            <Film className="absolute -bottom-2 -right-2 h-7 w-7 rounded-lg border border-neutral-200 bg-white p-1 text-neutral-800 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200" />
          </div>
        </div>

        {/* 404 Headline */}
        <p className="text-sm font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
          Scene Not Found • 404
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
          Out of Frame & Offline
        </h1>
        <p className="mt-3 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400 sm:text-sm">
          The creative soundstage, cyclorama loft, or studio resource you are looking for has been relocated or is off the grid.
        </p>

        {/* Navigation CTAs */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-xs font-bold text-neutral-950 shadow-md shadow-amber-500/20 transition-all hover:bg-amber-400 active:scale-95 sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to Home
          </Link>
          <Link
            href="/studios"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-6 py-3 text-xs font-bold text-neutral-800 transition-all hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 sm:w-auto"
          >
            <Compass className="h-4 w-4 text-amber-500" />
            Explore Workspaces
          </Link>
        </div>

      </div>
    </main>
  );
}