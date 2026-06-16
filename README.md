# PokeCraft Wiki

![PokeCraft Homepage](/public/homepage.png)

## Overview

PokeCraft Wiki is a Next.js web app that serves as a comprehensive, pixel-styled database for the Pokemon universe. Designed with a "blocky" voxel/retro-handheld aesthetic, it lets users browse and search the full national dex, dig into per-Pokemon detail (stats, abilities, evolutions, type matchups), and assemble teams to fight in an animated battle arena with selectable pixel-art biomes.

All Pokemon data comes from the [PokeAPI](https://pokeapi.co/), proxied and cached through the app's own API routes.

## Features

### Pokedex Wiki (`/wiki/[page]`)

- Paginated grid of the full national dex (20 per page) with name/ID search.
- **Type filter** and **region/generation filter** — custom pixel-themed dropdowns. Selections persist across pagination and navigation via `sessionStorage`.
- Cards display each Pokemon's **types**, **generation** (I–IX), and **region** (Kanto–Paldea).

### Pokemon detail (`/pokemon/[id]`)

- Tabbed layout: **About** (Pokedex entry, height/weight, abilities), **Stats** (pixel segmented base-stat bars + total), and **Evolution** (clickable evolution chain).
- **Combat Analysis** — weaknesses and strengths broken down by type, each with example Pokemon.
- **Custom cry player** — a pixel-styled audio player with a waveform progress bar.
- Skeleton loading states (no spinners).

### 3D / Pixel sprite toggle

- Switch globally between animated "3D" Showdown sprites and static pixel sprites. The choice is shared live across the wiki cards, detail sprite, evolution chain, and combat-analysis examples, and persisted in `sessionStorage`.

### Battle Arena (`/battle`)

- Build a team at **1v1, 3v3, or 6v6**. Add Pokemon via a searchable picker, **drag to reorder** (slot 1 leads), and remove individually.
- **Auto Pick** / **Auto Counter-Pick** — the system fills a team by choosing Pokemon whose types counter the opposing team (falling back to random), and is re-rollable.
- Battles resolve as a **sequential bracket**: leads fight, the loser is eliminated, the winner stays. Each duel is decided by **type effectiveness + base-stat total**, and the log explains *why* ("super-effective", "higher base stats", etc.).
- The fight plays out **inline** as an **animated pixel battle scene** — back/front sprites on grassy platforms, HP bars, fainting animations, party trays showing status, and a click-through dialog box.
- **15 selectable biomes** (Meadow, Morning, Night, Snow, Desert, Sakura, Autumn, Sunset, Twilight, Volcano, Swamp, Beach, Cave, Cosmic, Rainy) — each with themed skies, foliage (trees/pines/cacti/palms/rocks/dead trees), a sun or moon, stars, and weather particles (snow, petals, embers, rain).

## Routes

| Route | Description |
| --- | --- |
| `/` | Landing page with hero, feature highlights, and sprite marquee |
| `/wiki` → `/wiki/1` | Paginated, filterable Pokedex |
| `/pokemon/[id]` | Pokemon detail page |
| `/battle` | Team builder + battle arena |
| `/api/v1/pokemon` | List/search (enriched with types) |
| `/api/v1/pokemon/[id]` | Full detail (stats, evolution, computed type matchups) |
| `/api/v1/type/[name]` | Type data |

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack, React Compiler) with React 19.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4, `Press Start 2P` + Pokemon-Solid fonts, and a custom blocky/pixel design system.
- **Icons**: [Lucide React](https://lucide.dev/).
- **Data Fetching**: [SWR](https://swr.vercel.app/) on the client; native `fetch` server-side with `force-cache` (no axios).
- **Data Source**: [PokeAPI](https://pokeapi.co/), via internal API routes.
- **Package Manager**: [pnpm](https://pnpm.io/).

## Project Structure

```
src/
├── app/
│   ├── page.jsx                 # Home
│   ├── wiki/[page]/             # Paginated Pokedex (WikiClient)
│   ├── pokemon/[id]/            # Detail page + _components (CryPlayer, TypeRelations)
│   ├── battle/                  # Battle Arena + _components (scene, field, trays, pickers, biome select)
│   └── api/v1/                  # Internal API routes that proxy + cache PokeAPI
├── components/                  # Shared UI (Header, PokemonCard, Select, *Select, SpriteToggle)
├── config/                      # pokeapi.js, sprites.js, biomes.js — all external URLs/assets live here
└── utils/                       # Helpers + hooks (typeColors, generation, battle, pokeapi, fetcher, hooks)
```

## Getting Started

This project uses [pnpm](https://pnpm.io/).

1.  Clone the repository:

    ```bash
    git clone https://github.com/adam-ctrlc/pokemon-fullstack.git
    cd pokemon-fullstack
    ```

2.  Install dependencies (the `sharp` / `unrs-resolver` build scripts are pre-approved in `pnpm-workspace.yaml`):

    ```bash
    pnpm install
    ```

3.  Run the development server:

    ```bash
    pnpm dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser.

### Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the dev server (Turbopack) |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Run ESLint (Next core-web-vitals + React Compiler) |

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for project conventions, structure, and how to add things like new biomes or filters.
