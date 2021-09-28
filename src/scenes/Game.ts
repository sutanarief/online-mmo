import Phaser, { Physics } from 'phaser'
import { debugDraw } from '~/utils/debug'
import { setCollision, settingDepth } from '~/helper'

export default class Game extends Phaser.Scene{

  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private hero!: Phaser.Physics.Arcade.Sprite
  private text!: Phaser.GameObjects.Text
  private flag!: String
  private A!: Phaser.Input.Keyboard.Key
  private S!: Phaser.Input.Keyboard.Key
  private D!: Phaser.Input.Keyboard.Key
  private W!: Phaser.Input.Keyboard.Key
  private speed!: number

	constructor()
	{
		super('game')
	}

	preload(){
    this.cursors = this.input.keyboard.createCursorKeys()
    this.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    this.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.speed = 100
  }

  create(){
    const map = this.make.tilemap({ key: "tf_jungle_tileset" })
    const tileset = map.addTilesetImage('tf_jungle_tileset', 'gameTiles', 16, 16, 1, 2)
    const ground = map.createLayer('Ground', tileset, 0, 0)
    const grass = map.createLayer('Grass', tileset, 0, 0);
    map.createLayer('Path', tileset, 0, 0);
    const wall = map.createLayer('Walls', tileset, 0, 0);
    map.createLayer('Flowers', tileset, 0, 0);
    map.createLayer('Stones', tileset, 0, 0);
    map.createLayer('Bushes', tileset, 0, 0);
    const trees = map.createLayer('Trees', tileset, 0, 0);
    const bigTrees2 = map.createLayer('Big Trees 2', tileset, 0, 0);
    const bigTrees1 = map.createLayer('Big Trees 1', tileset, 0, 0);
    const trees2 = map.createLayer('Trees 2', tileset, 0, 0);
    
    setCollision([ground, grass, wall, trees, bigTrees1, bigTrees2, trees2], this.hero)
    settingDepth([trees, trees2, bigTrees2, bigTrees1])


    // debugDraw([ground, grass, wall, trees, bigTrees1, bigTrees2, trees2], this)
    const spawnPoint = map.objects[0].objects[0]
    this.hero = this.physics.add.sprite(spawnPoint.x as number, spawnPoint.y as number, 'hero')
    this.hero.body.setSize(this.hero.width * 0.4, this.hero.height * 0.3)
    this.hero.body.offset.y = 16
    const container = this.add.container(this.hero.x, 50)
    this.text = this.add.text(this.hero.body.x - 100, this.hero.body.y - 100, 'Suteen', { fontSize: '10px'})

    this.tweens.add({
      targets: container,
      x: this.hero.body.x,
      yoyo: false,
      ease: 'Linear',
      delay: 1,
      duration: 1,
      repeat: -1
    })


    
    this.hero.anims.create({
      key: 'idle-down',
      frames: this.anims.generateFrameNumbers('hero', { frames: [1] })
    })
    this.hero.anims.create({
      key: 'idle-left',
      frames: this.anims.generateFrameNumbers('hero', { frames: [4] })
    })
    
    this.hero.anims.create({
      key: 'idle-right',
      frames: this.anims.generateFrameNumbers('hero', { frames: [7] })
    })

    this.hero.anims.create({
      key: 'idle-up',
      frames: this.anims.generateFrameNumbers('hero', { frames: [10] })
    })

    this.hero.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('hero', { frames: [3, 4, 5, 4] }),
      frameRate: 8,
      repeat: -1
    })
    this.hero.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('hero', { frames: [6, 7, 8, 7] }),
      frameRate: 8,
      repeat: -1
    })
    this.hero.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('hero', { frames: [0, 1, 2, 1] }),
      frameRate: 8,
      repeat: -1
    })
    this.hero.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('hero', { frames: [9, 10, 11, 10] }),
      frameRate: 8,
      repeat: -1
    })

    this.hero.anims.play('idle-down', true)

    this.physics.add.collider(this.hero, [wall, grass, trees2, trees, bigTrees2, bigTrees1, ground])
    const cameras = this.cameras.main
    cameras.setZoom(2)
    cameras.startFollow(this.hero, true, 0.08, 0.08)
    cameras.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  }

  update(t:number, dt: number){
    this.text.x = this.hero.body.x - 10
    this.text.y = this.hero.body.y - 28
    if(!this.cursors || !this.hero) {
      return
    }

    if(this.cursors.space?.isDown) {
      this.speed = 150
    } else if (this.cursors.space?.isUp) {
      this.speed = 100
    }

    if(this.cursors.left?.isDown || this.A.isDown) {
      this.flag = 'left'
      this.hero.anims.play('left', true)
      this.hero.setVelocity(-this.speed, 0)
    } else if (this.cursors.right?.isDown || this.D.isDown) {
      this.flag = 'right'
      this.hero.anims.play('right', true)
      this.hero.setVelocity(this.speed, 0)
    } else if (this.cursors.up?.isDown || this.W.isDown) {
      this.flag = 'up'
      this.hero.anims.play('up', true)
      this.hero.setVelocity(0, -this.speed)
    } else if (this.cursors.down?.isDown || this.S.isDown) {
      this.flag = 'down'
      this.hero.anims.play('down', true)
      this.hero.setVelocity(0, this.speed)
    } else {
      if(this.flag) {
        this.hero.anims.play(`idle-${this.flag}`, true)
        this.hero.setVelocity(0, 0)
      }
    }
  }
}
