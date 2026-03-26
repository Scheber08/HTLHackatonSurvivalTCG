import type { HandCard } from "../../core/types/combat";

interface DrawNightHandResult {
  nextDeck: string[];
  hand: HandCard[];
}

export function drawNightHand(deck: string[], handSize = 3): DrawNightHandResult {
  const nextDeck = [...deck];
  const hand: HandCard[] = [];

  for (let index = 0; index < handSize; index += 1) {
    const nextCardId = nextDeck.shift();

    if (!nextCardId) {
      break;
    }

    hand.push({
      instanceId: `${nextCardId}-hand-${Date.now()}-${index}`,
      cardId: nextCardId,
    });
  }

  return {
    nextDeck,
    hand,
  };
}