import type { RunState } from "../../core/types/run";
import { getCardById } from "../../data/cards/cardRegistry";
import { getBaseBuffs } from "../base/getBaseBuffs";

function applyDamage(currentHealth: number, damage: number): number {
  return currentHealth - Math.max(0, damage);
}

export function resolveLaneTurn(run: RunState, laneId: number): RunState {
  if (run.phase !== "night" || !run.combat) {
    return run;
  }

  const lane = run.combat.lanes.find((entry) => entry.laneId === laneId);
  if (!lane || lane.isCleared || lane.isResolved) {
    return run;
  }

  let nextCoreHealth = run.base.coreHealth;
  let nextOuterWallHealth = run.base.outerWallHealth;
  const nextLostCards = [...run.lostCards];
  const nextDiscard = [...run.combat.discard];
  const nextLanes = run.combat.lanes.map((entry) => ({
    ...entry,
    lastLog: [...entry.lastLog],
  }));

  const laneIndex = nextLanes.findIndex((entry) => entry.laneId === laneId);
  const nextLane = nextLanes[laneIndex];
  const log: string[] = [];

  if (!nextLane.playerCard) {
    const incomingDamage = Math.max(0, nextLane.enemyAttack);

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

    nextLane.isResolved = true;
    log.push(
      `No defender in Lane ${laneId + 1}. ${nextLane.enemyName} dealt ${incomingDamage} damage to the base.`
    );
    nextLane.lastLog = log;

    return {
      ...run,
      base: {
        ...run.base,
        coreHealth: nextCoreHealth,
        outerWallHealth: nextOuterWallHealth,
      },
      combat: {
        ...run.combat,
        lanes: nextLanes,
      },
      lostCards: nextLostCards,
    };
  }

  const card = getCardById(nextLane.playerCard.cardId);
  if (!card) {
    nextLane.playerCard = null;
    nextLane.isResolved = true;
    nextLane.lastLog = [`Card data missing in Lane ${laneId + 1}.`];

    return {
      ...run,
      combat: {
        ...run.combat,
        lanes: nextLanes,
      },
    };
  }

  const buffs = getBaseBuffs(run.base, card);

  const playerAttack = card.attack + buffs.attackBonus;
  const playerDefense = card.defense + buffs.defenseBonus;
  const playerSpeed = card.speed + buffs.speedBonus;

  let enemyHealth = nextLane.enemyHealth;
  let playerHealth = nextLane.playerCard.currentHealth;

  const playerGoesFirst = playerSpeed >= nextLane.enemySpeed;

  const playerHitEnemy = () => {
    enemyHealth = applyDamage(enemyHealth, playerAttack);
    log.push(`${card.name} hit ${nextLane.enemyName} for ${playerAttack}.`);
  };

  const enemyHitPlayer = () => {
    const rawDamage = Math.max(
      10,
      Math.max(0, nextLane.enemyAttack - buffs.damageReduction) -
        Math.floor(playerDefense * 0.35)
    );

    const before = playerHealth;
    playerHealth = applyDamage(playerHealth, rawDamage);
    log.push(`${nextLane.enemyName} hit ${card.name} for ${rawDamage}.`);

    if (playerHealth <= 0) {
      const overflowDamage = Math.max(0, rawDamage - before);

      if (overflowDamage > 0) {
        if (nextOuterWallHealth > 0) {
          const wallAfterHit = nextOuterWallHealth - overflowDamage;
          if (wallAfterHit >= 0) {
            nextOuterWallHealth = wallAfterHit;
          } else {
            nextOuterWallHealth = 0;
            nextCoreHealth = Math.max(0, nextCoreHealth + wallAfterHit);
          }
        } else {
          nextCoreHealth = Math.max(0, nextCoreHealth - overflowDamage);
        }
        log.push(`Overflow damage ${overflowDamage} hit the base.`);
      }
    }
  };

  let roundCounter = 1;

  while (enemyHealth > 0 && playerHealth > 0) {
    log.push(`Round ${roundCounter}:`);

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

    roundCounter += 1;

    if (roundCounter > 20) {
      log.push(`The clash in Lane ${laneId + 1} was forcibly ended after 20 rounds.`);
      break;
    }
  }

  if (enemyHealth <= 0) {
    nextDiscard.push(nextLane.playerCard.cardId);
    nextLane.enemyHealth = 0;
    nextLane.isCleared = true;
    nextLane.isResolved = true;
    nextLane.playerCard = null;
    log.push(`${nextLane.enemyName} was defeated. Lane ${laneId + 1} is secured.`);
  } else if (playerHealth <= 0) {
    nextLostCards.push(nextLane.playerCard.cardId);
    nextLane.enemyHealth = enemyHealth;
    nextLane.playerCard = null;
    nextLane.isResolved = true;
    log.push(`${card.name} was destroyed by ${nextLane.enemyName}.`);
  } else {
    nextDiscard.push(nextLane.playerCard.cardId);
    nextLane.enemyHealth = enemyHealth;
    nextLane.playerCard = null;
    nextLane.isResolved = true;
    log.push(`${card.name} disengaged after an unresolved clash.`);
  }

  nextLane.lastLog = log;

  return {
    ...run,
    base: {
      ...run.base,
      coreHealth: nextCoreHealth,
      outerWallHealth: nextOuterWallHealth,
    },
    combat: {
      ...run.combat,
      lanes: nextLanes,
      discard: nextDiscard,
    },
    lostCards: nextLostCards,
  };
}