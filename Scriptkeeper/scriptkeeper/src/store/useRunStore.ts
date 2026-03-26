import { create } from "zustand";
import type { RunState, RewardOption } from "../core/types/run";
import { startRun } from "../engine/run/startRun";
import { createCombatState } from "../engine/combat/createCombatState";
import { playCardToLane } from "../engine/combat/playCardToLane";
import { resolveLaneTurn } from "../engine/combat/resolveLaneTurn";
import { endNightPhase } from "../engine/run/endNightPhase";
import { buildStructure } from "../engine/base/buildStructure";
import { applyReward } from "../engine/run/applyReward";

interface RunStore {
  run: RunState | null;
  createNewRun: (deck: string[]) => void;
  startNight: () => void;
  resolveLane: (laneId: number) => void;
  finishNight: () => void;
  buildWall: () => void;
  buildBuilding: (buildingId: string) => void;
  playCardInLane: (laneId: number, handInstanceId: string) => void;
  chooseReward: (reward: RewardOption) => void;
  resetRun: () => void;
}

export const useRunStore = create<RunStore>((set) => ({
  run: null,

  createNewRun: (deck: string[]) => {
    set({ run: startRun(deck) });
  },

  startNight: () =>
    set((state) => {
      if (!state.run || state.run.phase !== "day") {
        return state;
      }

      const upcomingNight = state.run.night + 1;
      const combatSetup = createCombatState(state.run.deck, upcomingNight);

      return {
        run: {
          ...state.run,
          phase: "night",
          night: upcomingNight,
          deck: combatSetup.nextDeck,
          combat: combatSetup.combat,
        },
      };
    }),

  resolveLane: (laneId: number) =>
    set((state) => {
      if (!state.run) {
        return state;
      }

      return {
        run: resolveLaneTurn(state.run, laneId),
      };
    }),

  finishNight: () =>
    set((state) => {
      if (!state.run) {
        return state;
      }

      return {
        run: endNightPhase(state.run),
      };
    }),

  buildWall: () =>
    set((state) => {
      if (!state.run || state.run.phase !== "day") {
        return state;
      }

      const wood = state.run.resources.wood ?? 0;
      if (wood < 10) {
        return state;
      }

      return {
        run: {
          ...state.run,
          resources: {
            ...state.run.resources,
            wood: wood - 10,
          },
          base: {
            ...state.run.base,
            outerWallHealth: state.run.base.outerWallHealth + 60,
          },
        },
      };
    }),

  buildBuilding: (buildingId: string) =>
    set((state) => {
      if (!state.run) {
        return state;
      }

      return {
        run: buildStructure(state.run, buildingId),
      };
    }),

  playCardInLane: (laneId: number, handInstanceId: string) =>
    set((state) => {
      if (!state.run) {
        return state;
      }

      return {
        run: playCardToLane(state.run, laneId, handInstanceId),
      };
    }),

  chooseReward: (reward: RewardOption) =>
    set((state) => {
      if (!state.run) {
        return state;
      }

      return {
        run: applyReward(state.run, reward),
      };
    }),

  resetRun: () => set({ run: null }),
}));