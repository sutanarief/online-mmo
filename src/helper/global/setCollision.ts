import Phaser from "phaser";

const setCollision = (layers: Phaser.Tilemaps.TilemapLayer[], hero: Phaser.Physics.Arcade.Sprite) => {
  layers.forEach((layer) => {
    layer.setCollisionByProperty({ collides: true })
  })
}

export {
  setCollision
}