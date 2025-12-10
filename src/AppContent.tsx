import { useRef, useState, useEffect } from 'react';
import { Container, Box, Typography, AppBar, Toolbar, Button } from '@mui/material';
import ArrayVisualizer from './components/ArrayVisualizer';
import Controls from './components/Controls';
import CodeViewer from './components/CodeViewer';
import InputDataDialog from './components/InputDataDialog';
import AlgorithmSelector from './components/AlgorithmSelector';
import { AlgorithmController } from './core/AlgorithmController';
import type { AlgorithmState } from './types/types';

// Initial random data
const generateRandomData = (size: number = 20) => 
    Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);

export default function AppContent() {
  const [algoState, setAlgoState] = useState<AlgorithmState | null>(null);
  const [currentAlgo, setCurrentAlgo] = useState('bubbleSort');
  const [isInputOpen, setIsInputOpen] = useState(false);
  const controllerRef = useRef<AlgorithmController | null>(null);

  useEffect(() => {
      // Initialize controller on mount
      const data = generateRandomData();
      controllerRef.current = new AlgorithmController(data, (newState) => {
          setAlgoState(newState);
      });
      
      return () => {
          if (controllerRef.current) {
              controllerRef.current.pause();
          }
      }
  }, []);

  const handlePlay = () => controllerRef.current?.play();
  const handlePause = () => controllerRef.current?.pause();
  const handleNext = () => controllerRef.current?.next();
  const handlePrev = () => controllerRef.current?.prev();
  const handleReset = () => controllerRef.current?.reset(generateRandomData());
  const handleSpeedChange = (speed: number) => controllerRef.current?.setSpeed(speed);
  
  const handleCustomInput = (data: number[]) => {
      controllerRef.current?.reset(data);
  };

  const handleAlgoChange = (algo: string) => {
      setCurrentAlgo(algo);
      controllerRef.current?.setAlgorithm(algo);
  };

  if (!algoState) return <Box>Loading...</Box>;

  const currentStep = algoState.currentStepIndex >= 0 ? algoState.history[algoState.currentStepIndex] : null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Toolbar>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 3 }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    Algorithm Visualizer
                </Typography>
                <AlgorithmSelector value={currentAlgo} onChange={handleAlgoChange} disabled={algoState.isPlaying} />
            </Box>
          <Button variant="outlined" color="primary" onClick={() => setIsInputOpen(true)}>
              Custom Input
          </Button>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4, flex: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Header */}
            <Box>
                 <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {currentAlgo === 'mergeSort' ? 'Merge Sort' : 'Bubble Sort'}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    {currentAlgo === 'mergeSort' 
                        ? "Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves." 
                        : "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order."}
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 3 }}>
                {/* Left Column: Visualization */}
                <Box sx={{ flex: { lg: 2 }, display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
                    <ArrayVisualizer state={algoState} />
                    
                    <Controls 
                        onPlay={handlePlay}
                        onPause={handlePause}
                        onNext={handleNext}
                        onPrev={handlePrev}
                        onReset={handleReset}
                        onSpeedChange={handleSpeedChange}
                        isPlaying={algoState.isPlaying}
                        speed={algoState.speed}
                        disabled={false}
                    />
                    
                    {/* Commentary / Status */}
                    <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, minHeight: '60px' }}>
                        <Typography variant="subtitle1" color="text.secondary">
                            {currentStep ? currentStep.description : "Ready to start"}
                        </Typography>
                    </Box>
                </Box>

                {/* Right Column: Code & Stats */}
                <Box sx={{ flex: { lg: 1 }, display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
                    <CodeViewer currentLine={currentStep?.line} algorithm={currentAlgo} />
                    
                    {/* Stats Placeholder */}
                     <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
                        <Typography variant="h6" color="primary">Complexity</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Time: {currentAlgo === 'mergeSort' ? 'O(N log N)' : 'O(N²)'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                             Space: {currentAlgo === 'mergeSort' ? 'O(N)' : 'O(1)'}
                        </Typography>
                        
                        <Typography variant="h6" color="primary" sx={{ mt: 2 }}>Stats</Typography>
                        <Typography variant="body2">Comparisons: {
                           algoState.history.slice(0, algoState.currentStepIndex + 1).filter(s => s.type === 'compare').length
                        }</Typography>
                         <Typography variant="body2">
                             {currentAlgo === 'mergeSort' ? 'Overwrites' : 'Swaps'}: {
                            algoState.history.slice(0, algoState.currentStepIndex + 1).filter(s => s.type === (currentAlgo === 'mergeSort' ? 'overwrite' : 'swap')).length
                        }</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
      </Container>
      
      <InputDataDialog 
        open={isInputOpen} 
        onClose={() => setIsInputOpen(false)} 
        onSubmit={handleCustomInput} 
      />
    </Box>
  );
}
