# 🧪 Mol Class – Educational Chemistry Platform

Mol Class is a web application built to help students and teachers explore chemistry concepts through interactive tools, calculators, and visualizations.

It currently provides:

- An interactive periodic table with category highlights and responsive details panels.
- Chemical calculators (molar mass, scientific calculator, and foundations for more tools).
- Molecular visualization components that support 2D/3D exploration.
- A growing compound catalog for structured data browsing.
- Internationalization for both Portuguese and English with a modern, accessible UI.

> The platform is continuously evolving; new chemistry tools are added regularly.

---

## 🚀 Technology Stack

| Layer               | Technologies                                           |
| ------------------- | ----------------------------------------------------- |
| Frontend            | Next.js 15 (App Router, i18n, SSR)                    |
| UI/Styling          | Tailwind CSS + shadcn/ui + Framer Motion              |
| Language            | TypeScript (strict typing)                            |
| Global State        | Zustand                                               |
| Internationalization| `next-intl@4`                                          |
| PWA                 | `next-pwa` + Workbox                                   |
| Deployment          | Vercel                                                |

---

## 📂 Architecture Overview

The codebase follows a feature-oriented (domain-driven) structure:

- `src/features/periodic-table` – interactive periodic table with search and highlights.
- `src/features/calculators` – chemical calculators with modular containers and custom keyboards.
- `src/features/visualization` – molecular visualization building blocks.
- `src/features/catalog` – compound catalog foundation.
- `src/features/shared` – shared UI pieces like headers, layout, keyboard, and global stores.

Other notable directories:

- `src/app` – routes, layouts, and pages (App Router with `[locale]/`).
- `src/i18n` – message files and internationalization configuration.
- `src/shared` and `src/components` – layout, header, footer, and other reusable UI parts.
- `docs` – supporting guides (i18n, PWA setup, cookies, etc.).

For deeper implementation guidance, see:

- `src/features/periodic-table/README.md`
- `src/features/calculators/README.md`
- Documentation files inside `docs/`

---

## 🧩 Current Features

- **Periodic Table** (`src/features/periodic-table`): Cards with category emphasis, detail panel, internationalized search, and responsive navigation.
- **Chemical Calculators** (`src/features/calculators`): Molar mass, scientific calculator, and a modular base for future tools with keyboard and container components.
- **Molecular Visualization** (`src/features/visualization`): Components for rendering 2D/3D structures with animations and chemical data integration.
- **Compound Catalog** (`src/features/catalog`): Foundation for listing, filtering, and extending the molecular dataset.
- **Shared Elements** (`src/features/shared`): Header, layout, keyboard, buttons, and store logic that keep the UI and behavior consistent.

---

## 🌐 Internationalization (i18n)

The project uses `next-intl@4` with the App Router:

- Messages live in `src/i18n/messages/pt.json` and `src/i18n/messages/en.json`.
- Components fetch strings through `useTranslations()` with dedicated namespaces.
- New features should support both Portuguese and English from the start.

---

## 🔧 Running the Project

Requirements:

- Node.js LTS
- `pnpm` (the project declares `packageManager: "pnpm@..."`)

Install dependencies:

```bash
pnpm install
```

Development server:

```bash
pnpm dev
```

Production build:

```bash
pnpm build
```

Lint with auto-fix:

```bash
pnpm lint
```

Type checking:

```bash
pnpm typecheck
```
---
