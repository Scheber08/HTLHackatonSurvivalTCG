import type { RunState } from "../../core/types/run";

export function resolveNight(run: RunState): RunState {
  if (run.phase !== "night") {
    return run;
  }

  const nextDeck = [...run.deck];
  const nextLostCards = [...run.lostCards];

  let nextCoreHealth = run.base.coreHealth;
  let nextOuterWallHealth = run.base.outerWallHealth;

  const incomingDamage = 4;

  if (nextOuterWallHealth > 0) {
    const remainingWall = nextOuterWallHealth - incomingDamage;

    if (remainingWall >= 0) {
      nextOuterWallHealth = remainingWall;
    } else {
      nextOuterWallHealth = 0;
      nextCoreHealth = Math.max(0, nextCoreHealth + remainingWall);
    }
  } else {
    nextCoreHealth = Math.max(0, nextCoreHealth - incomingDamage);
  }

  if (nextDeck.length > 0) {
    const lostCard = nextDeck.pop();
    if (lostCard) {
      nextLostCards.push(lostCard);
    }
  }

  const lost = nextCoreHealth <= 0 || nextDeck.length === 0;

  return {
    ...run,
    phase: lost ? "lost" : "day",
    day: lost ? run.day : run.day + 1,
    base: {
      ...run.base,
      coreHealth: nextCoreHealth,
      outerWallHealth: nextOuterWallHealth,
    },
    deck: nextDeck,
    lostCards: nextLostCards,
  };
}