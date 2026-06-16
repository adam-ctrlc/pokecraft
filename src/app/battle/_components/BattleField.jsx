"use client";

import {
  showdownGif,
  showdownBackGif,
  officialSprite,
  backSprite,
  TEXTURE,
} from "@/config/sprites";
import { getBiome } from "@/config/biomes";
import { Plus } from "lucide-react";

const cap = (s) => s.replace(/-/g, " ");
const PIXEL = { imageRendering: "pixelated" };

function PixelCloud({ className, delay, color }) {
  return (
    <svg
      viewBox="0 0 16 8"
      className={`absolute w-24 h-auto animate-drift ${className}`}
      style={{ ...PIXEL, animationDelay: delay }}
      shapeRendering="crispEdges"
      aria-hidden
    >
      <g fill={color}>
        <rect x="5" y="1" width="6" height="2" />
        <rect x="3" y="3" width="10" height="2" />
        <rect x="1" y="5" width="14" height="2" />
      </g>
      <rect x="1" y="7" width="14" height="1" fill="rgba(0,0,0,0.12)" />
    </svg>
  );
}

function PixelTree({ className, w = 52, colors }) {
  return (
    <svg
      viewBox="0 0 12 16"
      className={`absolute ${className}`}
      style={{ ...PIXEL, width: w }}
      shapeRendering="crispEdges"
      aria-hidden
    >
      <g fill={colors.canopy}>
        <rect x="3" y="0" width="6" height="2" />
        <rect x="2" y="2" width="8" height="2" />
        <rect x="1" y="4" width="10" height="4" />
        <rect x="2" y="8" width="8" height="2" />
        <rect x="3" y="10" width="6" height="1" />
      </g>
      <g fill={colors.shade}>
        <rect x="8" y="3" width="2" height="5" />
        <rect x="3" y="9" width="6" height="2" />
      </g>
      <rect x="5" y="11" width="2" height="5" fill={colors.trunk} />
    </svg>
  );
}

function PixelPine({ className, w = 48, colors }) {
  return (
    <svg
      viewBox="0 0 12 16"
      className={`absolute ${className}`}
      style={{ ...PIXEL, width: w }}
      shapeRendering="crispEdges"
      aria-hidden
    >
      <g fill={colors.canopy}>
        <rect x="5" y="1" width="2" height="2" />
        <rect x="4" y="3" width="4" height="2" />
        <rect x="3" y="5" width="6" height="2" />
        <rect x="2" y="7" width="8" height="2" />
        <rect x="1" y="9" width="10" height="2" />
      </g>
      <g fill={colors.shade}>
        <rect x="8" y="7" width="2" height="2" />
        <rect x="9" y="9" width="2" height="2" />
      </g>
      <g fill="#ffffff">
        <rect x="5" y="1" width="2" height="1" />
        <rect x="4" y="3" width="2" height="1" />
        <rect x="3" y="5" width="2" height="1" />
        <rect x="2" y="7" width="2" height="1" />
        <rect x="1" y="9" width="3" height="1" />
      </g>
      <rect x="5" y="11" width="2" height="5" fill={colors.trunk} />
    </svg>
  );
}

function PixelCactus({ className, w = 40, colors }) {
  return (
    <svg
      viewBox="0 0 12 16"
      className={`absolute ${className}`}
      style={{ ...PIXEL, width: w }}
      shapeRendering="crispEdges"
      aria-hidden
    >
      <g fill={colors.canopy}>
        <rect x="5" y="1" width="2" height="15" />
        <rect x="2" y="7" width="3" height="2" />
        <rect x="2" y="4" width="2" height="4" />
        <rect x="7" y="9" width="3" height="2" />
        <rect x="8" y="6" width="2" height="4" />
      </g>
      <rect x="6" y="1" width="1" height="15" fill={colors.shade} />
    </svg>
  );
}

function PixelSun({ className }) {
  return (
    <svg
      viewBox="0 0 10 10"
      className={`absolute w-12 h-12 ${className}`}
      style={PIXEL}
      shapeRendering="crispEdges"
      aria-hidden
    >
      <g fill="#ffe14d">
        <rect x="3" y="0" width="4" height="1" />
        <rect x="2" y="1" width="6" height="1" />
        <rect x="1" y="2" width="8" height="6" />
        <rect x="2" y="8" width="6" height="1" />
        <rect x="3" y="9" width="4" height="1" />
      </g>
      <rect x="3" y="3" width="2" height="2" fill="#fff59d" />
    </svg>
  );
}

function PixelMoon({ className }) {
  return (
    <svg
      viewBox="0 0 10 10"
      className={`absolute w-11 h-11 ${className}`}
      style={PIXEL}
      shapeRendering="crispEdges"
      aria-hidden
    >
      <g fill="#e8eaf0">
        <rect x="3" y="0" width="4" height="1" />
        <rect x="2" y="1" width="6" height="1" />
        <rect x="1" y="2" width="8" height="6" />
        <rect x="2" y="8" width="6" height="1" />
        <rect x="3" y="9" width="4" height="1" />
      </g>
      <g fill="#cfd3e0">
        <rect x="3" y="3" width="2" height="2" />
        <rect x="6" y="5" width="1" height="1" />
      </g>
    </svg>
  );
}

