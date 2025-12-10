import { Box, IconButton, Slider, Typography, Paper } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

interface ControlsProps {
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  isPlaying: boolean;
  speed: number;
  disabled?: boolean;
}

export default function Controls({ 
    onPlay, onPause, onNext, onPrev, onReset, onSpeedChange, 
    isPlaying, speed, disabled 
}: ControlsProps) {

  // Slider value 0 -> 1000ms, 100 -> 50ms.
  // delay = 1050 - (value * 10)
  
  // const sliderValue = (1050 - speed) / 10; 

  /* const handleSliderChange = (_: Event, newValue: number | number[]) => {
      const val = newValue as number;
      const delay = 1050 - (val * 10);
      onSpeedChange(delay);
  }; */

  return (
    <Paper 
        elevation={3}
        sx={{ 
            p: 2, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2, 
            borderRadius: 50, // Pill shape
            justifyContent: 'center',
            border: '1px solid rgba(0, 229, 255, 0.2)',
            background: 'rgba(10, 25, 41, 0.6)', // Slightly improved contrast
            backdropFilter: 'blur(10px)'
        }}
    >
        <IconButton onClick={onReset} disabled={disabled} size="small" title="Reset">
            <RestartAltIcon />
        </IconButton>

        <IconButton onClick={onPrev} disabled={disabled || isPlaying} title="Previous Step">
             <SkipPreviousIcon />
        </IconButton>

        {isPlaying ? (
            <IconButton 
                onClick={onPause} 
                disabled={disabled} 
                size="large" 
                sx={{ 
                    border: '2px solid #00E676', 
                    color: '#00E676',
                    boxShadow: '0 0 10px rgba(0, 230, 118, 0.3)',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 230, 118, 0.1)',
                        boxShadow: '0 0 20px rgba(0, 230, 118, 0.6)',
                        border: '2px solid #00E676',
                    }
                }}
            >
                <PauseIcon fontSize="large" />
            </IconButton>
        ) : (
            <IconButton 
                onClick={onPlay} 
                disabled={disabled} 
                size="large"
                sx={{ 
                    border: '2px solid #00E676', 
                    color: '#00E676', 
                    boxShadow: '0 0 10px rgba(0, 230, 118, 0.3)',
                    '&:hover': {
                         backgroundColor: 'rgba(0, 230, 118, 0.1)',
                         boxShadow: '0 0 20px rgba(0, 230, 118, 0.6)',
                         border: '2px solid #00E676',
                    }
                }}
            >
                <PlayArrowIcon fontSize="large" />
            </IconButton>
        )}

        <IconButton onClick={onNext} disabled={disabled || isPlaying} title="Next Step">
            <SkipNextIcon />
        </IconButton>

        <Box sx={{ width: 120, ml: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>Slow</Typography>
            <Slider 
                size="small"
                value={speed}
                min={100}
                max={2000}
                step={100}
                // High value = Slow speed (high delay)
                // Low value = Fast speed (low delay)
                // We want Left = Fast (Low Delay)? No usually Left=Slow
                // Standard: Left = Min Value, Right = Max Value.
                // If Min=100 (Fast), Max=2000 (Slow). Left is Fast.
                // If we want Left=Slow, we need Min=2000, Max=100.
                // Slider supports min > max? No.
                // We need scale transform if we want logic inversion.
                // But let's stick to "Value is Delay".
                // Left (Small Delay - Fast) -> Right (Large Delay - Slow).
                // So Label Left should be Fast, Right should be Slow.
                // Wait, previous code had "Slow" on Left?
                // Let's make it intuitive: Left = Slow, Right = Fast.
                // This means Value should go from High Delay to Low Delay.
                // scale(x) -> inverse.
                // Simpler: Just swap labels if using natural delay values?
                // Left (100ms - Fast). Right (2000ms - Slow).
                // I will label Left as "Fast" and Right as "Slow".
                onChange={(_, val) => onSpeedChange(val as number)}
                sx={{
                    '& .MuiSlider-thumb': {
                        boxShadow: '0 0 10px #00E5FF'
                    }
                }}
            />
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>Fast</Typography>
        </Box>
    </Paper>
  );
}
