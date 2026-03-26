import type { BaseState } from "../../core/types/run";

interface BasePanelProps {
  base: BaseState;
}

export function BasePanel({ base }: BasePanelProps) {
  return (
    <div>
      <h2>Base</h2>
      <p>Core HP: {base.coreHealth}</p>
      <p>Outer Wall HP: {base.outerWallHealth}</p>
      <p>Buildings: {base.buildings.join(", ") || "none"}</p>
    </div>
  );
}