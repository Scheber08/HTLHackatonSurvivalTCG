import type { CardDefinition } from "../../core/types/card";
import { DECK_RULES } from "../../core/constants/rules";

export function validateDeck(deck: CardDefinition[]) {
  const totalCards = deck.length;
  const totalPoints = deck.reduce((sum, card) => sum + card.points, 0);

  return {
    valid:
      totalCards <= DECK_RULES.maxCards &&
      totalPoints <= DECK_RULES.maxPoints,
    totalCards,
    totalPoints,
    maxCards: DECK_RULES.maxCards,
    maxPoints: DECK_RULES.maxPoints,
  };
}