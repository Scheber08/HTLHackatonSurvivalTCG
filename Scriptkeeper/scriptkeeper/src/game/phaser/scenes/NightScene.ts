import Phaser from "phaser";

export class NightScene extends Phaser.Scene {
  constructor() {
    super("NightScene");
  }

  create() {
    this.add.text(40, 40, "Night Phase", { color: "#ffffff" });
  }
}