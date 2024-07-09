/*
    onClick of start button, will initialise the DFS algo, 
    Number of nodes array will be sorted and the first node will be added to the stack, and visited set
    while stack is not empty
    process the stack node
    loop through the connected nodes, if the node is not visited add to stack and break the loop
*/
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../Context/context';
import './algoControls.css';
const DFSAlgoControls = () => {

    const { processingEdges, setProcessingEdges, nodes, setNodes, edges, stackItems, setStackItems, processingItem, setProcessingItem } = useContext(AppContext);
    const visited = useRef([]);
    const nodesList = useRef([]);

    const getVisited = () => visited.current;
    const setVisited = (items) => {
        visited.current = items;
    };
    const getNodeList = () => nodesList.current;
    const setNodeList = (nodeList) => {
        nodesList.current = nodeList
    };

    const addStackItems = () => {
        let sItems = [...stackItems];
        sItems = sItems.reverse();
        if (stackItems.length <= 0) {
            return <div>Stack Empty</div>
        }
        return (
            <>
                <div>Stack Contains</div>
                <div className='stack_items_container'>
                    {sItems.map((item, index) => {
                        return <span className={`stack_item ${index == 0 && `processing`}`} key={index}>{item}</span>
                    })}
                </div>
            </>
        )
    }

    const addVisitedItems = () => {
        if (getVisited().length <= 0) {
            return <div>Not Visited Yet</div>
        }
        return (
            <>
                <div>Visited Contains</div>
                <div className='queue_items_container'>
                    {getVisited().map((item, index) => {
                        return <span className={`queue_item`} key={index}>{item}</span>
                    })}
                </div>
            </>
        )
    }
    

    const initialiseDFS = () => {
        setVisited([]);
        setStackItems([]);
        setProcessingEdges({});
        if (nodes.length == 0 && stackItems.length == 0) {
            alert('No Nodes to Process');
            return;
        }
        let pNodes = {...nodes};

        if (stackItems.length == 0) {
            let allnodes = [];
            Object.entries(nodes).forEach(([key, node]) => {
                pNodes[key] = {
                    ...node,
                    isHighlighted: false
                }
                allnodes.push(node.label);
            })
            allnodes.sort((a, b) => a - b);
            const node = allnodes.shift();
            setStackItems([node]);
            pNodes[node] = {
                ...pNodes[node],
                isHighlighted: true
            }
            setNodes(pNodes);
            setNodeList(allnodes);
        }
    }

    const addUnVisitedNodes = (stack, currentlyVisited) => {
        let allnodes = [...getNodeList()];
        while (currentlyVisited.includes(allnodes[0])) {
            allnodes.shift();
        }
        let node = allnodes.shift();
        setNodes((nodes) => {
            return {
                ...nodes,
                [node]: {
                    ...nodes[node],
                    isHighlighted: true
                }
            }
        })
        stack.push(node);
        setNodeList(allnodes);
        return stack;
    }

    const addProcessingEdges = (from, to) => {
        let pEdges = { ...processingEdges };
        if(pEdges[from]){
            pEdges[from].push(to);
        }else{
            pEdges[from] = [to];
        }
        setProcessingEdges(pEdges);
    }

    //Issue on processNodes
    const processNodes = () => {
        let stack = [...stackItems];
        if (stack.length == 0 && nodesList.length <= 0) {
            alert('No Nodes to Process');
            return;
        }
        else {
            let currentlyVisited = [...getVisited()];
            if (stack.length == 0) {
                stack = addUnVisitedNodes(stack, currentlyVisited);
            } else {
                let currentIndex = stack.length - 1;
                let current = stack[currentIndex];
                if (!currentlyVisited.includes(current)) {
                    currentlyVisited.push(current);
                }
                let d = new Date();
                while (d && (new Date() - d) < 500) {
                    const connectedNodes = edges[current];
                    let visitedCount = 0;
                    if (connectedNodes) {
                        for (let i = 0; i < connectedNodes.length; i++) {
                            if (currentlyVisited.includes(connectedNodes[i])) {
                                visitedCount++;
                                continue;
                            } else if (!stack.includes(connectedNodes[i])) {
                                stack.push(connectedNodes[i]);
                                setNodes((nodes) => {
                                    return {
                                        ...nodes,
                                        [connectedNodes[i]]: {
                                            ...nodes[connectedNodes[i]],
                                            isHighlighted: true
                                        }
                                    }
                                });
                                addProcessingEdges(current, connectedNodes[i]);
                                d = null;
                                break;
                            }
                        }
                    }
                    if (!connectedNodes || visitedCount == connectedNodes.length) {
                        stack.splice(currentIndex, 1);
                        d = null;
                    }
                }
            }
            setVisited(currentlyVisited);
            setStackItems(stack);
        }
    }

    return (
        <div className='stack_container'>
            <div className='dfs_traversal'>
                <div className='dfs_stack'>
                    {addStackItems()}
                </div>
                <div>
                    {addVisitedItems()}
                </div>
            </div>
            <div className='dfs_controls'>
                <button className='traversal_button' onClick={initialiseDFS}>Start DFS</button>
                <button className='traversal_button' onClick={processNodes}>Next</button>
            </div>
        </div>
    );
};

export default DFSAlgoControls;