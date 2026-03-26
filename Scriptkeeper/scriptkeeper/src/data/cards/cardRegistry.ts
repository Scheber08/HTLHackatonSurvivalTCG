import type { CardDefinition } from "../../core/types/card";
import { starterCards } from "./starterCards";

const allCards: CardDefinition[] = [...starterCards];

export const cardRegistry: Record<string, CardDefinition> = Object.fromEntries(
  allCards.map((card: CardDefinition) => [card.id, card])
);

export function getCardById(cardId: string): CardDefinition | undefined {
  return cardRegistry[cardId];
}

export function getAllCards(): CardDefinition[] {
  return allCards;
}