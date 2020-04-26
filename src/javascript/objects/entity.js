import 'phaser';

// import GunShip from './gunship';
// import CarrierShip from './carriership';
// import ChaserShip from './chasership';

export default class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key);

    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData('type', type);
    this.setData('isDead', false);
  }

  explode(canDestroy) {
    if (!this.getData('isDead')) {
      const currentWidth = this.width;

      this.setTexture('explosion');
      this.setScale((currentWidth / this.width) * 2);
      this.play('explosion');

      this.model = this.scene.sys.game.globals.model;
      this.model.playSound(this.scene.sfx.explosions[Phaser.Math.Between(0,
        this.scene.sfx.explosions.length - 1)]);

      this.score = this.scene.sys.game.globals.score;

      if (this.className === 'GunShip') {
        this.score.addToScore(15);
      } else if (this.className === 'CarrierShip') {
        this.score.addToScore(25);
      } else if (this.className === 'ChaserShip') {
        this.score.addToScore(10);
      }

      if (this.shootTimer !== undefined) {
        if (this.shootTimer) {
          this.shootTimer.remove(false);
        }
      }

      this.setAngle(0);
      this.body.setVelocity(0, 0);

      this.on('animationcomplete', () => {
        if (canDestroy) {
          this.destroy();
        } else {
          this.setVisible(false);
        }
      }, this);

      this.setData('isDead', true);
    }
  }
}