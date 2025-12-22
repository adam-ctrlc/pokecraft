"use client";

import { ShieldAlert, Swords, Info } from "lucide-react";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import Link from "next/link";

const TYPE_CONFIG = {
  normal: {
    bg: "bg-neutral-400",
    border: "border-neutral-500",
    text: "text-neutral-900",
  },
  fire: {
    bg: "bg-orange-500",
    border: "border-orange-700",
    text: "text-white",
  },
  water: { bg: "bg-sky-500", border: "border-sky-700", text: "text-white" },
  electric: {
    bg: "bg-yellow-400",
    border: "border-yellow-600",
    text: "text-black",
  },
  grass: { bg: "bg-green-500", border: "border-green-700", text: "text-white" },
  ice: { bg: "bg-cyan-300", border: "border-cyan-500", text: "text-black" },
  fighting: { bg: "bg-red-700", border: "border-red-900", text: "text-white" },
  poison: {
    bg: "bg-purple-500",
    border: "border-purple-700",
    text: "text-white",
  },
  ground: {
    bg: "bg-amber-600",
    border: "border-amber-800",
    text: "text-white",
  },
  flying: {
    bg: "bg-indigo-300",
    border: "border-indigo-500",
    text: "text-black",
  },
  psychic: { bg: "bg-pink-500", border: "border-pink-700", text: "text-white" },
  bug: { bg: "bg-lime-500", border: "border-lime-700", text: "text-white" },
  rock: { bg: "bg-stone-500", border: "border-stone-700", text: "text-white" },
  ghost: {
    bg: "bg-indigo-800",
    border: "border-indigo-950",
    text: "text-white",
  },
  dragon: {
    bg: "bg-violet-600",
    border: "border-violet-800",
    text: "text-white",
  },
  steel: { bg: "bg-slate-400", border: "border-slate-600", text: "text-white" },
  fairy: { bg: "bg-pink-300", border: "border-pink-500", text: "text-black" },
};

const TypeBadge = ({ type }) => {
  const config = TYPE_CONFIG[type] || {
    bg: "bg-stone-500",
    border: "border-stone-700",
    text: "text-white",
  };
  return (
    <span
      className={`
        px-3 py-1 text-[10px] uppercase font-bold tracking-widest
        ${config.bg} ${config.text}
        border-b-4 ${config.border} rounded-t-sm shadow-sm
      `}
    >
      {type}
    </span>
  );
};

const TypeCard = ({ type }) => {
  const { data: typeData, isLoading } = useSWR(`/type/${type}`, fetcher);
  const examples = typeData?.pokemon?.slice(0, 5).map((p) => p.pokemon) || [];
  const config = TYPE_CONFIG[type] || {
    bg: "bg-stone-600",
    border: "border-stone-700",
  };

  return (
    <div className="bg-stone-900 border border-stone-700 flex flex-col h-full relative group overflow-hidden">
      {/* Header / Type Indicator */}
      <div className={`h-1 w-full ${config.bg}`} />

      <div className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <TypeBadge type={type} />
          {isLoading && (
            <div className="w-4 h-4 border-2 border-stone-600 border-t-stone-400 rounded-full animate-spin" />
          )}
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-5 gap-1 mt-auto">
          {examples.map((p) => {
            const id = p.url.split("/").filter(Boolean).pop();
            return (
              <Link
                key={id}
                href={`/pokemon/${id}`}
                className="group/item relative aspect-square bg-stone-800 border border-stone-700 hover:border-yellow-400 hover:bg-stone-700 transition-all flex items-center justify-center"
                title={p.name}
              >
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                  alt={p.name}
                  className="w-full h-full object-contain p-0.5 rendering-pixelated group-hover/item:scale-110 transition-transform"
                  loading="lazy"
                />
              </Link>
            );
          })}
          {examples.length === 0 && !isLoading && (
            <span className="col-span-5 text-xs text-stone-600 italic">
              No examples found
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, icon, types = [], emptyMessage }) => {
  if (types.length === 0) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 pb-2 border-b border-stone-700">
        <div className="p-2 bg-stone-800 border border-stone-600 text-yellow-500 shadow-[2px_2px_0_rgba(0,0,0,0.5)] flex-shrink-0">
          {icon}
        </div>
        <h3 className="uppercase tracking-widest text-xs md:text-sm font-bold text-stone-300">
          {title}
        </h3>
        <span className="ml-auto bg-stone-800 text-stone-500 text-xs px-2 py-0.5 rounded-full border border-stone-700">
          {types.length}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {types.map((type) => (
          <TypeCard key={type} type={type} />
        ))}
      </div>
    </div>
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
      {/* Section Header for the entire component */}
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-lg md:text-xl uppercase font-bold text-stone-200 tracking-widest flex items-center justify-center gap-3">
          <Swords className="text-stone-500 flex-shrink-0" />
          Combat Analysis
          <ShieldAlert className="text-stone-500 flex-shrink-0" />
        </h2>
        <p className="text-stone-500 text-xs max-w-md mx-auto">
          Breakdown of offensive and defensive capabilities based on type
          matchups.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <Section
          title="Weaknesses (2x Dmg From)"
          icon={<ShieldAlert className="w-5 h-5" />}
          types={pokemon.weaknesses}
          emptyMessage="No Weaknesses"
        />

        <Section
          title="Strengths (2x Dmg To)"
          icon={<Swords className="w-5 h-5" />}
          types={pokemon.strengths}
          emptyMessage="No Strengths"
        />
      </div>
    </div>
  );
}
