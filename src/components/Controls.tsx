import { Box, IconButton, Slider, Typography, Tooltip, Paper } from '@mui/material';
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
  
  const sliderValue = (1050 - speed) / 10; 

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
      const val = newValue as number;
      const delay = 1050 - (val * 10);
      onSpeedChange(delay);
  };

  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
      <Tooltip title="Reset">
        <IconButton onClick={onReset} disabled={disabled}>
             <RestartAltIcon />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Previous Step">
        <IconButton onClick={onPrev} disabled={disabled || isPlaying}>
            <SkipPreviousIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title={isPlaying ? "Pause" : "Play"}>
        <IconButton 
            onClick={isPlaying ? onPause : onPlay} 
            color="primary" 
            size="large"
            disabled={disabled}
            sx={{ 
                bgcolor: 'primary.main', 
                color: 'white',
                '&:hover': { bgcolor: 'primary.dark' }
            }}
        >
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
      </Tooltip>

      <Tooltip title="Next Step">
        <IconButton onClick={onNext} disabled={disabled || isPlaying}>
            <SkipNextIcon />
        </IconButton>
      </Tooltip>

      <Box sx={{ width: 150, ml: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="caption" color="text.secondary">Slow</Typography>
        <Slider 
            value={sliderValue} 
            onChange={handleSliderChange} 
            min={5} // ~1000ms
            max={100} // ~50ms
            size="small"
            aria-label="Speed"
        />
        <Typography variant="caption" color="text.secondary">Fast</Typography>
      </Box>
    </Paper>
  );
}
