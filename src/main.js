import './style.css'
import Phaser from 'phaser'

const canvas = document.getElementById("gameCanvas");

const sizes = {
    width: 500,
    height: 540
};

const WORLD_WIDTH = 1920;   // how wide your full scene is
const EDGE_ZONE = 80;       // px from edge that triggers scrolling
const SCROLL_SPEED = 6;     // px per frame

class GameScene extends Phaser.Scene {
    constructor(backgroundURL) {
        super("scene-game");
        this.cursorX;
        this.cursorY;

        this.backgroundURL = backgroundURL;
    }

    preload() {
        this.load.image("bg", this.backgroundURL);
    }

    create() {
        // Set world bounds — wide but locked vertically
        this.physics.world.setBounds(0, 0, WORLD_WIDTH, sizes.height, true, true, true, false);

        // Camera sees only the viewport, can scroll horizontally
        this.cameras.main.setBounds(0, 0, WORLD_WIDTH, sizes.height, true, true, true, false);

        this.add.image(0, 0, "bg")
            .setOrigin(0, 0)
            .setScale(0.5);

        this.cursorX = this.add.text(0, 0, "x: " + this.input.activePointer.x.toString(), {strokeThickness: 2});
        this.cursorY = this.add.text(0, 20,"y: " + this.input.activePointer.y.toString(), {strokeThickness: 2});
    }

    update() {
        const pointer = this.input.activePointer;
        const cam = this.cameras.main;

        this.cursorX.setText("x: " + Math.floor(this.input.activePointer.x.toString()));
        this.cursorY.setText("y: " + Math.floor(this.input.activePointer.y.toString()));

        this.cursorX.x = cam.scrollX + 10;
        this.cursorY.x = cam.scrollX + 10;


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

class Room extends GameScene {
    constructor(sceneName,backgroundURL, doorInfo) {
        super({ key: sceneName}, backgroundURL);
        this.doorInfo = doorInfo;
    }

    preload() {
        for (const door in this.doorInfo) {
            this.load.image(door.name, door.url);
        }
    }

    update() {
        for (const door in this.doorInfo) {
            this.add.image()
        }
    }
}


const Room1 = new Room("Room_1", "assets/bg_1.png");
const Room2 = new Room("Room_2", "assets/bg_2.png");

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
    scene: [Room1, Room2]
};

const game = new Phaser.Game(config);