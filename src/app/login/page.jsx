"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Aperture,
    Mail,
    Lock,
    Eye,
    EyeOff,
    AlertCircle,
    ArrowRight,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        const form = e.target;
        const email = form.email.value.trim();
        const password = form.password.value;

        setLoading(true);

        try {
            const { data, error } = await authClient.signIn.email({
                email,
                password,
            });

            if (error) {
                setErrorMessage(error.message || "Invalid email or password.");
                return;
            }

            console.log("Login Successful Data:", data);

            // Login সফল হলে হোমপেজে পাঠানো হবে
            router.push("/");
            router.refresh();
        } catch (err) {
            console.error(err);
            setErrorMessage("Something went wrong. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (err) {
            console.error(err);
            setErrorMessage("Google Login failed. Please try again.");
        }
    };

    return (
        <main className="w-full flex items-center justify-center py-16 px-4">
            <div className="w-full max-w-[440px] mx-auto">

                {/* Brand Header */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 group mb-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 text-neutral-950 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
                            <Aperture className="h-5 w-5 stroke-[2.2]" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                            Studio<span className="text-amber-500">Space</span>
                        </span>
                    </Link>
                    <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                        Login
                    </h1>
                    <p className="mt-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                        Login to your account to manage bookings and listings
                    </p>
                </div>

                {/* Minimalist Card */}
                <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-9 shadow-xl shadow-neutral-200/40 dark:border-neutral-800 dark:bg-neutral-900/90 dark:shadow-none">
                    <form onSubmit={handleLogin} className="space-y-4">

                        {/* Email Address */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    required
                                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 py-3 pl-10 pr-4 text-sm text-neutral-900 placeholder-neutral-400 focus:border-amber-500 focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-amber-500 transition-all"
                                />
                            </div>
                        </div>

                        
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    required
                                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 py-3 pl-10 pr-11 text-sm text-neutral-900 placeholder-neutral-400 focus:border-amber-500 focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-amber-500 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Error Message */}
                        {errorMessage && (
                            <div className="flex items-start gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-600 dark:text-rose-400">
                                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                                <span>{errorMessage}</span>
                            </div>
                        )}

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-3.5 text-sm font-bold text-neutral-950 shadow-md shadow-amber-500/20 hover:bg-amber-400 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? "Logging in..." : "Login"}
                            {!loading && <ArrowRight className="h-4 w-4" />}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6 text-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-neutral-200 dark:border-neutral-800" />
                        </div>
                        <span className="relative bg-white px-3 text-xs font-medium text-neutral-400 dark:bg-neutral-900">
                            Or continue with
                        </span>
                    </div>

                    {/* Google Login Button */}
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-3 rounded-xl border border-neutral-200 bg-white py-3 text-xs sm:text-sm font-semibold text-neutral-800 hover:bg-neutral-50 active:scale-[0.98] transition-all dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200 dark:hover:bg-neutral-800"
                    >
                        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                            />
                        </svg>
                        Google
                    </button>

                    {/* Link to Register */}
                    <p className="mt-7 text-center text-xs text-neutral-500 dark:text-neutral-400">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/register"
                            className="font-bold text-amber-500 hover:text-amber-400 transition"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}