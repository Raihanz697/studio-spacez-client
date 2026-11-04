<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Stack

- Next.js 16 (App Router), React 19, React Compiler enabled (`reactCompiler: true` in `next.config.ts`)
- Tailwind CSS v4 on Turbopack dev (`next dev` runs Turbopack; CSS loaders for `*.css` are in `next.config.ts`)
- shadcn/ui components in `src/components/ui` (style `base-nova`, `rsc: true`); add more with `npx shadcn@latest add <name>`
- Icons: lucide-react; `cn` helper re-exported from `src/lib/utils.ts`; hooks in `src/hooks/`
- Path alias `@/*` → `./src/*`

## Commands (npm)

- `npm run dev` — dev server at http://localhost:3000 (Turbopack)
- `npm run build` — production build (also runs TypeScript checking; output in `.next/`, gitignored)
- `npm run start` — production server; requires `build` first
- `npm run lint` — ESLint v9 flat config (`eslint.config.mjs`, extends `eslint-config-next`)
- No test runner or test script is installed; there is no `npm test` and no `__tests__`/fixtures directory

## Conventions / gotchas

- Styling: Tailwind v4 theme in `src/app/globals.css` (`@import "tailwindcss"`, `@theme inline` CSS variables, `@custom-variant dark`). Add theme variables there rather than arbitrary CSS.
- `src/app/layout.tsx` loads Josefin Sans via `next/font/google`; keep that import when editing the layout.
- Server Components by default (App Router + `rsc: true`); add `'use client'` only where interactivity requires it.
- `next-env.d.ts` is auto-generated and gitignored — do not edit it.
- TypeScript: `strict`, `isolatedModules`, `noEmit`; `.env*` is gitignored.
- `.next/`, `out/`, `build/`, `node_modules`, `*.tsbuildinfo` are all gitignored build artifacts.
