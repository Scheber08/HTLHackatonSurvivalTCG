import type { RunState } from "../../core/types/run";
import { createBaseState } from "../base/createBaseState";

export function startRun(startingDeck: string[]): RunState {
  return {
    day: 1,
    night: 0,
    phase: "day",
    resources: {
      wood: 50,
      stone: 30,
      food: 20,
    },
    deck: startingDeck,
    lostCards: [],
    unlockedThisRun: [],
    base: createBaseState(),
    combat: null,
    rewardOptions: [],
    rewardsChosenThisPhase: 0,
  };
}