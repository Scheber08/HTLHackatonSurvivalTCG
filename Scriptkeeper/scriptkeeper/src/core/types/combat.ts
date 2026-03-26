export interface SlottedCard {
  instanceId: string;
  cardId: string;
  currentHealth: number;
}

export interface HandCard {
  instanceId: string;
  cardId: string;
}

export interface CombatLane {
  laneId: number;
  enemyName: string;
  enemyAttack: number;
  enemyHealth: number;
  enemySpeed: number;
  playerCard: SlottedCard | null;
  isCleared: boolean;
  isResolved: boolean;
  lastLog: string[];
}

export interface CombatState {
  lanes: CombatLane[];
  hand: HandCard[];
  discard: string[];
}