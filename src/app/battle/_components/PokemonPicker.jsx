"use client";

import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { showdownGif, officialSprite } from "@/config/sprites";
import { typeBadge } from "@/utils/typeColors";
import { Search, X } from "lucide-react";

export default function PokemonPicker({ side, onPick, onClose, disabledIds = [] }) {
  const [term, setTerm] = useState("");
  const [active, setActive] = useState("");

  const query = active
    ? `/pokemon?search=${active}`
    : `/pokemon?limit=30&offset=0`;
  const { data, isLoading } = useSWR(query, fetcher);

  const results = data?.results || [];
  const accent = side === "enemy" ? "border-red-500" : "border-sky-500";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-2xl max-h-[85vh] flex flex-col bg-stone-900 border-4 ${accent} shadow-[8px_8px_0_rgba(0,0,0,0.6)]`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="flex items-center justify-between gap-3 p-4 border-b-4 border-stone-700">
          <h2 className="uppercase tracking-widest text-sm text-white">
            Add to {side === "enemy" ? "Enemy" : "Your"} Team
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 bg-stone-800 text-stone-400 hover:text-white border-2 border-stone-600 hover:border-stone-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </header>

        {/* Search */}
        <div className="p-4 border-b-2 border-stone-800">
          <div className="relative">
            <input
              type="text"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && setActive(term.trim())}
              placeholder="Search by name or ID..."
              className="w-full bg-stone-950 border-2 border-stone-600 p-3 pl-10 text-white placeholder-stone-600 focus:border-green-500 focus:outline-none font-mono text-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
            {term && (
              <button
                onClick={() => {
                  setTerm("");
                  setActive("");
                }}
                aria-label="Clear"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 overflow-y-auto">
          {isLoading ? (
            Array.from({ length: 9 }).map((_, i) => (
              <li
                key={i}
                className="aspect-[4/3] bg-stone-800 border-2 border-stone-700 animate-pulse"
              />
            ))
          ) : results.length === 0 ? (
            <li className="col-span-full py-10 text-center text-stone-500 text-sm">
              No Pokemon found.
            </li>
          ) : (
            results.map((p) => {
              const taken = disabledIds.includes(String(p.id));
              return (
                <li key={p.id}>
                  <button
                    disabled={taken}
                    onClick={() => onPick(p.id)}
                    className="w-full flex flex-col items-center gap-1 p-2 bg-stone-800 border-2 border-stone-600 hover:border-yellow-500 hover:bg-stone-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <img
                      src={showdownGif(p.id)}
                      alt={p.name}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = officialSprite(p.id);
                      }}
                      className="w-12 h-12 object-contain pixelated"
                    />
                    <span className="text-[11px] text-white capitalize truncate w-full text-center">
                      {p.name}
                    </span>
                    <span className="flex gap-1">
                      {p.types?.map((t) => (
                        <span
                          key={t}
                          className={`text-[7px] uppercase font-bold px-1 py-0.5 ${typeBadge(
                            t
                          )}`}
                        >
                          {t}
                        </span>
                      ))}
                    </span>
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}
