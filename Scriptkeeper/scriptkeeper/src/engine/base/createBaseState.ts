import type { BaseState } from "../../core/types/run";

export function createBaseState(): BaseState {
  return {
    coreHealth: 20,
    outerWallHealth: 10,
    buildings: [],
    modifiers: [],
  };
}