import Phaser from "phaser";

function connectNodes(graph, nodeList, scene) {
    for (const nodeId in graph) {
        const currentNode = nodeList[nodeId];
        const connectedNodes = graph[nodeId];

        connectedNodes.forEach(connectedNodeId => {
            const connectedNode = nodeList[connectedNodeId];
            const line = new Phaser.Geom.Line(
                currentNode.x,
                currentNode.y,
                connectedNode.x,
                connectedNode.y
            );
            const graphics = scene.add.graphics({ lineStyle: { width: 2, color: 0xff0000 } });
            graphics.strokeLineShape(line);
        });
    }
}

export default connectNodes;