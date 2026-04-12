<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Workspace Instructions for Beyond Abroad

This file is the shared project-level agent guidance for `beyond-abroad`. Use it when adding features, fixing bugs, or editing frontend pages and layout.

## Project overview

- Frontend-only Next.js app using the App Router.
- TypeScript + React 19 + Tailwind CSS v4.
- `pnpm` is the package manager.
- Uses `eslint` and `prettier` for formatting and linting.
- Includes Sanity integration (`@sanity/client`, `next-sanity`), `next-intl`, `resend`, and `zod`.
- Source entry is under `src/app` with global styles in `src/app/globals.css`.

## Primary agent goals

- Keep code idiomatic to Next.js App Router conventions.
- Prefer TypeScript and typed `zod` validation whenever adding new data or forms.
- Use Tailwind CSS classes for styling and avoid custom CSS unless necessary.
- Keep changes minimal unless the task explicitly requires broad refactoring.
- Preserve existing app structure and avoid introducing legacy `pages/` router patterns.

## Key files and folders

- `package.json` - scripts, dependencies, package manager.
- `tsconfig.json` - TypeScript configuration.
- `next.config.ts` - Next.js configuration.
- `eslint.config.mjs` - linting configuration.
- `postcss.config.mjs` - PostCSS / Tailwind config.
- `src/app/layout.tsx` - root layout and metadata.
- `src/app/page.tsx` - home page entry point.
- `src/app/globals.css` - global styles.

## Recommended commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
```

## Coding guidance

- Use `import` / ESM syntax across the codebase.
- Use `className` on React elements, not `class`.
- Prefer semantic HTML and accessible markup.
- When adding routes, use `src/app/<route>/page.tsx` and `src/app/<route>/layout.tsx` if needed.
- If a new page requires localization support, follow `next-intl` conventions.
- If validation is needed, use `zod` and keep schema definitions close to the behavior.

## What to avoid

- Do not add or rely on legacy `pages/` folder routes.
- Do not mix CommonJS `require()` with ESM imports.
- Do not introduce runtime-only dependencies without verifying compatibility with Next.js 16.2.
- Avoid changing global project tooling unless the task explicitly requires it.

## Notes

- The current app is small and starter-style. Keep changes aligned with its minimal file layout.
- There is no existing backend/API layer in the repo yet, so API routes should be added under `src/app/api` only when required.
- Refer to `node_modules/next/dist/docs/` for Next.js-specific App Router guidance when in doubt.

## Suggested next customizations

- Add a file-specific instruction for `src/app/**` to enforce App Router and route layout patterns.
- Add a prompt for "Create a new page with metadata, layout, and Tailwind styling."
- Add a skill for "Integrate Sanity content into a Next.js page" or "Add localized page content with `next-intl`."
