"use client";

import { useRef, useState } from "react";
import { Play, Pause, Volume2, RotateCcw } from "lucide-react";

// Number of pixel bars in the equalizer / progress track
const BARS = 24;

export default function CryPlayer({ src, name }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 - 1

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.currentTime = 0;
      audio.play();
    }
  };

  const onTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio?.duration) return;
    setProgress(audio.currentTime / audio.duration);
  };

  const filled = Math.round(progress * BARS);

  return (
    <div className="bg-stone-800 border-4 border-stone-600 p-4 shadow-[4px_4px_0_rgba(0,0,0,0.4)]">
      <audio
        ref={audioRef}
        src={src}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false);
          setProgress(0);
        }}
        onTimeUpdate={onTimeUpdate}
      />

      <div className="flex items-center gap-2 mb-3 text-stone-400">
        <Volume2 className="w-4 h-4" />
        <span className="text-[10px] uppercase tracking-widest">
          {name} - Cry
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Play / pause button */}
        <button
          onClick={toggle}
          aria-label={isPlaying ? "Pause cry" : "Play cry"}
          className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-green-600 text-white border-b-4 border-green-800 hover:bg-green-500 active:border-b-0 active:translate-y-1 transition-all"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 fill-current" />
          ) : progress >= 1 ? (
            <RotateCcw className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 fill-current translate-x-0.5" />
          )}
        </button>

        {/* Pixel equalizer / progress */}
        <div className="flex-grow flex items-end gap-[3px] h-12 bg-stone-950 border-2 border-stone-700 px-2 py-2">
          {Array.from({ length: BARS }).map((_, i) => {
            const isFilled = i < filled;
            // Pseudo-random but stable heights for a waveform look
            const h = 30 + ((i * 37) % 70);
            return (
              <div
                key={i}
                className={`flex-1 transition-colors ${
                  isFilled
                    ? "bg-green-500"
                    : isPlaying
                    ? "bg-stone-700 animate-pulse"
                    : "bg-stone-700"
                }`}
                style={{ height: `${h}%` }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
