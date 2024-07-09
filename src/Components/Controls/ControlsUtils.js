function addNodeIfNeeded(nodeId, availableNodes, canvas) {
    if (!availableNodes[nodeId]) {
        let randomX = Math.random() * canvas.width - 30;
        let randomY = Math.random() * canvas.height - 30;
        if(randomX < 0) randomX = 30;
        if(randomX > canvas.width) randomX = canvas.width - 32;
        if(randomY < 0) randomY = 30;
        if(randomY > canvas.height) randomY = canvas.height - 32;
        availableNodes[nodeId] = {
            id: nodeId,
            label: nodeId,
            x: randomX,
            y: randomY
        };
    }
}

function addEdge(source, target, availableEdges) {
    if (availableEdges[source]) {
        availableEdges[source].push(target);
    } else {
        availableEdges[source] = [target];
    }
}

export function parseAndAddAllEdges(allEdges, nodes, edges, addAllNodes, addAllEdges, directedGraph, canvas) {
    const parsedEdges = JSON.parse(allEdges);
    const availableNodes = { ...nodes };
    const availableEdges = { ...edges };

    for (let edge of parsedEdges) {
        const [source, target] = edge;

        // Ensure both nodes exist
        addNodeIfNeeded(source, availableNodes, canvas);
        addNodeIfNeeded(target, availableNodes, canvas);

        // Add edge
        if (directedGraph) {
            addEdge(source, target, availableEdges);
        } else {
            // For undirected graphs, add edges in both directions
            addEdge(source, target, availableEdges);
            addEdge(target, source, availableEdges);
        }
    }

    addAllNodes(availableNodes);
    addAllEdges(availableEdges);
}