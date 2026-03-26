export type Phase = "day" | "night" | "lost";

export interface BaseState {
  coreHealth: number;
  outerWallHealth: number;
  buildings: string[];
  modifiers: string[];
}

export interface RunState {
  day: number;
  night: number;
  phase: Phase;
  resources: Record<string, number>;
  deck: string[];
  lostCards: string[];
  unlockedThisRun: string[];
  base: BaseState;
}