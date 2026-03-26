import type { RunState } from "../../core/types/run";
import { generateRewards } from "./generateRewards";
import { canEndNight } from "../combat/canEndNight";

export function endNightPhase(run: RunState): RunState {
  if (run.phase !== "night" || !run.combat) {
    return run;
  }

  if (!canEndNight(run.combat)) {
    return run;
  }

  const remainingHandToDiscard = run.combat.hand.map((entry) => entry.cardId);
  const rebuiltDeck = [...run.deck, ...run.combat.discard, ...remainingHandToDiscard];
  const lost = run.base.coreHealth <= 0 || rebuiltDeck.length === 0;

  return {
    ...run,
    phase: lost ? "lost" : "reward",
    deck: rebuiltDeck,
    combat: null,
    rewardOptions: lost ? [] : generateRewards(),
  };
}