function PixelRock({ className, w = 44, colors }) {
  return (
    <svg
      viewBox="0 0 12 16"
      className={`absolute ${className}`}
      style={{ ...PIXEL, width: w }}
      shapeRendering="crispEdges"
      aria-hidden
    >
      <g fill={colors.canopy}>
        <rect x="3" y="7" width="5" height="2" />
        <rect x="2" y="9" width="8" height="2" />
        <rect x="1" y="11" width="10" height="3" />
      </g>
      <g fill={colors.shade}>
        <rect x="7" y="9" width="3" height="5" />
        <rect x="6" y="11" width="1" height="3" />
      </g>
    </svg>
  );
}

function PixelDeadTree({ className, w = 46, colors }) {
  return (
    <svg
      viewBox="0 0 12 16"
      className={`absolute ${className}`}
      style={{ ...PIXEL, width: w }}
      shapeRendering="crispEdges"
      aria-hidden
    >
      <g fill={colors.trunk}>
        <rect x="5" y="3" width="2" height="13" />
        <rect x="3" y="6" width="2" height="2" />
        <rect x="2" y="4" width="2" height="2" />
        <rect x="7" y="5" width="2" height="2" />
        <rect x="8" y="3" width="2" height="2" />
        <rect x="5" y="1" width="2" height="2" />
      </g>
    </svg>
  );
}

function PixelPalm({ className, w = 48, colors }) {
  return (
    <svg
      viewBox="0 0 12 16"
      className={`absolute ${className}`}
      style={{ ...PIXEL, width: w }}
      shapeRendering="crispEdges"
      aria-hidden
    >
      <rect x="5" y="6" width="2" height="10" fill={colors.trunk} />
      <g fill={colors.canopy}>
        <rect x="3" y="2" width="6" height="2" />
        <rect x="1" y="4" width="4" height="2" />
        <rect x="7" y="4" width="4" height="2" />
        <rect x="0" y="5" width="2" height="2" />
        <rect x="10" y="5" width="2" height="2" />
      </g>
      <rect x="5" y="3" width="2" height="2" fill={colors.shade} />
    </svg>
  );
}

function TreeSprite({ type, ...props }) {
  if (type === "pine") return <PixelPine {...props} />;
  if (type === "cactus") return <PixelCactus {...props} />;
  if (type === "rock") return <PixelRock {...props} />;
  if (type === "dead") return <PixelDeadTree {...props} />;
  if (type === "palm") return <PixelPalm {...props} />;
  return <PixelTree {...props} />;
}

