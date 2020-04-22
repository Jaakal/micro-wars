import 'phaser';

class ScrollingBackground {
  constructor(scene, velocityY) {
    this.scene = scene;
    this.velocityY = velocityY;
  
    this.createBackgrounds();
  }

  createBackgrounds() {
    this.backgrounds = this.scene.add.group();

    for (let i = 0; i < 2; i++) {
      const background = this.scene.add.sprite(this.scene.game.config.width * 0.5, this.scene.game.config.height * 0.5, 'background');
      
      this.scene.physics.world.enableBody(background, 0);
      background.body.velocity.y = this.velocityY;
      
      if (i === 1) {
        background.y -= background.height;
      }

      this.backgrounds.add(background);
    }
  }

  update() {
    for (let i = 0; i < this.backgrounds.getChildren().length; i++) {
      const background = this.backgrounds.getChildren()[i];
      const sceneHeight = this.scene.game.config.height;

      if (background.y > sceneHeight + background.height / 2) {
        background.y -= background.height * 2;
      }
    }
  }
}

class ScrollingPlanet {
  constructor(scene, velocityY) {
    this.scene = scene;
    this.velocityY = velocityY;

    this.planet = scene.add.sprite(0, -500, scene.model.planetsArray);
    this.planet.x = Phaser.Math.Between(this.planet.width, scene.game.config.width - this.planet.width);
    this.planet.y = (-this.planet.width) * 0.5;
    this.scene.physics.world.enableBody(this.planet, 0);
    this.planet.body.velocity.y = velocityY;
  }

  update() {
    if (this.planet.y > this.scene.game.config.height + this.planet.height) {
      const planetString = this.scene.model.planetsArray;
  
      this.planet.setTexture(planetString);
      this.planet.x = Phaser.Math.Between(this.planet.width, this.scene.game.config.width - this.planet.width);
      this.planet.y = (-this.planet.width) * 0.5;
    }
  }
}

export { ScrollingBackground, ScrollingPlanet };