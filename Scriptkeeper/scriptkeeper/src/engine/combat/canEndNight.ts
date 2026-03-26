import type { CombatState } from "../../core/types/combat";

export function canEndNight(combat: CombatState | null): boolean {
  if (!combat) {
    return false;
  }

  return combat.lanes.every((lane) => lane.isCleared || lane.isResolved);
}