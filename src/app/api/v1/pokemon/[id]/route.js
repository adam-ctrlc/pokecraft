import { NextResponse } from "next/server";
import { POKEAPI_BASE } from "@/config/pokeapi";
import { officialSprite } from "@/config/sprites";
import { idFromUrl } from "@/utils/pokeapi";

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    const pokemonRes = await fetch(`${POKEAPI_BASE}/pokemon/${id}`, {
      cache: "force-cache",
    });
    if (!pokemonRes.ok) throw new Error();
    const pokemonData = await pokemonRes.json();

    const speciesRes = await fetch(pokemonData.species.url, {
      cache: "force-cache",
    });
    if (!speciesRes.ok) throw new Error();
    const speciesData = await speciesRes.json();

    const evolutionRes = await fetch(speciesData.evolution_chain.url, {
      cache: "force-cache",
    });
    if (!evolutionRes.ok) throw new Error();
    const evolutionData = await evolutionRes.json();

    const typeResponses = await Promise.all(
      pokemonData.types.map((t) =>
        fetch(t.type.url, { cache: "force-cache" }).then((r) => r.json())
      )
    );
    const damageRelations = typeResponses.map((r) => r.damage_relations);

    const weaknesses = new Set();
    const strengths = new Set();
    const resistances = new Set();

    damageRelations.forEach((rel) => {
      rel.double_damage_from.forEach((t) => weaknesses.add(t.name));
      rel.double_damage_to.forEach((t) => strengths.add(t.name));
      rel.half_damage_from.forEach((t) => resistances.add(t.name));
      rel.no_damage_from.forEach((t) => resistances.add(t.name));
    });

    const descriptionEntry = speciesData.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    );
    const description = descriptionEntry
      ? descriptionEntry.flavor_text.replace(/[\f\n\r]/g, " ")
      : "No data available.";

    const getEvolutions = (chain) => {
      const evos = [];
      let current = chain;
      do {
        const speciesId = idFromUrl(current.species.url);
        evos.push({
          name: current.species.name,
          id: speciesId,
          image: officialSprite(speciesId),
          min_level: current.evolution_details?.[0]?.min_level || null,
        });
        current = current.evolves_to[0];
      } while (current);
      return evos;
    };

    const cleanData = {
      id: pokemonData.id,
      name: pokemonData.name,
      height: pokemonData.height,
      weight: pokemonData.weight,
      types: pokemonData.types.map((t) => t.type.name),
      abilities: pokemonData.abilities.map((a) => a.ability.name),
      stats: pokemonData.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
      sprites: {
        front_default: pokemonData.sprites.front_default,
        other: {
          "official-artwork": pokemonData.sprites.other["official-artwork"],
          showdown: pokemonData.sprites.other["showdown"],
        },
      },
      cries: pokemonData.cries,
      description,
      evolutionChain: getEvolutions(evolutionData.chain),
      weaknesses: Array.from(weaknesses),
      strengths: Array.from(strengths),
      resistances: Array.from(resistances),
    };

    return NextResponse.json(cleanData);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: `Failed to fetch complete Pokemon data for ID ${id}` },
      { status: 500 }
    );
  }
}
