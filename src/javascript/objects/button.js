import 'phaser';

export default class Button extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key1, key2, key3, text, targetScene) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.button = this.scene.add.sprite(0, 0, key1).setInteractive({ useHandCursor: true  });
    this.button.setScale(1.4, 1.4);
    this.text = this.scene.add.text(0, 0, text, { fontFamily: 'Atures', fontSize: '26px', fill: '#37c954' });
    Phaser.Display.Align.In.Center(this.text, this.button);
 
    this.add(this.button);
    this.add(this.text);
    
    this.model = this.scene.sys.game.globals.model;
    this.sfx = this.scene.sys.game.globals.sfx;

    this.button.on('pointerdown', function () {
      this.button.setTexture(key3);
      this.model.playSound(this.sfx.buttonClick);

      if (this.text['_text'] === 'PLAY') {
        this.model.playSound(this.sfx.startGame);

        setTimeout(() => {
          this.scene.scene.start(targetScene);
        }, 2000);
      } else {
        this.scene.scene.start(targetScene);
      }
    }.bind(this));
    
    this.button.on('pointerover', function () {
      this.button.setTexture(key2);
      this.model.playSound(this.sfx.buttonHover);
    }.bind(this));
 
    this.button.on('pointerout', function () {
      this.button.setTexture(key1);
    }.bind(this));
 
    this.scene.add.existing(this);
  }
}