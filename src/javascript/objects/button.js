import 'phaser';

export default class Button extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key1, key2, key3, text, targetScene) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.button = this.scene.add.sprite(0, 0, key1).setInteractive({ useHandCursor: true });
    this.button.setScale(1, 1);
    this.text = this.scene.add.text(0, 0, text, { fontFamily: 'Atures', fontSize: '20px', fill: '#37c954' });
    Phaser.Display.Align.In.Center(this.text, this.button);

    this.add(this.button);
    this.add(this.text);

    this.model = this.scene.sys.game.globals.model;
    this.sfx = this.scene.sys.game.globals.sfx;

    this.button.on('pointerdown', () => {
      this.button.setTexture(key3);
      this.model.playSound(this.sfx.buttonClick);

      if (this.text._text === 'PLAY') {
        this.model.playSound(this.sfx.startGame);
        this.scene.sys.game.globals.score.setScoreToZero();

        setTimeout(() => {
          this.scene.scene.start(targetScene);
        }, 2000);
      } else {
        this.scene.scene.start(targetScene);
      }
    });

    this.button.on('pointerover', () => {
      this.button.setTexture(key2);
      this.model.playSound(this.sfx.buttonHover);
    });

    this.button.on('pointerout', () => {
      this.button.setTexture(key1);
    });

    this.scene.add.existing(this);
  }
}
