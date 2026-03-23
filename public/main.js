import './style.css'
import Phaser from 'phaser'

class GameScene extends Phaser.Scene {
    constructor() {
        super("scene-game");
        this.player;
        this.cursor;
        this.playerSpeed = speedDown+50;
        this.target;
    }

    preload() {
        this.load.image("bg", "/assets/bg_2.png");
        this.load.image("basket", "/assets/basket.png");
    }

    create() {
        this.input.on("pointermove", (pointer) => {
            if (!pointer.isDown) return;

            this.cameras.main.scrollX -= (pointer.position.x - pointer.prevPosition.x);
            this.cameras.main.scrollY -= (pointer.position.y - pointer.prevPosition.y);
        });
        

        this.add.image(0, 0, "bg").setOrigin(0, 0);

        this.player = this.physics.add
            .image(0, sizes.height - 100, "basket")
            .setOrigin(0, 0);
        // this.player.setImmovable(true);
        this.player.body.allowGravity = false;
        this.player.setCollideWorldBounds(true);

        this.cursor = this.input.keyboard.createCursorKeys();
    }

    update() {

    }
}

const speedDown = 300;

const sizes = {
    width: 500,
    height: 500
};

const config = {
    type: Phaser.WEBGL,
    width: sizes.width,
    height: sizes.height,
    canvas: gameCanvas,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: speedDown },
            debug: true
        }
    },
    scene: [GameScene]
};

const game = new Phaser.Game(config);
