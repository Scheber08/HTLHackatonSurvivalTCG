import type { BaseState } from "../../core/types/run";
import type { BuildingDefinition } from "../../core/types/building";

export function applyBuilding(
  base: BaseState,
  building: BuildingDefinition
): BaseState {
  return {
    ...base,
    buildings: [...base.buildings, building.id],
    modifiers: [...base.modifiers, ...building.modifiers],
  };
}