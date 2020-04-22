import playerFighter from '../../images/player-fighter-sprite.png';
import enemyFighter from '../../images/enemy-fighter-sprite.png';
import enemyCarrier from '../../images/enemy-carrier-sprite.png';
import enemyChaser from '../../images/enemy-chaser.png';
import playerLaser from '../../images/player-laser.png';
import enemyLaser from '../../images/enemy-laser.png';
import explosion from '../../images/explosion.png';
import explosionSound1 from '../../sounds/explosion-sound1.wav';
import explosionSound2 from '../../sounds/explosion-sound2.wav';
import laserSound from '../../sounds/player-laser1.wav';

import 'phaser';

import { ScrollingBackground, ScrollingPlanet } from '../objects/background';
import { Player, ChaserShip, GunShip, CarrierShip } from '../objects/entities';

export default class LevelOne extends Phaser.Scene {
  constructor() {
    super({ key: "LevelOne" });
  }

  preload() {
    this.load.spritesheet("playerFighter", playerFighter, {
      frameWidth: 30,
      frameHeight: 50
    });

    this.load.spritesheet("enemyFighter", enemyFighter, {
      frameWidth: 20,
      frameHeight: 56
    });
    this.load.spritesheet("enemyCarrier", enemyCarrier, {
      frameWidth: 40,
      frameHeight: 142
    });
    this.load.image("enemyChaser", enemyChaser);
  
    this.load.image("playerLaser", playerLaser);
    this.load.image("enemyLaser", enemyLaser);
    
    this.load.spritesheet("explosion", explosion, {
      frameWidth: 88,
      frameHeight: 88
    });

    this.load.audio("explosionSound1", explosionSound1);
    this.load.audio("explosionSound2", explosionSound2);
    this.load.audio("laserSound", laserSound);
  }

  create() {
    this.anims.create({
      key: "playerFighter",
      frames: this.anims.generateFrameNumbers("playerFighter"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "enemyFighter",
      frames: this.anims.generateFrameNumbers("enemyFighter"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "enemyCarrier",
      frames: this.anims.generateFrameNumbers("enemyCarrier"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "explosion",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0
    });
    
    this.sfx = {
      explosions: [
        this.sound.add("explosionSound1"),
        this.sound.add("explosionSound2")
      ],
      laser: this.sound.add("laserSound")
    };

    this.model = this.sys.game.globals.model;
    this.background = new ScrollingBackground(this, 15);
    this.planet = new ScrollingPlanet(this, 25);

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "playerFighter"
    );

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.playerLasers = this.add.group();
    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();

    this.time.addEvent({
      delay: 1000,
      callback: function() {
        let enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new GunShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0
          );
        } else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType("ChaserShip").length < 5) {

            enemy = new ChaserShip(
              this,
              Phaser.Math.Between(0, this.game.config.width),
              0
            );
          }
        } else {
          enemy = new CarrierShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0
          );
        }

        if (enemy !== null) {
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true
    });

    this.physics.add.collider(this.playerLasers, this.enemies, function(playerLaser, enemy) {
      if (enemy) {
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
        }
      
        enemy.explode(true);
        playerLaser.destroy();
      }
    });

    this.physics.add.overlap(this.player, this.enemies, function(player, enemy) {
      if (!player.getData("isDead") &&
          !enemy.getData("isDead")) {
        player.explode(false);
        player.onDestroy();
        enemy.explode(true);
      }
    });

    this.physics.add.overlap(this.player, this.enemyLasers, function(player, laser) {
      if (!player.getData("isDead") &&
          !laser.getData("isDead")) {
        player.explode(false);
        player.onDestroy();
        laser.destroy();
      }
    });
  }

  update() {
    this.background.update();
    this.planet.update();

    if (!this.player.getData("isDead")) {
      this.player.update();

      if (this.cursors.up.isDown) {
        this.player.moveUp();
      } else if (this.cursors.down.isDown) {
        this.player.moveDown();
      }

      if (this.cursors.left.isDown) {
        this.player.moveLeft();
      } else if (this.cursors.right.isDown) {
        this.player.moveRight();
      }

      if (this.keySpace.isDown) {
        this.player.setData("isShooting", true);
      } else {
        this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
        this.player.setData("isShooting", false);
      }
    }

    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];

      enemy.update();

      if (enemy.x < -enemy.displayWidth ||
        enemy.x > this.game.config.width + enemy.displayWidth ||
        enemy.y < -enemy.displayHeight * 4 ||
        enemy.y > this.game.config.height + enemy.displayHeight) {
    
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
    
          enemy.destroy();
        }
      }
    }

    for (let i = 0; i < this.enemyLasers.getChildren().length; i += 1) {
      const laser = this.enemyLasers.getChildren()[i];
      
      laser.update();

      if (laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    for (let i = 0; i < this.playerLasers.getChildren().length; i += 1) {
      const laser = this.playerLasers.getChildren()[i];
      
      laser.update();

      if (laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }
  }

  getEnemiesByType(type) {
    let arr = [];
    
    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];
      
      if (enemy.getData("type") == type) {
        arr.push(enemy);
      }
    }

    return arr;
  }
}