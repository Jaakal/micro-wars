import 'phaser';

export default class ScrollingPlanet {
  constructor(scene, velocityY) {
    this.scene = scene;
    this.velocityY = velocityY;

    this.planet = scene.add.sprite(0, -500, scene.model.planetsArray);
    this.planet.x = Phaser.Math.Between(this.planet.width,
      scene.game.config.width - this.planet.width);
    this.planet.y = (-this.planet.width) * 0.5;
    this.scene.physics.world.enableBody(this.planet, 0);
    this.planet.body.velocity.y = velocityY;
  }

  update() {
    if (this.planet.y > this.scene.game.config.height + this.planet.height) {
      const planetString = this.scene.model.planetsArray;

      this.planet.setTexture(planetString);
      this.planet.x = Phaser.Math.Between(this.planet.width,
        this.scene.game.config.width - this.planet.width);
      this.planet.y = (-this.planet.width) * 0.5;
    }
  }
}