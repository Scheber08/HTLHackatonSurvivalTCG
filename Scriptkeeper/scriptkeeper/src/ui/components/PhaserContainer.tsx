import { useEffect, useRef } from "react";
import { createPhaserGame } from "../../game/phaser/Game";

export function PhaserContainer() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const game = createPhaserGame("phaser-game");

    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div
      id="phaser-game"
      ref={containerRef}
      style={{ width: "1280px", height: "720px" }}
    />
  );
}