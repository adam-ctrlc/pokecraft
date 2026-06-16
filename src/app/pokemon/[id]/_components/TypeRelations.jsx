"use client";

import { ShieldAlert, Swords, Info } from "lucide-react";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import Link from "next/link";
import { useSpriteView } from "@/utils/useSpriteView";
import { showdownGif, officialSprite } from "@/config/sprites";
import { typeBadge, typeBar } from "@/utils/typeColors";
import { idFromUrl } from "@/utils/pokeapi";

const TypeBadge = ({ type }) => (
  <span
    className={`px-3 py-1 text-[10px] uppercase font-bold tracking-widest border-b-4 border-black/30 rounded-t-sm shadow-sm ${typeBadge(
      type
    )}`}
  >
    {type}
  </span>
);

const TypeCard = ({ type }) => {
  const { data: typeData, isLoading } = useSWR(`/type/${type}`, fetcher);
  const [view] = useSpriteView();
  const want3d = view === "3d";
  const examples = typeData?.pokemon?.slice(0, 5).map((p) => p.pokemon) || [];

  return (
    <article className="bg-stone-900 border border-stone-700 flex flex-col h-full relative group overflow-hidden">
      {/* Type color indicator */}
      <div className={`h-1 w-full ${typeBar(type)}`} />

      <div className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <TypeBadge type={type} />
          {isLoading && (
            <div className="w-4 h-4 border-2 border-stone-600 border-t-stone-400 rounded-full animate-spin" />
          )}
        </div>

        {/* Examples */}
        <ul className="grid grid-cols-5 gap-1 mt-auto">
          {examples.map((p) => {
            const id = idFromUrl(p.url);
            const staticSrc = officialSprite(id);
            return (
              <li key={id}>
                <Link
                  href={`/pokemon/${id}`}
                  className="group/item relative aspect-square bg-stone-800 border border-stone-700 hover:border-yellow-400 hover:bg-stone-700 transition-all flex items-center justify-center"
                  title={p.name}
                >
                  <img
                    src={want3d ? showdownGif(id) : staticSrc}
                    alt={p.name}
                    onError={(e) => {
                      if (e.currentTarget.src !== staticSrc)
                        e.currentTarget.src = staticSrc;
                    }}
                    className={`w-full h-full object-contain p-0.5 group-hover/item:scale-110 transition-transform ${
                      want3d ? "" : "pixelated"
                    }`}
                    loading="lazy"
                  />
                </Link>
              </li>
            );
          })}
          {examples.length === 0 && !isLoading && (
            <li className="col-span-5 text-xs text-stone-600 italic">
              No examples found
            </li>
          )}
        </ul>
      </div>
    </article>
  );
};

const Section = ({ title, icon, types = [] }) => {
  if (types.length === 0) return null;

  return (
    <section className="flex flex-col gap-6">
      <header className="flex items-center gap-3 pb-2 border-b border-stone-700">
        <div className="p-2 bg-stone-800 border border-stone-600 text-yellow-500 shadow-[2px_2px_0_rgba(0,0,0,0.5)] flex-shrink-0">
          {icon}
        </div>
        <h3 className="uppercase tracking-widest text-xs md:text-sm font-bold text-stone-300">
          {title}
        </h3>
        <span className="ml-auto w-6 h-6 flex items-center justify-center bg-stone-800 text-stone-400 text-xs rounded-full border border-stone-700">
          {types.length}
        </span>
      </header>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {types.map((type) => (
          <li key={type}>
            <TypeCard type={type} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default function TypeRelations({ pokemon }) {
  const hasData =
    pokemon.weaknesses?.length > 0 || pokemon.strengths?.length > 0;

  if (!hasData) {
    return (
      <div className="text-center py-8 text-stone-500 flex flex-col items-center">
        <Info className="mb-2 w-8 h-8 opacity-50" />
        <p>No type association data available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <header className="text-center space-y-2 mb-8">
        <h2 className="text-lg md:text-xl uppercase font-bold text-stone-200 tracking-widest flex items-center justify-center gap-3">
          <Swords className="text-stone-500 flex-shrink-0" />
          Combat Analysis
          <ShieldAlert className="text-stone-500 flex-shrink-0" />
        </h2>
        <p className="text-stone-500 text-xs max-w-md mx-auto">
          Breakdown of offensive and defensive capabilities based on type
          matchups.
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-12">
        <Section
          title="Weaknesses (2x Dmg From)"
          icon={<ShieldAlert className="w-5 h-5" />}
          types={pokemon.weaknesses}
        />
        <Section
          title="Strengths (2x Dmg To)"
          icon={<Swords className="w-5 h-5" />}
          types={pokemon.strengths}
        />
      </div>
    </div>
  );
}
