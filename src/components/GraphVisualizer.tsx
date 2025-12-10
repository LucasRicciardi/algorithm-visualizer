import { Paper, Box } from '@mui/material';
import type { AlgorithmState } from '../types/types';

interface GraphVisualizerProps {
  state: AlgorithmState;
}

export default function GraphVisualizer({ state }: GraphVisualizerProps) {
  const { graph, history, currentStepIndex, startNode, endNode } = state;
  const currentStep = currentStepIndex >= 0 ? history[currentStepIndex] : null;

  if (!graph) return <Box>No Graph Data</Box>;

  const { nodes, edges } = graph;

  // Helper to check if edge is part of the final path or current path
  const isEdgeInPath = (edge: typeof edges[0]) => {
      let pathIndices: number[] | undefined;
      
      // If explicit path step or if step has a path property (live tracking)
      if (currentStep?.type === 'path') {
          pathIndices = currentStep.indices;
      } else if (currentStep?.path) {
          pathIndices = currentStep.path;
      }

      if (!pathIndices || pathIndices.length < 2) return false;

      for (let i = 0; i < pathIndices.length - 1; i++) {
          const u = pathIndices[i];
          const v = pathIndices[i+1];
          if ((edge.source === u && edge.target === v) || (edge.source === v && edge.target === u)) {
              return true;
          }
      }
      return false;
  };

  // Render SVG
  return (
    <Paper 
      elevation={3}
      sx={{ 
        p: 2, 
        height: '400px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        position: 'relative',
        background: 'rgba(10, 25, 41, 0.4)',
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
        <svg width="100%" height="100%" viewBox="0 0 800 400" style={{ overflow: 'visible' }}>
            {/* Edges */}
            {edges.map((edge, idx) => {
                const source = nodes.find(n => n.id === edge.source);
                const target = nodes.find(n => n.id === edge.target);
                if (!source || !target) return null;
                
                let stroke = 'rgba(0, 229, 255, 0.2)';
                let strokeWidth = 2;
                let strokeDasharray = "0";

                const isComparing = currentStep?.type === 'compare' && 
                                    currentStep.edge?.source === edge.source && 
                                    currentStep.edge?.target === edge.target;
                
                const isRelaxing = currentStep?.type === 'relax' && 
                                   currentStep.edge?.source === edge.source && 
                                   currentStep.edge?.target === edge.target;
                
                const isPath = isEdgeInPath(edge);

                if (isComparing) {
                    stroke = '#FFD600'; // Yellow
                    strokeWidth = 4;
                } else if (isRelaxing) {
                    stroke = '#00E676'; // Green
                    strokeWidth = 4;
                } else if (isPath) {
                    stroke = '#D500F9'; // Purple for path
                    strokeWidth = 4;
                    // strokeDasharray = "5,5"; 
                }
                
                return (
                    <g key={`edge-${idx}`}>
                        <line 
                            x1={source.x} y1={source.y}
                            x2={target.x} y2={target.y}
                            stroke={stroke}
                            strokeWidth={strokeWidth}
                            strokeDasharray={strokeDasharray}
                        >
                            {isPath && (
                                 <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
                            )}
                        </line>
                        
                        {/* Weight Label */}
                        <text
                            x={(source.x + target.x) / 2}
                            y={(source.y + target.y) / 2}
                            fill="rgba(255,255,255,0.7)"
                            fontSize="12"
                            textAnchor="middle"
                            dy="-5"
                        >
                            {edge.weight}
                        </text>
                    </g>
                );
            })}
            
            {/* Nodes */}
            {nodes.map((node) => {
                let fill = '#0A1929';
                let stroke = '#00E5FF';
                let strokeWidth = 2;
                let glow = 'none';
                
                const isActive = currentStep?.indices.includes(node.id);
                // Check if node is part of current traced path
                const pathIndices = currentStep?.type === 'path' ? currentStep.indices : currentStep?.path;
                const isInPath = pathIndices?.includes(node.id);
                
                // Identify the "Current Node" (frontier) - usually the last node in the current path if we are visiting/exploring
                const isCurrentNode = pathIndices && pathIndices[pathIndices.length - 1] === node.id && currentStep?.type !== 'path';

                if (isActive) {
                    if (currentStep?.type === 'visit') {
                        fill = '#00E5FF';
                        stroke = '#ffffff';
                        glow = '0 0 15px #00E5FF';
                    } else if (currentStep?.type === 'highlight') {
                        fill = '#2979FF';
                    } else if (currentStep?.type === 'relax') {
                        fill = '#00E676'; // Neighbor being relaxed
                        glow = '0 0 15px #00E676';
                    } else if (currentStep?.type === 'compare') {
                         fill = '#FFD600'; // Neighbor being compared
                    } 
                }
                
                if (isCurrentNode && currentStep?.type !== 'relax') {
                     // Current Node (Head of Path)
                     // Make it Purple to match path, but with specific highlight (e.g. White Stroke)
                     fill = '#D500F9';
                     stroke = '#ffffff';
                     glow = '0 0 20px #D500F9';
                     strokeWidth = 3;
                }

                // Static overrides for start/end
                if (node.id === startNode) {
                    stroke = '#00E676'; // Start Green
                    if (!isActive && !isCurrentNode && !isInPath) fill = 'rgba(0, 230, 118, 0.2)';
                    if (isInPath) fill = '#00E676'; 
                } else if (node.id === endNode) {
                    stroke = '#FF1744'; // Target Red
                    if (!isActive && !isCurrentNode && !isInPath) fill = 'rgba(255, 23, 68, 0.2)';
                    if (isInPath) fill = '#FF1744';
                }

                if (isInPath && !isCurrentNode && node.id !== startNode && node.id !== endNode) {
                    // Path nodes (body of snake)
                    stroke = '#D500F9';
                    fill = '#D500F9';
                    glow = '0 0 10px #D500F9';
                }
                
                return (
                    <g key={`node-${node.id}`}>
                        {/* Glow effect circle behind */}
                        {glow !== 'none' && (
                            <circle 
                                cx={node.x} cy={node.y} r={25} 
                                fill="transparent"
                                stroke="none"
                            >
                                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="1.5s" repeatCount="indefinite" />
                            </circle>
                        )}
                        
                        <circle
                            cx={node.x} cy={node.y}
                            r={20}
                            fill={fill}
                            stroke={stroke}
                            strokeWidth={strokeWidth}
                            style={{ filter: glow !== 'none' ? `drop-shadow(${glow})` : 'none', transition: 'all 0.3s' }}
                        />
                        <text
                            x={node.x} y={node.y}
                            dy="5"
                            textAnchor="middle"
                            fill={isActive ? '#fff' : '#fff'}
                            fontSize="14"
                            fontWeight="bold"
                        >
                            {node.id}
                        </text>
                    </g>
                );
            })}
        </svg>
    </Paper>
  );
}
