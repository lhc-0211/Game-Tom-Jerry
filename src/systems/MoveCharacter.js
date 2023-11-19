
import Phaser from "phaser";

const createMoveCharacter = (scene, character, speed) => {
    const state = {
        scene,
        character,
        speed,
        targetNode: null,
        isMoving: false,
    };

    const moveCharacterToNode = (targetNode) => {
        if (!state.isMoving) {
            state.targetNode = targetNode;
            state.scene.physics.moveToObject(state.character, state.targetNode, state.speed, undefined, 0.1);
            state.isMoving = true;
        }
    };

    const update = () => {
        if (state.isMoving) {
            const distance = Phaser.Math.Distance.Between(state.character.x, state.character.y, state.targetNode.x, state.targetNode.y);
            if (distance < 10) {
                state.character.setPosition(state.targetNode.x, state.targetNode.y);
                state.character.body.setVelocity(0);
                state.isMoving = false;
            }
        }
    };




    return {
        moveCharacterToNode,
        update,
    };
};

export { createMoveCharacter };