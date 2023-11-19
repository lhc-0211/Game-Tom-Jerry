// Assuming winner.js
import Phaser from 'phaser';
import React from 'react';
import ReactDOM from 'react-dom';
import Win from '../scenes/client/winner'

class WinScene extends Phaser.Scene {
    constructor() {
        super({ key: 'Win' });
    }

    create() {
        const container = this.add.container(0, 0);

        // Render the React component into the Phaser container
        ReactDOM.render(
            <React.StrictMode>
                <Win />
            </React.StrictMode>,
            container.node
        );
    }
}

export default WinScene;
