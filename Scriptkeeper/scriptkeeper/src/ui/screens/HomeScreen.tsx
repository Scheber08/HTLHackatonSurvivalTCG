import { useRunStore } from "../../store/useRunStore";

export function HomeScreen() {
  const createNewRun = useRunStore((state) => state.createNewRun);

  return (
    <div className="app-shell">
      <div className="screen">
        <div className="home-hero">
          <h1 className="title">Scriptkeeper</h1>
          <p className="subtitle">
            Defend an ancient ruin with hardcoded monster cards from your custom set.
            ATK and DEF now match the Excel balance directly.
          </p>

          <div className="button-row" style={{ marginTop: 24 }}>
            <button
              className="btn btn-primary"
              onClick={() =>
                createNewRun([
                  "defender_carddealer",
                  "defender_small_samurai",
                  "defender_monsterhunter",
                  "defender_respawner",
                  "defender_infiltrator",
                  "defender_duke",
                  "defender_mercenary",
                  "defender_healer",
                ])
              }
            >
              Start New Run
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}