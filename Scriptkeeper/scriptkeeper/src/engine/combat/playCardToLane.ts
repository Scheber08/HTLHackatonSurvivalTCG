import type { RunState } from "../../core/types/run";
import { getCardById } from "../../data/cards/cardRegistry";

export function playCardToLane(
  run: RunState,
  laneId: number,
  handInstanceId: string
): RunState {
  if (run.phase !== "night" || !run.combat) {
    return run;
  }

  const lane = run.combat.lanes.find((entry) => entry.laneId === laneId);
  if (!lane || lane.playerCard || lane.isCleared || lane.isResolved) {
    return run;
  }

  const handCard = run.combat.hand.find(
    (entry) => entry.instanceId === handInstanceId
  );

  if (!handCard) {
    return run;
  }

  const card = getCardById(handCard.cardId);
  if (!card) {
    return run;
  }

  const nextHand = run.combat.hand.filter(
    (entry) => entry.instanceId !== handInstanceId
  );

  const nextCombat = {
    ...run.combat,
    hand: nextHand,
    lanes: run.combat.lanes.map((entry) => {
      if (entry.laneId !== laneId) {
        return entry;
      }

      return {
        ...entry,
        playerCard: {
          instanceId: `${handCard.cardId}-lane-${laneId}-${Date.now()}`,
          cardId: handCard.cardId,
          currentHealth: card.defense,
        },
        lastLog: [`${card.name} was deployed to Lane ${laneId + 1}.`],
      };
    }),
  };

  return {
    ...run,
    combat: nextCombat,
  };
}