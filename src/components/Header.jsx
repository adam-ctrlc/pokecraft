"use client";
import { useState } from "react";
import { Search, Menu, X, BookOpen, Home, Swords } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Home", icon: Home },
  { href: "/wiki/1", label: "Wiki", icon: BookOpen },
  { href: "/battle", label: "Battle", icon: Swords },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    const base = `/${href.split("/")[1]}`; // "/wiki/1" -> "/wiki"
    return pathname.startsWith(base);
  };

  return (
    <header className="sticky top-0 z-50 bg-stone-900 border-b-4 border-stone-700 shadow-[0_6px_0_rgba(0,0,0,0.4)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-3 group">
            <div className="w-11 h-11 bg-red-600 border-4 border-white shadow-[inset_-4px_-4px_0_rgba(0,0,0,0.25)] group-hover:bg-red-500 transition-colors flex items-center justify-center relative">
              {/* Pokeball */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-black" />
              <div className="w-3.5 h-3.5 bg-white border-2 border-black rounded-full z-10" />
            </div>
            <span className="font-pokemon text-2xl sm:text-3xl leading-none -mt-1 group-hover:brightness-110 transition-all">
              PokeCraft
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map(({ href, label, icon: Icon }) => {
              const active = isActive(href);
              return (
                <Link
                  key={label}
                  href={href}
                  className={`flex items-center gap-2 uppercase text-sm tracking-widest transition-all ${
                    active
                      ? "text-yellow-400"
                      : "text-stone-400 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/wiki/1" className="hidden sm:block">
              <button className="flex items-center gap-2 px-4 py-3 bg-green-600 text-white border-b-4 border-green-800 hover:bg-green-500 active:border-b-0 active:translate-y-1 transition-all uppercase text-xs tracking-widest">
                <Search className="w-4 h-4" />
                Search
              </button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-stone-900 border-t-4 border-stone-800 p-4 absolute w-full shadow-2xl">
          <nav className="flex flex-col gap-3">
            {NAV.map(({ href, label, icon: Icon }) => {
              const active = isActive(href);
              return (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 border-2 text-center uppercase tracking-widest transition-all ${
                    active
                      ? "bg-stone-800 border-yellow-500 text-yellow-400"
                      : "bg-stone-800 border-stone-600 text-stone-300 hover:text-white hover:bg-stone-700"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
