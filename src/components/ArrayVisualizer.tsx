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
        bgcolor: 'background.paper',
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
      {array.map((value, idx) => {
        let color = theme.palette.primary.main;
        let height = `${(value / maxValue) * 100}%`;
        
        if (currentStep) {
            if (currentStep.indices.includes(idx)) {
                if (currentStep.type === 'compare') {
                    color = theme.palette.warning.main; // Yellow/Orange for compare
                } else if (currentStep.type === 'swap') {
                    color = theme.palette.error.main; // Red for swap (changed from secondary)
                } else if (currentStep.type === 'highlight') {
                    color = theme.palette.info.main; // Blue for highlight
                } else if (currentStep.type === 'sorted') {
                    color = theme.palette.success.main; // Green for sorted
                } else if (currentStep.type === 'overwrite') {
                    color = theme.palette.secondary.main; // Cyan/Purple for overwrite
                } else if (currentStep.type === 'found') {
                    color = '#00e676'; // Bright green for found
                }
            }
        }
        
        // Check for sorted state from previous steps if we want persistent sorted color?
        // Our controller yields 'sorted' events. But we only look at *current* step here.
        // We might need 'sortedIndices' in State to persist green color.
        // For now, simple step visualization.

        return (
          <Box
            key={idx}
            sx={{
              height: height,
              width: '20px', // Fixed width or percentage
              flex: 1,
              maxWidth: '30px',
              bgcolor: color,
              borderRadius: '4px 4px 0 0',
              transition: 'height 0.2s ease, background-color 0.2s ease',
              // Optional: Add value label
              position: 'relative',
              '&:hover': {
                  opacity: 0.8
              }
            }}
          />
        );
      })}
    </Paper>
  );
}
