import type { BaseState } from "../../core/types/run";
import type { CardDefinition } from "../../core/types/card";

interface BaseBuffResult {
  attackBonus: number;
  defenseBonus: number;
  damageReduction: number;
  speedBonus: number;
}

export function getBaseBuffs(base: BaseState, card: CardDefinition): BaseBuffResult {
  let attackBonus = 0;
  let defenseBonus = 0;
  let damageReduction = 0;
  let speedBonus = 0;

  for (const modifier of base.modifiers) {
    if (modifier === "defender_plus_1_def" && card.type === "defender") {
      defenseBonus += 35;
      speedBonus += 8;
    }

    if (modifier === "defender_plus_1_attack" && card.type === "defender") {
      attackBonus += 30;
    }

    if (modifier === "outer_wall_plus_2") {
      damageReduction += 25;
    }
  }

  return {
    attackBonus,
    defenseBonus,
    damageReduction,
    speedBonus,
  };
}