import 'phaser';

export default class ScrollingBackground {
  constructor(scene, velocityY) {
    this.scene = scene;
    this.velocityY = velocityY;
    this.background = scene.game.globals.background;

    this.createBackgrounds();
  }

  createBackgrounds() {
    this.backgrounds = this.scene.add.group();

    for (let i = 0; i < 2; i += 1) {
      const background = this.scene.add.sprite(this.scene.game.config.width * 0.5, this.scene.game.config.height * 0.5, 'background');

      this.scene.physics.world.enableBody(background, 0);
      background.body.velocity.y = this.velocityY;

      if (i === 1) {
        background.y -= background.height;
      }

      this.backgrounds.add(background);
    }

    if (this.background.space.yPosition1 !== undefined) {
      this.backgrounds.getChildren()[0].y = this.background.space.yPosition1;
      this.backgrounds.getChildren()[1].y = this.background.space.yPosition2;
    }
  }

  update() {
    for (let i = 0; i < this.backgrounds.getChildren().length; i += 1) {
      const background = this.backgrounds.getChildren()[i];
      const sceneHeight = this.scene.game.config.height;

      if (background.y > sceneHeight + background.height / 2) {
        background.y -= background.height * 2;
      }
    }

    this.background.space.yPosition1 = this.backgrounds.getChildren()[0].y;
    this.background.space.yPosition2 = this.backgrounds.getChildren()[1].y;
  }
}
