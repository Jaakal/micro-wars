import 'phaser';

import Entity from './entity';

export default class CarrierShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemyCarrier', 'CarrierShip');
    this.body.velocity.y = Phaser.Math.Between(50, 100);
    this.play('enemyCarrier');
    this.className = 'CarrierShip';
  }
}