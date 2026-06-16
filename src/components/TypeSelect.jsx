"use client";

import { SlidersHorizontal } from "lucide-react";
import Select from "@/components/Select";
import { ALL_TYPES, typeBadge } from "@/utils/typeColors";

const TypeChip = ({ type }) => (
  <span
    className={`text-[10px] uppercase font-bold px-2 py-0.5 border-2 border-stone-900 ${typeBadge(
      type
    )}`}
  >
    {type}
  </span>
);

const OPTIONS = [
  {
    value: "all",
    node: (
      <span className="text-sm uppercase tracking-widest text-stone-300">
        All Types
      </span>
    ),
  },
  ...ALL_TYPES.map((type) => ({ value: type, node: <TypeChip type={type} /> })),
];

export default function TypeSelect({ value, onChange }) {
  return (
    <Select
      value={value}
      onChange={onChange}
      options={OPTIONS}
      icon={SlidersHorizontal}
    />
  );
}
