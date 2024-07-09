function addNodeIfNeeded(nodeId, availableNodes) {
    if (!availableNodes[nodeId]) {
        availableNodes[nodeId] = {
            id: nodeId,
            label: nodeId,
            x: Math.random() * 800,
            y: Math.random() * 600
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

export function parseAndAddAllEdges(allEdges, nodes, edges, addAllNodes, addAllEdges, directedGraph) {
    const parsedEdges = JSON.parse(allEdges);
    const availableNodes = { ...nodes };
    const availableEdges = { ...edges };

    for (let edge of parsedEdges) {
        const [source, target] = edge;

        // Ensure both nodes exist
        addNodeIfNeeded(source, availableNodes);
        addNodeIfNeeded(target, availableNodes);

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