import type { RunState } from "../../core/types/run";
import { getCardById } from "../../data/cards/cardRegistry";
import { getBaseBuffs } from "../base/getBaseBuffs";
import { generateRewards } from "./generateRewards";

function applyDamage(currentHealth: number, damage: number): number {
  return currentHealth - Math.max(0, damage);
}

export function resolveNight(run: RunState): RunState {
  if (run.phase !== "night" || !run.combat) {
    return run;
  }

  let nextCoreHealth = run.base.coreHealth;
  let nextOuterWallHealth = run.base.outerWallHealth;
  const nextLostCards = [...run.lostCards];
  const nextDiscard = [...run.combat.discard];

  const nextLanes = run.combat.lanes.map((lane) => {
    if (lane.isCleared) {
      return lane;
    }

    if (!lane.playerCard) {
      const incomingDamage = Math.max(0, lane.enemyAttack);

      if (nextOuterWallHealth > 0) {
        const wallAfterHit = nextOuterWallHealth - incomingDamage;

        if (wallAfterHit >= 0) {
          nextOuterWallHealth = wallAfterHit;
        } else {
          nextOuterWallHealth = 0;
          nextCoreHealth = Math.max(0, nextCoreHealth + wallAfterHit);
        }
      } else {
        nextCoreHealth = Math.max(0, nextCoreHealth - incomingDamage);
      }

      return lane;
    }

    const card = getCardById(lane.playerCard.cardId);

    if (!card) {
      return {
        ...lane,
        playerCard: null,
      };
    }

    const buffs = getBaseBuffs(run.base, card);

    const playerAttack = card.attack + buffs.attackBonus;
    const playerDefense = card.defense + buffs.defenseBonus;
    const playerSpeed = card.speed + buffs.speedBonus;

    let enemyHealth = lane.enemyHealth;
    let playerHealth = lane.playerCard.currentHealth;

    const playerGoesFirst = playerSpeed >= lane.enemySpeed;

    const playerHitEnemy = () => {
      enemyHealth = applyDamage(enemyHealth, playerAttack);
    };

    const enemyHitPlayer = () => {
      const mitigated = Math.max(10, lane.enemyAttack - buffs.damageReduction - Math.floor(playerDefense * 0.35));
      playerHealth = applyDamage(playerHealth, mitigated);
    };

    if (playerGoesFirst) {
      playerHitEnemy();
      if (enemyHealth > 0) {
        enemyHitPlayer();
      }
    } else {
      enemyHitPlayer();
      if (playerHealth > 0) {
        playerHitEnemy();
      }
    }

    if (enemyHealth <= 0) {
      nextDiscard.push(lane.playerCard.cardId);

      return {
        ...lane,
        enemyHealth: 0,
        isCleared: true,
        playerCard: null,
      };
    }

    if (playerHealth <= 0) {
      nextLostCards.push(lane.playerCard.cardId);

      return {
        ...lane,
        enemyHealth,
        playerCard: null,
      };
    }

    nextDiscard.push(lane.playerCard.cardId);

    return {
      ...lane,
      enemyHealth,
      playerCard: null,
    };
  });

  const remainingHandToDiscard = run.combat.hand.map((entry) => entry.cardId);
  nextDiscard.push(...remainingHandToDiscard);

  const rebuiltDeck = [...run.deck, ...nextDiscard];
  const lost = nextCoreHealth <= 0 || rebuiltDeck.length === 0;

  return {
    ...run,
    phase: lost ? "lost" : "reward",
    base: {
      ...run.base,
      coreHealth: nextCoreHealth,
      outerWallHealth: nextOuterWallHealth,
    },
    lostCards: nextLostCards,
    deck: rebuiltDeck,
    combat: null,
    rewardOptions: lost ? [] : generateRewards(),
  };
}