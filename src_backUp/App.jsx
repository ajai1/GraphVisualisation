// src/App.js
import React, { useState } from 'react';
import Graph from './Components/Graph/Graph';
import Controls from './Components/Controls/Controls';

const App = () => {
  const [nodes, setNodes] = useState({});
  const [edges, setEdges] = useState({});
  const [edgeMode, setEdgeMode] = useState(false);
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
  const [directedGraph, setDirectedGraph] = useState(false);
  const [queueItems, setQueueItems] = useState([1,2,3]);
  const [processingItem, setProcessingItem] = useState(3);

  const addAllNodes = (nodes) => {
    setNodes(nodes);
  }

  const addAllEdges = (edges) => {
    setEdges(edges);
  }

  const addNode = (label, x, y) => {
    if(nodes[label]) {
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
    if(!nodes[from] || !nodes[to]) {
      alert("Node does not exist can't create edge");
      return;
    }
    const allEdges = {...edges};
    if(allEdges[from]) {
      allEdges[from].push(to);
    }else{
      allEdges[from] = [to];
    }
    setEdges(allEdges);
  };

  function addQueueItems(){
    if(queueItems.length <= 0){
      return <div>Queue Empty</div>
    }
    return (
      <div className='queue_container'>
        <div>Queue Contains</div>
        <div className='queue_items_container'>
          {queueItems.map((item, index) => {
            return <span className={`queue_item ${item==processingItem && `processing`}`} key={index}>HELOO {item}</span>
          })}
        </div>
      </div>
    )
  }

  return (
    <div >
      <h1>Graph Visualization</h1>
      <div className='app_component'>
        <Graph nodes={nodes} edges={edges} setNodes={setNodes} addEdge={addEdge} edgeMode={edgeMode} setMousePosition={setMousePosition} directedGraph={directedGraph} />
        <Controls nodes={nodes} edges={edges} addNode={addNode} addAllNodes={addAllNodes} addAllEdges={addAllEdges} addEdge={addEdge} edgeMode={edgeMode} setEdgeMode={setEdgeMode} directedGraph={directedGraph} setDirectedGraph={setDirectedGraph}/>

      </div>
      <div>
        {addQueueItems()}
      </div>
    </div>
  );
};

export default App;



{/*         <>
          <h2>{`x = ${mousePosition.x} | y = ${mousePosition.y}`}</h2>
        </> */}