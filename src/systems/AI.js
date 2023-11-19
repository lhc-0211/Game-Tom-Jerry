import { graph } from './GraphAndNodes';

export const heuristic = (node, target) => {
    // Kiểm tra xem node và target có tồn tại không
    if (node && target && node.x !== undefined && target.x !== undefined) {
        const dx = Math.abs(node.x - target.x);
        const dy = Math.abs(node.y - target.y);
        return dx + dy;
    } else {
        // Trả về một giá trị mặc định hoặc thực hiện xử lý phù hợp
        return 0;
    }
}

export const reconstructPath = (cameFrom, current) => {
    const totalPath = [current];
    while (cameFrom[current] !== undefined) {
        current = cameFrom[current];
        totalPath.unshift(current);
    }
    return totalPath;
}

export const findShortestPath = (startNode, endNode, tomNode) => {
    const path = aStar(graph, startNode, endNode, tomNode);
    // Trả về node tiếp theo trong đường đi ngắn nhất
    return path && Array.isArray(path) && path.length > 1 ? path[1] : null;
}

export const findNodesConnectedToTom = (graph, tomNode) => {
    const connectedNodes = Array.isArray(graph[tomNode]) ? [...graph[tomNode]] : [];

    return connectedNodes;
};

export const aStar = (graph, start, end, tomNode) => {
    console.log(start, end);
    const closedSet = [];
    const openSet = [start];
    const cameFrom = {};
    const fScore = {};
    const gScore = {};

    gScore[start] = 0;

    fScore[start] = heuristic(start, end);

    while (openSet.length > 0) {


        const current = findLowestFScore(openSet, fScore);
        if (current === end) {
            return reconstructPath(cameFrom, end);
        }

        openSet.splice(openSet.indexOf(current), 1);
        closedSet.push(current);

        const neighbors = Array.isArray(graph[current]) ? graph[current] : []
        for (const neighbor of neighbors) {
            if (closedSet.includes(neighbor) || neighbor === tomNode) {
                continue;
            }

            const tentativeGScore = gScore[current] + 1;
            if (!openSet.includes(neighbor) || tentativeGScore < gScore[neighbor]) {
                cameFrom[neighbor] = current;
                gScore[neighbor] = tentativeGScore;
                fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, end);
                if (!openSet.includes(neighbor)) {
                    openSet.push(neighbor);
                }
            } else if (openSet.includes(neighbor) && tentativeGScore < gScore[neighbor]) {
                // Nếu node đã có trong openSet và có chi phí thấp hơn, cập nhật thông tin
                gScore[neighbor] = tentativeGScore;
                fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, end);
            }
        }
    }

    // Không tìm thấy đường đi
    return null;
}

export const findLowestFScore = (openSet, fScore) => {
    if (openSet.length === 1) {
        return openSet[0];
    }

    let lowest = openSet[0];
    for (let i = 1; i < openSet.length; i++) {
        const current = openSet[i];
        if (fScore[current] < fScore[lowest] || (fScore[current] === fScore[lowest] && heuristic(current, lowest) < 0)) {
            lowest = current;
        }
    }
    return lowest;
};
