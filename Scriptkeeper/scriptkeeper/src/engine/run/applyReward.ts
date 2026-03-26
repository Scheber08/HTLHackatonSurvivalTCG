import type { RewardOption, RunState } from "../../core/types/run";

export function applyReward(run: RunState, reward: RewardOption): RunState {
  if (run.phase !== "reward") {
    return run;
  }

  const nextRewardOptions = run.rewardOptions.filter((entry) => entry.id !== reward.id);
  const nextChosenCount = run.rewardsChosenThisPhase + 1;
  const shouldReturnToDay = nextChosenCount >= 2;

  let nextRun: RunState = {
    ...run,
    rewardOptions: nextRewardOptions,
    rewardsChosenThisPhase: nextChosenCount,
  };

  if (reward.type === "card" && reward.cardId) {
    nextRun = {
      ...nextRun,
      deck: [...nextRun.deck, reward.cardId],
      unlockedThisRun: nextRun.unlockedThisRun.includes(reward.cardId)
        ? nextRun.unlockedThisRun
        : [...nextRun.unlockedThisRun, reward.cardId],
    };
  }

  if (reward.type === "resource" && reward.resourceType && reward.amount) {
    nextRun = {
      ...nextRun,
      resources: {
        ...nextRun.resources,
        [reward.resourceType]:
          (nextRun.resources[reward.resourceType] ?? 0) + reward.amount,
      },
    };
  }

  if (reward.type === "heal" && reward.amount) {
    nextRun = {
      ...nextRun,
      base: {
        ...nextRun.base,
        coreHealth: nextRun.base.coreHealth + reward.amount,
      },
    };
  }

  if (shouldReturnToDay) {
    return {
      ...nextRun,
      phase: "day",
      day: nextRun.day + 1,
      rewardOptions: [],
      rewardsChosenThisPhase: 0,
    };
  }

  return nextRun;
}