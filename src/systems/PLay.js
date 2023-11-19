import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';
import bgImage from '../assets/img/bg_playgame.jpg';
import imgTom from '../assets/img/tom_be2af94.png';
import imgJerry from '../assets/img/king_076311f.png';
import house from '../assets/img/house.png';
import connectNodes from './ConnectNode';
import { createMoveCharacter } from './MoveCharacter';
import { graph, nodes } from './GraphAndNodes';

const PLay = () => {
    const [houseNode, setHouseNode] = useState(6);
    const [tomNode, setTomNode] = useState(4);
    const [jerryNode, setJerryNode] = useState(4);
    const [currentCharacter, setCurrentCharacter] = useState('jerry');
    const [nodeConnections, setNodeConnections] = useState({});
    const [isTomMoving, setIsTomMoving] = useState(false);
    const [isJerryMoving, setIsJerryMoving] = useState(false);
    const [targetNode, setTargetNode] = useState(null);
    const [nodeList, setNodeList] = useState({});

    const preload = (scene) => {
        scene.load.image('background', bgImage);
        scene.load.image('tom', imgTom);
        scene.load.image('jerry', imgJerry);
        scene.load.image('house', house);
    };

    const create = (scene) => {

        scene.add.image(525 / 2, 290 / 2, 'background').setDisplaySize(525, 290);
        scene.speed = 200;

        const graphData = graph
        const nodeSize = 10;

        // Tạo các node và lưu trữ chúng vào mảng nodeList
        for (const nodeId in graphData) {
            const node = scene.add.circle(0, 0, nodeSize, 0xff0000);
            scene.nodeList[nodeId] = node;
        }

        setNodeList(prevNodeList => ({
            ...prevNodeList,
            1: { x: 100, y: 100 },
            2: { x: 180, y: 60 },
            3: { x: 340, y: 80 },
            4: { x: 280, y: 220 },
            5: { x: 180, y: 220 },
            6: { x: 420, y: 160 }
        }));

        scene.nodeConnections = graphData; // Gán giá trị của đối tượng graphData vào nodeConnections
        scene.nodeList = graphData;
        scene.tomNode = tomNode;
        scene.jerryNode = jerryNode;

        connectNodes(graphData, scene.nodeList, this);

        const startingHouseNode = scene.nodeList[houseNode];
        scene.house = scene.physics.add.sprite(startingHouseNode.x, startingHouseNode.y - 20, 'house').setDisplaySize(80, 120);
        scene.house.setCollideWorldBounds(true);

        const startingNode = scene.nodeList[tomNode];
        scene.tom = scene.physics.add.sprite(startingNode.x, startingNode.y, 'tom').setDisplaySize(25, 60);
        scene.tom.setCollideWorldBounds(true);

        const startingJerryNode = scene.nodeList[jerryNode];
        scene.jerry = scene.physics.add.sprite(startingJerryNode.x, startingJerryNode.y, 'jerry').setDisplaySize(25, 60);
        scene.jerry.setCollideWorldBounds(true);

        scene.moveCharacter = createMoveCharacter(scene, scene.tom, scene.speed);
        scene.moveJerry = createMoveCharacter(scene, scene.jerry, scene.speed);

        // Xác định sự kiện 'pointerup' cho các node
        for (const nodeId in scene.nodeList) {
            if (graphData.hasOwnProperty(nodeId)) {
                const node = scene.nodeList[nodeId];
                node.setInteractive();
                node.on('pointerup', () => {
                    const adjacentNodes = scene.nodeConnections[nodeId];
                    if (
                        currentCharacter === 'tom' &&
                        adjacentNodes.includes(parseInt(scene.tomNode)) &&
                        !isTomMoving
                    ) {
                        scene.moveCharacter.moveCharacterToNode(scene.nodeList[nodeId]);
                        scene.tomNode = nodeId;
                        setCurrentCharacter('jerry'); // Switch turn to Jerry
                        setIsTomMoving(true); // Update isTomMoving when Tom starts moving
                    } else if (
                        currentCharacter === 'jerry' &&
                        adjacentNodes.includes(parseInt(scene.jerryNode)) &&
                        !isJerryMoving
                    ) {
                        scene.moveJerry.moveCharacterToNode(scene.nodeList[nodeId]);
                        scene.jerryNode = nodeId;
                        setCurrentCharacter('tom'); // Switch turn to Tom
                        setIsJerryMoving(true); // Update isJerryMoving when Jerry starts moving
                    }
                });
            }
        }
    }
    const update = (scene) => {
        scene.moveCharacter.update();
        scene.moveJerry.update();
        // Kiểm tra xem hộp va chạm của Tom và Jerry có chồng lấn
        if (Phaser.Geom.Intersects.RectangleToRectangle(scene.tom.getBounds(), scene.jerry.getBounds())) {
            this.scene.switch('VictoryScreen');
        }

        // Kiểm tra xem hộp va chạm của Jerry và House có chồng lấn
        if (Phaser.Geom.Intersects.RectangleToRectangle(scene.jerry.getBounds(), scene.house.getBounds())) {
            this.scene.switch('VictoryScreen');
        }
    };

    const displayWinMessage = (message) => {
        console.log(message);
    };

    return (
        <div></div>
    )
};

export default PLay;