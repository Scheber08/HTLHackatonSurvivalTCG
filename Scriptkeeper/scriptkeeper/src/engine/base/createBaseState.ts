import type { BaseState } from "../../core/types/run";

export function createBaseState(): BaseState {
  return {
    coreHealth: 300,
    outerWallHealth: 180,
    buildings: [],
    modifiers: [],
  };
}