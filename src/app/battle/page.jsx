"use client";

import { useState } from "react";
import { fetcher } from "@/utils/fetcher";
import { idFromUrl } from "@/utils/pokeapi";
import { runBracket, randInt, pickRandom } from "@/utils/battle";
import { useSessionState } from "@/utils/useSessionState";
import PokemonPicker from "@/app/battle/_components/PokemonPicker";
import BattleScene from "@/app/battle/_components/BattleScene";
import BattleField from "@/app/battle/_components/BattleField";
import PartyTray from "@/app/battle/_components/PartyTray";
import BiomeSelect from "@/app/battle/_components/BiomeSelect";
import { Swords, RotateCcw, Bot, Loader2 } from "lucide-react";

const TEAM_SIZES = [1, 3, 6];
const MAX_DEX = 1025;

async function fetchBattlePokemon(id) {
  try {
    const d = await fetcher(`/pokemon/${id}`);
    return {
      id: String(d.id),
      name: d.name,
      types: d.types,
      stats: d.stats,
      weaknesses: d.weaknesses,
      strengths: d.strengths,
      resistances: d.resistances,
    };
  } catch {
    return null;
  }
}

export default function BattlePage() {
  const [teamSize, setTeamSize] = useState(3);
  const [playerTeam, setPlayerTeam] = useState([]);
  const [enemyTeam, setEnemyTeam] = useState([]);
  const [picker, setPicker] = useState(null); // "player" | "enemy" | null
  const [autoBusy, setAutoBusy] = useState(null); // "player" | "enemy" | null
  const [result, setResult] = useState(null);
  const [biome, setBiome] = useSessionState("pokecraft:biome", "meadow");

  const setTeam = (side, updater) =>
    side === "enemy" ? setEnemyTeam(updater) : setPlayerTeam(updater);

  const changeSize = (n) => {
    setTeamSize(n);
    setPlayerTeam((t) => t.slice(0, n));
    setEnemyTeam((t) => t.slice(0, n));
    setResult(null);
  };

  const addToTeam = async (side, id) => {
    setPicker(null);
    const mon = await fetchBattlePokemon(id);
    if (mon) {
      setTeam(side, (t) =>
        t.some((m) => m.id === mon.id) || t.length >= teamSize
          ? t
          : [...t, mon]
      );
      setResult(null);
    }
  };

  const removeFromTeam = (side, index) => {
    setTeam(side, (t) => t.filter((_, i) => i !== index));
    setResult(null);
  };

  const reorderTeam = (side, from, to) => {
    setTeam(side, (t) => {
      const arr = [...t];
      const [moved] = arr.splice(from, 1);
      arr.splice(Math.min(to, arr.length), 0, moved);
      return arr;
    });
    setResult(null);
  };

  // (Re)generate a full team for `side`. Counters the opposing team where
  // possible (pick a Pokemon whose type the opponent is weak to), else random.
  // Replaces the team entirely so it can be re-rolled at any time.
  const autoPick = async (side) => {
    const opponents = side === "enemy" ? playerTeam : enemyTeam;
    setAutoBusy(side);

    // Avoid duplicating the opposing team; track picks to avoid in-team dupes.
    const used = new Set(opponents.map((p) => p.id));
    const picks = [];

    for (let k = 0; k < teamSize; k++) {
      let candidateId = null;

      // Try to counter an opponent.
      const opp = opponents.length ? opponents[k % opponents.length] : null;
      const weakness = opp?.weaknesses?.length
        ? pickRandom(opp.weaknesses)
        : null;
      if (weakness) {
        try {
          const typeData = await fetcher(`/type/${weakness}`);
          const ids = (typeData.pokemon || [])
            .map((x) => idFromUrl(x.pokemon.url))
            .filter((id) => Number(id) <= MAX_DEX && !used.has(id));
          if (ids.length) candidateId = pickRandom(ids);
        } catch {
          candidateId = null;
        }
      }
      // Fallback: a random Gen-1 mon not already used.
      while (!candidateId) {
        const rid = String(randInt(151) + 1);
        if (!used.has(rid)) candidateId = rid;
      }

      used.add(candidateId);
      const mon = await fetchBattlePokemon(candidateId);
      if (mon) picks.push(mon);
    }

    setTeam(side, picks);
    setResult(null);
    setAutoBusy(null);
  };

  const fight = () => {
    if (!playerTeam.length || !enemyTeam.length) return;
    setResult(runBracket(playerTeam, enemyTeam));
  };

  const reset = () => {
    setPlayerTeam([]);
    setEnemyTeam([]);
    setResult(null);
  };

  const canFight = playerTeam.length > 0 && enemyTeam.length > 0;

  const renderSide = (side, team) => {
    const isEnemy = side === "enemy";
    return (
      <section
        className={`bg-stone-900/70 border-4 p-3 ${
          isEnemy ? "border-red-800" : "border-sky-800"
        }`}
      >
        <header className="flex items-center justify-between mb-3">
          <h2
            className={`uppercase tracking-widest text-xs font-bold ${
              isEnemy ? "text-red-400" : "text-sky-400"
            }`}
          >
            {isEnemy ? "Enemy Team" : "Your Team"}
          </h2>
          <span className="text-xs font-mono text-stone-500">
            {team.length}/{teamSize}
          </span>
        </header>

        <PartyTray
          team={team}
          side={side}
          teamSize={teamSize}
          onAdd={() => setPicker(side)}
          onRemove={(i) => removeFromTeam(side, i)}
          onReorder={(from, to) => reorderTeam(side, from, to)}
        />
        <p className="mt-2 text-[9px] uppercase tracking-widest text-stone-600">
          Drag to reorder - slot 1 leads
        </p>

        <button
          onClick={() => autoPick(side)}
          disabled={autoBusy !== null}
          className={`mt-3 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-stone-800 border-b-4 border-stone-950 hover:bg-stone-700 active:border-b-0 active:translate-y-1 disabled:opacity-40 disabled:cursor-not-allowed uppercase text-[11px] tracking-widest transition-all ${
            isEnemy ? "text-red-300" : "text-sky-300"
          }`}
        >
          {autoBusy === side ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Bot className="w-4 h-4" />
          )}
          {team.length > 0
            ? isEnemy
              ? "Re-roll Counter-Pick"
              : "Re-roll Team"
            : isEnemy
            ? "Auto Counter-Pick"
            : "Auto Pick"}
        </button>
      </section>
    );
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      {/* Header */}
      <header className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 bg-stone-800 border-2 border-stone-600 text-[10px] sm:text-xs text-red-400 uppercase tracking-widest">
          <Swords className="w-4 h-4" />
          Battle Arena
        </div>
        <h1 className="text-3xl md:text-5xl text-white mb-3 drop-shadow-[3px_3px_0_#9a5d00]">
          Versus
        </h1>
        <p className="text-stone-400 text-sm md:text-base max-w-xl mx-auto">
          Build a team, build an enemy (or auto counter-pick), then fight. Type
          counters and higher base stats decide each duel - last team standing
          wins.
        </p>
      </header>

      {result ? (
        /* Inline battle */
        <BattleScene
          result={result}
          playerTeam={playerTeam}
          enemyTeam={enemyTeam}
          theme={biome}
          onClose={() => setResult(null)}
        />
      ) : (
        <>
          {/* Controls */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest text-stone-500">
                Team size
              </span>
              <div className="flex h-12 bg-stone-950 border-2 border-stone-700 p-0.5">
                {TEAM_SIZES.map((n) => (
                  <button
                    key={n}
                    onClick={() => changeSize(n)}
                    className={`h-full px-4 flex items-center justify-center text-xs font-mono transition-colors ${
                      teamSize === n
                        ? "bg-green-600 text-white"
                        : "text-stone-400 hover:text-white"
                    }`}
                  >
                    {n}v{n}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest text-stone-500">
                Scenery
              </span>
              <BiomeSelect value={biome} onChange={setBiome} />
            </div>

            <button
              onClick={fight}
              disabled={!canFight}
              className="h-12 flex items-center gap-2 px-8 bg-yellow-500 text-black font-bold border-b-4 border-yellow-700 hover:bg-yellow-400 active:border-b-0 active:translate-y-1 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:translate-y-0 uppercase text-sm tracking-widest transition-all"
            >
              <Swords className="w-5 h-5" />
              Fight!
            </button>

            <button
              onClick={reset}
              className="h-12 flex items-center gap-2 px-5 bg-stone-800 text-stone-400 border-b-4 border-stone-950 hover:bg-stone-700 hover:text-white active:border-b-0 active:translate-y-1 uppercase text-xs tracking-widest transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>

          {/* Battle field (build preview) */}
          <BattleField
            player={playerTeam[0] || null}
            enemy={enemyTeam[0] || null}
            theme={biome}
            onAddPlayer={() => setPicker("player")}
            onAddEnemy={() => setPicker("enemy")}
          />

          {/* Team trays */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderSide("player", playerTeam)}
            {renderSide("enemy", enemyTeam)}
          </div>
        </>
      )}

      {/* Picker modal */}
      {picker && (
        <PokemonPicker
          side={picker}
          onClose={() => setPicker(null)}
          onPick={(id) => addToTeam(picker, id)}
          disabledIds={[...playerTeam, ...enemyTeam].map((m) => String(m.id))}
        />
      )}
    </div>
  );
}
