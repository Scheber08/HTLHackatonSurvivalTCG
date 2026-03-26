export type BuildingCategory = "defense" | "economy" | "research" | "ritual";

export type BuildingModifier =
  | "defender_plus_1_def"
  | "defender_plus_1_attack"
  | "outer_wall_plus_2";

export interface BuildingDefinition {
  id: string;
  name: string;
  category: BuildingCategory;
  cost: Record<string, number>;
  modifiers: BuildingModifier[];
  unlocks?: string[];
}