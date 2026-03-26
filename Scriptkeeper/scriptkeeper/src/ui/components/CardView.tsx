import type { CardDefinition } from "../../core/types/card";

interface CardViewProps {
  card: CardDefinition;
}

export function CardView({ card }: CardViewProps) {
  return (
    <div style={{ border: "1px solid gray", padding: 12, width: 180 }}>
      <h3>{card.name}</h3>
      <p>Type: {card.type}</p>
      <p>Points: {card.points}</p>
      <p>{card.text}</p>
    </div>
  );
}