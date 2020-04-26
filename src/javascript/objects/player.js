import 'phaser';

import Entity from './entity';
import PlayerLaser from './player-laser';

export default class Player extends Entity {
  constructor(scene, x, y, key, rotationDirection) {
    super(scene, x, y, key, 'Player');

    this.rotationDirection = rotationDirection;

    this.setData('speed', 200);
    this.setData('isShooting', false);
    this.setData('timerShootDelay', 10);
    this.setData('timerShootTick', this.getData('timerShootDelay') - 1);

    this.play(key);
  }

  moveUp() {
    this.body.velocity.y = -this.getData('speed');
  }

  moveDown() {
    this.body.velocity.y = this.getData('speed');
  }

  moveLeft() {
    this.body.velocity.x = -this.getData('speed');
  }

  moveRight() {
    this.body.velocity.x = this.getData('speed');
  }

  update() {
    this.body.setVelocity(0, 0);

    this.x = Phaser.Math.Clamp(this.x, 15, this.scene.game.config.width - 15);
    this.y = Phaser.Math.Clamp(this.y, 25, this.scene.game.config.height - 25);

    if (this.rotationDirection === 'clockwise') {
      this.rotation += 5 * Math.PI / 180;
    } else {
      this.rotation -= 5 * Math.PI / 180;
    }
    
    if (this.getData('isShooting')) {
      if (this.getData('timerShootTick') < this.getData('timerShootDelay')) {
        this.setData('timerShootTick', this.getData('timerShootTick') + 1);
      } else {
        const cannonDistance = 0.6 * this.displayWidth;
        let angle = this.rotation;

        if (this.rotationDirection === 'counterclockwise' && angle !== 0) {
          angle = angle < 0 ? -1 * angle : 6.283 - angle;
        } else if (this.rotationDirection === 'clockwise' && angle !== 0) {
          angle = angle > 0 ? 6.283 - angle : -1 * angle ;
        }

        const firstCannonStartAngle = 19.6 * Math.PI / 180;
        const firstCannonAngle = angle + firstCannonStartAngle;
        const firstLaserOffsetX = cannonDistance * Math.cos(firstCannonAngle);
        const firstLaserOffsetY = cannonDistance * (-1 * Math.sin(firstCannonAngle));
        
        const secondCannonStartAngle = 139.62 * Math.PI / 180;
        const secondCannonAngle = angle + secondCannonStartAngle;
        const secondLaserOffsetX = cannonDistance * Math.cos(secondCannonAngle);
        const secondLaserOffsetY = cannonDistance * (-1 * Math.sin(secondCannonAngle));
        
        const thirdCannonStartAngle = 259.52 * Math.PI / 180;
        const thirdCannonAngle = angle + thirdCannonStartAngle;
        const thirdLaserOffsetX = cannonDistance * Math.cos(thirdCannonAngle);
        const thirdLaserOffsetY = cannonDistance * (-1 * Math.sin(thirdCannonAngle));
        
        const laser1 = new PlayerLaser(this.scene, this.x, this.y, firstCannonAngle, firstLaserOffsetX, firstLaserOffsetY);
        const laser2 = new PlayerLaser(this.scene, this.x, this.y, secondCannonAngle, secondLaserOffsetX, secondLaserOffsetY);
        const laser3 = new PlayerLaser(this.scene, this.x, this.y, thirdCannonAngle, thirdLaserOffsetX, thirdLaserOffsetY);
        
        this.scene.playerLasers.add(laser1);
        this.scene.playerLasers.add(laser2);
        this.scene.playerLasers.add(laser3);
        
        this.scene.sys.game.globals.model.playSound(this.scene.sfx.laser);
        this.setData('timerShootTick', 0);
      }
    }
    
    // if (this.getData('isShooting')) {
    //   if (this.getData('timerShootTick') < this.getData('timerShootDelay')) {
    //     this.setData('timerShootTick', this.getData('timerShootTick') + 1);
    //   } else {
    //     const laser = new PlayerLaser(this.scene, this.x, this.y);
    //     this.scene.playerLasers.add(laser);

    //     this.scene.sys.game.globals.model.playSound(this.scene.sfx.laser);
    //     this.setData('timerShootTick', 0);
    //   }
    // }
  }

  onDestroy() {
    this.scene.time.addEvent({
      delay: 1000,
      callback() {
        this.scene.scene.start('GameOver');
      },
      callbackScope: this,
      loop: false,
    });
  }
}