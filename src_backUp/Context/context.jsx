import { createContext } from 'react';

const appContext = createContext({
    nodes: {},
    edges: {},
    edgeMode: false,
    mousePosition: {x: 0, y: 0},
    directedGraph: false,
    queueItems: [],
    processingItem: 0,
    addAllNodes: () => {},
    addAllEdges: () => {},
    addNode: () => {},
    addEdge: () => {},
    addQueueItems: () => {},
    setEdgeMode: () => {},
    setDirectedGraph: () => {},
    setMousePosition: () => {},
    setQueueItems: () => {},
    setProcessingItem: () => {},
});