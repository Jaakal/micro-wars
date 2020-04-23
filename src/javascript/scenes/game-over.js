import 'phaser'

import { ScrollingBackground, ScrollingPlanet } from '../objects/background';
import Button from '../objects/button';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: "GameOver" });
  }

  create() {
    this.model = this.sys.game.globals.model;
    this.background = new ScrollingBackground(this, 15);
    this.planet = new ScrollingPlanet(this, 25);

    this.title = this.add.text(this.game.config.width * 0.5, 128, "GAME OVER", {
      fontFamily: 'Andromeda',
      fontSize: 48,
      color: '#3be219'
    });
    this.title.setOrigin(0.5, 0.5);

    this.mainMenuButton = new Button(this, this.game.config.width * 0.5, this.game.config.height * 0.5 + 250, 'buttonNormal', 'buttonHover', 'buttonClick' , 'Main Menu', 'MainMenu');
  
    this.sys.game.globals.score.displayEnterScore();
    
  }

  update() {
    this.background.update();
    this.planet.update();

    if (this.sys.game.globals.score.submitScore) {
      this.sys.game.globals.score.submitScore = false;
      this.scene.start('MainMenu');
    }
  }
}