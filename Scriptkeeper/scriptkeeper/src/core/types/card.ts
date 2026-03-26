export type CardType =
  | "defender"
  | "structure"
  | "tactic"
  | "script"
  | "relic"
  | "base";

export interface CardDefinition {
  id: string;
  name: string;
  type: CardType;
  points: number;
  attack?: number;
  defense?: number;
  health?: number;
  text: string;
  tags: string[];
  effects: string[];
}