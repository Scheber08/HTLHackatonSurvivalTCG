import type { RunState } from "../../core/types/run";
import { starterBuildings } from "../../data/buildings/starterBuildings";

export function buildStructure(run: RunState, buildingId: string): RunState {
  if (run.phase !== "day") {
    return run;
  }

  const building = starterBuildings.find((entry) => entry.id === buildingId);
  if (!building) {
    return run;
  }

  if (run.base.buildings.includes(buildingId)) {
    return run;
  }

  for (const [resource, rawAmount] of Object.entries(building.cost)) {
    const amount = Number(rawAmount);
    const current = run.resources[resource] ?? 0;

    if (current < amount) {
      return run;
    }
  }

  const nextResources = { ...run.resources };

  for (const [resource, rawAmount] of Object.entries(building.cost)) {
    const amount = Number(rawAmount);
    nextResources[resource] = (nextResources[resource] ?? 0) - amount;
  }

  const wallBonus = building.modifiers.includes("outer_wall_plus_2") ? 70 : 0;

  return {
    ...run,
    resources: nextResources,
    base: {
      ...run.base,
      buildings: [...run.base.buildings, building.id],
      modifiers: [...run.base.modifiers, ...building.modifiers],
      outerWallHealth: run.base.outerWallHealth + wallBonus,
    },
  };
}