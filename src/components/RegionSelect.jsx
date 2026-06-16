"use client";

import { Globe } from "lucide-react";
import Select from "@/components/Select";
import { GENERATION_LIST } from "@/utils/generation";

const RegionLabel = ({ gen }) => (
  <span className="flex items-center gap-2 text-sm text-stone-300">
    <span className="font-mono text-yellow-400">{gen.roman}</span>
    <span className="uppercase tracking-widest text-xs">{gen.region}</span>
  </span>
);

const OPTIONS = [
  {
    value: "all",
    node: (
      <span className="text-sm uppercase tracking-widest text-stone-300">
        All Regions
      </span>
    ),
  },
  ...GENERATION_LIST.map((gen) => ({
    value: gen.roman,
    node: <RegionLabel gen={gen} />,
  })),
];

export default function RegionSelect({ value, onChange }) {
  return (
    <Select value={value} onChange={onChange} options={OPTIONS} icon={Globe} />
  );
}
