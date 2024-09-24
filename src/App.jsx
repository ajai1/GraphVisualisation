// src/App.js
import React, { useContext, useEffect, useState } from 'react';
import Graph from './Components/Graph/Graph';
import Controls from './Components/Controls/Controls';
import AppContextProvider, { AppContext } from './Context/context';
import BFSAlgoControls from './Components/AlgoControls/BFSAlgoControls';
import DFSAlgoControls from './Components/AlgoControls/DFSAlgoControls';

const App = () => {

  const [mode, setMode] = useState('input');
  const {setCanvas} = useContext(AppContext);

  function resizeEventHandler () {
    const newCanvas = {
      width: window.innerWidth - 400,
      height: window.innerHeight - 300
    }
    setCanvas(newCanvas);
  }
  
  useEffect(() => {
    window.addEventListener('resize', () => {
       resizeEventHandler();
    })
    return () => {
      window.removeEventListener('resize', resizeEventHandler);
    };
  },[])


  function controls() {
    switch(mode) {
      case 'input':
        return <Controls />
      case 'bfs':
        return <BFSAlgoControls />
      case 'dfs':
        return <DFSAlgoControls />
      default:
        return <Controls />
    }
  }

  const controlButtonClassNames = (type) => {
    if(type == mode){
      return 'control_button control_button_active';
    }
    return 'control_button';
  }

  return (
    <AppContextProvider >
      <div className='app_container'>
        <div className='app_header'>
        <h1>Graph Visualisation</h1>
        </div>
        <div className='app_component'>
          <Graph mode={mode}/>
        </div>
        <div className='controls_component'>
          <div className='controls_input'> 
            <button className={controlButtonClassNames('input')} onClick={() => setMode('input')}>Input Mode</button>
            <button className={controlButtonClassNames('bfs')} onClick={() => setMode('bfs')}>BFS Mode</button>
            <button className={controlButtonClassNames('dfs')} onClick={() => setMode('dfs')}>DFS Mode</button>
          </div>
        </div>
        {controls()}

      </div>
    </AppContextProvider>
  );
};

export default App;