function Stars() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      {Array.from({ length: 26 }).map((_, i) => {
        const size = i % 4 === 0 ? 2 : 1;
        return (
          <span
            key={i}
            className="absolute bg-white"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 52}%`,
              width: size,
              height: size,
              opacity: 0.85,
            }}
          />
        );
      })}
    </div>
  );
}

function Particles({ type, color }) {
  const isRain = type === "rain";
  const n = isRain ? 28 : type === "snow" ? 20 : 16;
  const w = isRain ? 1 : type === "snow" ? 3 : 4;
  const h = isRain ? 7 : w;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {Array.from({ length: n }).map((_, i) => (
        <span
          key={i}
          className={`absolute top-0 ${isRain ? "animate-rain" : "animate-fall"}`}
          style={{
            left: `${(i * (97 / n) + (i % 5) * 4) % 100}%`,
            width: w,
            height: h,
            background: color,
            animationDelay: `${-((i * 1.3) % 6)}s`,
            animationDuration: isRain
              ? `${1.2 + (i % 3) * 0.4}s`
              : `${5 + (i % 4)}s`,
          }}
        />
      ))}
    </div>
  );
}

const BLADES = [4, 7, 3, 6, 9, 4, 7, 5, 8, 3, 6, 4, 9, 5, 7, 3, 6, 8, 4, 7, 5, 9, 3, 6];

function Scenery({ biome }) {
  const t = biome.tree;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {biome.stars && <Stars />}

      {biome.celestial === "moon" && <PixelMoon className="top-[7%] right-[24%]" />}
      {biome.celestial === "sun" && <PixelSun className="top-[7%] right-[24%]" />}

      {biome.cloud && (
        <>
          <PixelCloud className="top-[8%] left-[8%]" delay="0s" color={biome.cloud} />
          <PixelCloud className="top-[17%] left-[52%] w-16" delay="-3s" color={biome.cloud} />
          <PixelCloud className="top-[4%] left-[76%] w-20" delay="-6s" color={biome.cloud} />
        </>
      )}

      {/* Tree line */}
      <TreeSprite type={t.type} colors={t} className="bottom-[32%] left-[3%]" w={48} />
      <TreeSprite type={t.type} colors={t} className="bottom-[33%] left-[26%]" w={36} />
      <TreeSprite type={t.type} colors={t} className="bottom-[33%] right-[28%]" w={40} />
      <TreeSprite type={t.type} colors={t} className="bottom-[32%] right-[2%]" w={52} />

      {/* Horizon */}
      <div
        className="absolute inset-x-0 bottom-[33%] h-1"
        style={{ background: biome.horizon }}
      />

      {/* Pixel grass blades */}
      <div className="absolute inset-x-0 bottom-[33%] flex items-end justify-between px-1">
        {BLADES.map((h, i) => (
          <span
            key={i}
            style={{ width: 6, height: h, background: biome.grass[i % 2] }}
          />
        ))}
      </div>

      {/* Dithered ground texture */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3 opacity-25 mix-blend-multiply"
        style={{ ...PIXEL, backgroundImage: `url(${TEXTURE.diamonds})` }}
      />

      {biome.particle && (
        <Particles type={biome.particle} color={biome.particleColor} />
      )}
    </div>
  );
}

function NamePlate({ name, hp, align }) {
  const color =
    hp > 50 ? "bg-green-500" : hp > 20 ? "bg-yellow-400" : "bg-red-500";
  return (
    <div
      className={`bg-stone-100 border-4 border-stone-800 px-3 py-2 shadow-[3px_3px_0_rgba(0,0,0,0.4)] w-40 ${
        align === "right" ? "rounded-l-xl" : "rounded-r-xl"
      }`}
    >
      <span className="block text-stone-900 capitalize text-[11px] font-bold mb-1 truncate">
        {name}
      </span>
      <div className="flex items-center gap-1.5">
        <span className="text-[8px] font-bold text-yellow-600">HP</span>
        <div className="flex-grow h-2 bg-stone-600 rounded-full overflow-hidden border border-stone-800">
          <div
            className={`h-full ${color} transition-all duration-700`}
            style={{ width: `${hp}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function EmptySpot({ onClick }) {
  const inner = (
    <span className="flex flex-col items-center gap-1 text-stone-700">
      <Plus className="w-6 h-6" />
      <span className="text-[9px] uppercase tracking-widest">Add</span>
    </span>
  );
  return onClick ? (
    <button
      onClick={onClick}
      className="w-20 h-20 flex items-center justify-center bg-black/15 border-2 border-dashed border-stone-700/70 hover:border-stone-500 hover:bg-black/25 rounded-full transition-colors"
    >
      {inner}
    </button>
  ) : (
    <span className="w-20 h-20 flex items-center justify-center opacity-40">
      {inner}
    </span>
  );
}

export default function BattleField({
  player,
  enemy,
  playerHP = 100,
  enemyHP = 100,
  playerFaint,
  enemyFaint,
  onAddPlayer,
  onAddEnemy,
  cornerButton,
  theme,
  children,
}) {
  const biome = getBiome(theme);

  return (
    <div
      className="relative w-full aspect-[4/3] max-h-[52vh] overflow-hidden border-4 border-stone-900"
      style={{ ...PIXEL, background: biome.sky }}
    >
      {/* Ground band */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{ background: biome.ground }}
      />

      {/* Scenery */}
      <Scenery biome={biome} />

      {cornerButton && (
        <div className="absolute top-2 right-2 z-20">{cornerButton}</div>
      )}

      {/* Enemy plate */}
      {enemy && (
        <div className="absolute top-4 left-3 sm:left-6 z-10">
          <NamePlate name={cap(enemy.name)} hp={enemyHP} />
        </div>
      )}

      {/* Enemy platform + sprite */}
      <div className="absolute top-[32%] right-[8%] w-40 h-8 rounded-[50%] bg-black/15 border-b-4 border-black/10" />
      <div className="absolute top-[9%] right-[10%] flex items-center justify-center w-28 h-28">
        {enemy ? (
          <img
            src={showdownGif(enemy.id)}
            alt={enemy.name}
            onError={(e) => {
              e.currentTarget.src = officialSprite(enemy.id);
            }}
            className={`w-24 h-24 sm:w-28 sm:h-28 object-contain pixelated transition-all duration-500 ${
              enemyFaint ? "translate-y-8 opacity-0 grayscale" : "opacity-100"
            }`}
          />
        ) : (
          <EmptySpot onClick={onAddEnemy} />
        )}
      </div>

      {/* Player plate */}
      {player && (
        <div className="absolute bottom-[30%] right-3 sm:right-6 z-10">
          <NamePlate name={cap(player.name)} hp={playerHP} align="right" />
        </div>
      )}

      {/* Player platform + sprite */}
      <div className="absolute bottom-[24%] left-[6%] w-48 h-9 rounded-[50%] bg-black/15 border-b-4 border-black/10" />
      <div className="absolute bottom-[24%] left-[10%] flex items-center justify-center w-32 h-32">
        {player ? (
          <img
            src={showdownBackGif(player.id)}
            alt={player.name}
            onError={(e) => {
              e.currentTarget.src = backSprite(player.id);
            }}
            className={`w-28 h-28 sm:w-36 sm:h-36 object-contain pixelated transition-all duration-500 ${
              playerFaint ? "translate-y-8 opacity-0 grayscale" : "opacity-100"
            }`}
          />
        ) : (
          <EmptySpot onClick={onAddPlayer} />
        )}
      </div>

      {children}
    </div>
  );
}
