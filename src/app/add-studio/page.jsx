// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { authClient } from "@/lib/auth-client";
// import { getTokenFromClient } from "@/lib/getTokenFromClient";
// import toast from "react-hot-toast";
// import {
//   Building2,
//   MapPin,
//   DollarSign,
//   Users,
//   Image as ImageIcon,
//   FileText,
//   Sparkles,
//   PlusCircle,
//   Loader2,
// } from "lucide-react";

// export default function AddStudioPage() {
//   const router = useRouter();
//   const { data: session } = authClient.useSession();
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     category: "Photography",
//     location: "",
//     pricePerHour: "",
//     deposit: "100",
//     maxCrew: "15",
//     image: "",
//     description: "",
    
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const token = await getTokenFromClient();

//       const payload = {
//         name: formData.name.trim(),
//         category: formData.category,
//         location: formData.location.trim(),
//         pricePerHour: Number(formData.pricePerHour),
//         deposit: Number(formData.deposit) ,
//         maxCrew: Number(formData.maxCrew) ,
//         image: formData.image.trim(),
//         description: formData.description.trim(),
        
//         rating: 5.0,
//         reviewsCount: 0,
//         host: {
//           name: session?.user?.name || "Host",
//           email: session?.user?.email,
//           image: session?.user?.image || "",
//         },
//         createdAt: new Date().toISOString(),
//       };

//       const serverUrl =
//         process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

//       const res = await fetch(`${serverUrl}/studios`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         credentials: "include",
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json().catch(() => null);

//       if (!res.ok) {
//         throw new Error(data?.message || "Failed to publish studio space");
//       }

//       toast.success("Studio published successfully!");
//       router.push("/my-listings");
//       router.refresh();
//     } catch (error) {
//       console.error("Create error:", error);
//       toast.error(error.message || "Failed to create studio");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full min-h-screen bg-neutral-50/50 py-10 px-4 sm:px-6 lg:px-8 dark:bg-neutral-950 transition-colors">
//       <div className="mx-auto max-w-3xl">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-3">
//             <Sparkles className="h-3.5 w-3.5" />
//             Host Workspace Portal
//           </div>
//           <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
//             List a New Creative Studio
//           </h1>
//           <p className="mt-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
//             Publish your creative production facility, soundstage, or photography loft to our creator network.
//           </p>
//         </div>

//         {/* Clean Light Card Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="space-y-6 rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:p-8"
//         >
//           {/* Studio Name */}
//           <div>
//             <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
//               <Building2 className="h-4 w-4 text-amber-500" />
//               Studio Title
//             </label>
//             <input
//               type="text"
//               name="name"
//               required
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="e.g. Apex Motion Daylight Loft"
//               className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
//             />
//           </div>

//           {/* Category & Location */}
//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//             <div>
//               <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
//                 <Sparkles className="h-4 w-4 text-amber-500" />
//                 Category
//               </label>
//               <select
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
//               >
//                 <option value="Photography">Photography Studio</option>
//                 <option value="Music">Music / Recording Suite</option>
//                 <option value="Dance">Dance / Rehearsal Hall</option>
//                 <option value="Podcast">Podcast Loft</option>
//                 <option value="Art">Art & Ceramic Workshop</option>
//               </select>
//             </div>

//             <div>
//               <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
//                 <MapPin className="h-4 w-4 text-amber-500" />
//                 Location
//               </label>
//               <input
//                 type="text"
//                 name="location"
//                 required
//                 value={formData.location}
//                 onChange={handleChange}
//                 placeholder="e.g. Banani, Dhaka"
//                 className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
//               />
//             </div>
//           </div>

//           {/* Pricing & Capacity */}
//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
//             <div>
//               <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
//                 <DollarSign className="h-4 w-4 text-amber-500" />
//                 Price / Hour ($)
//               </label>
//               <input
//                 type="number"
//                 name="pricePerHour"
//                 required
//                 min="1"
//                 value={formData.pricePerHour}
//                 onChange={handleChange}
//                 placeholder="45"
//                 className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
//               />
//             </div>

