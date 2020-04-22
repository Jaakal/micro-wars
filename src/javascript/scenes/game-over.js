import 'phaser'
import { ScrollingBackground, ScrollingPlanet } from '../objects/background';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: "GameOver" });
  }

  create() {
    this.model = this.sys.game.globals.model;
    this.background = new ScrollingBackground(this, 15);
    this.planet = new ScrollingPlanet(this, 25);

    this.title = this.add.text(this.game.config.width * 0.5, 128, "GAME OVER", {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center'
    });
    this.title.setOrigin(0.5);

    // this.sfx = {
    //   btnOver: this.sound.add("sndBtnOver"),
    //   btnDown: this.sound.add("sndBtnDown")
    // };

    // this.btnRestart = this.add.sprite(
    //   this.game.config.width * 0.5,
    //   this.game.config.height * 0.5,
    //   "sprBtnRestart"
    // );

    // this.btnRestart.setInteractive();

    // this.btnRestart.on("pointerover", function() {
    //   this.btnRestart.setTexture("sprBtnRestartHover"); // set the button texture to sprBtnPlayHover
    //   this.sfx.btnOver.play(); // play the button over sound
    // }, this);

    // this.btnRestart.on("pointerout", function() {
    //   this.setTexture("sprBtnRestart");
    // });

    // this.btnRestart.on("pointerdown", function() {
    //   this.btnRestart.setTexture("sprBtnRestartDown");
    //   this.sfx.btnDown.play();
    // }, this);

    // this.btnRestart.on("pointerup", function() {
    //   this.btnRestart.setTexture("sprBtnRestart");
    //   this.scene.start("SceneMain");
    // }, this);
  }

  update() {
    this.background.update();
    this.planet.update();
  }
}