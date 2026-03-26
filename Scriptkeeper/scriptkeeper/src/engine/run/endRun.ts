import type { RunState } from "../../core/types/run";

export function isRunLost(run: RunState): boolean {
  return run.base.coreHealth <= 0 || run.deck.length === 0;
}