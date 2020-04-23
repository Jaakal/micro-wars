class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key);

    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData("type", type);
    this.setData("isDead", false);
  }

  explode(canDestroy) {
    if (!this.getData("isDead")) {
      // Set the texture to the explosion image, then play the animation
      const currentWidth = this.width;

      this.setTexture("explosion");  // this refers to the same animation key we used when we added this.anims.create previously
      this.setScale(currentWidth / this.width * 2);
      this.play("explosion"); // play the animation
      
      // pick a random explosion sound within the array we defined in this.sfx in SceneMain
      this.model = this.scene.sys.game.globals.model;
      this.model.playSound(this.scene.sfx.explosions[Phaser.Math.Between(0, this.scene.sfx.explosions.length - 1)]);

      this.score = this.scene.sys.game.globals.score;
      
      if (this instanceof GunShip) {
        this.score.addToScore(15);
      } else if (this instanceof CarrierShip) {
        this.score.addToScore(25);
      } else if (this instanceof ChaserShip) {
        this.score.addToScore(10);
      }

      if (this.shootTimer !== undefined) {
        if (this.shootTimer) {
          this.shootTimer.remove(false);
        }
      }

      this.setAngle(0);
      this.body.setVelocity(0, 0);

      this.on('animationcomplete', function() {
        if (canDestroy) {
          this.destroy();
        } else {
          this.setVisible(false);
        }
      }, this);

      this.setData("isDead", true);
    }
  }
}

class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, "Player");

    this.setData("speed", 200);
    this.setData("isShooting", false);
    this.setData("timerShootDelay", 10);
    this.setData("timerShootTick", this.getData("timerShootDelay") - 1);

    this.play(key);
  }

  moveUp() {
    this.body.velocity.y = -this.getData("speed");
  }

  moveDown() {
    this.body.velocity.y = this.getData("speed");
  }

  moveLeft() {
    this.body.velocity.x = -this.getData("speed");
  }

  moveRight() {
    this.body.velocity.x = this.getData("speed");
  }

  update() {
    this.body.setVelocity(0, 0);

    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

    if (this.getData("isShooting")) {
      if (this.getData("timerShootTick") < this.getData("timerShootDelay")) {
        this.setData("timerShootTick", this.getData("timerShootTick") + 1); // every game update, increase timerShootTick by one until we reach the value of timerShootDelay
      } else { // when the "manual timer" is triggered:
        var laser = new PlayerLaser(this.scene, this.x, this.y);
        this.scene.playerLasers.add(laser);

        this.scene.sys.game.globals.model.playSound(this.scene.sfx.laser);
        this.setData("timerShootTick", 0);
      }
    }
  }

  onDestroy() {
    this.scene.time.addEvent({
      delay: 1000,
      callback: function() {
        this.scene.scene.start("GameOver");
      },
      callbackScope: this,
      loop: false
    });
  }
}

class PlayerLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "playerLaser");
    this.body.velocity.y = -200;
  }
}

class EnemyLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "enemyLaser");
    this.body.velocity.y = 200;
  }
}

class ChaserShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "enemyChaser", "ChaserShip");
    this.body.velocity.y = Phaser.Math.Between(50, 100);
    this.states = {
      MOVE_DOWN: "MOVE_DOWN",
      CHASE: "CHASE"
    };
    this.state = this.states.MOVE_DOWN;
  }

  update() {
    if (!this.getData("isDead") && this.scene.player) {
      if (Phaser.Math.Distance.Between(
        this.x,
        this.y,
        this.scene.player.x,
        this.scene.player.y
      ) < 620) {

        this.state = this.states.CHASE;
      }

      if (this.state === this.states.CHASE) {
        const dx = this.scene.player.x - this.x;
        const dy = this.scene.player.y - this.y;

        const angle = Math.atan2(dy, dx);

        const speed = 100;
        this.body.setVelocity(
          Math.cos(angle) * speed,
          Math.sin(angle) * speed
        );
      }

      if (this.x < this.scene.player.x) {
        this.angle -= 5;
      } else {
        this.angle += 5;
      }
    }
  }
}

class GunShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "enemyFighter", "GunShip");
    this.body.velocity.y = Phaser.Math.Between(50, 100);
    this.shootTimer = this.scene.time.addEvent({
      delay: 1800,
      callback: function() {
        var laser = new EnemyLaser(
          this.scene,
          this.x,
          this.y
          );
          laser.setScale(this.scaleX);
          this.scene.enemyLasers.add(laser);
        },
        callbackScope: this,
        loop: true
      });
    this.play("enemyFighter");
  }

  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }
    }
  }
}

class CarrierShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "enemyCarrier", "CarrierShip");
    this.body.velocity.y = Phaser.Math.Between(50, 100);
    this.play("enemyCarrier");
  }
}

export { Player, ChaserShip, GunShip, CarrierShip };
