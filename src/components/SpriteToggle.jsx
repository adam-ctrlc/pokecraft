"use client";

import { Box, Image as ImageIcon } from "lucide-react";
import { useSpriteView } from "@/utils/useSpriteView";

export default function SpriteToggle() {
  const [view, setView] = useSpriteView();

  return (
    <div className="flex bg-stone-950 border-2 border-stone-700 p-0.5 w-max">
      <button
        onClick={() => setView("3d")}
        title="Animated 3D sprites"
        className={`flex items-center gap-1.5 px-3 py-2 text-[10px] uppercase tracking-widest transition-colors ${
          view === "3d"
            ? "bg-green-600 text-white"
            : "text-stone-400 hover:text-white"
        }`}
      >
        <Box className="w-3.5 h-3.5" />
        3D
      </button>
      <button
        onClick={() => setView("art")}
        title="Static pixel sprites"
        className={`flex items-center gap-1.5 px-3 py-2 text-[10px] uppercase tracking-widest transition-colors ${
          view === "art"
            ? "bg-green-600 text-white"
            : "text-stone-400 hover:text-white"
        }`}
      >
        <ImageIcon className="w-3.5 h-3.5" />
        Pixel
      </button>
    </div>
  );
}
