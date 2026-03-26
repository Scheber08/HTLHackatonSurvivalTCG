import type { CombatState } from "../../core/types/combat";
import { drawNightHand } from "./drawNightHand";

interface CreateCombatStateResult {
  combat: CombatState;
  nextDeck: string[];
}

interface EnemyTemplate {
  enemyName: string;
  enemyAttack: number;
  enemyHealth: number;
  enemySpeed: number;
  theme: "beast" | "raider" | "night";
}

function scaleEnemyStat(baseValue: number, nightNumber: number, laneIndex: number): number {
  const nightScale = 1 + (nightNumber - 1) * 0.18;
  const laneScale = laneIndex === 1 ? 1.12 : 1;
  return Math.round(baseValue * nightScale * laneScale);
}

function pickNightSet(): EnemyTemplate[] {
  const sets: EnemyTemplate[][] = [
    [
      { enemyName: "Wolf Pack", enemyAttack: 45, enemyHealth: 70, enemySpeed: 58, theme: "beast" },
      { enemyName: "Boar Charger", enemyAttack: 60, enemyHealth: 95, enemySpeed: 46, theme: "beast" },
      { enemyName: "Night Stalker", enemyAttack: 45, enemyHealth: 70, enemySpeed: 64, theme: "night" },
    ],
    [
      { enemyName: "Rabid Hound", enemyAttack: 50, enemyHealth: 65, enemySpeed: 72, theme: "beast" },
      { enemyName: "Stonehide Elk", enemyAttack: 55, enemyHealth: 115, enemySpeed: 38, theme: "beast" },
      { enemyName: "Shadow Lynx", enemyAttack: 48, enemyHealth: 72, enemySpeed: 78, theme: "night" },
    ],
    [
      { enemyName: "Forest Raider", enemyAttack: 52, enemyHealth: 76, enemySpeed: 55, theme: "raider" },
      { enemyName: "Siege Brute", enemyAttack: 68, enemyHealth: 105, enemySpeed: 32, theme: "raider" },
      { enemyName: "Dusk Scout", enemyAttack: 44, enemyHealth: 60, enemySpeed: 82, theme: "raider" },
    ],
    [
      { enemyName: "Feral Bear", enemyAttack: 62, enemyHealth: 120, enemySpeed: 28, theme: "beast" },
      { enemyName: "Moonfang Alpha", enemyAttack: 58, enemyHealth: 92, enemySpeed: 66, theme: "beast" },
      { enemyName: "Ruin Creeper", enemyAttack: 46, enemyHealth: 84, enemySpeed: 52, theme: "night" },
    ],
  ];

  return sets[Math.floor(Math.random() * sets.length)];
}

export function createCombatState(
  deck: string[],
  nightNumber: number
): CreateCombatStateResult {
  const drawResult = drawNightHand(deck, 3);
  const chosenSet = pickNightSet();

  return {
    nextDeck: drawResult.nextDeck,
    combat: {
      lanes: chosenSet.map((enemy, index) => ({
        laneId: index,
        enemyName: enemy.enemyName,
        enemyAttack: scaleEnemyStat(enemy.enemyAttack, nightNumber, index),
        enemyHealth: scaleEnemyStat(enemy.enemyHealth, nightNumber, index),
        enemySpeed: scaleEnemyStat(enemy.enemySpeed, nightNumber, index),
        playerCard: null,
        isCleared: false,
        isResolved: false,
        lastLog: [],
      })),
      hand: drawResult.hand,
      discard: [],
    },
  };
}