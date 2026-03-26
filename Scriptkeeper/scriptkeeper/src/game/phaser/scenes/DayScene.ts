import Phaser from "phaser";

export class DayScene extends Phaser.Scene {
  constructor() {
    super("DayScene");
  }

  create() {
    this.add.text(40, 40, "Day Phase", { color: "#ffffff" });
  }
}