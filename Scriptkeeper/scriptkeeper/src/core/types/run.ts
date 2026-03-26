import type { CombatState } from "./combat";

export type Phase = "day" | "night" | "reward" | "lost";

export interface BaseState {
  coreHealth: number;
  outerWallHealth: number;
  buildings: string[];
  modifiers: string[];
}

export interface RewardOption {
  id: string;
  type: "card" | "resource" | "heal";
  label: string;
  cardId?: string;
  resourceType?: string;
  amount?: number;
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
  combat: CombatState | null;
  rewardOptions: RewardOption[];
}