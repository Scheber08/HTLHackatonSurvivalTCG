import type { RewardOption } from "../../core/types/run";
import { starterCards } from "../../data/cards/starterCards";

function pickWeightedCard(excludedIds: string[] = []): string {
  const pool = starterCards.filter((card) => !excludedIds.includes(card.id));

  const weightedPool = pool.flatMap((card) => {
    const weight = Math.max(1, 16 - card.points);
    return Array.from({ length: weight }, () => card.id);
  });

  const randomIndex = Math.floor(Math.random() * weightedPool.length);
  return weightedPool[randomIndex];
}

function getLabelForCard(cardId: string): string {
  const card = starterCards.find((entry) => entry.id === cardId);
  return card ? `Recruit ${card.name}` : "Recruit Card";
}

export function generateRewards(): RewardOption[] {
  const picked: string[] = [];

  const makeCardReward = (): RewardOption => {
    const cardId = pickWeightedCard(picked);
    picked.push(cardId);

    return {
      id: `reward_${cardId}`,
      type: "card",
      label: getLabelForCard(cardId),
      cardId,
    };
  };

  return [
    makeCardReward(),
    makeCardReward(),
    makeCardReward(),
    {
      id: "reward_resource_wood",
      type: "resource",
      label: "Gain 18 Wood",
      resourceType: "wood",
      amount:18,
    },
    {
      id: "reward_resource_stone",
      type: "resource",
      label: "Gain 12 Stone",
      resourceType: "stone",
      amount: 12,
    },
    {
      id: "reward_resource_food",
      type: "resource",
      label: "Gain 15 Food",
      resourceType: "food",
      amount: 15,
    },
    {
      id: "reward_heal_core",
      type: "heal",
      label: "Restore 60 Core HP",
      amount: 60,
    },
  ];
}