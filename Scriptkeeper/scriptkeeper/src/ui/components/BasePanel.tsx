import type { BaseState } from "../../core/types/run";

interface BasePanelProps {
  base: BaseState;
}

export function BasePanel({ base }: BasePanelProps) {
  return (
    <div className="panel">
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
          <strong>{base.buildings.join(", ") || "none"}</strong>
        </div>

        <div className="stat-row">
          <span>Modifiers</span>
          <strong>{base.modifiers.join(", ") || "none"}</strong>
        </div>
      </div>
    </div>
  );
}