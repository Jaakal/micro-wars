import 'phaser';
import Button from '../objects/button';

export default class OptionsScene extends Phaser.Scene {
  constructor () {
    super('Options');
  }

  create () {
    this.model = this.sys.game.globals.model;

    this.title = this.add.text(this.sys.game.config.width * 0.5, this.sys.game.config.height * 0.5 - 150, 'Options', { fontFamily: 'Andromeda', fontSize: 40, fill: '#3be219' });
    this.title.setOrigin(0.5, 0.5);

    this.musicButton = this.add.image(0, this.sys.game.config.height * 0.5 - 50, 'checkboxChecked');
    this.musicText = this.add.text(0, this.sys.game.config.height * 0.5 - 50, 'Music Enabled', { fontFamily: 'Trench', fontSize: 30, fill: '#3be219' });
    this.musicText.setOrigin(0.5, 0.5);
    
    // const lineWidth1 = this.musicButton.displayWidth + this.musicButton.displayWidth / 2 + this.musicText.displayWidth;
    
    
    this.soundButton = this.add.image(0, this.sys.game.config.height * 0.5 + 50, 'checkboxChecked');
    this.soundText = this.add.text(0, this.sys.game.config.height * 0.5 + 50, 'Sound Enabled', { fontFamily: 'Trench', fontSize: 30, fill: '#3be219' });
    this.soundText.setOrigin(0.5, 0.5);

    const lineWidth = this.soundButton.displayWidth + (50 - this.soundButton.displayWidth) + this.soundText.displayWidth;
    
    this.musicButton.x = this.sys.game.config.width * 0.5 - lineWidth / 2 + this.musicButton.displayWidth / 2;
    this.musicText.x = this.sys.game.config.width * 0.5 - (lineWidth / 2 - this.musicText.displayWidth / 2 - 50);
    
    this.soundButton.x = this.sys.game.config.width * 0.5 - lineWidth / 2 + this.soundButton.displayWidth / 2;
    this.soundText.x = this.sys.game.config.width * 0.5 + lineWidth / 2 - this.soundText.displayWidth / 2;

    this.musicButton.setInteractive({ useHandCursor: true  });
    this.soundButton.setInteractive({ useHandCursor: true  });

    this.musicButton.on('pointerdown', function () {
      this.model.musicOn = !this.model.musicOn;
      this.updateAudio();
    }.bind(this));

    this.soundButton.on('pointerdown', function () {
      this.model.soundOn = !this.model.soundOn;
      this.updateAudio();
    }.bind(this));

    this.mainMenuButton = new Button(this, this.game.config.width * 0.5, this.game.config.height * 0.5 + 250, 'buttonNormal', 'buttonHover', 'buttonClick' , 'Main Menu', 'MainMenu');

    this.updateAudio();
  }

  updateAudio() {
    if (this.model.musicOn === false) {
      this.musicButton.setTexture('checkboxUnchecked');
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
    } else {
      this.musicButton.setTexture('checkboxChecked');
      
      if (this.model.bgMusicPlaying === false) {
        this.sys.game.globals.bgMusic.play();
        this.model.bgMusicPlaying = true;
      }
    }
     
    if (this.model.soundOn === false) {
      this.soundButton.setTexture('checkboxUnchecked');
      this.model.soundOn = false;
    } else {
      this.soundButton.setTexture('checkboxChecked');
      this.model.soundOn = true;
    }
  }
};