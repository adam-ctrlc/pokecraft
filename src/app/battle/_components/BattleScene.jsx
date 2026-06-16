"use client";

import { useState, useMemo } from "react";
import { buildBattleSteps } from "@/utils/battle";
import BattleField from "@/app/battle/_components/BattleField";
import PartyTray from "@/app/battle/_components/PartyTray";
import { X, ChevronRight, RotateCcw, Trophy, FastForward } from "lucide-react";

export default function BattleScene({
  result,
  playerTeam,
  enemyTeam,
  theme,
  onClose,
}) {
  const steps = useMemo(() => buildBattleSteps(result), [result]);
  const [step, setStep] = useState(0);

  const current = steps[step];
  const isEnd = !!current.end;
  const advance = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const replay = () => setStep(0);
  const skip = () => setStep(steps.length - 1);
  const playerWon = current.winnerSide === "player";

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div>
        <BattleField
          player={current.player}
          enemy={current.enemy}
          playerHP={current.pHP}
          enemyHP={current.eHP}
          playerFaint={current.faint === "player"}
          enemyFaint={current.faint === "enemy"}
          theme={theme}
          cornerButton={
            <button
              onClick={onClose}
              aria-label="Close"
              className="p-1.5 bg-stone-900/70 text-white border-2 border-stone-700 hover:bg-stone-900 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          }
        >
          {isEnd && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/55 animate-in fade-in duration-300">
              <Trophy
                className={`w-12 h-12 mb-3 ${
                  playerWon ? "text-yellow-400" : "text-red-400"
                }`}
              />
              <h2 className="text-xl sm:text-2xl uppercase tracking-widest text-white">
                {playerWon ? "Victory!" : "Defeat"}
              </h2>
            </div>
          )}
        </BattleField>

        {/* Party trays */}
        <div className="mt-2 flex justify-between items-start gap-2">
          <PartyTray
            team={playerTeam}
            side="player"
            activeId={current.player.id}
            fainted={current.faintedPlayer}
          />
          <PartyTray
            team={enemyTeam}
            side="enemy"
            activeId={current.enemy.id}
            fainted={current.faintedEnemy}
            reverse
          />
        </div>

        {/* Dialog + buttons */}
        <div className="mt-2 bg-stone-900 border-4 border-stone-100 p-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <p className="text-white text-sm leading-relaxed flex-grow px-1">
            {current.msg}
          </p>

          <div className="flex gap-2 shrink-0">
            {isEnd ? (
              <>
                <button
                  onClick={replay}
                  className="flex items-center gap-2 px-4 py-2.5 bg-stone-800 text-stone-200 border-b-4 border-stone-950 hover:bg-stone-700 active:border-b-0 active:translate-y-1 uppercase text-xs tracking-widest transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  Replay
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-green-600 text-white border-b-4 border-green-800 hover:bg-green-500 active:border-b-0 active:translate-y-1 uppercase text-xs tracking-widest transition-all"
                >
                  Done
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={skip}
                  className="flex items-center gap-1.5 px-3 py-2.5 bg-stone-800 text-stone-400 border-b-4 border-stone-950 hover:bg-stone-700 hover:text-white active:border-b-0 active:translate-y-1 uppercase text-[10px] tracking-widest transition-all"
                >
                  <FastForward className="w-4 h-4" />
                  Skip
                </button>
                <button
                  onClick={advance}
                  className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white border-b-4 border-green-800 hover:bg-green-500 active:border-b-0 active:translate-y-1 uppercase text-xs tracking-widest transition-all"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
