// Single source of truth for Pokemon type styling.
// bg/text -> tailwind badge classes; glow -> "r,g,b" for rgba() effects.
export const TYPE_META = {
  normal: { bg: "bg-neutral-400", text: "text-black", glow: "163,163,163" },
  fire: { bg: "bg-orange-500", text: "text-white", glow: "249,115,22" },
  water: { bg: "bg-sky-500", text: "text-white", glow: "14,165,233" },
  electric: { bg: "bg-yellow-400", text: "text-black", glow: "250,204,21" },
  grass: { bg: "bg-green-500", text: "text-white", glow: "34,197,94" },
  ice: { bg: "bg-cyan-300", text: "text-black", glow: "103,232,249" },
  fighting: { bg: "bg-red-700", text: "text-white", glow: "185,28,28" },
  poison: { bg: "bg-purple-500", text: "text-white", glow: "168,85,247" },
  ground: { bg: "bg-amber-600", text: "text-white", glow: "217,119,6" },
  flying: { bg: "bg-indigo-300", text: "text-black", glow: "165,180,252" },
  psychic: { bg: "bg-pink-500", text: "text-white", glow: "236,72,153" },
  bug: { bg: "bg-lime-500", text: "text-white", glow: "132,204,22" },
  rock: { bg: "bg-stone-500", text: "text-white", glow: "120,113,108" },
  ghost: { bg: "bg-indigo-800", text: "text-white", glow: "55,48,163" },
  dragon: { bg: "bg-violet-600", text: "text-white", glow: "124,58,237" },
  steel: { bg: "bg-slate-400", text: "text-white", glow: "148,163,184" },
  fairy: { bg: "bg-pink-300", text: "text-black", glow: "249,168,212" },
};

const FALLBACK = { bg: "bg-stone-500", text: "text-white", glow: "120,113,108" };

export const ALL_TYPES = Object.keys(TYPE_META);

const meta = (type) => TYPE_META[type] || FALLBACK;

/** Combined badge classes, e.g. "bg-orange-500 text-white". */
export const typeBadge = (type) => `${meta(type).bg} ${meta(type).text}`;

/** Background color class only (for bars / accents). */
export const typeBar = (type) => meta(type).bg;

/** "r,g,b" string for use in rgba(...) glows. */
export const typeGlow = (type) => meta(type).glow;
