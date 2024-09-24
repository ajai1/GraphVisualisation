/*
    onClick of start button
    If not completed and nothing on the queueItems array, then sort all nodes and pick the first one
    InsertInto the queueItems array
    onClick of next button,
    if queueItems is empty then set completed to true and return
    remove the first element from queueItems array, change it to processing
    take the processing node and Get all connected nodes and insert into the queueItems array
*/

import React, {useContext, useEffect, useState} from 'react';
import { AppContext } from '../../Context/context';
import './algoControls.css';
const BFSAlgoControls = () => {

    const { processingEdges, setProcessingEdges, nodesToProcess, setNodesToProcess, nodes, setNodes, edges, queueItems,setQueueItems, processingItem} = useContext(AppContext);
    
    const [visited, setVisited] = useState([]);

    const addQueueItems = () => {
      if (queueItems.length <= 0) {
          return <div>Queue Empty</div>
      }
      return (
          <>
              <div>Queue Contains</div>
              <div className='queue_items_container'>
                  {queueItems.map((item, index) => {
                      return <span className={`queue_item ${index == 0 && `processing`}`} key={index}>{item}</span>
                  })}
              </div>
          </>
      )
    }

    const addVisitedItems = () => {
        if (visited.length <= 0) {
            return <div>Not Visited Yet</div>
        }
        return (
            <>
                <div>Visited Contains</div>
                <div className='queue_items_container'>
                    {visited.map((item, index) => {
                        return <span className={`queue_item`} key={index}>{item}</span>
                    })}
                </div>
            </>
        )
    }

    const addProcessingEdges = (from, to, pEdges) => {
        if(pEdges[from]){
            if(!pEdges[from].includes(to)){
                pEdges[from].push(to);
            }
        }else{
            pEdges[from] = [to];
        }
        return pEdges;
    }
   
    const initialiseBFS = () => {
        setProcessingEdges({});
        setVisited([]);
        let pNodes = {...nodes};
        if(nodes.length == 0 && queueItems.length == 0){
            alert('No Nodes to Process');
            return;
        }
        if(queueItems.length == 0){
            let allNodes = [];
            Object.entries(nodes).forEach(([key, node]) => {
                pNodes[key] = {
                    ...node,
                    isHighlighted: false
                }
                allNodes.push(node.label);
            })
            allNodes.sort((a, b) => a - b);
            const node = allNodes.shift();
            pNodes[node] = {
                ...pNodes[node],
                isHighlighted: true
            }
            setQueueItems([node]);
            setNodesToProcess(allNodes);
            setNodes(pNodes);
        }
    }

    const processNodes = () => {
        const q = [...queueItems]
        if(q.length == 0){
            alert('No Nodes to Process');
            return;
        }else{
            let d = new Date();
            let pEdges = {...processingEdges};
            while((new Date() - d) < 500){
                const connectedNodes = edges[q[0]];
                if(connectedNodes){
                    let current = q[0]; 
                    let allNodes = {...nodes};
                    for(let i = 0; i < connectedNodes.length; i++){
                        allNodes[connectedNodes[i]] = {
                            ...allNodes[connectedNodes[i]],
                            isHighlighted: true
                        }
                        setNodes(allNodes);
                        pEdges = addProcessingEdges(current, connectedNodes[i], pEdges);
                        if(visited.includes(connectedNodes[i])){
                            //alert('Cycle Detected');
                            continue;
                        }else if(!q.includes(connectedNodes[i])){
                            q.push(connectedNodes[i]);
                        }
                    }

                }
            } // Simulating a delay of 1 second
            setVisited([...visited, q.shift()])
            setProcessingEdges(pEdges);
            setQueueItems(q);
        }
    }

    return (
        <div className='queue_container'>
            {addQueueItems()}
            <div>
                <button className='traversal_button' onClick={initialiseBFS}>Start BFS</button>
                <button className='traversal_button' onClick={processNodes}>Next</button>
            </div>
            {addVisitedItems()}
        </div>
    );
};

export default BFSAlgoControls;