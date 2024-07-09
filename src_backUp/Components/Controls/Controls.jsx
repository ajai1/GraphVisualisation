import React, { useState } from 'react';
import './Controls.css';
import { parseAndAddAllEdges } from './ControlsUtils';

const Controls = ({nodes, edges, addNode, addAllNodes, addEdge, addAllEdges, edgeMode, setEdgeMode, directedGraph, setDirectedGraph }) => {
    const [newNodeLabel, setNewNodeLabel] = useState(0);
    const [newEdgeFrom, setNewEdgeFrom] = useState('');
    const [newEdgeTo, setNewEdgeTo] = useState('');
    const [allEdges, setAllEdges] = useState('');

    return (
        <div>
            <div className='edgeNodesInput'>
                <h3>Add Node</h3>
                <input
                    type="text"
                    placeholder="Node Label"
                    value={newNodeLabel}
                    onChange={(e) => setNewNodeLabel(e.target.value)}
                />
                <button onClick={() => addNode(newNodeLabel, Math.random() * 800, Math.random() * 600)}>Add Node</button>
            </div>
            <div>
                <h3>Add Edge</h3>
                <div>
                    <div>
                        <input
                            type="checkbox"
                            checked={edgeMode}
                            name='edgeMode'
                            onChange={() => setEdgeMode(!edgeMode)}
                        />
                        <label htmlFor="edgeMode">Add Edge Mode</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            checked={directedGraph}
                            name='directedGraph'
                            onChange={() => setDirectedGraph(!directedGraph)}
                        />
                        <label htmlFor="directedGraph">Directed Graph</label>
                    </div>

                </div>
                <div className='edgeNodesInput'>
                    <input
                        type="text"
                        placeholder="From Node ID"
                        value={newEdgeFrom}
                        onChange={(e) => setNewEdgeFrom(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="To Node ID"
                        value={newEdgeTo}
                        onChange={(e) => setNewEdgeTo(e.target.value)}
                    />
                    <button onClick={() => addEdge(newEdgeFrom, newEdgeTo)}>Add Edge</button>
                </div>
                <div className='edgeNodesInput'>
                    <input
                        type="text"
                        placeholder="Add all edges"
                        value={allEdges}
                        onChange={(e) => setAllEdges(e.target.value)}
                    />
                    <button onClick={() => parseAndAddAllEdges(allEdges, nodes, edges, addAllNodes, addAllEdges, directedGraph)}>Add all edges</button>
                </div>


            </div>
        </div>
    );
};

export default Controls;



/* 

function parseAndAddAllEdges2 (allEdges) {
    const parsedEdges = JSON.parse(allEdges);
    const availableNodes = {...nodes};
    const availableEdges = {...edges};
    for(let edge of parsedEdges) {
        if(directedGraph){
            if(nodes[edge[0]]){
                if(nodes[edge[1]]){
                    if(availableEdges[edge[0]]){
                        availableEdges[edge[0]].push(edge[1]);
                    }else{
                        availableEdges[edge[0]] = [edge[1]];
                    }
                }else{
                    availableNodes[edge[1]] = {
                        id: edge[1],
                        label: edge[1],
                        x: Math.random() * 800,
                        y: Math.random() * 600
                    };
                    if(availableEdges[edge[0]]){
                        availableEdges[edge[0]].push(edge[1]);
                    }else{
                        availableEdges[edge[0]] = [edge[1]];
                    }
                }
            }else{
                availableNodes[edge[0]] = {
                    id: edge[0],
                    label: edge[0],
                    x: Math.random() * 800,
                    y: Math.random() * 600
                }
                if(nodes[edge[1]]){
                    if(availableEdges[edge[0]]){
                        availableEdges[edge[0]].push(edge[1]);
                    }else{
                        availableEdges[edge[0]] = [edge[1]];
                    }
                }else{
                    availableNodes[edge[1]] = {
                        id: edge[1],
                        label: edge[1],
                        x: Math.random() * 800,
                        y: Math.random() * 600
                    };
                    if(availableEdges[edge[0]]){
                        availableEdges[edge[0]].push(edge[1]);
                    }else{
                        availableEdges[edge[0]] = [edge[1]];
                    }
                }
            }
        }else{
            let nodeAvailable = nodes[edge[0]] ? 0 : nodes[edge[1]] ? 1 : null;
            if(nodeAvailable == 0){
                if(nodes[edge[1]]){
                    if(availableEdges[edge[0]]){
                        availableEdges[edge[0]].push(edge[1]);
                    }else{
                        availableEdges[edge[0]].push(edge[1]);
                    }
                }else{
                    availableNodes[edge[1]] = {
                        id: edge[1],
                        label: edge[1],
                        x: Math.random() * 800,
                        y: Math.random() * 600
                    };
                    if(availableEdges[edge[0]]){
                        availableEdges[edge[0]].push(edge[1]);
                    }else{
                        availableEdges[edge[0]] = [edge[1]];
                    }
                }
            }else if(nodeAvailable == 1){
                if(nodes[edge[0]]){
                    if(availableEdges[edge[1]]){
                        availableEdges[edge[1]].push(edge[0]);
                    }else{
                        availableEdges[edge[1]] = [edge[0]];
                    }
                }else{
                    availableNodes[edge[0]] = {
                        id: edge[0],
                        label: edge[0],
                        x: Math.random() * 800,
                        y: Math.random() * 600
                    };
                    if(availableEdges[edge[1]]){
                        availableEdges[edge[1]].push(edge[0]);
                    }else{
                        availableEdges[edge[1]] = [edge[0]];
                    }
                }
            }else{
                availableNodes[edge[0]] = {
                    id: edge[0],
                    label: edge[0],
                    x: Math.random() * 800,
                    y: Math.random() * 600
                }
                availableNodes[edge[1]] = {
                    id: edge[1],
                    label: edge[1],
                    x: Math.random() * 800,
                    y: Math.random() * 600
                };
                if(availableEdges[edge[0]]){
                    availableEdges[edge[0]].push(edge[1]);
                }else{
                    availableEdges[edge[0]] = [edge[1]];
                }
            }
        }
    }
    addAllNodes(availableNodes);
    addAllEdges(availableEdges);
}
 */