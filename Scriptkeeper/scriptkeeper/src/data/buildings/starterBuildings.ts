import type { BuildingDefinition } from "../../core/types/building";

export const starterBuildings: BuildingDefinition[] = [
  {
    id: "watchtower",
    name: "Watchtower",
    category: "defense",
    cost: { wood: 20, stone: 10 },
    modifiers: ["ranged_units_plus_1_attack"],
  },
  {
    id: "archive",
    name: "Archive",
    category: "research",
    cost: { wood: 10, stone: 20 },
    modifiers: ["script_card_find_chance_up"],
  },
];