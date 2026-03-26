import { useRunStore } from "../../store/useRunStore";
import { BasePanel } from "../components/BasePanel";

export function RunScreen() {
  const run = useRunStore((state) => state.run);
  const startNight = useRunStore((state) => state.startNight);
  const resolveCurrentNight = useRunStore((state) => state.resolveCurrentNight);
  const buildWall = useRunStore((state) => state.buildWall);
  const resetRun = useRunStore((state) => state.resetRun);

  if (!run) {
    return <div>No active run.</div>;
  }

  const isDay = run.phase === "day";
  const isNight = run.phase === "night";
  const isLost = run.phase === "lost";

  return (
    <div style={{ padding: 24 }}>
      <h1>Scriptkeeper</h1>
      <h2>Day {run.day}</h2>
      <p>Night Count: {run.night}</p>
      <p>Current Phase: {run.phase}</p>

      <BasePanel base={run.base} />

      <div style={{ marginTop: 16 }}>
        <p>Wood: {run.resources.wood}</p>
        <p>Stone: {run.resources.stone}</p>
        <p>Food: {run.resources.food}</p>
        <p>Cards left in deck: {run.deck.length}</p>
        <p>Lost cards this run: {run.lostCards.length}</p>
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
        {isDay && (
          <>
            <button onClick={buildWall}>Build Wall (+3 Outer Wall, -10 Wood)</button>
            <button onClick={startNight}>Start Night</button>
          </>
        )}

        {isNight && (
          <button onClick={resolveCurrentNight}>Resolve Night</button>
        )}

        {isLost && <button onClick={resetRun}>Back to Menu</button>}
      </div>

      {isLost && (
        <div style={{ marginTop: 24 }}>
          <h3>Run Lost</h3>
          <p>Your ruin has fallen, or you ran out of cards.</p>
        </div>
      )}
    </div>
  );
}