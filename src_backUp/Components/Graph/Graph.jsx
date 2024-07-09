// src/components/Graph.js
import React, { useRef, useEffect, useState } from 'react';
import { drawEdges, drawNode, highlightNode } from './CanvasFunctions';
import { distance } from './CanvasUtils';

const Graph = ({ nodes, edges, setNodes, addEdge, edgeMode, setMousePosition, directedGraph}) => {
    const canvasRef = useRef(null);
    const [draggedNode, setDraggedNode] = useState(null);
    const [startNewEdge, setStartNewEdge] = useState();

    function drawGraph(){
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw edges
        Object.entries(edges).forEach(([from, toNodes]) => {
            const fromNode = nodes[from];
            toNodes.forEach(to => {
                const toNode = nodes[to];
                drawEdges(fromNode.x, fromNode.y, toNode.x, toNode.y, ctx, directedGraph);
            });
        });

        // Draw nodes
        Object.entries(nodes).forEach(([key, nodeValue])=> {
            drawNode(nodeValue, ctx);
        });
    }

    useEffect(() => {
        drawGraph();
    }, [nodes, edges]);

    useEffect(() => {
        if(!edgeMode){
            const allNodes = {...nodes};
            if(startNewEdge){
                allNodes[startNewEdge[0]] = {...startNewEdge[1], isHighlighted:false};
            }
            setNodes(allNodes);
            setStartNewEdge(null);
        }
    }, [edgeMode, directedGraph])

    const handleMouseDown = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const node = Object.entries(nodes).find(([key, nodeValue]) => distance(nodeValue.x, nodeValue.y, x, y) <= 30);
        if (node) {
            if(edgeMode){
                const allNodes = {...nodes};
                if(startNewEdge){
                    if((edges[startNewEdge[0]] && edges[startNewEdge[0]].includes(node[0])) || (edges[node[0]] && edges[node[0]].includes(startNewEdge[0]))){
                        return;
                    }
                    addEdge(startNewEdge[0], node[0]);
                    allNodes[startNewEdge[0]] = {...startNewEdge[1], isHighlighted:false};
                }
                drawGraph();
                allNodes[node[0]] = {...node[1], isHighlighted: true};
                setNodes(allNodes);
                setStartNewEdge(node);
            }
            setDraggedNode(node[1]);
        }
    };

    const handleMouseMove = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({x, y})
        if (!edgeMode && draggedNode) {
            const allNodes = {...nodes, [draggedNode.id] : {...draggedNode, x, y}};
            setNodes(allNodes);
        }
    };

    const handleMouseUp = () => {
        setDraggedNode(null);
    };

    return (
        <canvas
            ref={canvasRef}
            width={window.innerWidth - 200}
            height={window.innerHeight - 300}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        />
    );
};

export default Graph;
