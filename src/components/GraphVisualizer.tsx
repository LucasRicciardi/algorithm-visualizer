import { Paper, useTheme, Typography, Box } from '@mui/material';
import type { AlgorithmState } from '../types/types';

interface GraphVisualizerProps {
  state: AlgorithmState;
}

export default function GraphVisualizer({ state }: GraphVisualizerProps) {
  const theme = useTheme();
  const { graph, history, currentStepIndex } = state;
  const currentStep = currentStepIndex >= 0 ? history[currentStepIndex] : null;

  if (!graph) return <Box>No Graph Data</Box>;

  const { nodes, edges } = graph;

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
                let strokeDasharray = "5,5"; // Default dashed for unvisited edges if purely exploring? Or solid?
                // Let's make solid but dim.
                strokeDasharray = "0";

                const isComparing = currentStep?.type === 'compare' && 
                                    currentStep.edge?.source === edge.source && 
                                    currentStep.edge?.target === edge.target;
                
                const isRelaxing = currentStep?.type === 'relax' && 
                                   currentStep.edge?.source === edge.source && 
                                   currentStep.edge?.target === edge.target;
                
                if (isComparing) {
                    stroke = '#FFD600'; // Yellow
                    strokeWidth = 4;
                } else if (isRelaxing) {
                    stroke = '#00E676'; // Green
                    strokeWidth = 4;
                }
                
                return (
                    <g key={`edge-${idx}`}>
                        <line 
                            x1={source.x} y1={source.y}
                            x2={target.x} y2={target.y}
                            stroke={stroke}
                            strokeWidth={strokeWidth}
                            strokeDasharray={strokeDasharray}
                            // Add marker?
                        />
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
                
                // Check if visited? We don't track visited explicitly in state history easily without full replay.
                // But we can check if it's currently focused.
                const isActive = currentStep?.indices.includes(node.id);
                
                if (isActive) {
                    if (currentStep?.type === 'visit') {
                        fill = '#00E5FF';
                        stroke = '#ffffff';
                        glow = '0 0 15px #00E5FF';
                    } else if (currentStep?.type === 'highlight') {
                        fill = '#2979FF';
                    } else if (currentStep?.type === 'relax') {
                        fill = '#00E676'; // Target of relax
                        glow = '0 0 15px #00E676';
                    } else if (currentStep?.type === 'compare') {
                         // Often source is active one
                         fill = '#FFD600';
                    }
                }
                
                 // Start node check (id 0 per our logic)
                 if (node.id === 0 && !isActive) {
                     stroke = '#00E676'; // Special color for start
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
                            fill={isActive && currentStep?.type === 'visit' ? '#000' : '#fff'}
                            fontSize="14"
                            fontWeight="bold"
                        >
                            {node.id}
                        </text>
                        {/* Distance Label (Conceptually we'd want this updated. 
                           Since we don't store distance map in state.array, it's hard to show persistent distances 
                           without adding it to algorithm state.
                           For now, we just skip persistent distance labels or rely on step description.) 
                        */}
                    </g>
                );
            })}
        </svg>
    </Paper>
  );
}
