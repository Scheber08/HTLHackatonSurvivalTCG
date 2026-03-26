export interface CombatUnit {
  id: string;
  attack: number;
  health: number;
}

export interface CombatState {
  playerUnits: CombatUnit[];
  enemyUnits: CombatUnit[];
  baseHealth: number;
}

export function createCombatState(baseHealth: number): CombatState {
  return {
    playerUnits: [],
    enemyUnits: [],
    baseHealth,
  };
}