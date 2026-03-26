export type BuildingCategory = "defense" | "economy" | "research" | "ritual";

export interface BuildingDefinition {
  id: string;
  name: string;
  category: BuildingCategory;
  cost: Record<string, number>;
  modifiers: string[];
  unlocks?: string[];
}