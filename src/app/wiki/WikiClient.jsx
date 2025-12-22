"use client";

import { useState, useEffect, useId } from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import PokemonCard from "@/components/PokemonCard";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WikiClient({ page }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const searchId = useId();

  const pageIndex = page - 1;
  const limit = 20;
  const offset = pageIndex * limit;

  const query = activeSearch
    ? `/pokemon?search=${activeSearch}`
    : `/pokemon?limit=${limit}&offset=${offset}`;

  const { data, error, isLoading } = useSWR(query, fetcher, {
    keepPreviousData: true,
  });

  const handlePageChange = (newPage) => {
    router.push(`/wiki/${newPage}`);
  };

  const executeSearch = () => {
    setActiveSearch(searchTerm.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeSearch();
    }
  };

  const totalCount = data?.count || 0;
  const totalPages = Math.ceil(totalCount / limit);

  const getPaginationParams = () => {
    const windowSize = 5;
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, start + windowSize - 1);

    if (end - start < windowSize - 1) {
      start = Math.max(1, end - windowSize + 1);
    }

    const range = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  const paginationRange = getPaginationParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 border-b-4 border-stone-700 pb-6">
        <h1 className="text-3xl md:text-4xl text-white mb-4 drop-shadow-[2px_2px_0_#9a5d00]">
          Pokemon Metadata
        </h1>
        <p className="text-stone-400">Database of all known specimens.</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="relative w-full md:w-96 flex gap-2">
          <div className="relative flex-grow">
            <input
              id={searchId}
              name="search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search database..."
              className="w-full bg-stone-900 border-2 border-stone-600 p-3 pl-10 text-white placeholder-stone-600 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition-all font-mono text-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
          </div>
          <button
            onClick={executeSearch}
            className="bg-green-600 text-white px-6 font-bold uppercase tracking-widest border-b-4 border-green-800 hover:bg-green-500 active:border-b-0 active:translate-y-1 transition-all"
          >
            Search
          </button>
        </div>

        {!activeSearch && (
          <div className="flex gap-2 items-center flex-wrap">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-3 py-2 bg-stone-700 text-stone-300 border-2 border-stone-500 hover:bg-stone-600 disabled:opacity-50 disabled:cursor-not-allowed uppercase text-xs"
            >
              Prev
            </button>

            {paginationRange.map((p) => (
              <button
                key={p}
                onClick={() => handlePageChange(p)}
                className={`min-w-[2.5rem] px-2 py-2 border-2 border-dashed font-mono text-sm ${
                  p === page
                    ? "bg-stone-800 border-yellow-500 text-yellow-400"
                    : "bg-stone-900 border-stone-700 text-stone-400 hover:text-white"
                }`}
              >
                {p}
              </button>
            ))}

            {totalPages > paginationRange[paginationRange.length - 1] && (
              <>
                <span className="text-stone-500">...</span>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className="min-w-[2.5rem] px-2 py-2 bg-stone-900 border-2 border-dashed border-stone-700 text-stone-400 hover:text-white font-mono text-sm"
                >
                  {totalPages}
                </button>
              </>
            )}

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={!data?.next}
              className="px-3 py-2 bg-stone-700 text-stone-300 border-2 border-stone-500 hover:bg-stone-600 disabled:opacity-50 disabled:cursor-not-allowed uppercase text-xs"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {error ? (
        <div className="bg-red-900/20 border-l-4 border-red-500 p-4 text-red-200">
          Failed to load data. The signal was lost...
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {isLoading && !data ? (
            Array.from({ length: limit }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] bg-stone-800 animate-pulse border-4 border-stone-700"
              ></div>
            ))
          ) : data?.results?.length > 0 ? (
            data.results.map((pokemon) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <h3 className="text-2xl text-stone-500 mb-2">No Results Found</h3>
              <p className="text-stone-600">
                Try searching for a valid Pokemon ID or name.
              </p>
              {activeSearch && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setActiveSearch("");
                  }}
                  className="mt-4 text-green-500 hover:underline"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {!activeSearch && (
        <div className="mt-12 flex justify-center gap-4">
          <div className="flex gap-2 items-center flex-wrap">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-3 py-2 bg-stone-700 text-stone-300 border-2 border-stone-500 hover:bg-stone-600 disabled:opacity-50 disabled:cursor-not-allowed uppercase text-xs"
            >
              Prev
            </button>

            {paginationRange.map((p) => (
              <button
                key={p}
                onClick={() => handlePageChange(p)}
                className={`min-w-[2.5rem] px-2 py-2 border-2 border-dashed font-mono text-sm ${
                  p === page
                    ? "bg-stone-800 border-yellow-500 text-yellow-400"
                    : "bg-stone-900 border-stone-700 text-stone-400 hover:text-white"
                }`}
              >
                {p}
              </button>
            ))}

            {totalPages > paginationRange[paginationRange.length - 1] && (
              <>
                <span className="text-stone-500">...</span>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className="min-w-[2.5rem] px-2 py-2 bg-stone-900 border-2 border-dashed border-stone-700 text-stone-400 hover:text-white font-mono text-sm"
                >
                  {totalPages}
                </button>
              </>
            )}

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={!data?.next}
              className="px-3 py-2 bg-stone-700 text-stone-300 border-2 border-stone-500 hover:bg-stone-600 disabled:opacity-50 disabled:cursor-not-allowed uppercase text-xs"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
