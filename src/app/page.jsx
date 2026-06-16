import Link from "next/link";
import { ArrowRight, Zap, Map, BookOpen, Shield, Search } from "lucide-react";
import { pixelSprite as SPRITE, TEXTURE } from "@/config/sprites";

// Starters + a few fan favourites for the hero / marquee
const HERO_SPRITES = [1, 4, 7, 25, 133];
const MARQUEE_SPRITES = [
  1, 4, 7, 25, 39, 52, 54, 94, 130, 131, 133, 143, 149, 150, 151, 196, 197, 248,
];

const STATS = [
  { label: "Species", value: "1000+" },
  { label: "Types", value: "18" },
  { label: "Regions", value: "9" },
  { label: "Free", value: "100%" },
];

const FEATURES = [
  {
    icon: BookOpen,
    accent: "text-blue-400",
    title: "Comprehensive Wiki",
    body: "Detailed data on hundreds of species. Stats, types, abilities and lore at your fingertips.",
  },
  {
    icon: Shield,
    accent: "text-red-400",
    title: "Type Matchups",
    body: "Know every weakness, strength and resistance before you step into battle.",
  },
  {
    icon: Map,
    accent: "text-green-400",
    title: "Adventure Mode",
    body: "Explore the world with an interactive Pokedex and catch 'em all, block by block.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#111]">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden border-b-4 border-stone-700"
        style={{ backgroundImage: `url(${TEXTURE.cubes})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/85 to-stone-950 z-0" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-24 pb-20 text-center">
          {/* Floating sprite parade */}
          <div className="flex justify-center items-end gap-4 sm:gap-8 mb-10 h-28">
            {HERO_SPRITES.map((id, i) => (
              <img
                key={id}
                src={SPRITE(id)}
                alt=""
                aria-hidden
                className={`pixelated object-contain drop-shadow-[0_6px_0_rgba(0,0,0,0.4)] animate-float ${
                  i === 2 ? "w-24 h-24 sm:w-28 sm:h-28" : "w-16 h-16 sm:w-20 sm:h-20"
                } ${i % 2 === 0 ? "[animation-delay:0.4s]" : ""}`}
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </div>

          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-stone-800 border-2 border-stone-600 text-[10px] sm:text-xs text-yellow-400 uppercase tracking-widest">
            <Zap className="w-4 h-4 fill-current" />
            Gotta craft &apos;em all
          </div>

          <h1 className="font-pokemon text-6xl md:text-8xl mb-8 leading-none">
            PokeCraft
          </h1>

          <p className="text-stone-300 text-base md:text-xl mb-12 leading-relaxed max-w-2xl mx-auto drop-shadow-md">
            The ultimate blocky guide to the Pokemon universe. Discover species,
            stats, type matchups and lore — all in one pixelated Pokedex.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              href="/wiki"
              className="group inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white border-b-4 border-green-800 hover:bg-green-500 hover:border-green-700 active:border-b-0 active:translate-y-1 transition-all"
            >
              <span className="text-sm md:text-base mr-3 uppercase tracking-widest">
                Start Adventure
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/wiki/1"
              className="group inline-flex items-center justify-center px-8 py-4 bg-stone-800 text-stone-200 border-b-4 border-stone-950 hover:bg-stone-700 active:border-b-0 active:translate-y-1 transition-all"
            >
              <Search className="w-5 h-5 mr-3" />
              <span className="text-sm md:text-base uppercase tracking-widest">
                Browse Pokedex
              </span>
            </Link>
          </div>
        </div>

        {/* Stats strip */}
        <div className="relative z-10 border-t-4 border-stone-800 bg-stone-950/80">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x-2 divide-stone-800">
            {STATS.map((s) => (
              <div key={s.label} className="py-6 px-4 text-center">
                <div className="text-2xl md:text-3xl text-yellow-400 drop-shadow-[2px_2px_0_#9a5d00]">
                  {s.value}
                </div>
                <div className="mt-2 text-[10px] md:text-xs text-stone-400 uppercase tracking-widest">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sprite Marquee */}
      <div className="relative overflow-hidden border-b-4 border-stone-700 bg-stone-900 py-6">
        <div className="flex w-max animate-marquee gap-10 px-5">
          {[...MARQUEE_SPRITES, ...MARQUEE_SPRITES].map((id, i) => (
            <img
              key={`${id}-${i}`}
              src={SPRITE(id)}
              alt=""
              aria-hidden
              className="pixelated w-14 h-14 object-contain opacity-60 hover:opacity-100 transition-opacity shrink-0"
            />
          ))}
        </div>
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-stone-900 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-stone-900 to-transparent" />
      </div>

      {/* Features Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full">
        <h2 className="text-2xl md:text-3xl text-center text-white mb-16 drop-shadow-[2px_2px_0_#9a5d00] uppercase">
          What&apos;s Inside
        </h2>

        <ul className="grid md:grid-cols-3 gap-10">
          {FEATURES.map(({ icon: Icon, accent, title, body }) => (
            <li key={title}>
              <article className="h-full bg-stone-800 p-8 pt-10 border-4 border-stone-600 relative group hover:-translate-y-2 hover:border-stone-500 transition-all">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-stone-900 border-4 border-stone-600 p-3 group-hover:border-stone-500 transition-colors">
                  <Icon className={`w-8 h-8 ${accent}`} />
                </div>
                <h3 className="text-lg md:text-xl text-yellow-400 mt-4 mb-4 text-center uppercase">
                  {title}
                </h3>
                <p className="text-stone-400 text-center text-xs md:text-sm leading-loose">
                  {body}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="bg-stone-900 py-16 border-t-4 border-stone-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Zap className="w-12 h-12 text-yellow-400 fill-current mx-auto mb-6 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
          <h3 className="text-xl md:text-2xl text-white mb-6 uppercase leading-relaxed">
            Ready to start your journey?
          </h3>
          <p className="text-stone-500 mb-10 text-sm leading-loose">
            Dive into the Pokedex and explore every species in the PokeCraft
            universe.
          </p>
          <Link
            href="/wiki"
            className="group inline-flex items-center justify-center px-10 py-4 bg-yellow-500 text-black border-b-4 border-yellow-700 hover:bg-yellow-400 active:border-b-0 active:translate-y-1 transition-all"
          >
            <span className="text-sm md:text-base mr-3 uppercase tracking-widest font-bold">
              Open Pokedex
            </span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
