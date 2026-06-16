"use client";

import { useState, useRef, useCallback } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useClickOutside } from "@/utils/useClickOutside";

// Generic pixel-themed dropdown.
// options: [{ value: string, node: ReactNode }]
export default function Select({ value, onChange, options, icon: Icon }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useClickOutside(
    ref,
    useCallback(() => setOpen(false), [])
  );

  const current = options.find((o) => o.value === value) || options[0];

  return (
    <div ref={ref} className="relative w-full sm:w-56">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-2 bg-stone-900 border-2 border-stone-600 px-3 py-3 text-left whitespace-nowrap hover:border-stone-500 focus:border-green-500 focus:outline-none transition-colors"
      >
        <span className="flex items-center gap-2 min-w-0">
          {Icon && <Icon className="w-4 h-4 text-stone-500 shrink-0" />}
          {current?.node}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-stone-500 shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Options */}
      {open && (
        <ul className="absolute z-30 mt-2 w-full max-h-72 overflow-y-auto bg-stone-900 border-2 border-stone-600 shadow-[6px_6px_0_rgba(0,0,0,0.5)]">
          {options.map((o) => {
            const active = o.value === value;
            return (
              <li key={o.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 text-left border-b-2 border-stone-800 last:border-b-0 transition-colors ${
                    active ? "bg-stone-800" : "hover:bg-stone-800"
                  }`}
                >
                  {o.node}
                  {active && (
                    <Check className="w-4 h-4 text-green-400 shrink-0" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
