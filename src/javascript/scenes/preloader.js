import background from '../../images/background-1280.png';
import logo from '../../images/micro-wars-logo2.png';
import planet1 from '../../images/planet1-halo.png';
import planet2 from '../../images/planet2-halo.png';
import planet3 from '../../images/planet3-halo.png';
import planet4 from '../../images/planet4-halo.png';
import planet5 from '../../images/planet5-halo.png';
import planet6 from '../../images/planet6-halo.png';
import buttonNormal from '../../images/button-normal.png';
import buttonHover from '../../images/button-hover.png';
import buttonClick from '../../images/button-click.png';
import checkboxChecked from '../../images/checkbox-checked.png';
import checkboxUnchecked from '../../images/checkbox-unchecked.png';
import scoreboard from '../../images/scoreboard.png';
import buttonHovered from '../../sounds/button-hover.wav';
import buttonClicked from '../../sounds/button-click.wav';
import startGame from '../../sounds/start-game.wav';
import bgMusic from '../../sounds/ambient-background.mp3';

import 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    const { width } = this.game.config;
    const { height } = this.game.config;

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();

    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);

    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '24px Trench',
        fill: '#3be219',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2,
      text: '0%',
      style: {
        font: '24px Trench',
        fill: '#3be219',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '24px Trench',
        fill: '#3be219',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    this.load.image('background', background);
    this.load.image('logo', logo);

    this.load.image('planet1', planet1);
    this.load.image('planet2', planet2);
    this.load.image('planet3', planet3);
    this.load.image('planet4', planet4);
    this.load.image('planet5', planet5);
    this.load.image('planet6', planet6);
    this.sys.game.globals.model.planetsArray = ['planet1', 'planet2', 'planet3', 'planet4', 'planet5', 'planet6'];

    this.load.image('buttonNormal', buttonNormal);
    this.load.image('buttonHover', buttonHover);
    this.load.image('buttonClick', buttonClick);

    this.load.image('checkboxChecked', checkboxChecked);
    this.load.image('checkboxUnchecked', checkboxUnchecked);

    this.load.image('scoreboard', scoreboard);

    this.load.audio('buttonHover', buttonHovered);
    this.load.audio('buttonClick', buttonClicked);
    this.load.audio('startGame', startGame);
    this.load.audio('bgMusic', [bgMusic]);
  }

  ready() {
    this.readyCount += 1;

    if (this.readyCount === 2) {
      this.sys.game.globals.sfx = {
        buttonHover: this.sound.add('buttonHover'),
        buttonClick: this.sound.add('buttonClick'),
        startGame: this.sound.add('startGame'),
      };

      this.scene.start('LevelOne');
    }
  }
}
