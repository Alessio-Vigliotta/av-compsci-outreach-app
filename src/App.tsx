import { useState } from "react";
import AIApp from "./AIApp";
import NetworkApp from "./NetworkApp";

import GradientWaves from "./components/GradientWaves";

export default function App(){
  const [currentView, setCurrentView] = useState('menu');

  if (currentView === 'ai') {
    return <AIApp onBack={() => setCurrentView('menu')} />;
  }

  if (currentView === 'network') {
    return <NetworkApp onBack={() => setCurrentView('menu')} />;
  }

  return (  
    
    // Main container must be relative so absolute children stay inside it  
    <div style={{ position: 'relative', minHeight: '100vh', width: '100vw', overflow: 'hidden' }}>
      
      {/* BACKGROUND LAYER: Pinned to the back (zIndex: 0) */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <GradientWaves />
      </div>

      {/* FOREGROUND LAYER: Sits on top of the waves (zIndex: 1) */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h1>CSEE Outreach Hub</h1>
        <button onClick={() => setCurrentView('ai')}>
          {'AI Classifier Activity'}
        </button>
        <br />
        <button onClick={() => setCurrentView('network')}>
          {'Network Analysis Activity'}
        </button>
      </div>

      <style>
        {`
          body {
            /* Removed the background gradient here so we can see the waves! */
            background-color: #0f172a; 
            color: white;
            font-family: Arial, sans-serif;
            text-align: center;
            margin: 0;
          }
          button {
            background-color: #3b82f6;
            color: white;
            border: none;
            padding: 10px 20px;
            margin: 10px;
            cursor: pointer;
            border-radius: 20px;
            font-size: 16px;
            text-align: center;
          }
          button:hover {
            background-color: #6390f3d8;
          }
        `}
      </style>
    </div>
  );
}