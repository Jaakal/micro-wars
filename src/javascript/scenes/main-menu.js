import 'phaser'

import { ScrollingBackground, ScrollingPlanet } from '../objects/background';
import Button from '../objects/button';

export default class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "MainMenu" });
  }

  preload() {
  }

  create() {
    this.model = this.sys.game.globals.model;
    this.background = new ScrollingBackground(this, 15);
    this.planet = new ScrollingPlanet(this, 25);

    this.logo = this.add.sprite(this.game.config.width * 0.5, 200, 'logo');
    this.logo.setScale(1);

    this.playButton = new Button(this, this.game.config.width * 0.5, this.game.config.height * 0.5, 'buttonNormal', 'buttonHover', 'buttonClick' , 'PLAY', 'LevelOne');
    this.optionsButton = new Button(this, this.game.config.width * 0.5, this.game.config.height * 0.5 + 80, 'buttonNormal', 'buttonHover', 'buttonClick' , 'OPTIONS', 'Options');
    this.leaderboardButton = new Button(this, this.game.config.width * 0.5, this.game.config.height * 0.5 + 160, 'buttonNormal', 'buttonHover', 'buttonClick' , 'LEADERBOARD', 'Leaderboard');

    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.3, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }

  update() {
    this.background.update();
    this.planet.update();
  }
}