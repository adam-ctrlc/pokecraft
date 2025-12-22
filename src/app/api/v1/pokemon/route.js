import { NextResponse } from "next/server";
import axios from "axios";
import { POKEAPI_BASE } from "../../config";

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
      // Direct look up by name/id
      try {
        const response = await axios.get(
          `${POKEAPI_BASE}/pokemon/${search.toLowerCase()}`
        );
        const pokemon = response.data;
        results = [
          {
            name: pokemon.name,
            url: `${POKEAPI_BASE}/pokemon/${pokemon.id}/`,
          },
        ];
        count = 1;
      } catch {
        results = [];
        count = 0;
      }
    } else {
      // List mode
      const response = await axios.get(`${POKEAPI_BASE}/pokemon`, {
        params: { limit, offset },
      });
      results = response.data.results;
      count = response.data.count;
      next = response.data.next;
      previous = response.data.previous;
    }

    // Enrich data
    const enrichedResults = results.map((pokemon) => {
      const id = pokemon.url.split("/").filter(Boolean).pop();
      return {
        ...pokemon,
        id,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        pixelImage: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${id}.png`,
      };
    });

    return NextResponse.json({
      count,
      next,
      previous,
      results: enrichedResults,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch Pokemon" },
      { status: 500 }
    );
  }
}
