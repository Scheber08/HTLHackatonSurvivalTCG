import type { CombatState } from "./createCombatState";

export function resolveAttack(state: CombatState): CombatState {
  const nextState = { ...state };

  if (nextState.playerUnits.length > 0 && nextState.enemyUnits.length > 0) {
    nextState.enemyUnits[0] = {
      ...nextState.enemyUnits[0],
      health: nextState.enemyUnits[0].health - nextState.playerUnits[0].attack,
    };

    nextState.playerUnits[0] = {
      ...nextState.playerUnits[0],
      health: nextState.playerUnits[0].health - nextState.enemyUnits[0].attack,
    };

    nextState.playerUnits = nextState.playerUnits.filter((u) => u.health > 0);
    nextState.enemyUnits = nextState.enemyUnits.filter((u) => u.health > 0);
  } else if (nextState.enemyUnits.length > 0) {
    nextState.baseHealth -= nextState.enemyUnits[0].attack;
  }

  return nextState;
}