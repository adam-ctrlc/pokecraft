"use client";
import { useState } from "react";
import { Search, Zap, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-stone-900 border-b-4 border-stone-700 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 flex items-center gap-3 group"
          >
            <div className="w-10 h-10 bg-yellow-500 border-4 border-white shadow-[inset_-4px_-4px_0_rgba(0,0,0,0.2)] hover:bg-yellow-400 transition-colors flex items-center justify-center">
              <Zap className="w-6 h-6 text-black fill-current" />
            </div>
            <span className="text-xl sm:text-2xl text-white tracking-widest drop-shadow-[2px_2px_0_#000] group-hover:text-yellow-400 transition-colors">
              PokeCraft
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-stone-300 hover:text-white hover:underline decoration-4 underline-offset-4 decoration-green-600 transition-all"
            >
              Home
            </Link>
            <Link
              href="/wiki/1"
              className="text-stone-300 hover:text-white hover:underline decoration-4 underline-offset-4 decoration-blue-500 transition-all"
            >
              Wiki
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/wiki/1">
              <button className="p-3 bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 border-2 border-stone-600 hover:border-stone-400 active:translate-y-1 transition-all">
                <Search className="w-5 h-5" />
              </button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-3 bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 border-2 border-stone-600 hover:border-stone-400 active:translate-y-1 transition-all"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Placeholder (simplified) */}
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-stone-900 border-t-4 border-stone-800 p-4 absolute w-full shadow-2xl animate-in slide-in-from-top-4">
          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 border-2 border-stone-600 text-center uppercase font-bold tracking-widest transition-all"
            >
              Home
            </Link>
            <Link
              href="/wiki"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 border-2 border-stone-600 text-center uppercase font-bold tracking-widest transition-all"
            >
              Wiki
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
