import './style.css'
import Phaser from 'phaser'

const sizes = {
    width: 500,
    height: 540
};

const WORLD_WIDTH = 1920;   // how wide your full scene is
const EDGE_ZONE = 80;       // px from edge that triggers scrolling
const SCROLL_SPEED = 6;     // px per frame

class GameScene extends Phaser.Scene {
    constructor() {
        super("scene-game");
        this.cursorX;
        this.cursorY;
    }

    preload() {
        this.load.image("bg", "assets/bg_2.png");
        this.load.image("basket", "assets/basket.png");
    }

    create() {
        // Set world bounds — wide but locked vertically
        this.physics.world.setBounds(0, 0, WORLD_WIDTH, sizes.height, true, true, true, false);

        // Camera sees only the viewport, can scroll horizontally
        this.cameras.main.setBounds(0, 0, WORLD_WIDTH, sizes.height, true, true, true, false);

        this.add.image(0, 0, "bg")
            .setOrigin(0, 0)
            .setScale(0.5);

        this.cursorX = this.add.text(0, 0, this.input.activePointer.x.toString());
        this.cursorY = this.add.text(0, 20, this.input.activePointer.y.toString());
    }

    update() {
        const pointer = this.input.activePointer;
        const cam = this.cameras.main;

        this.cursorX.setText(this.input.activePointer.x.toString());
        this.cursorY.setText(this.input.activePointer.y.toString());

        // Scroll right when mouse near right edge
        if (pointer.x >= sizes.width - EDGE_ZONE && cam.scrollX <= sizes.width - EDGE_ZONE) {
            const intensity = (pointer.x - (sizes.width - EDGE_ZONE)) / EDGE_ZONE;
            cam.scrollX += SCROLL_SPEED * intensity;
        }

        // Scroll left when mouse near left edge
        if (pointer.x <= EDGE_ZONE) {
            const intensity = (EDGE_ZONE - pointer.x) / EDGE_ZONE;
            cam.scrollX -= SCROLL_SPEED * intensity;
        }
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