//             <div>
//               <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
//                 <DollarSign className="h-4 w-4 text-amber-500" />
//                 Deposit ($)
//               </label>
//               <input
//                 type="number"
//                 name="deposit"
//                 value={formData.deposit}
//                 onChange={handleChange}
//                 placeholder="100"
//                 className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
//               />
//             </div>

//             <div>
//               <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
//                 <Users className="h-4 w-4 text-amber-500" />
//                 Max Crew
//               </label>
//               <input
//                 type="number"
//                 name="maxCrew"
//                 value={formData.maxCrew}
//                 onChange={handleChange}
//                 placeholder="15"
//                 className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
//               />
//             </div>
//           </div>

//           {/* Image URL */}
//           <div>
//             <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
//               <ImageIcon className="h-4 w-4 text-amber-500" />
//               Cover Image URL
//             </label>
//             <input
//               type="url"
//               name="image"
//               required
//               value={formData.image}
//               onChange={handleChange}
//               placeholder="https://images.unsplash.com/..."
//               className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
//             />
//           </div>

         

//           {/* Description */}
//           <div>
//             <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
//               <FileText className="h-4 w-4 text-amber-500" />
//               Studio Description
//             </label>
//             <textarea
//               name="description"
//               required
//               rows={4}
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Describe gear specifications, ambient acoustics, natural lighting, and floor plans..."
//               className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-xs font-bold text-neutral-950 shadow-md shadow-amber-500/20 hover:bg-amber-400 active:scale-[0.99] transition disabled:opacity-50"
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="h-4 w-4 animate-spin" />
//                 Publishing Workspace...
//               </>
//             ) : (
//               <>
//                 <PlusCircle className="h-4 w-4" />
//                 Publish Studio Listing
//               </>
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { 
//   Building2, 
//   Layers, 
//   DollarSign, 
//   ShieldCheck, 
//   Users, 
//   MapPin, 
//   Image as ImageIcon, 
//   FileText, 
//   ArrowRight,
//   Check
// } from "lucide-react";

// const AMENITIES_LIST = [
//   "Cyclorama Wall",
//   "Soundproofing",
//   "DMX Lighting Grid",
//   "High-Speed Wi-Fi",
//   "Air Conditioning",
//   "Dressing & Makeup Room",
//   "Audio Interface & Mics",
//   "Prop Selection",
//   "Freight Elevator",
//   "Free Parking"
// ];

// const CATEGORIES = [
//   "Soundstage",
//   "Photo Studio",
//   "Podcast Studio",
//   "Dance / Rehearsal",
//   "Film & Video Production"
// ];

//  function AddStudioPage() {
//   const router = useRouter();
//   const [submitting, setSubmitting] = useState(false);
//   const [formData, setFormData] = useState({
//     title: "",
//     category: "",
//     hourlyRate: "",
//     deposit: "",
//     capacity: "",
//     location: "",
//     image: "",
//     amenities: [],
//     rules: ""
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const toggleAmenity = (item) => {
//     setFormData((prev) => {
//       const exists = prev.amenities.includes(item);
//       return {
//         ...prev,
//         amenities: exists 
//           ? prev.amenities.filter((a) => a !== item)
//           : [...prev.amenities, item]
//       };
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);

//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/studios`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData)
//       });

//       if (res.ok) {
//         router.push("/studios");
//       } else {
//         alert("Failed to publish studio space.");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong!");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen py-10 px-4 max-w-4xl mx-auto">
//       <form onSubmit={handleSubmit} className="space-y-6">
        
//         {/* Studio Title */}
//         <div>
//           <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-2">
//             Studio Title / Space Name
//           </label>
//           <div className="relative">
//             <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
//             <input
//               type="text"
//               name="title"
//               required
//               value={formData.title}
//               onChange={handleChange}
//               placeholder="e.g. Apex 4K Soundstage & Cyclorama"
//               className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
//             />
//           </div>
//         </div>

//         {/* Category & Hourly Rate */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-2">
//               Category
//             </label>
//             <div className="relative">
//               <Layers className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
//               <select
//                 name="category"
//                 required
//                 value={formData.category}
//                 onChange={handleChange}
//                 className="w-full pl-10 pr-8 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none"
//               >
//                 <option value="">Select studio type</option>
//                 {CATEGORIES.map((cat) => (
//                   <option key={cat} value={cat}>{cat}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div>
//             <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-2">
//               Hourly Rate ($)
//             </label>
//             <div className="relative">
//               <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
//               <input
//                 type="number"
//                 name="hourlyRate"
//                 required
//                 value={formData.hourlyRate}
//                 onChange={handleChange}
//                 placeholder="e.g. 65"
//                 className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Security Deposit & Max Capacity */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-2">
//               Security Deposit ($)
//             </label>
//             <div className="relative">
//               <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
//               <input
//                 type="number"
//                 name="deposit"
//                 value={formData.deposit}
//                 onChange={handleChange}
//                 placeholder="e.g. 100"
//                 className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-2">
//               Max Crew Capacity
//             </label>
//             <div className="relative">
//               <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
//               <input
//                 type="number"
//                 name="capacity"
//                 required
//                 value={formData.capacity}
//                 onChange={handleChange}
//                 placeholder="e.g. 20"
//                 className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Location */}
//         <div>
//           <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-2">
//             Location / Physical Address
//           </label>
//           <div className="relative">
//             <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
//             <input
//               type="text"
//               name="location"
//               required
//               value={formData.location}
//               onChange={handleChange}
//               placeholder="e.g. 42 Creative District, Banani, Dhaka"
//               className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
//             />
//           </div>
//         </div>

//         {/* Studio Image URL */}
//         <div>
//           <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-2">
//             Studio Image URL
//           </label>
//           <div className="relative">
//             <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
//             <input
//               type="url"
//               name="image"
//               required
//               value={formData.image}
//               onChange={handleChange}
//               placeholder="https://images.unsplash.com/photo-..."
//               className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
//             />
//           </div>
//         </div>

//         {/* Available Amenities */}
//         <div>
//           <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-3">
//             Available Amenities & Gear (Select all that apply)
//           </label>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
//             {AMENITIES_LIST.map((item) => {
//               const selected = formData.amenities.includes(item);
//               return (
//                 <button
//                   type="button"
//                   key={item}
//                   onClick={() => toggleAmenity(item)}
//                   className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-xs font-medium transition text-left ${
//                     selected
//                       ? "border-amber-500 bg-amber-50 text-amber-900 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-500"
//                       : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 text-neutral-700 dark:text-neutral-300"
//                   }`}
//                 >
//                   <div className={`h-4 w-4 rounded border flex items-center justify-center transition ${
//                     selected 
//                       ? "bg-amber-500 border-amber-500 text-white" 
//                       : "border-neutral-300 dark:border-neutral-700"
//                   }`}>
//                     {selected && <Check className="h-3 w-3 stroke-[3]" />}
//                   </div>
//                   {item}
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Detailed Overview & Rules */}
//         <div>
//           <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-2">
//             Detailed Overview & Rules
//           </label>
//           <div className="relative">
//             <FileText className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-400" />
//             <textarea
//               name="rules"
//               rows={4}
//               required
//               value={formData.rules}
//               onChange={handleChange}
//               placeholder="Detail ceiling height, electrical outlets, access instructions, soundproofing specs, and gear lists..."
//               className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
//             />
//           </div>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={submitting}
//           className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition"
//         >
//           {submitting ? "Publishing..." : "Publish Studio Space"}
//           <ArrowRight className="h-4 w-4" />
//         </button>
//       </form>
//     </div>
//   );
// }
// export default AddStudioPage;




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