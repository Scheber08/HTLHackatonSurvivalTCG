import type { CardDefinition } from "../../core/types/card";

interface GameCardProps {
  card: CardDefinition;
}

function getCardTone(points: number): string {
  if (points >= 8) return "linear-gradient(180deg, #5f3318 0%, #2b160b 100%)";
  if (points >= 5) return "linear-gradient(180deg, #334567 0%, #1b2538 100%)";
  if (points >= 2) return "linear-gradient(180deg, #27405a 0%, #172536 100%)";
  return "linear-gradient(180deg, #1f2b39 0%, #141c28 100%)";
}

export function GameCard({ card }: GameCardProps) {
  return (
    <div className="game-card" style={{ background: getCardTone(card.points) }}>
      <div className="game-card__type">monster</div>
      <h3 className="game-card__name">{card.name}</h3>

      <div className="game-card__stats">
        <div className="game-card__stat stat-atk">
          <div className="muted">ATK</div>
          <strong>{card.attack}</strong>
        </div>
        <div className="game-card__stat stat-def">
          <div className="muted">DEF</div>
          <strong>{card.defense}</strong>
        </div>
        <div className="game-card__stat stat-spd">
          <div className="muted">SPD</div>
          <strong>{card.speed}</strong>
        </div>
      </div>

      <div className="muted">{card.text}</div>

      <div className="game-card__effects">
        Cost: {card.points}
      </div>
    </div>
  );
}