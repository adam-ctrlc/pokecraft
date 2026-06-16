"use client";

import { Mountain } from "lucide-react";
import Select from "@/components/Select";
import { BIOME_LIST } from "@/config/biomes";

const OPTIONS = BIOME_LIST.map((b) => ({
  value: b.key,
  node: (
    <span className="flex items-center gap-2">
      <span
        className="w-4 h-4 border-2 border-stone-900 shrink-0"
        style={{ background: b.swatch }}
      />
      <span className="uppercase tracking-widest text-xs text-stone-200">
        {b.name}
      </span>
    </span>
  ),
}));

export default function BiomeSelect({ value, onChange }) {
  return (
    <Select value={value} onChange={onChange} options={OPTIONS} icon={Mountain} />
  );
}
