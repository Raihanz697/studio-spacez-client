"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Aperture,
  User,
  Mail,
  Lock,
  ImageIcon,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Requirement: Strict Password Validation Rules
  const validatePassword = (password) => {
    if (!password || password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter (A-Z).";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter (a-z).";
    }
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const image = imageUrl.trim();

    // 1. Password validation check
    const validationError = validatePassword(password);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setLoading(true);

    try {
      // 2. Call BetterAuth signup
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image,
      });

      if (error) {
        setErrorMessage(error.message || "Registration failed. Please try again.");
        console.error("Signup Error:", error);
        return;
      }

      console.log("Signup Successful Data:", data);

      // Requirement: On successful registration, redirect to login page
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("Registration Exception:", err);
      setErrorMessage("Something went wrong during registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      console.error(err);
      setErrorMessage("Google Sign-In failed. Please try again.");
    }
  };

  return (
    <main className="w-full flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-[460px] mx-auto">

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
            Create Account
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            Join StudioSpace as a creator or workspace host
          </p>
        </div>

        {/* Minimalist Card */}
        <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-9 shadow-xl shadow-neutral-200/40 dark:border-neutral-800 dark:bg-neutral-900/90 dark:shadow-none">

          <form onSubmit={handleRegister} className="space-y-4">

            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  required
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 py-3 pl-10 pr-4 text-sm text-neutral-900 placeholder-neutral-400 focus:border-amber-500 focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-amber-500 transition-all"
                />
              </div>
            </div>

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

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Min 6 chars (A-Z & a-z required)"
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

            {/* Profile Photo URL & Dynamic Preview */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                Profile Photo URL
              </label>
              <div className="relative">
                <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="url"
                  name="image"
                  placeholder="ImgBB, S3, or direct image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 py-3 pl-10 pr-4 text-sm text-neutral-900 placeholder-neutral-400 focus:border-amber-500 focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-amber-500 transition-all"
                />
              </div>

              {imageUrl && (
                <div className="mt-3 flex items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-2.5 dark:border-neutral-800 dark:bg-neutral-950">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-amber-500/40">
                    <img
                      src={imageUrl}
                      alt="Avatar Preview"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-neutral-900 dark:text-white">Profile Photo Preview</p>
                    <p className="text-[11px] text-neutral-400 truncate max-w-[210px]">{imageUrl}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="flex items-start gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-600 dark:text-rose-400">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-3.5 text-sm font-bold text-neutral-950 shadow-md shadow-amber-500/20 hover:bg-amber-400 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Registering Account..." : "Create Account"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200 dark:border-neutral-800" />
            </div>
            <span className="relative bg-white px-3 text-xs font-medium text-neutral-400 dark:bg-neutral-900">
              Or sign up with
            </span>
          </div>

          {/* Google Sign Up */}
          <button
            type="button"
            onClick={handleGoogleRegister}
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
            Sign Up With Google
          </button>

          {/* Link to Login */}
          <p className="mt-7 text-center text-xs text-neutral-500 dark:text-neutral-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-amber-500 hover:text-amber-400 transition"
            >
              Sign In
            </Link>
          </p>

        </div>
      </div>
    </main>
  );
}