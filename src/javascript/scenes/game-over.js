import enterScore from '../../html/enter-score-form.html';

import 'phaser'

import { ScrollingBackground, ScrollingPlanet } from '../objects/background';
import Button from '../objects/button';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: "GameOver" });
  }

  preload() {
    this.load.html('enterScore', enterScore);
    window.game.onBlur(() => { console.log("BLURRED") });
  }

  create() {
    this.model = this.sys.game.globals.model;
    this.score = this.sys.game.globals.score;
    this.background = new ScrollingBackground(this, 15);
    this.planet = new ScrollingPlanet(this, 25);

    window.game.input.keyboard.enabled = false;

    this.title = this.add.text(this.game.config.width * 0.5, 128, "GAME OVER", {
      fontFamily: 'Andromeda',
      fontSize: 48,
      color: '#3be219'
    });
    this.title.setOrigin(0.5, 0.5);

    const element = this.add.dom(400, 400).createFromCache('enterScore');
    
    element.node.children[1].innerHTML = `Score: ${this.score.getScore()}`;
    element.x = this.game.config.width * 0.5;
    element.y = this.game.config.height * 0.5;
    element.setOrigin(0.5, 0.5);
    element.addListener('click');

    element.on('click', async function (event) {
      if (event.target.name === 'submit-button') {
        const inputText = this.getChildByName('player-name').value;
        
        if (inputText !== '') {
          await this.scene.score.setScore(inputText); 
          this.scene.scene.start('Leaderboard');
        } else {
          this.scene.scene.start('MainMenu');
        }
      }
    });  

    this.mainMenuButton = new Button(this, this.game.config.width * 0.5, this.game.config.height * 0.5 + 250, 'buttonNormal', 'buttonHover', 'buttonClick' , 'Main Menu', 'MainMenu');  
  }

  update() {
    this.background.update();
    this.planet.update();
  }
}