import './style.css'
import Phaser from 'phaser'

const sizes = {
    width: 500,
    height: 540
};

const WORLD_WIDTH = 2000;   // how wide your full scene is
const EDGE_ZONE = 80;       // px from edge that triggers scrolling
const SCROLL_SPEED = 6;     // px per frame

class GameScene extends Phaser.Scene {
    constructor() {
        super("scene-game");
    }

    preload() {
        this.load.image("bg", "assets/bg_2.png");
        this.load.image("basket", "assets/basket.png");
    }

    create() {
        // Set world bounds — wide but locked vertically
        this.physics.world.setBounds(0, 0, WORLD_WIDTH, sizes.height);

        // Camera sees only the viewport, can scroll horizontally
        this.cameras.main.setBounds(0, 0, WORLD_WIDTH, sizes.height);

        this.back = this.add.image(0, 0, "bg")
            .setOrigin(0, 0)
            .setScale(0.5);

        this.player = this.physics.add
            .image(100, sizes.height - 100, "basket")
            .setOrigin(0, 0);
        this.player.body.allowGravity = false;
        this.player.setCollideWorldBounds(true);
    }

    update() {
        const pointer = this.input.activePointer;
        const cam = this.cameras.main;

        // Scroll right when mouse near right edge
        if (pointer.x >= sizes.width - EDGE_ZONE) {
            const intensity = (pointer.x - (sizes.width - EDGE_ZONE)) / EDGE_ZONE;
            cam.scrollX += SCROLL_SPEED * intensity;
        }

        // Scroll left when mouse near left edge
        if (pointer.x <= EDGE_ZONE) {
            const intensity = (EDGE_ZONE - pointer.x) / EDGE_ZONE;
            cam.scrollX -= SCROLL_SPEED * intensity;
        }

        // Clamp so camera doesn't go out of world
        cam.scrollX = Phaser.Math.Clamp(
            cam.scrollX,
            0,
            WORLD_WIDTH - sizes.width
        );
    }
}

const config = {
    type: Phaser.WEBGL,
    width: sizes.width,
    height: sizes.height,
    canvas: document.getElementById('gameCanvas'),
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [GameScene]
};

const game = new Phaser.Game(config);