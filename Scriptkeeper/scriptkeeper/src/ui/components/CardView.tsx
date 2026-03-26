import type { CardDefinition } from "../../core/types/card";

interface CardViewProps {
  card: CardDefinition;
}

export function CardView({ card }: CardViewProps) {
  return (
    <div style={{ border: "1px solid gray", padding: 12, width: 180 }}>
      <h3>{card.name}</h3>
      <p>Type: {card.type}</p>
      <p>Cost: {card.points}</p>
      <p>ATK: {card.attack}</p>
      <p>DEF: {card.defense}</p>
      <p>{card.text}</p>
    </div>
  );
}