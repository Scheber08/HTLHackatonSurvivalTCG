import type { RewardOption, RunState } from "../../core/types/run";

export function applyReward(run: RunState, reward: RewardOption): RunState {
  if (run.phase !== "reward") {
    return run;
  }

  const nextRun: RunState = {
    ...run,
    phase: "day",
    day: run.day + 1,
    rewardOptions: [],
  };

  if (reward.type === "card" && reward.cardId) {
    return {
      ...nextRun,
      deck: [...nextRun.deck, reward.cardId],
      unlockedThisRun: nextRun.unlockedThisRun.includes(reward.cardId)
        ? nextRun.unlockedThisRun
        : [...nextRun.unlockedThisRun, reward.cardId],
    };
  }

  if (reward.type === "resource" && reward.resourceType && reward.amount) {
    return {
      ...nextRun,
      resources: {
        ...nextRun.resources,
        [reward.resourceType]:
          (nextRun.resources[reward.resourceType] ?? 0) + reward.amount,
      },
    };
  }

  if (reward.type === "heal" && reward.amount) {
    return {
      ...nextRun,
      base: {
        ...nextRun.base,
        coreHealth: nextRun.base.coreHealth + reward.amount,
      },
    };
  }

  return nextRun;
}