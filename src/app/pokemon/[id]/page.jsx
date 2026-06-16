"use client";

import { use, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import Link from "next/link";
import {
  ArrowLeft,
  Ruler,
  Weight,
  BookOpen,
  Hash,
  Box,
  Image as ImageIcon,
  Sparkles,
} from "lucide-react";
import TypeRelations from "@/app/pokemon/[id]/_components/TypeRelations";
import CryPlayer from "@/app/pokemon/[id]/_components/CryPlayer";
import { useSpriteView } from "@/utils/useSpriteView";
import { showdownGif, TEXTURE } from "@/config/sprites";
import { typeBadge, typeGlow } from "@/utils/typeColors";

const STAT_LABELS = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

const TABS = ["about", "stats", "evolution"];

function DetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl animate-pulse">
      <div className="h-5 w-32 bg-stone-800 mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left: sprite card */}
        <div className="space-y-6">
          <div className="bg-stone-800/60 border-8 border-stone-700 p-4 md:p-6">
            <div className="aspect-square bg-stone-700/40 border-4 border-stone-900" />
            <div className="mt-6 border-t-4 border-stone-700 pt-5 flex flex-col items-center gap-3">
              <div className="h-9 w-48 bg-stone-700" />
              <div className="flex gap-2">
                <div className="h-7 w-16 bg-stone-700" />
                <div className="h-7 w-16 bg-stone-700" />
              </div>
            </div>
          </div>
          <div className="h-24 bg-stone-800/60 border-4 border-stone-700" />
        </div>

        {/* Right: tabs panel */}
        <div className="bg-stone-900/60 border-4 border-stone-700 min-h-[400px] lg:h-[640px]">
          <div className="flex border-b-4 border-stone-700">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex-1 h-14 bg-stone-800/40 border-r-2 border-stone-800 last:border-r-0"
              />
            ))}
          </div>
          <div className="p-6 md:p-8 space-y-5">
            <div className="h-5 w-40 bg-stone-700" />
            <div className="h-28 bg-stone-800" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-20 bg-stone-800" />
              <div className="h-20 bg-stone-800" />
            </div>
            <div className="h-5 w-24 bg-stone-700" />
            <div className="flex gap-2">
              <div className="h-8 w-24 bg-stone-800" />
              <div className="h-8 w-24 bg-stone-800" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PokemonDetail({ params }) {
  const { id } = use(params);
  const {
    data: pokemon,
    error,
    isLoading,
  } = useSWR(id ? `/pokemon/${id}` : null, fetcher);

  const [activeTab, setActiveTab] = useState("about");
  const [view, setView] = useSpriteView();
  const want3d = view === "3d";

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-stone-900 border-4 border-red-800 p-8 text-center max-w-md">
          <h1 className="text-2xl mb-3 text-red-400">Error!</h1>
          <p className="text-stone-400 mb-6">
            Pokemon escaped into the tall grass...
          </p>
          <Link
            href="/wiki"
            className="inline-flex items-center gap-2 px-5 py-3 bg-stone-800 text-green-400 border-b-4 border-stone-950 hover:bg-stone-700 active:border-b-0 active:translate-y-1 uppercase text-xs tracking-widest transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Wiki
          </Link>
        </div>
      </div>
    );

  if (isLoading || !pokemon) return <DetailSkeleton />;

  const primaryType = pokemon.types[0];
  const glow = typeGlow(primaryType);

  const showdownSrc = pokemon.sprites.other.showdown.front_default;
  const artworkSrc = pokemon.sprites.other["official-artwork"].front_default;
  const has3d = !!showdownSrc;
  const is3d = want3d && has3d;
  const spriteSrc = is3d ? showdownSrc : artworkSrc;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Navigation */}
      <Link
        href="/wiki"
        className="inline-flex items-center text-stone-400 hover:text-white mb-8 group"
      >
        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        <span className="uppercase tracking-widest text-sm">Back to Wiki</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left Column: Visuals */}
        <div className="space-y-6 lg:sticky lg:top-28">
          <div className="bg-stone-800 border-8 border-stone-600 p-4 md:p-6 relative shadow-[8px_8px_0_rgba(0,0,0,0.5)]">
            {/* ID Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-1 bg-stone-950 px-3 py-1 font-mono text-stone-400 border border-stone-700 z-10">
              <Hash className="w-3 h-3" />
              {String(pokemon.id).padStart(3, "0")}
            </div>

            <div
              className="aspect-square flex items-center justify-center bg-stone-700/40 border-4 border-stone-900 overflow-hidden relative"
              style={{
                backgroundImage: `url(${TEXTURE.diamonds})`,
                boxShadow: `inset 0 0 80px rgba(${glow},0.35)`,
              }}
            >
              {/* 3D / Artwork toggle */}
              {has3d && (
                <div className="absolute top-2 right-2 z-10 flex bg-stone-950/90 border-2 border-stone-700 p-0.5">
                  <button
                    onClick={() => setView("3d")}
                    title="Animated 3D sprite"
                    className={`flex items-center gap-1 px-2 py-1 text-[10px] uppercase tracking-widest transition-colors ${
                      is3d
                        ? "bg-green-600 text-white"
                        : "text-stone-400 hover:text-white"
                    }`}
                  >
                    <Box className="w-3.5 h-3.5" />
                    3D
                  </button>
                  <button
                    onClick={() => setView("art")}
                    title="Static artwork"
                    className={`flex items-center gap-1 px-2 py-1 text-[10px] uppercase tracking-widest transition-colors ${
                      !is3d
                        ? "bg-green-600 text-white"
                        : "text-stone-400 hover:text-white"
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    Art
                  </button>
                </div>
              )}

              <img
                key={spriteSrc}
                src={spriteSrc}
                alt={pokemon.name}
                className={`w-2/3 h-2/3 object-contain animate-float drop-shadow-[0_10px_0_rgba(0,0,0,0.4)] ${
                  is3d ? "pixelated" : ""
                }`}
                style={{ filter: `drop-shadow(0 0 24px rgba(${glow},0.5))` }}
              />
            </div>

            {/* Name Plate */}
            <div className="mt-6 text-center border-t-4 border-stone-700 pt-5">
              <h1 className="text-3xl md:text-5xl capitalize text-white drop-shadow-[3px_3px_0_#000]">
                {pokemon.name}
              </h1>
              <ul className="flex flex-wrap justify-center gap-2 md:gap-3 mt-4">
                {pokemon.types.map((type) => (
                  <li
                    key={type}
                    className={`uppercase text-xs font-bold px-4 py-1.5 border-2 border-stone-900 shadow-[2px_2px_0_#000] ${typeBadge(
                      type
                    )}`}
                  >
                    {type}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Custom Cry Player */}
          {pokemon.cries?.latest && (
            <CryPlayer
              key={pokemon.id}
              src={pokemon.cries.latest}
              name={pokemon.name}
            />
          )}
        </div>

        {/* Right Column: Data Tabs */}
        <div className="bg-stone-900/80 border-4 border-stone-700 backdrop-blur-sm min-h-[400px] lg:h-[640px] flex flex-col">
          {/* Tabs Header */}
          <nav className="flex border-b-4 border-stone-700 flex-shrink-0">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                aria-current={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 uppercase font-bold text-xs md:text-sm tracking-widest hover:bg-stone-800 transition-colors ${
                  activeTab === tab
                    ? "bg-stone-800 text-yellow-400 border-b-4 border-yellow-400 -mb-[4px]"
                    : "text-stone-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* Tab Content */}
          <div className="p-6 md:p-8 flex-1 overflow-y-auto overflow-x-hidden">
            {/* ABOUT TAB */}
            {activeTab === "about" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                {/* Pokedex Entry - device screen */}
                <div>
                  <div className="flex items-center gap-2 mb-3 text-stone-400">
                    <BookOpen className="w-5 h-5" />
                    <h3 className="uppercase tracking-widest text-sm">
                      Pokedex Entry
                    </h3>
                  </div>
                  <div className="relative bg-stone-800 border-4 border-stone-600 p-5 pl-6 shadow-[4px_4px_0_rgba(0,0,0,0.4)]">
                    {/* Yellow accent stripe */}
                    <span className="absolute left-0 top-0 bottom-0 w-2 bg-yellow-500" />
                    <p className="text-stone-200 leading-loose text-sm md:text-base">
                      {pokemon.description}
                    </p>
                    {/* Pixel corner accents */}
                    <span className="absolute top-0 right-0 w-2 h-2 bg-stone-500" />
                    <span className="absolute bottom-0 right-0 w-2 h-2 bg-stone-500" />
                  </div>
                </div>

                {/* Height / Weight */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-stone-800 border-2 border-stone-600 p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-stone-900 border-2 border-stone-600 flex items-center justify-center text-sky-400 shrink-0">
                      <Ruler className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-stone-500">
                        Height
                      </div>
                      <div className="text-xl text-white font-mono">
                        {pokemon.height / 10}
                        <span className="text-sm text-stone-400">m</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-stone-800 border-2 border-stone-600 p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-stone-900 border-2 border-stone-600 flex items-center justify-center text-orange-400 shrink-0">
                      <Weight className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-stone-500">
                        Weight
                      </div>
                      <div className="text-xl text-white font-mono">
                        {pokemon.weight / 10}
                        <span className="text-sm text-stone-400">kg</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Abilities */}
                <div>
                  <div className="flex items-center gap-2 mb-3 text-stone-400">
                    <Sparkles className="w-4 h-4" />
                    <h3 className="text-sm uppercase tracking-widest">
                      Abilities
                    </h3>
                  </div>
                  <ul className="grid grid-cols-2 gap-3">
                    {pokemon.abilities.map((ability, i) => (
                      <li
                        key={ability}
                        className="flex items-center gap-2 bg-stone-800 border-2 border-stone-600 px-3 py-2 hover:border-yellow-500 hover:bg-stone-700 transition-colors"
                      >
                        <span className="w-5 h-5 flex items-center justify-center bg-stone-900 border border-stone-600 text-[10px] font-mono text-yellow-400 shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-stone-200 text-xs uppercase capitalize truncate">
                          {ability.replace("-", " ")}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* STATS TAB */}
            {activeTab === "stats" && (
              <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <ul className="space-y-5">
                  {pokemon.stats.map((stat) => {
                    const segments = 20; // each block ~7.5 pts (max 150)
                    const filled = Math.round((stat.value / 150) * segments);
                    const color =
                      stat.value > 100
                        ? "bg-purple-500"
                        : stat.value > 80
                        ? "bg-green-500"
                        : stat.value > 50
                        ? "bg-yellow-500"
                        : "bg-red-500";
                    return (
                      <li key={stat.name}>
                        <div className="flex justify-between text-xs uppercase mb-1.5 text-stone-300 tracking-widest">
                          <span>{STAT_LABELS[stat.name] || stat.name}</span>
                          <span className="font-mono font-bold text-white bg-stone-800 border-2 border-stone-600 px-2 py-0.5">
                            {String(stat.value).padStart(3, "0")}
                          </span>
                        </div>
                        <div className="flex gap-[2px] bg-stone-950 border-2 border-stone-700 p-1">
                          {Array.from({ length: segments }).map((_, i) => (
                            <div
                              key={i}
                              className={`h-4 flex-1 ${
                                i < filled
                                  ? `${color} shadow-[inset_-2px_-2px_0_rgba(0,0,0,0.3)]`
                                  : "bg-stone-800"
                              }`}
                            />
                          ))}
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {/* Total - pixel block */}
                <div className="mt-6 flex items-center justify-between bg-stone-800 border-4 border-stone-600 p-3 shadow-[4px_4px_0_rgba(0,0,0,0.4)]">
                  <span className="text-sm uppercase tracking-widest text-stone-300">
                    Total
                  </span>
                  <span className="text-2xl font-mono text-yellow-400 drop-shadow-[2px_2px_0_#9a5d00]">
                    {pokemon.stats.reduce((sum, s) => sum + s.value, 0)}
                  </span>
                </div>
              </div>
            )}

            {/* EVOLUTION TAB */}
            {activeTab === "evolution" && (
              <ol className="flex flex-col items-center justify-center space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
                {pokemon.evolutionChain.map((evo, index) => (
                  <li key={evo.id} className="flex flex-col items-center">
                    {index > 0 && (
                      <div className="flex flex-col items-center text-stone-500 my-1">
                        <div className="h-6 w-1 bg-stone-700" />
                        <span className="text-xs font-mono bg-stone-800 px-2 py-1 border border-stone-600">
                          Lvl {evo.min_level || "?"}
                        </span>
                        <div className="h-6 w-1 bg-stone-700" />
                        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-stone-700" />
                      </div>
                    )}

                    <Link
                      href={`/pokemon/${evo.id}`}
                      className={`group relative bg-stone-800 p-4 border-4 transition-colors ${
                        String(evo.id) === String(pokemon.id)
                          ? "border-yellow-500"
                          : "border-stone-600 hover:border-white"
                      }`}
                    >
                      <img
                        src={want3d ? showdownGif(evo.id) : evo.image}
                        alt={evo.name}
                        onError={(e) => {
                          if (e.currentTarget.src !== evo.image)
                            e.currentTarget.src = evo.image;
                        }}
                        className={`w-24 h-24 object-contain group-hover:scale-110 transition-transform ${
                          want3d ? "" : "pixelated"
                        }`}
                      />
                      <div className="text-center mt-2 capitalize text-white text-sm">
                        {evo.name}
                      </div>

                      {String(evo.id) === String(pokemon.id) && (
                        <div className="absolute -top-3 -right-3 bg-yellow-500 text-black text-[10px] font-bold px-2 py-0.5 border-2 border-white">
                          CURRENT
                        </div>
                      )}
                    </Link>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>

      {/* Type Relations Section */}
      <div className="mt-12 bg-stone-900/80 border-4 border-stone-700 backdrop-blur-sm p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
        <TypeRelations pokemon={pokemon} />
      </div>
    </div>
  );
}
