import type { CombatState } from "../../core/types/combat";

export function resolveAttack(state: CombatState): CombatState {
  return {
    ...state,
    lanes: state.lanes.map((lane) => {
      if (!lane.playerCard) {
        return lane;
      }

      const remainingHealth = lane.playerCard.currentHealth - lane.enemyAttack;

      if (remainingHealth <= 0) {
        return {
          ...lane,
          playerCard: null,
        };
      }

      return {
        ...lane,
        playerCard: {
          ...lane.playerCard,
          currentHealth: remainingHealth,
        },
      };
    }),
  };
}