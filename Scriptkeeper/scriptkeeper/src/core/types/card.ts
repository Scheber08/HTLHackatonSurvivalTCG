export type CardType = "defender";

export interface CardDefinition {
  id: string;
  name: string;
  type: CardType;
  points: number;
  attack: number;
  defense: number;
  speed: number;
  text: string;
  tags: string[];
}