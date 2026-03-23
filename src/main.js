import './style.css'
import Phaser from 'phaser'

const sizes = {
    width: 500,
    height: 500
};

const config = {
    type: Phaser.WEBGL,
    width: sizes.width,
    height: sizes.height,
    canvas: gameCanvas
};

const game = new Phaser.Game(config);

class GameScene extends Phaser.Scene {
    constructor() {
        super("scene-game");
    }

    preload() {
        this.load.image("bg", "/assets/back_1.png");
        this.load.image("enemy_1", "/assets/visitor_1.png");
    }

    create() {
        this.add.image(0, 0, "bg").setOrigin(0, 0);
        this.add.image(0, 0, "enemy_1").setOrigin(0, 0);
    }

    update() {}
}
