import Entity from './entity';

export default class PlayerLaser extends Entity {
  constructor(scene, x, y, angle, offsetX, offsetY) {
    super(scene, x, y, 'playerLaser');
    const speed = 200;

    this.setOrigin(0.5, 0.5);
    
    this.x += offsetX;
    this.y += offsetY;
    this.rotation = Math.PI * 0.5 - angle;
    this.body.setVelocity(
             Math.cos(angle) * speed,
      (-1) * Math.sin(angle) * speed,
    );
  }
}
// export default class PlayerLaser extends Entity {
//   constructor(scene, x, y) {
//     super(scene, x, y, 'playerLaser');
//     this.body.velocity.y = -200;
//   }
// }