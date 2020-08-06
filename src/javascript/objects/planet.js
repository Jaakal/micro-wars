import 'phaser';

export default class ScrollingPlanet {
  constructor(scene, velocityY) {
    this.scene = scene;
    this.velocityY = velocityY;
    this.background = scene.game.globals.background;

    if (this.background.planet.planetString !== undefined) {
      this.planet = scene.add.sprite(this.background.planet.xPosition, this.background.planet.yPosition, this.background.planet.planetString);
    } else {
      this.background.planet.planetString = scene.model.planetsArray;
      this.planet = scene.add.sprite(0, -500, this.background.planet.planetString);
      this.planet.x = Phaser.Math.Between(this.planet.width,
        scene.game.config.width - this.planet.width);
      this.planet.y = (-this.planet.width) * 0.5;
    }

    this.scene.physics.world.enableBody(this.planet, 0);
    this.planet.body.velocity.y = velocityY;
  }

  update() {
    if (this.planet.y > this.scene.game.config.height + this.planet.height) {
      this.background.planet.planetString = this.scene.model.planetsArray;
      this.planet.setTexture(this.background.planet.planetString);
      this.planet.x = Phaser.Math.Between(this.planet.width,
        this.scene.game.config.width - this.planet.width);
      this.planet.y = (-this.planet.width) * 0.5;
    }

    this.background.planet.xPosition = this.planet.x;
    this.background.planet.yPosition = this.planet.y;
  }
}