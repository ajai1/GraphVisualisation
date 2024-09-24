import { createContext, useState } from 'react';

export const AppContext = createContext({
    nodes: {},
    edges: {},
    edgeMode: false,
    mode: 'input',
    mousePosition: { x: 0, y: 0 },
    directedGraph: false,
    queueItems: [],
    processingItem: 0,
    setCanvas: () => { },
    addAllNodes: () => { },
    addAllEdges: () => { },
    addNode: () => { },
    addEdge: () => { },
    setEdgeMode: () => { },
    setDirectedGraph: () => { },
    setMousePosition: () => { },
    setQueueItems: () => { },
    setProcessingItem: () => { },
    setNodesToProcess: () => { },
    setStackItems: () => { },
    setVisited: () => { },
    setNodeList: () => { },
    setProcessingEdges: () => { }
});

export default function AppContextProvider({ children }) {
    const [nodes, setNodes] = useState({});
    const [edges, setEdges] = useState({});
    const [processingEdges, setProcessingEdges] = useState({});
    const [edgeMode, setEdgeMode] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [directedGraph, setDirectedGraph] = useState(true);
    const [queueItems, setQueueItems] = useState([]);
    const [stackItems, setStackItems] = useState([]);
    const [processingItem, setProcessingItem] = useState(3);
    const [nodesToProcess, setNodesToProcess] = useState([]);

    
    let visited = [];
    const setVisited = (v) => {
        visited = v;
    }
    let nodesList = [];
    const setNodeList = (list) => {
        nodesList = list;
    }

    const [canvas, setCanvas] = useState({
        width: window.innerWidth - 5,
        height: window.innerHeight - 400
    });

    const addAllNodes = (nodes) => {
        setNodes(nodes);
    }

    const addAllEdges = (edges) => {
        setEdges(edges);
    }

    const addNode = (label, x, y) => {
        if (nodes[label]) {
            alert('Node already exists');
            return;
        };
        const allNodes = {
            ...nodes,
            [label]: {
                id: label,
                label: label,
                x: x,
                y: y
            }
        };
        setNodes(allNodes);
    };

    const addEdge = (from, to) => {
        if (!nodes[from] || !nodes[to]) {
            alert("Node does not exist can't create edge");
            return;
        }
        const allEdges = { ...edges };
        if (allEdges[from]) {
            allEdges[from].push(to);
        } else {
            allEdges[from] = [to];
        }
        setEdges(allEdges);
    };

    const context = {processingEdges, setProcessingEdges, visited, setVisited, nodesList, setNodeList, nodesToProcess, setNodesToProcess, canvas, setCanvas, nodes, setNodes, edges, setEdges, edgeMode, mousePosition, directedGraph, queueItems,setQueueItems,stackItems, setStackItems, processingItem, setProcessingItem, addAllNodes, addAllEdges, addNode, addEdge, setEdgeMode, setDirectedGraph, setMousePosition }
    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    )
}