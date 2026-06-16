"use client";

import { useState } from "react";
import { showdownGif, officialSprite } from "@/config/sprites";
import { X, Plus } from "lucide-react";

const cap = (s) => s.replace(/-/g, " ");

// Row of mini party cards.
// Build mode: pass teamSize + onAdd/onRemove (empty slots become add buttons),
//   plus onReorder(from, to) to enable drag-to-reorder.
// Battle mode: pass activeId + fainted (read-only, greys fainted, lifts active).
export default function PartyTray({
  team,
  side,
  teamSize,
  activeId,
  fainted = [],
  onAdd,
  onRemove,
  onReorder,
  reverse,
}) {
  const isEnemy = side === "enemy";
  const count = teamSize ?? team.length;
  const slots = Array.from({ length: count });

  const [dragIndex, setDragIndex] = useState(null);
  const [overIndex, setOverIndex] = useState(null);
  const canDrag = !!onReorder;

  const handleDrop = (to) => {
    if (dragIndex !== null && dragIndex !== to) onReorder(dragIndex, to);
    setDragIndex(null);
    setOverIndex(null);
  };

  return (
    <div className={`flex gap-1.5 flex-wrap ${reverse ? "flex-row-reverse" : ""}`}>
      {slots.map((_, i) => {
        const m = team[i];

        if (!m) {
          if (!onAdd) return null;
          return (
            <button
              key={`empty-${i}`}
              onClick={onAdd}
              onDragOver={canDrag ? (e) => e.preventDefault() : undefined}
              onDrop={canDrag ? () => handleDrop(i) : undefined}
              aria-label="Add Pokemon"
              className="w-12 h-[3.4rem] flex items-center justify-center bg-stone-900 border-2 border-dashed border-stone-700 text-stone-600 hover:border-stone-500 hover:text-stone-300 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          );
        }

        const isFainted = fainted.includes(m.id);
        const isActive = activeId && m.id === activeId && !isFainted;
        const isOver = overIndex === i && dragIndex !== i;

        return (
          <div
            key={m.id}
            title={cap(m.name)}
            draggable={canDrag}
            onDragStart={canDrag ? () => setDragIndex(i) : undefined}
            onDragEnter={canDrag ? () => setOverIndex(i) : undefined}
            onDragOver={canDrag ? (e) => e.preventDefault() : undefined}
            onDrop={canDrag ? () => handleDrop(i) : undefined}
            onDragEnd={canDrag ? () => { setDragIndex(null); setOverIndex(null); } : undefined}
            className={`relative w-12 bg-stone-800 border-2 transition-all ${
              canDrag ? "cursor-grab active:cursor-grabbing" : ""
            } ${
              isOver
                ? "border-yellow-400 ring-2 ring-yellow-400/40"
                : isActive
                ? "border-yellow-400 -translate-y-1 shadow-[0_3px_0_rgba(0,0,0,0.4)]"
                : isEnemy
                ? "border-red-800"
                : "border-sky-800"
            } ${isFainted ? "opacity-30 grayscale" : ""} ${
              dragIndex === i ? "opacity-40" : ""
            }`}
          >
            <div
              className={`h-0.5 w-full ${isEnemy ? "bg-red-500" : "bg-sky-500"}`}
            />
            <img
              src={showdownGif(m.id)}
              alt={m.name}
              draggable={false}
              onError={(e) => {
                e.currentTarget.src = officialSprite(m.id);
              }}
              className="w-full h-10 object-contain pixelated pointer-events-none"
            />
            {isFainted && (
              <X className="absolute inset-0 m-auto w-5 h-5 text-red-500" />
            )}
            {onRemove && (
              <button
                onClick={() => onRemove(i)}
                aria-label="Remove"
                className={`absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center text-white border border-stone-900 ${
                  isEnemy ? "bg-red-600" : "bg-sky-600"
                }`}
              >
                <X className="w-2.5 h-2.5" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
