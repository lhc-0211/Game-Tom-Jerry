import Phaser from 'phaser';
import PlayScreen from './scenes/playScreen';

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-container',
    backgroundColor: '#282c34',
    scale: {
        mode: Phaser.Scale.RESIZE,
        width: window.innerWidth,
        height: window.innerHeight,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        },
    },
    scene: [Bootstrap, Game],
};

export default new Phaser.Game(config);
