"use client";

import { use, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import Link from "next/link";
import { ArrowLeft, Ruler, Weight, Zap, BookOpen } from "lucide-react";
import TypeRelations from "./_components/TypeRelations";

export default function PokemonDetail({ params }) {
  const { id } = use(params);
  const {
    data: pokemon,
    error,
    isLoading,
  } = useSWR(id ? `/pokemon/${id}` : null, fetcher);

  const [activeTab, setActiveTab] = useState("about");

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        <div className="bg-stone-900 border-4 border-red-800 p-8 text-center">
          <h1 className="text-2xl mb-2">Error!</h1>
          <p>Pokemon escaped into the tall grass...</p>
          <Link
            href="/wiki"
            className="inline-block mt-4 underline hover:text-white"
          >
            Return to Wiki
          </Link>
        </div>
      </div>
    );

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-8 border-stone-800 border-t-yellow-400 rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
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
        <div className="space-y-6">
          <div className="bg-stone-800 border-8 border-stone-600 p-4 md:p-8 relative shadow-[8px_8px_0_rgba(0,0,0,0.5)]">
            {/* ID Badge */}
            <div className="absolute top-4 left-4 bg-stone-950 px-3 py-1 font-mono text-stone-500 border border-stone-700 z-10">
              #{String(pokemon.id).padStart(3, "0")}
            </div>

            <div className="aspect-square flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] bg-stone-700/50 border-4 border-stone-900 overflow-hidden relative">
              {/* Decorative Zap */}
              <Link
                href="#"
                className="absolute top-2 right-2 p-1 text-stone-600 hover:text-yellow-400 transition-colors z-10"
              >
                <Zap className="w-6 h-6 fill-current" />
              </Link>

              <img
                src={
                  pokemon.sprites.other.showdown.front_default ||
                  pokemon.sprites.other["official-artwork"].front_default
                }
                alt={pokemon.name}
                className="w-2/3 h-2/3 object-contain rendering-pixelated animate-bounce-slow drop-shadow-[0_10px_0_rgba(0,0,0,0.5)]"
              />
            </div>

            {/* Name Plate */}
            <div className="mt-6 text-center border-t-4 border-stone-700 pt-4">
              <h1 className="text-3xl md:text-5xl capitalize text-white drop-shadow-[3px_3px_0_#000]">
                {pokemon.name}
              </h1>
              <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-4">
                {pokemon.types.map((type) => (
                  <span
                    key={type}
                    className={`
                                uppercase text-xs font-bold px-3 py-1 border-2 border-stone-900 shadow-[2px_2px_0_#000]
                                ${
                                  type === "fire"
                                    ? "bg-red-600 text-white"
                                    : type === "water"
                                    ? "bg-blue-500 text-white"
                                    : type === "grass"
                                    ? "bg-green-600 text-white"
                                    : type === "electric"
                                    ? "bg-yellow-500 text-black"
                                    : "bg-stone-500 text-white"
                                }
                            `}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Cry/Audio */}
          {pokemon.cries?.latest && (
            <audio
              controls
              className="w-full h-8 opacity-50 hover:opacity-100 transition-opacity invert grayscale"
            >
              <source src={pokemon.cries.latest} type="audio/ogg" />
            </audio>
          )}
        </div>

        {/* Right Column: Data Tabs */}
        <div className="bg-stone-900/80 border-4 border-stone-700 backdrop-blur-sm h-[400px] lg:h-[600px] flex flex-col">
          {/* Tabs Header */}
          <div className="flex border-b-4 border-stone-700 flex-shrink-0">
            <button
              onClick={() => setActiveTab("about")}
              className={`flex-1 py-3 md:py-4 uppercase font-bold text-xs md:text-sm tracking-widest hover:bg-stone-800 transition-colors ${
                activeTab === "about"
                  ? "bg-stone-800 text-yellow-400 border-b-4 border-yellow-400 -mb-[4px]"
                  : "text-stone-500"
              }`}
            >
              About
            </button>
            <button
              onClick={() => setActiveTab("stats")}
              className={`flex-1 py-3 md:py-4 uppercase font-bold text-xs md:text-sm tracking-widest hover:bg-stone-800 transition-colors ${
                activeTab === "stats"
                  ? "bg-stone-800 text-yellow-400 border-b-4 border-yellow-400 -mb-[4px]"
                  : "text-stone-500"
              }`}
            >
              Stats
            </button>
            <button
              onClick={() => setActiveTab("evolution")}
              className={`flex-1 py-4 uppercase font-bold text-sm tracking-wider hover:bg-stone-800 transition-colors ${
                activeTab === "evolution"
                  ? "bg-stone-800 text-yellow-400 border-b-4 border-yellow-400 -mb-[4px]"
                  : "text-stone-500"
              }`}
            >
              Evolution
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8 flex-1 overflow-y-auto overflow-x-hidden">
            {/* ABOUT TAB */}
            {activeTab === "about" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div>
                  <div className="flex items-center gap-2 mb-4 text-stone-400">
                    <BookOpen className="w-5 h-5" />
                    <h3 className="uppercase tracking-widest text-sm">
                      Pokedex Entry
                    </h3>
                  </div>
                  <p className="text-stone-300 leading-relaxed text-lg border-l-4 border-yellow-400 pl-4 bg-stone-800/50 p-4">
                    "{pokemon.description}"
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-stone-800 p-4 border-2 border-stone-600">
                    <div className="flex items-center text-stone-400 mb-2">
                      <Ruler className="w-4 h-4 mr-2" />
                      <span className="text-xs uppercase">Height</span>
                    </div>
                    <div className="text-xl text-white">
                      {pokemon.height / 10}m
                    </div>
                  </div>
                  <div className="bg-stone-800 p-4 border-2 border-stone-600">
                    <div className="flex items-center text-stone-400 mb-2">
                      <Weight className="w-4 h-4 mr-2" />
                      <span className="text-xs uppercase">Weight</span>
                    </div>
                    <div className="text-xl text-white">
                      {pokemon.weight / 10}kg
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm text-stone-500 uppercase mb-3">
                    Abilities
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {pokemon.abilities.map((ability) => (
                      <div
                        key={ability}
                        className="px-3 py-1 bg-stone-800 border border-stone-600 text-stone-300 text-xs uppercase hover:bg-stone-700 hover:text-white transition-colors cursor-help"
                      >
                        {ability.replace("-", " ")}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STATS TAB */}
            {activeTab === "stats" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                {/* Base Stats */}
                <div className="space-y-4">
                  {pokemon.stats.map((stat) => (
                    <div key={stat.name} className="relative">
                      <div className="flex justify-between text-xs uppercase mb-1 text-stone-300">
                        <span>
                          {stat.name === "hp"
                            ? "Health"
                            : stat.name === "attack"
                            ? "Attack"
                            : stat.name === "defense"
                            ? "Defense"
                            : stat.name.replace("-", " ")}
                        </span>
                        <span className="font-bold">{stat.value}</span>
                      </div>
                      <div className="h-4 bg-stone-800 border-2 border-stone-600 p-[2px]">
                        <div
                          className={`h-full bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] ${
                            stat.value > 100
                              ? "bg-purple-500"
                              : stat.value > 80
                              ? "bg-green-500"
                              : stat.value > 50
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{
                            width: `${Math.min(
                              100,
                              (stat.value / 150) * 100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Relations */}
              </div>
            )}

            {/* EVOLUTION TAB */}
            {activeTab === "evolution" && (
              <div className="flex flex-col items-center justify-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                {pokemon.evolutionChain.map((evo, index) => (
                  <div key={evo.id} className="flex flex-col items-center">
                    {/* Evolution Arrow */}
                    {index > 0 && (
                      <div className="flex flex-col items-center text-stone-500 my-2">
                        <div className="h-8 w-1 bg-stone-700"></div>
                        <span className="text-xs font-mono bg-stone-800 px-2 py-1 border border-stone-600">
                          Lvl {evo.min_level || "?"}
                        </span>
                        <div className="h-8 w-1 bg-stone-700"></div>
                        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-stone-700"></div>
                      </div>
                    )}

                    {/* Evo Card */}
                    <Link
                      href={`/pokemon/${evo.id}`}
                      className={`group relative bg-stone-800 p-4 border-4 ${
                        String(evo.id) === String(pokemon.id)
                          ? "border-yellow-500"
                          : "border-stone-600 hover:border-white"
                      } transition-colors`}
                    >
                      <img
                        src={evo.image}
                        alt={evo.name}
                        className="w-24 h-24 object-contain rendering-pixelated"
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
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Type Relations Section */}
      <div className="mt-12 bg-stone-900/80 border-4 border-stone-700 backdrop-blur-sm p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
        <TypeRelations pokemon={pokemon} />
      </div>
    </div>
  );
}
