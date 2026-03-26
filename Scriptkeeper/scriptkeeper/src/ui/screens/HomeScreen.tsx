import { useRunStore } from "../../store/useRunStore";

export function HomeScreen() {
  const createNewRun = useRunStore((state) => state.createNewRun);

  return (
    <div style={{ padding: 24 }}>
      <h1>Scriptkeeper</h1>
      <button
        onClick={() =>
          createNewRun([
            "defender_sentry",
            "defender_sentry",
            "defender_sentry",
            "structure_barricade",
            "structure_barricade",
          ])
        }
      >
        Start Run
      </button>
    </div>
  );
}