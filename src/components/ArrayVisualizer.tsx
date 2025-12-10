import { Box, Paper, useTheme } from '@mui/material';
import type { AlgorithmState } from '../types/types';

interface ArrayVisualizerProps {
  state: AlgorithmState;
}

export default function ArrayVisualizer({ state }: ArrayVisualizerProps) {
  const theme = useTheme();
  const { array, history, currentStepIndex } = state;
  const currentStep = currentStepIndex >= 0 ? history[currentStepIndex] : null;

  // Max value for height calculation
  const maxValue = Math.max(...array, 1);

  return (
    <Paper 
      elevation={3}
      sx={{ 
        p: 2, 
        height: '400px', 
        display: 'flex', 
        alignItems: 'flex-end', 
        justifyContent: 'center', 
        gap: 1,
        // Glassmorphism is handled by theme, but we can enforce specific background for slightly better contrast underneath bars
        background: 'rgba(10, 25, 41, 0.4)',
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        '&::before': { // Optional: Subtle grid or line at bottom
             content: '""',
             position: 'absolute',
             bottom: 0,
             left: 0,
             right: 0,
             height: '2px',
             background: 'linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.5), transparent)'
        }
      }}
    >
      {array.map((value, idx) => {
        // Default Gradient (Blue/Cyan)
        let background = 'linear-gradient(180deg, #00E5FF 0%, #2979FF 100%)';
        let boxShadow = '0 0 10px rgba(0, 229, 255, 0.3)';
        let opacity = 0.8;
        
        if (currentStep) {
            if (currentStep.indices.includes(idx)) {
                opacity = 1;
                if (currentStep.type === 'compare') {
                    // Warning/Yellow Gradient
                    background = 'linear-gradient(180deg, #FFD600 0%, #FF6D00 100%)'; 
                    boxShadow = '0 0 15px rgba(255, 214, 0, 0.6)';
                } else if (currentStep.type === 'swap') {
                    // Error/Red Gradient
                    background = 'linear-gradient(180deg, #FF1744 0%, #D50000 100%)';
                    boxShadow = '0 0 15px rgba(255, 23, 68, 0.6)';
                } else if (currentStep.type === 'highlight') {
                    // Info/Blue-White Gradient for active range
                    background = 'linear-gradient(180deg, #FFFFFF 0%, #00B0FF 100%)';
                    boxShadow = '0 0 15px rgba(0, 176, 255, 0.6)';
                } else if (currentStep.type === 'sorted') {
                    // Success/Green Gradient
                    background = 'linear-gradient(180deg, #00E676 0%, #00C853 100%)';
                     boxShadow = '0 0 15px rgba(0, 230, 118, 0.6)';
                } else if (currentStep.type === 'overwrite') {
                    // Secondary/Purple Gradient
                    background = 'linear-gradient(180deg, #D500F9 0%, #AA00FF 100%)';
                    boxShadow = '0 0 15px rgba(213, 0, 249, 0.6)';
                } else if (currentStep.type === 'found') {
                    // Bright Green/White "Found" Flash
                    background = 'linear-gradient(180deg, #B9F6CA 0%, #00E676 100%)';
                    boxShadow = '0 0 20px rgba(0, 230, 118, 0.9)';
                }
            }
        }
        
        let height = `${(value / maxValue) * 100}%`;

        return (
          <Box
            key={idx}
            sx={{
              height: height,
              width: '20px', 
              flex: 1,
              maxWidth: '30px',
              background: background,
              boxShadow: boxShadow,
              opacity: opacity,
              borderRadius: '4px 4px 0 0',
              transition: 'all 0.2s ease',
              position: 'relative',
              '&:hover': {
                  opacity: 1,
                  transform: 'scaleY(1.02)',
                  filter: 'brightness(1.2)'
              }
            }}
          />
        );
      })}
    </Paper>
  );
}
