# PokeCraft Wiki

![PokeCraft Homepage](/public/homepage.png)

## Overview

PokeCraft Wiki is a modern, responsive web application that serves as a comprehensive database for the Pokemon universe. Designed with a unique "blocky" pixel aesthetic inspired by voxel art and the classic handheld games, it lets users explore Pokemon species, statistics, types, and evolutions — and even pit teams against each other in an animated battle arena.

This project focuses on delivering a high-quality frontend experience, leveraging the power of Next.js and Tailwind CSS to create a fast, dynamic, and visually engaging interface.

## Features

- **Pokedex Wiki** — browse the full national dex with pagination, search by name/ID, and filter by **type** and **region/generation**. Cards show types, generation, and region at a glance.
- **3D / Pixel sprite toggle** — switch between animated "3D" Showdown sprites and static pixel sprites anywhere in the app. Your choice persists across pages via `sessionStorage`.
- **Detailed Pokemon pages** — stats (pixel segment bars), abilities, height/weight, a retro Pokedex entry panel, evolution chain, and a Combat Analysis breakdown of type matchups.
- **Custom cry player** — a pixel-styled audio player with a waveform progress bar for each Pokemon's cry.
- **Battle Arena (`/battle`)** — build a team (1v1, 3v3, or 6v6), drag to reorder, and auto-fill or **auto counter-pick** an enemy team based on type weaknesses. Battles resolve as a sequential bracket (type counters + base stats), then play out in an **animated pixel battle scene** with HP bars, fainting, and a turn-by-turn dialog.
- **Selectable battle scenery** — 15 hand-built pixel biomes (Meadow, Night, Snow, Desert, Sakura, Volcano, Cosmic, Rainy, and more) with themed skies, foliage, celestial bodies, and weather particles.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React Compiler)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom utility classes for the "blocky" aesthetic.
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Fetching**: [SWR](https://swr.vercel.app/) for caching, revalidation, and performant API interactions (using the native `fetch` API).
- **API Integration**: Internal API routes proxy and cache the [PokeAPI](https://pokeapi.co/).
- **Package Manager**: [pnpm](https://pnpm.io/)

## Project Structure

- `src/app` — App Router pages (`/`, `/wiki/[page]`, `/pokemon/[id]`, `/battle`) and API routes under `src/app/api/v1`.
- `src/components` — shared UI (header, cards, selects).
- `src/config` — centralized config: PokeAPI base, sprite URLs, and battle biomes.
- `src/utils` — helpers and hooks (type colors, generations, battle logic, sprite-view/session hooks).

## Getting Started

1.  Clone the repository:

    ```bash
    git clone https://github.com/adam-ctrlc/pokemon-fullstack.git
    cd pokemon-fullstack
    ```

2.  Install dependencies:

    ```bash
    pnpm install
    ```

3.  Run the development server:

    ```bash
    pnpm dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
