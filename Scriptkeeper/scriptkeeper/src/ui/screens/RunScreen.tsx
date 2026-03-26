import { useRunStore } from "../../store/useRunStore";
import { BasePanel } from "../components/BasePanel";
import { getCardById } from "../../data/cards/cardRegistry";
import { starterBuildings } from "../../data/buildings/starterBuildings";
import { GameCard } from "../components/GameCard";
import { canEndNight } from "../../engine/combat/canEndNight";

function formatBuildingBonus(modifiers: string[]): string[] {
  return modifiers.map((modifier) => {
    if (modifier === "defender_plus_1_attack") return "+30 ATK aura";
    if (modifier === "defender_plus_1_def") return "+35 DEF & +8 SPD aura";
    if (modifier === "outer_wall_plus_2") return "+25 wall mitigation / +70 wall build";
    return modifier;
  });
}

export function RunScreen() {
  const run = useRunStore((state) => state.run);
  const startNight = useRunStore((state) => state.startNight);
  const resolveLane = useRunStore((state) => state.resolveLane);
  const finishNight = useRunStore((state) => state.finishNight);
  const buildWall = useRunStore((state) => state.buildWall);
  const buildBuilding = useRunStore((state) => state.buildBuilding);
  const playCardInLane = useRunStore((state) => state.playCardInLane);
  const chooseReward = useRunStore((state) => state.chooseReward);
  const resetRun = useRunStore((state) => state.resetRun);

  if (!run) {
    return <div>No active run.</div>;
  }

  const isDay = run.phase === "day";
  const isNight = run.phase === "night";
  const isReward = run.phase === "reward";
  const isLost = run.phase === "lost";
  const combat = run.combat;
  const mayFinishNight = isNight && combat ? canEndNight(combat) : false;

  return (
    <div className="app-shell">
      <div className="screen">
        <div
          className="panel header-panel animated-panel"
          style={{
            marginBottom: 20,
            display: "flex",
            justifyContent: "space-between",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1 className="title">Scriptkeeper</h1>
            <p className="subtitle">
              Day {run.day} · Night Count {run.night}
            </p>
          </div>

          <div
            className={`badge ${
              isDay
                ? "phase-day"
                : isNight
                ? "phase-night"
                : isReward
                ? "phase-reward"
                : "phase-lost"
            }`}
          >
            Phase: {run.phase}
          </div>
        </div>

        <div className="grid grid-2">
          <div className="grid">
            <BasePanel base={run.base} />

            <div className="panel animated-panel">
              <h2 className="panel-title">Resources</h2>
              <div className="stat-list">
                <div className="stat-row">
                  <span>Wood</span>
                  <strong>{run.resources.wood}</strong>
                </div>
                <div className="stat-row">
                  <span>Stone</span>
                  <strong>{run.resources.stone}</strong>
                </div>
                <div className="stat-row">
                  <span>Food</span>
                  <strong>{run.resources.food}</strong>
                </div>
                <div className="stat-row">
                  <span>Draw Pile</span>
                  <strong>{run.deck.length}</strong>
                </div>
                <div className="stat-row">
                  <span>Lost Cards</span>
                  <strong>{run.lostCards.length}</strong>
                </div>
              </div>
            </div>
          </div>

                    <div className="grid">
                        {isDay && (
            <div className="panel animated-panel day-panel">
                <h2 className="panel-title">Day Phase</h2>
                <p className="muted day-muted">
                Expand the ruin, prepare your defenses, and decide how much you
                want to invest before night falls.
                </p>

                <div className="button-row" style={{ marginTop: 16 }}>
                <button className="btn btn-build day-btn" onClick={buildWall}>
                    Reinforce Wall (+60, -10 Wood)
                </button>
                <button className="btn btn-primary day-start-btn" onClick={startNight}>
                    Start Night
                </button>
                </div>

                <h3 style={{ marginTop: 24 }}>Structures</h3>
                <div className="building-list">
                {starterBuildings.map((building) => (
                    <div key={building.id} className="building-card building-card-animated day-building-card">
                    <strong>{building.name}</strong>

                    <div className="building-costs">
                        {Object.entries(building.cost).map(([resource, value]) => (
                        <span key={resource} className={`resource-pill resource-${resource}`}>
                            {value} {resource}
                        </span>
                        ))}
                    </div>

                    <div className="building-bonus-list">
                        {formatBuildingBonus(building.modifiers).map((bonus) => (
                        <span key={bonus} className="building-bonus-pill day-bonus-pill">
                            {bonus}
                        </span>
                        ))}
                    </div>

                    <div className="button-row" style={{ marginTop: 12 }}>
                        <button className="btn btn-build day-btn" onClick={() => buildBuilding(building.id)}>
                        Build
                        </button>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            )}

            {isNight && combat && (
              <div className="panel animated-panel">
                <h2 className="panel-title">Night Defense</h2>

                <h3>Hand</h3>
                {combat.hand.length === 0 ? (
                  <p className="muted">No cards in hand.</p>
                ) : (
                  <div className="cards-row">
                    {combat.hand.map((handCard) => {
                      const card = getCardById(handCard.cardId);
                      if (!card) return null;
                      return <GameCard key={handCard.instanceId} card={card} />;
                    })}
                  </div>
                )}

                <h3 style={{ marginTop: 26 }}>Defense Board</h3>
                <div className="board">
                  {combat.lanes.map((lane) => (
                    <div key={lane.laneId} className="lane animated-lane">
                      <div className="lane__header">
                        <strong>Lane {lane.laneId + 1}</strong>
                        <span
                          className={`badge ${
                            lane.isCleared
                              ? "phase-reward"
                              : lane.isResolved
                              ? "phase-day"
                              : "phase-night"
                          }`}
                        >
                          {lane.isCleared
                            ? "Cleared"
                            : lane.isResolved
                            ? "Resolved"
                            : "Pending"}
                        </span>
                      </div>

                      <div className="lane__enemy enemy-theme-card">
                        <div><strong>{lane.enemyName}</strong></div>
                        <div className="enemy-stat enemy-stat-atk">ATK: {lane.enemyAttack}</div>
                        <div className="enemy-stat enemy-stat-def">HP: {lane.enemyHealth}</div>
                        <div className="enemy-stat enemy-stat-spd">SPD: {lane.enemySpeed}</div>
                      </div>

                      <div className="lane__ally">
                        {lane.playerCard ? (
                          <>
                            <div><strong>Your Card</strong></div>
                            <div>
                              {getCardById(lane.playerCard.cardId)?.name ?? lane.playerCard.cardId}
                            </div>
                            <div>Remaining HP: {lane.playerCard.currentHealth}</div>
                            <div className="muted" style={{ marginTop: 8 }}>
                              Higher SPD attacks first. Tie goes to defender.
                            </div>
                          </>
                        ) : !lane.isCleared && !lane.isResolved ? (
                          <>
                            <div className="muted" style={{ marginBottom: 10 }}>
                              No defender placed
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                              {combat.hand.map((handCard) => {
                                const card = getCardById(handCard.cardId);

                                return (
                                  <button
                                    className="btn"
                                    key={handCard.instanceId}
                                    onClick={() =>
                                      playCardInLane(lane.laneId, handCard.instanceId)
                                    }
                                  >
                                    Play {card?.name ?? handCard.cardId}
                                  </button>
                                );
                              })}
                            </div>
                          </>
                        ) : lane.isCleared ? (
                          <div className="muted">This lane is secured.</div>
                        ) : (
                          <div className="muted">This lane has already taken its turn.</div>
                        )}
                      </div>

                      {!lane.isCleared && !lane.isResolved && (
                        <div className="button-row" style={{ marginTop: 12 }}>
                          <button
                            className="btn btn-primary"
                            onClick={() => resolveLane(lane.laneId)}
                          >
                            Resolve Lane Turn
                          </button>
                        </div>
                      )}

                      {lane.lastLog.length > 0 && (
                        <div className="lane-log">
                          <strong>Combat Log</strong>
                          {lane.lastLog.map((entry, index) => (
                            <div key={index} className="muted lane-log__entry">
                              {entry}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="button-row" style={{ marginTop: 24 }}>
                  <button
                    className="btn btn-primary"
                    onClick={finishNight}
                    disabled={!mayFinishNight}
                  >
                    End Night
                  </button>
                </div>
              </div>
            )}

            {isReward && (
              <div className="panel animated-panel">
                <div className="reward-header">
                  <div>
                    <h2 className="panel-title">Rewards</h2>
                    <p className="muted">
                      Choose <strong>{2 - run.rewardsChosenThisPhase}</strong> more reward
                      {2 - run.rewardsChosenThisPhase === 1 ? "" : "s"}.
                    </p>
                  </div>

                  <div className="badge phase-reward">
                    Picks: {run.rewardsChosenThisPhase}/2
                  </div>
                </div>

                <div className="reward-list" style={{ marginTop: 16 }}>
                  {run.rewardOptions.map((reward) => {
                    const rewardCard = reward.cardId ? getCardById(reward.cardId) : null;

                    return (
                      <div key={reward.id} className="reward-card reward-card-animated">
                        <strong>{reward.label}</strong>

                        {rewardCard && (
                          <div className="reward-card__details">
                            <div className="reward-stat reward-stat-atk">ATK: {rewardCard.attack}</div>
                            <div className="reward-stat reward-stat-def">DEF: {rewardCard.defense}</div>
                            <div className="reward-stat reward-stat-spd">SPD: {rewardCard.speed}</div>
                            <div className="muted">Cost: {rewardCard.points}</div>
                            <div className="muted" style={{ marginTop: 6 }}>
                              {rewardCard.text}
                            </div>
                          </div>
                        )}

                        {!rewardCard && reward.type === "resource" && (
                          <div className="reward-card__details">
                            <div className="muted">
                              Resource: {reward.resourceType}
                            </div>
                            <div className="muted">Amount: {reward.amount}</div>
                          </div>
                        )}

                        {!rewardCard && reward.type === "heal" && (
                          <div className="reward-card__details">
                            <div className="muted">Restore base durability</div>
                            <div className="muted">Amount: {reward.amount}</div>
                          </div>
                        )}

                        <div className="button-row" style={{ marginTop: 14 }}>
                          <button
                            className="btn btn-primary"
                            onClick={() => chooseReward(reward)}
                          >
                            Take Reward
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {isLost && (
              <div className="panel animated-panel">
                <h2 className="panel-title">Run Lost</h2>
                <p className="muted">
                  The ruin has fallen, or your deck could no longer hold the night.
                </p>

                <div className="button-row" style={{ marginTop: 16 }}>
                  <button className="btn btn-danger" onClick={resetRun}>
                    Back to Menu
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}