import 'phaser';

import ScrollingBackground from '../objects/background';
import ScrollingPlanet from '../objects/planet';
import Button from '../objects/button';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Leaderboard');
  }

  create() {
    this.model = this.sys.game.globals.model;
    this.score = this.sys.game.globals.score;
    this.background = new ScrollingBackground(this, 15);
    this.planet = new ScrollingPlanet(this, 25);

    this.add.sprite(this.sys.game.config.width * 0.5, this.sys.game.config.height * 0.5 - 80, 'scoreboard');

    this.title = this.add.text(this.sys.game.config.width * 0.5, this.sys.game.config.height * 0.5 - 260, 'Leaderboard', { fontFamily: 'Andromeda', fontSize: 50, fill: '#3be219' });
    this.title.setOrigin(0.5, 0.5);

    const scoreboard = this.score.getScoreboard();

    for (let i = 0; i < scoreboard.length; i += 1) {
      this.title = this.add.text(this.sys.game.config.width * 0.5, this.sys.game.config.height * 0.5 - (190 - i * 30), `${scoreboard[i].user}: ${scoreboard[i].score}`, { fontFamily: 'Trench', fontSize: 30, fill: '#3be219' });
      this.title.setOrigin(0.5, 0.5);
    }

    this.mainMenuButton = new Button(this, this.game.config.width * 0.5, this.game.config.height * 0.5 + 250, 'buttonNormal', 'buttonHover', 'buttonClick', 'Main Menu', 'MainMenu');
  }

  update() {
    this.background.update();
    this.planet.update();
  }
}
