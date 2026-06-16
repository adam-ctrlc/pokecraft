// Pure battle resolution helpers. A "battle pokemon" is:
// { id, name, types: string[], stats: [{name,value}], weaknesses, strengths, resistances }

export const statTotal = (p) =>
  p.stats.reduce((sum, s) => sum + s.value, 0);

// Randomness lives here (a plain module) so component render stays pure.
export const randInt = (n) => Math.floor(Math.random() * n);
export const pickRandom = (arr) => arr[randInt(arr.length)];

const label = (p) => p.name.replace(/-/g, " ");

// Net type advantage of `attacker` against `defender`:
// +1 for each attacker type the defender is weak to, -1 for each it resists.
export function typeAdvantage(attacker, defender) {
  let adv = 0;
  for (const t of attacker.types) {
    if (defender.weaknesses?.includes(t)) adv += 1;
    if (defender.resistances?.includes(t)) adv -= 1;
  }
  return adv;
}

const TYPE_WEIGHT = 0.25; // each net advantage step = +25% effective power

// Resolve a single duel. Returns winner/loser plus why and the scores.
export function resolveDuel(a, b) {
  const advA = typeAdvantage(a, b);
  const advB = typeAdvantage(b, a);
  const scoreA = statTotal(a) * (1 + TYPE_WEIGHT * advA);
  const scoreB = statTotal(b) * (1 + TYPE_WEIGHT * advB);

  // Higher effective score wins; ties fall back to raw stat total, then id.
  let aWins;
  if (scoreA !== scoreB) aWins = scoreA > scoreB;
  else if (statTotal(a) !== statTotal(b)) aWins = statTotal(a) > statTotal(b);
  else aWins = Number(a.id) <= Number(b.id);

  const winner = aWins ? a : b;
  const loser = aWins ? b : a;
  const winAdv = aWins ? advA : advB;
  const loseAdv = aWins ? advB : advA;
  const reason = winAdv > loseAdv ? "type advantage" : "higher base stats";

  // Winner's types the loser takes super-effective damage from.
  const seTypes = winner.types.filter((t) => loser.weaknesses?.includes(t));
  const wBST = statTotal(winner);
  const lBST = statTotal(loser);

  let detail;
  if (winAdv > loseAdv && seTypes.length) {
    detail = `${label(winner)}'s ${seTypes.join("/")} ${
      seTypes.length > 1 ? "types are" : "type is"
    } super-effective against ${label(loser)} — it can't keep up.`;
  } else if (winAdv > loseAdv) {
    detail = `${label(winner)} held the better type matchup against ${label(
      loser
    )} (${wBST} vs ${lBST} base stats).`;
  } else if (loseAdv > 0) {
    detail = `${label(loser)} had the type edge, but ${label(
      winner
    )} overpowered it with far higher stats (${wBST} vs ${lBST}).`;
  } else {
    detail = `No type advantage either way — ${label(
      winner
    )} won on raw power (${wBST} vs ${lBST} base stats).`;
  }

  return {
    winner,
    loser,
    reason,
    detail,
    scoreA: Math.round(scoreA),
    scoreB: Math.round(scoreB),
  };
}

// Sequential bracket: leads fight, loser is eliminated, winner stays to face
// the next challenger. Last team with a Pokemon standing wins.
export function runBracket(playerTeam, enemyTeam) {
  const log = [];
  let i = 0;
  let j = 0;
  let round = 1;

  while (i < playerTeam.length && j < enemyTeam.length && round <= 100) {
    const a = playerTeam[i];
    const b = enemyTeam[j];
    const res = resolveDuel(a, b);
    const playerWon = res.winner === a;

    log.push({
      round,
      player: a,
      enemy: b,
      winnerSide: playerWon ? "player" : "enemy",
      reason: res.reason,
      detail: res.detail,
      scoreP: res.scoreA,
      scoreE: res.scoreB,
    });

    if (playerWon) j += 1;
    else i += 1;
    round += 1;
  }

  const winnerSide = i < playerTeam.length ? "player" : "enemy";
  const survivors =
    winnerSide === "player" ? playerTeam.slice(i) : enemyTeam.slice(j);

  return { log, winnerSide, survivors };
}

// Expand a bracket result into an ordered list of "scene steps" for the
// animated battle: send-outs, the clash (detailed reason), and faints.
export function buildBattleSteps({ log, winnerSide }) {
  const steps = [];
  let prevP = null;
  let prevE = null;
  const faintedP = new Set();
  const faintedE = new Set();
  const snap = () => ({
    faintedPlayer: [...faintedP],
    faintedEnemy: [...faintedE],
  });

  for (const r of log) {
    const eNew = !prevE || prevE.id !== r.enemy.id;
    const pNew = !prevP || prevP.id !== r.player.id;
    const base = { player: r.player, enemy: r.enemy, pHP: 100, eHP: 100 };

    if (eNew)
      steps.push({ ...base, msg: `The foe sent out ${label(r.enemy)}!`, ...snap() });
    if (pNew) steps.push({ ...base, msg: `Go, ${label(r.player)}!`, ...snap() });

    steps.push({ ...base, msg: r.detail, ...snap() });

    const loserSide = r.winnerSide === "player" ? "enemy" : "player";
    const loser = loserSide === "player" ? r.player : r.enemy;
    if (loserSide === "player") faintedP.add(loser.id);
    else faintedE.add(loser.id);

    steps.push({
      player: r.player,
      enemy: r.enemy,
      pHP: loserSide === "player" ? 0 : 100,
      eHP: loserSide === "enemy" ? 0 : 100,
      faint: loserSide,
      msg: `${label(loser)} fainted!`,
      ...snap(),
    });

    prevP = r.player;
    prevE = r.enemy;
  }

  const last = log[log.length - 1];
  steps.push({
    player: last.player,
    enemy: last.enemy,
    pHP: winnerSide === "player" ? 100 : 0,
    eHP: winnerSide === "enemy" ? 100 : 0,
    end: true,
    winnerSide,
    msg:
      winnerSide === "player" ? "You won the battle!" : "You were defeated...",
    ...snap(),
  });

  return steps;
}
