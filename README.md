# StudioSpace
**Create. Collaborate. Capture.**

StudioSpace is a peer-to-peer creative studio booking marketplace. Creators, photographers, podcasters, and filmmakers discover, host, and reserve local workspaces like photography lofts, podcast rooms, sound labs, and production studios.

Live site: https://studio-spacez-client.vercel.app/

## Features
- **Explore creative spaces** — browse all available studios on a responsive grid, search by title or location, and filter by category.
- **Interactive slot reservation** — book any workspace via a pop-up reservation modal with shoot date picker, custom start/end hours, crew count validation, and automated total cost breakdown.
- **Manage your bookings** — track all reserved studios in one dashboard table with shoot schedules, total costs, live status badges (`Pending`, `Confirmed`, `Completed`, `Cancelled`), and a confirmation modal to cancel pending slots.
- **Host & manage listings** — publish new creative studios to the marketplace and update or delete your own workspaces filtered strictly by your host account.
- **Protected private routes** — pages like `/add-studio`, `/my-listings`, and `/my-bookings` automatically redirect unauthenticated users to login with callback return support.
- **Light and dark theme** — switch seamlessly between light and dark modes across the entire platform.

## Screenshots

### Explore Studios
Every card links to the studio details page, where you can review specs and reserve a slot.
![Explore Studios](./public/screenshots/explore-studios.png/)

### Studio Details & Booking Modal
Review hourly rates, refundable security deposits, and reserve your shoot date and hours.
![Booking Modal](./public/screenshots/booking-modal.png/)

### My Bookings
Everything you reserved, complete with shoot schedules, total cost, and status badges.
![My Bookings](./public/screenshots/my-bookings.png/)

### My Listings
Manage, edit, and remove the creative studios you host.
![My Listings](./public/screenshots/my-listings.png/)

## Pages

| Route | Access | What it does |
| :--- | :--- | :--- |
| `/` | Public | Hero banner, featured studios, platform highlights, and call-to-action |
| `/studios` | Public | All available studios with search and category filters |
| `/studios/[id]` | Public | Studio details, specs, pricing, and interactive booking modal (login required to book) |
| `/login`, `/register` | Public | Email/password authentication and account registration |
| `/add-studio` | Private | Publish a new creative workspace to the marketplace |
| `/my-listings` | Private | View, update, and delete the studios you host |
| `/my-bookings` | Private | Track your studio reservations and cancel pending slots |

## Tech stack
- **Framework:** Next.js (App Router), React
- **UI:** Tailwind CSS, shadcn/ui, lucide-react icons, react-hot-toast
- **Auth:** Better Auth with MongoDB adapter and session persistence
- **Backend:** Express.js + MongoDB — see the [server repository](https://github.com/Raihanz697/studio-spacez-server)

## Run it locally

1. Clone the repo and install packages:

git clone [https://github.com/Raihanz697/studio-spacez-client.git](https://github.com/Raihanz697/studio-spacez-client.git)
cd studio-spacez-client
npm install

