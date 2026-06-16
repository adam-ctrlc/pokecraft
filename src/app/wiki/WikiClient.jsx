"use client";

import { useState, useId } from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import PokemonCard from "@/components/PokemonCard";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import SpriteToggle from "@/components/SpriteToggle";
import TypeSelect from "@/components/TypeSelect";
import RegionSelect from "@/components/RegionSelect";
import { useSpriteView } from "@/utils/useSpriteView";
import { useSessionState } from "@/utils/useSessionState";
import { getGeneration } from "@/utils/generation";

function Pagination({ page, totalPages, range, hasNext, onChange }) {
  const showLast = totalPages > range[range.length - 1];

  return (
    <div className="flex gap-2 items-center justify-center">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="h-11 inline-flex items-center justify-center gap-1 px-3 bg-stone-700 text-stone-300 border-2 border-stone-500 hover:bg-stone-600 active:translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:translate-y-0 uppercase text-xs transition-all"
      >
        <ChevronLeft className="w-4 h-4" />
        Prev
      </button>

      {/* Number buttons - hidden on small screens to avoid wrapping */}
      <div className="hidden sm:flex gap-2 items-center">
        {range.map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`h-11 min-w-[2.75rem] inline-flex items-center justify-center px-2 border-2 font-mono text-sm transition-all ${
              p === page
                ? "bg-stone-800 border-yellow-500 text-yellow-400 shadow-[0_0_0_2px_rgba(250,204,21,0.2)]"
                : "bg-stone-900 border-stone-700 text-stone-400 hover:text-white hover:border-stone-500"
            }`}
          >
            {p}
          </button>
        ))}

        {showLast && (
          <>
            <span className="text-stone-600 px-1">…</span>
            <button
              onClick={() => onChange(totalPages)}
              className="h-11 min-w-[2.75rem] inline-flex items-center justify-center px-2 bg-stone-900 border-2 border-stone-700 text-stone-400 hover:text-white hover:border-stone-500 font-mono text-sm transition-all"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      {/* Compact indicator - shown on small screens only */}
      <span className="sm:hidden h-11 inline-flex items-center px-4 bg-stone-900 border-2 border-stone-700 text-stone-300 font-mono text-sm">
        {page} / {totalPages}
      </span>

      <button
        onClick={() => onChange(page + 1)}
        disabled={!hasNext}
        className="h-11 inline-flex items-center justify-center gap-1 px-3 bg-stone-700 text-stone-300 border-2 border-stone-500 hover:bg-stone-600 active:translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:translate-y-0 uppercase text-xs transition-all"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function WikiClient({ page }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const searchId = useId();
  const [view] = useSpriteView();
  const [typeFilter, setTypeFilter] = useSessionState(
    "pokecraft:typeFilter",
    "all"
  );
  const [regionFilter, setRegionFilter] = useSessionState(
    "pokecraft:regionFilter",
    "all"
  );

  const limit = 20;
  const offset = (page - 1) * limit;

  const query = activeSearch
    ? `/pokemon?search=${activeSearch}`
    : `/pokemon?limit=${limit}&offset=${offset}`;

  const { data, error, isLoading } = useSWR(query, fetcher, {
    keepPreviousData: true,
  });

  const handlePageChange = (newPage) => {
    router.push(`/wiki/${newPage}`);
  };

  const executeSearch = () => setActiveSearch(searchTerm.trim());

  const clearSearch = () => {
    setSearchTerm("");
    setActiveSearch("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") executeSearch();
  };

  const totalCount = data?.count || 0;
  const totalPages = Math.ceil(totalCount / limit) || 1;

  const getPaginationRange = () => {
    const windowSize = 5;
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, start + windowSize - 1);
    if (end - start < windowSize - 1) {
      start = Math.max(1, end - windowSize + 1);
    }
    const range = [];
    for (let i = start; i <= end; i++) range.push(i);
    return range;
  };

  const paginationRange = getPaginationRange();

  const hasFilter = typeFilter !== "all" || regionFilter !== "all";
  const displayedResults = data?.results?.filter((p) => {
    const typeOk = typeFilter === "all" || p.types?.includes(typeFilter);
    const regionOk =
      regionFilter === "all" || getGeneration(p.id)?.roman === regionFilter;
    return typeOk && regionOk;
  });
  const hasResults = displayedResults?.length > 0;
  const filteredOut =
    data?.results?.length > 0 && displayedResults?.length === 0;

  const clearFilters = () => {
    setTypeFilter("all");
    setRegionFilter("all");
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      {/* Page header */}
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
        <h1 className="text-3xl md:text-5xl text-white mb-3 drop-shadow-[3px_3px_0_#9a5d00]">
          The Wiki
        </h1>
        <p className="text-stone-400 text-sm md:text-base">
          {activeSearch ? (
            <>
              Results for{" "}
              <span className="text-yellow-400">&quot;{activeSearch}&quot;</span>
            </>
          ) : (
            <>
              Browsing{" "}
              <span className="text-yellow-400">
                {totalCount.toLocaleString()}
              </span>{" "}
              known specimens - page{" "}
              <span className="text-yellow-400">{page}</span> of {totalPages}
            </>
          )}
        </p>
        </div>
        <SpriteToggle />
      </header>

      {/* Controls */}
      <div className="mb-10 space-y-4">
        {/* Search row (full width) */}
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <input
              id={searchId}
              name="search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search by name or ID..."
              className="w-full bg-stone-900 border-2 border-stone-600 p-3 pl-10 pr-10 text-white placeholder-stone-600 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition-all font-mono text-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
            {searchTerm && (
              <button
                onClick={clearSearch}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={executeSearch}
            className="bg-green-600 text-white px-6 font-bold uppercase tracking-widest text-sm border-b-4 border-green-800 hover:bg-green-500 active:border-b-0 active:translate-y-1 transition-all"
          >
            Go
          </button>
        </div>

        {/* Filters + top pagination */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <TypeSelect value={typeFilter} onChange={setTypeFilter} />
            <RegionSelect value={regionFilter} onChange={setRegionFilter} />
          </div>

          {!activeSearch && (
            <div className="hidden lg:block">
              <Pagination
                page={page}
                totalPages={totalPages}
                range={paginationRange}
                hasNext={!!data?.next}
                onChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>

      {/* Results grid */}
      {error ? (
        <div role="alert" className="bg-red-900/20 border-l-4 border-red-500 p-6 text-red-200">
          <p className="uppercase text-sm tracking-widest mb-1">Signal Lost</p>
          <p className="text-red-300/70 text-sm">
            Failed to load data from the Pokedex. Try again.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {isLoading && !data ? (
            Array.from({ length: limit }).map((_, i) => (
              <li
                key={i}
                className="aspect-[3/4] bg-stone-800 border-4 border-stone-700 animate-pulse flex items-center justify-center"
              >
                <div className="w-1/2 h-1/2 bg-stone-700/60" />
              </li>
            ))
          ) : hasResults ? (
            displayedResults.map((pokemon) => (
              <li key={pokemon.name}>
                <PokemonCard pokemon={pokemon} view={view} />
              </li>
            ))
          ) : (
            <li className="col-span-full py-20 text-center border-4 border-dashed border-stone-700 bg-stone-900/50">
              <h3 className="text-xl md:text-2xl text-stone-400 mb-2 uppercase">
                {filteredOut ? "No Matches On This Page" : "No Results Found"}
              </h3>
              <p className="text-stone-600 text-sm">
                {filteredOut
                  ? "Nothing matches these filters here - try another page or adjust the filters."
                  : "Try a valid Pokemon name or ID number."}
              </p>
              {filteredOut && (
                <button
                  onClick={clearFilters}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-3 bg-stone-800 text-green-400 border-b-4 border-stone-950 hover:bg-stone-700 active:border-b-0 active:translate-y-1 uppercase text-xs tracking-widest transition-all"
                >
                  <X className="w-4 h-4" />
                  Clear Filters
                </button>
              )}
              {activeSearch && !filteredOut && (
                <button
                  onClick={clearSearch}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-3 bg-stone-800 text-green-400 border-b-4 border-stone-950 hover:bg-stone-700 active:border-b-0 active:translate-y-1 uppercase text-xs tracking-widest transition-all"
                >
                  <X className="w-4 h-4" />
                  Clear Search
                </button>
              )}
            </li>
          )}
        </ul>
      )}

      {/* Bottom pagination */}
      {!activeSearch && hasResults && (
        <div className="mt-14 flex justify-center">
          <Pagination
            page={page}
            totalPages={totalPages}
            range={paginationRange}
            hasNext={!!data?.next}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
