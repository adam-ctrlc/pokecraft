import Link from "next/link";
import { ArrowRight, Zap, Map, BookOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#111]">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] relative overflow-hidden border-b-4 border-stone-700">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-stone-900/80 z-0"></div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <Zap className="w-20 h-20 text-yellow-400 fill-current animate-pulse drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
          </div>

          <h1 className="text-4xl md:text-6xl mb-6 text-yellow-400 drop-shadow-[4px_4px_0_#9a5d00] animate-bounce">
            Welcome to PokeCraft
          </h1>

          <p className="text-stone-300 text-lg md:text-xl mb-12 leading-relaxed max-w-2xl mx-auto drop-shadow-md">
            The ultimate blocky guide associated with the Pokemon universe.
            Discover species, statistics, and lore.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link
              href="/wiki"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white border-b-4 border-green-800 hover:bg-green-500 hover:border-green-700 active:border-b-0 active:translate-y-1 transition-all"
            >
              <span className="text-sm md:text-base mr-3 uppercase tracking-widest">
                Start Adventure
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Decorative Zaps */}
        <div className="absolute bottom-10 left-10 hidden md:block animate-pulse text-stone-700">
          <Zap className="w-16 h-16 rotate-12" />
        </div>
        <div className="absolute top-20 right-20 hidden md:block text-stone-700">
          <Zap className="w-12 h-12 -rotate-12" />
        </div>
      </div>

      {/* Featured Features Section */}
      <div className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl text-center text-white mb-16 drop-shadow-[2px_2px_0_#9a5d00] uppercase">
          Featured Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-stone-800 p-8 border-4 border-stone-600 relative group hover:-translate-y-2 transition-transform">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-stone-900 border-4 border-stone-600 p-3">
              <BookOpen className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-xl text-yellow-400 mt-6 mb-4 text-center uppercase">
              Comprehensive Wiki
            </h3>
            <p className="text-stone-400 text-center text-sm leading-loose">
              Access detailed data on hundreds of Pokemon species. Stats, types,
              and abilities at your fingertips.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-stone-800 p-8 border-4 border-stone-600 relative group hover:-translate-y-2 transition-transform delay-100">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-stone-900 border-4 border-stone-600 p-3">
              <Zap className="w-8 h-8 text-yellow-400" />
            </div>
            <h3 className="text-xl text-yellow-400 mt-6 mb-4 text-center uppercase">
              Fast & Electric
            </h3>
            <p className="text-stone-400 text-center text-sm leading-loose">
              Discover the fastest Pokemon in the universe. Compare speed stats
              and find your perfect electric companion.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-stone-800 p-8 border-4 border-stone-600 relative group hover:-translate-y-2 transition-transform delay-200">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-stone-900 border-4 border-stone-600 p-3">
              <Map className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl text-yellow-400 mt-6 mb-4 text-center uppercase">
              Adventure Mode
            </h3>
            <p className="text-stone-400 text-center text-sm leading-loose">
              Explore the world with our interactive interface. Catch 'em all in
              our digital Pokedex.
            </p>
          </div>
        </div>
      </div>

      {/* Newsletter / CTA */}
      <div className="bg-stone-900 py-16 border-t-4 border-stone-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl text-white mb-6 uppercase">
            Join the PokeCraft Server
          </h3>
          <p className="text-stone-500 mb-8">
            Get updates on the latest pixelmon discoveries.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              id="email-input"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="flex-grow bg-stone-950 border-4 border-r-0 border-stone-700 p-4 text-white placeholder-stone-700 outline-none"
            />
            <button className="bg-green-600 text-white px-6 font-bold uppercase tracking-widest border-4 border-green-800 hover:bg-green-500 transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
