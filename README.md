# 🎬 StudioSpace — Peer-to-Peer Creative Studio Booking Platform

**StudioSpace** is a modern, full-stack peer-to-peer creative workspace and studio booking marketplace built with **Next.js (App Router)**, **Node.js/Express**, **MongoDB**, and **Better-Auth**. Creators, photographers, podcasters, and filmmakers can explore available studios, publish their own workspaces, manage listings, and book creative slots seamlessly.

🔗 **Live Website:** [https://your-studiospace-live-url.vercel.app](https://your-studiospace-live-url.vercel.app)  
🔗 **Server API URL:** [https://your-studiospace-server.vercel.app](https://your-studiospace-server.vercel.app)  
🔗 **Client Repository:** [https://github.com/your-username/studiospace-client](https://github.com/your-username/studiospace-client)  
🔗 **Server Repository:** [https://github.com/your-username/studiospace-server](https://github.com/your-username/studiospace-server)

---

## ✨ Key Features

- **🔐 Secure Authentication & Route Protection:** Powered by **Better-Auth** with session persistence on page reload, protected private routes (`/add-studio`, `/my-listings`, `/my-bookings`), and automatic callback redirection after login.
- **🏢 Studio Discovery & Dynamic Filtering:** Browse all available creative workspaces on `/studios` with category filtering, real-time search, detailed studio specifications, transparent hourly pricing, and security deposit breakdowns.
- **📅 Interactive Slot Reservation System:** Reserve studios directly from the studio details page via a dynamic booking modal with shoot date selection, custom start/end hours, crew count validation, and automated total cost calculation.
- **📋 Personal Booking Management (`/my-bookings`):** Track all personal reservations in a clean dashboard table displaying shoot dates, time slots, total costs, live status badges (`Pending`, `Confirmed`, `Completed`, `Cancelled`), and a confirmation modal to cancel pending bookings.
- **🛠️ Host Workspace Management (`/add-studio` & `/my-listings`):** Publish new creative studios to the marketplace and manage, update, or delete user-owned studio listings filtered strictly by the logged-in owner's email.
- **🌓 Responsive UI & Dark/Light Mode:** Fully responsive interface across mobile, tablet, and desktop devices with seamless theme switching and toast notifications.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS, Shadcn UI, Lucide React Icons
- **Authentication:** Better-Auth (`authClient`)
- **Notifications:** React Hot Toast

### Backend & Database
- **Runtime & Framework:** Node.js, Express.js
- **Database:** MongoDB (Native Driver / Atlas)
- **Deployment:** Vercel

---

## 🧪 Examiner Test Credentials

Use the following credentials to test private routes, studio creation, and the booking workflow:

- **Email:** `examiner@studiospace.com` *(তোমার রেজিস্টার করা টেস্ট ইমেইল দাও)*
- **Password:** `Test@1234` *(তোমার টেস্ট পাসওয়ার্ড দাও)*

---

## 🚀 Local Setup & Installation

Follow these steps to run the project locally:

### 1. Clone the Repositories
```bash
git clone [https://github.com/your-username/studiospace-client.git](https://github.com/your-username/studiospace-client.git)
cd studiospace-client