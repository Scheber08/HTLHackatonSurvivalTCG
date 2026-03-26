import Phaser from "phaser";
import { BootScene } from "./scenes/BootScene";
import { DayScene } from "./scenes/DayScene";
import { NightScene } from "./scenes/NightScene";

export function createPhaserGame(parent: string) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent,
    backgroundColor: "#101014",
    scene: [BootScene, DayScene, NightScene],
  });
}