# Contributing to PokeCraft Wiki

Thanks for your interest in contributing! This document explains how the project is structured and the conventions to follow so your changes fit in cleanly.

## Getting set up

This project uses [pnpm](https://pnpm.io/).

```bash
git clone https://github.com/adam-ctrlc/pokecraft.git
cd pokecraft
pnpm install
pnpm dev
```

`sharp` and `unrs-resolver` need their build scripts to run - they're approved in `pnpm-workspace.yaml`. If a fresh install complains about ignored builds, run `pnpm approve-builds`.

Before opening a pull request, make sure both of these pass:

```bash
pnpm lint     # ESLint (Next.js core-web-vitals + React Compiler rules)
pnpm build    # Production build must succeed
```

## Project layout

```
src/
├── app/
│   ├── page.jsx                 # Home
│   ├── wiki/[page]/             # Paginated Pokedex (WikiClient)
│   ├── pokemon/[id]/            # Detail page + _components (CryPlayer, TypeRelations)
│   ├── battle/                  # Battle Arena page + _components (scene, field, trays, pickers)
│   └── api/v1/                  # Internal API routes that proxy + cache PokeAPI
├── components/                  # Shared UI (Header, PokemonCard, Select, *Select, SpriteToggle)
├── config/                      # pokeapi.js, sprites.js, biomes.js (no hardcoded URLs elsewhere)
└── utils/                       # Helpers + hooks (typeColors, generation, battle, pokeapi, hooks)
```

## Conventions

These keep the codebase consistent - please match them:

- **Imports use the `@/` alias**, never relative paths (`@/utils/battle`, not `../../utils/battle`).
- **No hardcoded asset URLs.** Sprite, texture, and font URLs live in `src/config/sprites.js`; the PokeAPI base lives in `src/config/pokeapi.js`. Battle backdrops live in `src/config/biomes.js`. Import from there.
- **One source of truth for type styling** - use `typeBadge` / `typeBar` / `typeGlow` from `src/utils/typeColors.js`. Don't redefine type-color maps.
- **Data fetching** goes through the internal API routes (`/api/v1/...`) via the `fetcher` in `src/utils/fetcher.js` with SWR on the client. Server-side PokeAPI calls use `fetch(..., { cache: "force-cache" })` since the data is static. No axios.
- **Semantic HTML** - prefer `section` / `article` / `header` / `nav` / `ul`/`ol`/`li` over generic `div`s where they apply.
- **Pure logic lives in `utils/`**, not in components. The React Compiler lint forbids impurity (e.g. `Math.random`) during render - put randomness/IO in a plain module (see `randInt`/`pickRandom` in `src/utils/battle.js`).
- **Styling** is Tailwind CSS v4 with the blocky pixel aesthetic: chunky borders (`border-2`/`border-4`), hard drop-shadows, the `pixelated` utility for sprites, and the `Press Start 2P` font (with the Pokemon-Solid logo font for branding).

## Adding things

- **A new battle biome** - add an entry to `BIOMES` in `src/config/biomes.js` (sky/ground gradients, horizon, grass, tree, celestial, optional particles). New foliage shapes are crisp-edged SVG sprites in `BattleField.jsx`.
- **A new filter/select** - reuse the generic `Select` component in `src/components/Select.jsx` (see `TypeSelect` / `RegionSelect` / `BiomeSelect`).

## Pull requests

1. Branch off `main`.
2. Keep changes focused; describe what and why.
3. Ensure `pnpm lint` and `pnpm build` pass.
4. Note any new images/assets you added under `public/`.
