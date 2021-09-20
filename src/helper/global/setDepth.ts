import Phaser from "phaser";

const settingDepth = (layers: Phaser.Tilemaps.TilemapLayer[]) => {
  layers.forEach((layer) => {
    layer.setDepth(10)
  })
}

export {
  settingDepth
}