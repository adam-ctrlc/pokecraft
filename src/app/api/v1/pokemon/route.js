import { NextResponse } from "next/server";
import { POKEAPI_BASE } from "@/config/pokeapi";
import { officialSprite, pixelSprite } from "@/config/sprites";
import { idFromUrl } from "@/utils/pokeapi";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const limit = searchParams.get("limit") || "20";
  const offset = searchParams.get("offset") || "0";

  try {
    let results = [];
    let next = null;
    let previous = null;
    let count = 0;

    if (search) {
      try {
        const res = await fetch(
          `${POKEAPI_BASE}/pokemon/${search.toLowerCase()}`,
          { cache: "force-cache" }
        );
        if (!res.ok) throw new Error();
        const pokemon = await res.json();
        results = [{ name: pokemon.name, url: `${POKEAPI_BASE}/pokemon/${pokemon.id}/` }];
        count = 1;
      } catch {
        results = [];
        count = 0;
      }
    } else {
      const res = await fetch(
        `${POKEAPI_BASE}/pokemon?limit=${limit}&offset=${offset}`,
        { cache: "force-cache" }
      );
      if (!res.ok) throw new Error();
      const data = await res.json();
      results = data.results;
      count = data.count;
      next = data.next;
      previous = data.previous;
    }

    const enrichedResults = await Promise.all(
      results.map(async (pokemon) => {
        const id = idFromUrl(pokemon.url);

        // Pull lightweight detail for card info (types). Fail soft so the
        // list still renders if a single lookup errors out.
        let types = [];
        try {
          const detailRes = await fetch(`${POKEAPI_BASE}/pokemon/${id}`, {
            cache: "force-cache",
          });
          if (detailRes.ok) {
            const detail = await detailRes.json();
            types = detail.types.map((t) => t.type.name);
          }
        } catch {
          types = [];
        }

        return {
          ...pokemon,
          id,
          types,
          image: officialSprite(id),
          pixelImage: pixelSprite(id),
        };
      })
    );

    return NextResponse.json({ count, next, previous, results: enrichedResults });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch Pokemon" }, { status: 500 });
  }
}
