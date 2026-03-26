import type { BuildingDefinition } from "../../core/types/building";

export const starterBuildings: BuildingDefinition[] = [
  {
    id: "watchtower",
    name: "Watchtower",
    category: "defense",
    cost: { wood: 25, stone: 15 },
    modifiers: ["defender_plus_1_def"],
  },
  {
    id: "archive",
    name: "Archive",
    category: "research",
    cost: { wood: 15, stone: 25 },
    modifiers: ["defender_plus_1_attack"],
  },
  {
    id: "outer_wall",
    name: "Outer Wall",
    category: "defense",
    cost: { wood: 20, stone: 20 },
    modifiers: ["outer_wall_plus_2"],
  },
  {
    id: "beacon_fire",
    name: "Beacon Fire",
    category: "defense",
    cost: { wood: 20, food: 10 },
    modifiers: ["defender_plus_1_attack"],
  },
  {
    id: "stone_bulwark",
    name: "Stone Bulwark",
    category: "defense",
    cost: { wood: 10, stone: 35 },
    modifiers: ["defender_plus_1_def", "outer_wall_plus_2"],
  },
  {
    id: "training_yard",
    name: "Training Yard",
    category: "ritual",
    cost: { wood: 30, food: 15 },
    modifiers: ["defender_plus_1_attack", "defender_plus_1_def"],
  },
  {
    id: "supply_depot",
    name: "Supply Depot",
    category: "economy",
    cost: { wood: 20, stone: 10, food: 10 },
    modifiers: ["outer_wall_plus_2"],
  },
];