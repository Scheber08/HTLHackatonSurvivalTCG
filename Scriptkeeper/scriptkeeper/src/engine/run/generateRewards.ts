import type { RewardOption } from "../../core/types/run";
import { starterCards } from "../../data/cards/starterCards";

function pickWeightedCard(excludedIds: string[] = []): string {
  const pool = starterCards.filter((card) => !excludedIds.includes(card.id));

  const weightedPool = pool.flatMap((card) => {
    const weight = Math.max(1, 14 - card.points);
    return Array.from({ length: weight }, () => card.id);
  });

  const randomIndex = Math.floor(Math.random() * weightedPool.length);
  return weightedPool[randomIndex];
}

function getLabelForCard(cardId: string): string {
  const card = starterCards.find((entry) => entry.id === cardId);
  return card ? `Gain ${card.name}` : "Gain Card";
}

export function generateRewards(): RewardOption[] {
  const firstCardId = pickWeightedCard();
  const secondCardId = pickWeightedCard([firstCardId]);

  const utilityReward =
    Math.random() < 0.5
      ? {
          id: "reward_resource_wood",
          type: "resource" as const,
          label: "Gain 20 Wood",
          resourceType: "wood",
          amount: 20,
        }
      : {
          id: "reward_heal_core",
          type: "heal" as const,
          label: "Restore 60 Core HP",
          amount: 60,
        };

  return [
    {
      id: `reward_${firstCardId}`,
      type: "card",
      label: getLabelForCard(firstCardId),
      cardId: firstCardId,
    },
    {
      id: `reward_${secondCardId}`,
      type: "card",
      label: getLabelForCard(secondCardId),
      cardId: secondCardId,
    },
    utilityReward,
  ];
}