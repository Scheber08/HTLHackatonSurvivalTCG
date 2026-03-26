import { create } from "zustand";
import type { RunState } from "../core/types/run";
import { startRun } from "../engine/run/startRun";
import { resolveNight } from "../engine/run/resolveNight";

interface RunStore {
  run: RunState | null;
  createNewRun: (deck: string[]) => void;
  startNight: () => void;
  resolveCurrentNight: () => void;
  buildWall: () => void;
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

      return {
        run: {
          ...state.run,
          phase: "night",
          night: state.run.night + 1,
        },
      };
    }),

  resolveCurrentNight: () =>
    set((state) => {
      if (!state.run) {
        return state;
      }

      return {
        run: resolveNight(state.run),
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
            outerWallHealth: state.run.base.outerWallHealth + 3,
          },
        },
      };
    }),

  resetRun: () => set({ run: null }),
}));