import Link from "next/link";

export default function PokemonCard({ pokemon }) {
  return (
    <Link href={`/pokemon/${pokemon.id}`} className="group relative block">
      {/* Card Container */}
      <div className="bg-stone-800 border-4 border-stone-600 p-4 transition-transform group-hover:-translate-y-2 group-hover:shadow-[0_8px_0_#444] shadow-[0_4px_0_#222] relative overflow-hidden">
        {/* ID Badge */}
        <div className="absolute top-2 left-2 bg-stone-900 px-2 py-1 text-xs text-stone-500 font-mono">
          #{String(pokemon.id).padStart(3, "0")}
        </div>

        {/* Image Area */}
        <div className="aspect-square bg-stone-700/50 mb-4 flex items-center justify-center border-2 border-stone-900 group-hover:bg-stone-700 transition-colors">
          <img
            src={pokemon.pixelImage || pokemon.image}
            alt={pokemon.name}
            className="w-3/4 h-3/4 object-contain rendering-pixelated group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Name */}
        <h3 className="text-center text-white capitalize text-sm md:text-base truncate px-2 group-hover:text-yellow-400 transition-colors">
          {pokemon.name}
        </h3>

        {/* Corner Accents */}
        <div className="absolute top-0 right-0 w-2 h-2 bg-stone-500"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-stone-500"></div>
      </div>
    </Link>
  );
}
