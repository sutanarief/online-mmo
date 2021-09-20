import Phaser from "phaser";

export default class Preloader extends Phaser.Scene{
  constructor(){
    super('preloader')
  }

  preload() {
    this.load.image('gameTiles', 'tiles/jungle.png')
    this.load.tilemapTiledJSON('tf_jungle_tileset', 'tiles/newmaphenisutan.json')
    this.load.spritesheet('hero', 'characters/f2.png', { frameWidth: 32, frameHeight: 32 })
  }

  create() {
    this.scene.start('game')
  }
}