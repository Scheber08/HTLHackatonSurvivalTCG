import type { BaseState } from "../../core/types/run";

function formatModifier(modifier: string): { label: string; tone: string } {
  if (modifier === "defender_plus_1_attack") {
    return { label: "+30 ATK aura", tone: "pill-atk" };
  }

  if (modifier === "defender_plus_1_def") {
    return { label: "+35 DEF & +8 SPD aura", tone: "pill-def" };
  }

  if (modifier === "outer_wall_plus_2") {
    return { label: "+25 wall mitigation / +70 wall build", tone: "pill-wall" };
  }

  return { label: modifier, tone: "pill-neutral" };
}

interface BasePanelProps {
  base: BaseState;
}

export function BasePanel({ base }: BasePanelProps) {
  return (
    <div className="panel animated-panel">
      <h2 className="panel-title">Ruin Core</h2>

      <div className="stat-list">
        <div className="stat-row">
          <span>Core HP</span>
          <strong>{base.coreHealth}</strong>
        </div>

        <div className="stat-row">
          <span>Outer Wall HP</span>
          <strong>{base.outerWallHealth}</strong>
        </div>

        <div className="stat-row">
          <span>Buildings</span>
          <strong>{base.buildings.length}</strong>
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <h3 className="sidebar-subtitle">Built Structures</h3>
        {base.buildings.length === 0 ? (
          <div className="muted">No structures built yet.</div>
        ) : (
          <div className="sidebar-pill-list">
            {base.buildings.map((building) => (
              <span key={building} className="sidebar-pill pill-neutral">
                {building}
              </span>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: 18 }}>
        <h3 className="sidebar-subtitle">Active Bonuses</h3>
        {base.modifiers.length === 0 ? (
          <div className="muted">No active bonuses yet.</div>
        ) : (
          <div className="sidebar-pill-list">
            {base.modifiers.map((modifier, index) => {
              const formatted = formatModifier(modifier);

              return (
                <span
                  key={`${modifier}-${index}`}
                  className={`sidebar-pill ${formatted.tone}`}
                >
                  {formatted.label}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}