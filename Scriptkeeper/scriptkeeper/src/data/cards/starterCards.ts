import type { CardDefinition } from "../../core/types/card";

export const starterCards: CardDefinition[] = [
  {
    id: "defender_sentry",
    name: "Sentry",
    type: "defender",
    points: 3,
    attack: 2,
    defense: 2,
    health: 3,
    text: "Simple defensive unit.",
    tags: ["starter", "human"],
    effects: [],
  },
  {
    id: "structure_barricade",
    name: "Barricade",
    type: "structure",
    points: 2,
    health: 4,
    text: "Absorbs incoming pressure.",
    tags: ["starter", "wall"],
    effects: [],
  },
];