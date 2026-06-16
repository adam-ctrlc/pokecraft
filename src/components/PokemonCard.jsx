"use client";

import Link from "next/link";
import { showdownGif } from "@/config/sprites";
import { typeBadge } from "@/utils/typeColors";
import { getGeneration } from "@/utils/generation";

export default function PokemonCard({ pokemon, view = "3d" }) {
  const animated = view === "3d";
  const fallback = pokemon.pixelImage || pokemon.image;
  const src = animated ? showdownGif(pokemon.id) : fallback;
  const gen = getGeneration(pokemon.id);

  return (
    <Link href={`/pokemon/${pokemon.id}`} className="group relative block">
      {/* Card Container */}
      <article className="bg-stone-800 border-4 border-stone-600 p-4 transition-transform group-hover:-translate-y-2 group-hover:shadow-[0_8px_0_#444] shadow-[0_4px_0_#222] relative overflow-hidden">
        {/* ID Badge */}
        <div className="absolute top-2 left-2 z-10 bg-stone-900 px-2 py-1 text-xs text-stone-500 font-mono">
          #{String(pokemon.id).padStart(3, "0")}
        </div>

        {/* Generation Badge */}
        {gen && (
          <div
            className="absolute top-2 right-2 z-10 bg-yellow-500 text-black px-2 py-1 text-[10px] font-bold border-2 border-stone-900"
            title={`Generation ${gen.roman} — ${gen.region}`}
          >
            {gen.roman}
          </div>
        )}

        {/* Image Area */}
        <div className="aspect-square bg-stone-700/50 mb-4 flex items-center justify-center border-2 border-stone-900 group-hover:bg-stone-700 transition-colors">
          <img
            src={src}
            alt={pokemon.name}
            loading="lazy"
            onError={(e) => {
              if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
            }}
            className={`w-3/4 h-3/4 object-contain group-hover:scale-110 transition-transform duration-300 ${
              animated ? "" : "pixelated"
            }`}
          />
        </div>

        {/* Name */}
        <h3 className="text-center text-white capitalize text-sm md:text-base truncate px-2 group-hover:text-yellow-400 transition-colors">
          {pokemon.name}
        </h3>

        {/* Region */}
        {gen && (
          <p className="text-center text-[10px] text-stone-500 uppercase tracking-widest mt-1">
            {gen.region}
          </p>
        )}

        {/* Types */}
        {pokemon.types?.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1.5 mt-3">
            {pokemon.types.map((type) => (
              <span
                key={type}
                className={`text-[9px] uppercase font-bold px-2 py-0.5 border-2 border-stone-900 ${typeBadge(
                  type
                )}`}
              >
                {type}
              </span>
            ))}
          </div>
        )}

        {/* Corner Accents */}
        <div className="absolute top-0 right-0 w-2 h-2 bg-stone-500"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-stone-500"></div>
      </article>
    </Link>
  );
}
