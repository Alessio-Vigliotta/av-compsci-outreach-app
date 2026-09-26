import { useState } from 'react';

// The Graph: Represents the "Routers" (students) and the latency/distance between them
const graph: Record<string, Record<string, number>> = {
    'A': { 'B': 4, 'C': 2 },
    'B': { 'A': 4, 'E': 3, 'C': 5 },
    'C': { 'A': 2, 'B': 5, 'D': 2, 'F': 4 },
    'D': { 'C': 2, 'E': 3, 'F': 1 },
    'E': { 'B': 3, 'D': 3, 'F': 2 },
    'F': { 'C': 4, 'D': 1, 'E': 2 }
};

// SVG Coordinates for drawing the network map
const nodePositions: Record<string, { x: number, y: number }> = {
    'A': { x: 50, y: 150 },
    'B': { x: 150, y: 50 },
    'C': { x: 150, y: 250 },
    'D': { x: 250, y: 250 },
    'E': { x: 250, y: 50 },
    'F': { x: 350, y: 150 }
};

export default function NetworkApp({ onBack }: { onBack: () => void }) {
    const [startNode, setStartNode] = useState('A');
    const [endNode, setEndNode] = useState('F');
    const [path, setPath] = useState<string[]>([]);
    const [totalLatency, setTotalLatency] = useState<number | null>(null);
    const [failedPath, setFailedPath] = useState(false);
    
    // NEW: Memory for routers that have "crashed"
    const [disabledNodes, setDisabledNodes] = useState<string[]>([]);

    // Toggle a router on/off when clicked
    const toggleNode = (node: string) => {
        if (disabledNodes.includes(node)) {
            // Turn it back on
            setDisabledNodes(disabledNodes.filter(n => n !== node));
        } else {
            // Crash it!
            setDisabledNodes([...disabledNodes, node]);
        }
        // Clear the current path so the user has to recalculate the detour
        setPath([]);
        setTotalLatency(null);
        setFailedPath(false);
    };

    // Dijkstra's Algorithm implementation
    const calculateShortestPath = () => {
        setFailedPath(false);

        // If the user tries to route to/from a crashed node, it fails immediately
        if (disabledNodes.includes(startNode) || disabledNodes.includes(endNode)) {
            setPath([]);
            setTotalLatency(null);
            setFailedPath(true);
            return;
        }

        const distances: Record<string, number> = {};
        const previous: Record<string, string | null> = {};
        
        // Only add active nodes to our unvisited list
        const activeNodes = Object.keys(graph).filter(n => !disabledNodes.includes(n));
        const unvisited = new Set(activeNodes);

        // Setup initial distances
        for (const node of activeNodes) {
            distances[node] = Infinity;
            previous[node] = null;
        }
        distances[startNode] = 0;

        while (unvisited.size > 0) {
            // Find the closest unvisited node
            let currNode: string | null = null;
            for (const node of unvisited) {
                if (currNode === null || distances[node] < distances[currNode]) {
                    currNode = node;
                }
            }

            if (currNode === null || distances[currNode] === Infinity || currNode === endNode) break;

            unvisited.delete(currNode);

            // Update distances to neighbors
            for (const neighbor in graph[currNode]) {
                // Ignore the neighbor if it has crashed!
                if (disabledNodes.includes(neighbor)) continue;

                const alt = distances[currNode] + graph[currNode][neighbor];
                if (alt < distances[neighbor]) {
                    distances[neighbor] = alt;
                    previous[neighbor] = currNode;
                }
            }
        }

        // Trace the path backwards
        const calculatedPath: string[] = [];
        let u: string | null = endNode;
        while (u) {
            calculatedPath.unshift(u);
            u = previous[u];
        }

        if (calculatedPath[0] === startNode) {
            setPath(calculatedPath);
            setTotalLatency(distances[endNode]);
        } else {
            // No valid path exists (network is completely severed)
            setPath([]);
            setTotalLatency(null);
            setFailedPath(true);
        }
    };

    // Helper to check if an edge is part of the winning path to color it green
    const isEdgeInPath = (n1: string, n2: string) => {
        for (let i = 0; i < path.length - 1; i++) {
            if ((path[i] === n1 && path[i+1] === n2) || (path[i] === n2 && path[i+1] === n1)) {
                return true;
            }
        }
        return false;
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', color: 'white' }}>
            <button 
                onClick={onBack} 
                style={{ marginBottom: '20px', padding: '8px 16px', backgroundColor: '#334155', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
                &larr; Back to Hub
            </button>

            <h2>Network Routing Sandbox</h2>
            <p>Select a start and end router. <strong>Click on a router in the map to simulate it crashing!</strong></p>

            {/* Controls */}
            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', marginBottom: '20px', display: 'flex', gap: '15px', alignItems: 'center' }}>
                <label>Send packet from:</label>
                <select value={startNode} onChange={(e) => { setStartNode(e.target.value); setPath([]); }} style={{ padding: '8px', borderRadius: '4px' }}>
                    {Object.keys(graph).map(node => <option key={node} value={node}>Router {node}</option>)}
                </select>

                <label>to:</label>
                <select value={endNode} onChange={(e) => { setEndNode(e.target.value); setPath([]); }} style={{ padding: '8px', borderRadius: '4px' }}>
                    {Object.keys(graph).map(node => <option key={node} value={node}>Router {node}</option>)}
                </select>

                <button 
                    onClick={calculateShortestPath} 
                    style={{ marginLeft: 'auto', padding: '10px 20px', backgroundColor: '#0284c7', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    Run Dijkstra's Algorithm
                </button>
            </div>

            {/* Results Dashboard */}
            {path.length > 0 && (
                <div style={{ padding: '15px', backgroundColor: '#0f172a', borderRadius: '8px', marginBottom: '20px', border: '1px solid #22c55e' }}>
                    <h3 style={{ color: '#22c55e', marginTop: 0 }}>Optimal Path Found!</h3>
                    <p style={{ fontSize: '1.2em', fontWeight: 'bold', margin: '10px 0' }}>
                        {path.join(' → ')}
                    </p>
                    <p style={{ color: '#94a3b8', margin: 0 }}>Total Latency (Cost): {totalLatency}ms</p>
                </div>
            )}

            {failedPath && (
                <div style={{ padding: '15px', backgroundColor: '#0f172a', borderRadius: '8px', marginBottom: '20px', border: '1px solid #ef4444' }}>
                    <h3 style={{ color: '#ef4444', marginTop: 0 }}>Request Timed Out</h3>
                    <p style={{ color: '#94a3b8', margin: 0 }}>The network is severed or the target router is offline. No path exists!</p>
                </div>
            )}

            {/* SVG Visualizer */}
            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', display: 'flex', justifyContent: 'center' }}>
                <svg width="400" height="300" style={{ background: '#0f172a', borderRadius: '8px', border: '1px solid #334155' }}>
                    
                    {/* Draw the connecting lines (Edges) */}
                    {Object.keys(graph).map((node) => 
                        Object.keys(graph[node]).map((neighbor) => {
                            if (node > neighbor) return null; 
                            
                            const isCrashed = disabledNodes.includes(node) || disabledNodes.includes(neighbor);
                            const inPath = isEdgeInPath(node, neighbor);
                            
                            const n1 = nodePositions[node];
                            const n2 = nodePositions[neighbor];
                            const midX = (n1.x + n2.x) / 2;
                            const midY = (n1.y + n2.y) / 2;

                            return (
                                <g key={`${node}-${neighbor}`}>
                                    <line 
                                        x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y} 
                                        stroke={inPath ? '#22c55e' : (isCrashed ? '#1e293b' : '#475569')} 
                                        strokeWidth={inPath ? "4" : "2"} 
                                        strokeDasharray={isCrashed ? "5,5" : "none"}
                                    />
                                    {!isCrashed && (
                                        <>
                                            <circle cx={midX} cy={midY} r="12" fill="#1e293b" />
                                            <text x={midX} y={midY} fill={inPath ? '#22c55e' : '#94a3b8'} fontSize="12" textAnchor="middle" dy=".3em">
                                                {graph[node][neighbor]}
                                            </text>
                                        </>
                                    )}
                                </g>
                            );
                        })
                    )}

                    {/* Draw the Routers (Nodes) */}
                    {Object.keys(nodePositions).map((node) => {
                        const pos = nodePositions[node];
                        const isStart = node === startNode;
                        const isEnd = node === endNode;
                        const inPath = path.includes(node);
                        const isCrashed = disabledNodes.includes(node);

                        // Determine circle color
                        let bgColor = '#334155';
                        if (isCrashed) bgColor = '#0f172a'; // Dark background for crashed
                        else if (isStart) bgColor = '#3b82f6'; 
                        else if (isEnd) bgColor = '#a855f7'; 
                        else if (inPath) bgColor = '#22c55e'; 

                        // Determine border color
                        let strokeColor = '#f8fafc';
                        if (isCrashed) strokeColor = '#ef4444'; // Red border for crashed

                        return (
                            <g key={node} onClick={() => toggleNode(node)} style={{ cursor: 'pointer' }}>
                                <circle cx={pos.x} cy={pos.y} r="20" fill={bgColor} stroke={strokeColor} strokeWidth="2" />
                                <text 
                                    x={pos.x} 
                                    y={pos.y} 
                                    fill={isCrashed ? '#ef4444' : 'white'} 
                                    fontSize="16" 
                                    fontWeight="bold" 
                                    textAnchor="middle" 
                                    dy=".3em"
                                    style={{ userSelect: 'none' }}
                                >
                                    {node}
                                </text>
                                
                                {/* Add a visual 'X' over crashed nodes */}
                                {isCrashed && (
                                    <text x={pos.x} y={pos.y} fill="rgba(239, 68, 68, 0.5)" fontSize="24" fontWeight="bold" textAnchor="middle" dy=".3em" style={{ userSelect: 'none', pointerEvents: 'none' }}>
                                        X
                                    </text>
                                )}
                            </g>
                        );
                    })}
                </svg>
            </div>

        </div>
    );
}