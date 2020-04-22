import 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1280,
  height: 960,
  backgroundColor: "black",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 }
    }
  },
  pixelArt: true,
  roundPixels: true
};