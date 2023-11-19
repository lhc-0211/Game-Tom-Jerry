
import Phaser from "phaser";
import bgImage from '../assets/img/bg_playgame.jpg';
import imgTom from '../assets/img/tom_be2af94.png';
import imgJerry from '../assets/img/king_076311f.png';
import house from '../assets/img/house.png';

import connectNodes from './ConnectNode';
import { createMoveCharacter } from './MoveCharacter';
import { graph } from './GraphAndNodes';
import { globalMode } from '../scenes/playScreen';

import { findShortestPath } from './AI';

import Win from '../scenes/client/winner'


class PlayGame extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayGame' });
        this.currentCharacter = globalMode;
        this.nodeConnections = {};
        this.isTomMoving = false;
        this.targetNode = null;
        this.nodeList = {};
        this.mode = '2player';
        this.AI = false;
    }

    preload() {
        this.load.image('background', bgImage);
        this.load.image('tom', imgTom);
        this.load.image('jerry', imgJerry);
        this.load.image('house', house);
    }

    create() {
        if (this.currentCharacter && this.currentCharacter === 'jerry') {
            this.mode = 'tom';
            this.AI = true;
            this.makeAIMove();
        } else if (this.currentCharacter && this.currentCharacter === 'tom') {
            this.mode = 'jerry';
            this.AI = true;
            this.makeAIMove();
        } else if (this.currentCharacter && this.currentCharacter === '2player') {
            this.mode = '2player';
        }
        this.add.image(525 / 2, 290 / 2, 'background').setDisplaySize(525, 290);
        this.speed = 200;

        const graphData = graph;
        const nodeSize = 10;

        // Tạo các node và lưu trữ chúng vào mảng nodeList
        for (const nodeId in graphData) {
            const node = this.add.circle(0, 0, nodeSize, 0xff0000);
            this.nodeList[nodeId] = node;
        }

        const node1 = this.nodeList[1];
        const node2 = this.nodeList[2];
        const node3 = this.nodeList[3];
        const node4 = this.nodeList[4];
        const node5 = this.nodeList[5];
        const node6 = this.nodeList[6];
        const node7 = this.nodeList[7];
        const node8 = this.nodeList[8];
        const node9 = this.nodeList[9];
        const node10 = this.nodeList[10];
        const node11 = this.nodeList[11];

        node1.x = 100;
        node1.y = 100;
        node2.x = 130;
        node2.y = 180;
        node3.x = 230;
        node3.y = 140;
        node4.x = 200;
        node4.y = 60;
        node5.x = 240;
        node5.y = 240;
        node6.x = 300;
        node6.y = 130;
        node7.x = 300;
        node7.y = 60;
        node8.x = 380;
        node8.y = 100;
        node9.x = 370;
        node9.y = 180;
        node10.x = 360;
        node10.y = 230;
        node11.x = 460;
        node11.y = 200;

        this.nodeConnections = graphData; // Gán giá trị của đối tượng graphData vào nodeConnections

        connectNodes(graphData, this.nodeList, this);

        this.houseNode = 11;
        const startingHouseNode = this.nodeList[this.houseNode];
        this.house = this.physics.add.sprite(startingHouseNode.x, startingHouseNode.y - 20, 'house').setDisplaySize(1, 1);
        this.house.setCollideWorldBounds(true);

        this.tomNode = 10;
        const startingNode = this.nodeList[this.tomNode];
        this.tom = this.physics.add.sprite(startingNode.x, startingNode.y, 'tom').setDisplaySize(25, 60);
        this.tom.setCollideWorldBounds(true);

        this.jerryNode = 1;
        const startingJerryNode = this.nodeList[this.jerryNode];
        this.jerry = this.physics.add.sprite(startingJerryNode.x, startingJerryNode.y, 'jerry').setDisplaySize(20, 40);
        this.jerry.setCollideWorldBounds(true);

        this.moveTom = createMoveCharacter(this, this.tom, this.speed); // Tạo instance cho Tom
        this.moveJerry = createMoveCharacter(this, this.jerry, this.speed); // Tạo instance cho Jerry

        if (this.currentCharacter === '2player')
            for (const nodeId in this.nodeList) {
                if (this.nodeList.hasOwnProperty(nodeId)) {
                    const node = this.nodeList[nodeId];
                    node.setInteractive();
                    node.on('pointerup', () => {
                        this.handleNodeClick(nodeId);
                    });
                }
            }
    }

    makeAIMove() {
        if (this.AI && this.mode === 'tom') {
            const targetNode = findShortestPath(parseInt(this.tomNode), parseInt(this.jerryNode));
            // Thực hiện hàm này để xác định node mục tiêu cho Tom
            if (targetNode) {
                this.moveTom.moveCharacterToNode(this.nodeList[targetNode]);
                this.tomNode = targetNode;
                this.AI = false;
                this.currentCharacter = 'jerry';
            }
            if (!this.AI && this.currentCharacter === 'jerry') {
                for (const nodeId in this.nodeList) {
                    if (this.nodeList.hasOwnProperty(nodeId)) {
                        const node = this.nodeList[nodeId];
                        node.setInteractive();
                        node.on('pointerup', () => {
                            this.handleNodeClick(nodeId);
                        });
                    }
                }
            } else if (this.AI && this.mode === 'jerry') {
                // AI điều khiển Jerry
                this.makeAIMove();
            }
        } else if (this.AI && this.mode === 'jerry') {

            const nodeTom = this.tomNode
            const targetNode = findShortestPath(parseInt(this.jerryNode), parseInt(this.houseNode), parseInt(nodeTom));
            if (targetNode) {
                this.moveJerry.moveCharacterToNode(this.nodeList[targetNode]);
                this.jerryNode = targetNode;
                this.AI = false;
                this.currentCharacter = 'tom';
            }
            if (!this.AI && this.currentCharacter === 'tom') {
                for (const nodeId in this.nodeList) {
                    if (this.nodeList.hasOwnProperty(nodeId)) {
                        const node = this.nodeList[nodeId];
                        node.setInteractive();
                        node.on('pointerup', () => {
                            this.handleNodeClick(nodeId);
                        });
                    }
                }
            } else if (this.AI && this.mode === 'tom') {
                // AI điều khiển Tom
                this.makeAIMove();
            }
        }
    }

    handleNodeClick(nodeId) {
        const adjacentNodes = this.nodeConnections[nodeId];
        if (this.AI === false && this.currentCharacter === 'tom' && adjacentNodes.includes(parseInt(this.tomNode))) {
            this.moveTom.moveCharacterToNode(this.nodeList[nodeId]);
            this.tomNode = nodeId;
            this.currentCharacter = 'jerry'; // Chuyển lượt cho Jerry
            this.action = 'jerry';

            if (this.mode !== '2player')
                setTimeout(() => {
                    this.AI = true;
                    this.makeAIMove();
                }, 1000);
        } else if (this.AI === false && (this.currentCharacter === '2player' || this.currentCharacter === 'jerry') && adjacentNodes.includes(parseInt(this.jerryNode))) {
            this.moveJerry.moveCharacterToNode(this.nodeList[nodeId]);
            this.jerryNode = nodeId;
            this.currentCharacter = 'tom'; // Chuyển lượt cho Tom
            this.action = 'tom';

            if (this.mode !== '2player')
                setTimeout(() => {
                    this.AI = true;
                    this.makeAIMove();
                }, 1000);
        }
    }


    update() {
        this.moveTom.update();
        this.moveJerry.update();

        if (Phaser.Geom.Intersects.RectangleToRectangle(this.tom.getBounds(), this.jerry.getBounds()) && this.tomNode == this.jerryNode) {
            this.displayWinMessage('Tom Wins!');
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(this.jerry.getBounds(), this.house.getBounds()) && this.houseNode == this.jerryNode) {
            this.displayWinMessage('Jerry Wins!');
        }

        this.makeAIMove();
    }

    displayWinMessage(message) {
        console.log(message);
        this.scene.pause();
    }
}

export default PlayGame;