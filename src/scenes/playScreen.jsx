import React, { useEffect, useRef } from 'react';
import * as Phaser from 'phaser';
import { useParams } from 'react-router-dom';
import './playScreen.scss';
import PlayGame from '../systems/PlayGame'
import Win from '../systems/Win'


export let globalMode = null;

const PlayScreen = () => {
    const gameContainer = useRef(null);
    const { mode } = useParams();

    useEffect(() => {
        globalMode = mode;
        const config = {
            type: Phaser.AUTO,
            width: 525,
            height: 290,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 }
                }
            },
            scene: [PlayGame, Win]
        };

        const game = new Phaser.Game(config);

        return () => {
            game.destroy(true);
        };
    }, [mode]);

    return <div ref={gameContainer} />;
};

export default PlayScreen;