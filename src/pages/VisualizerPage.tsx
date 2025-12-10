import { useRef, useState, useEffect } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrayVisualizer from '../components/ArrayVisualizer';
import Controls from '../components/Controls';
import CodeViewer from '../components/CodeViewer';
import InputDataDialog from '../components/InputDataDialog';
import AlgorithmSelector from '../components/AlgorithmSelector';
import { AlgorithmController } from '../core/AlgorithmController';
import type { AlgorithmState } from '../types/types';

// Initial random data
const generateRandomData = (size: number = 20) => 
    Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);

export default function VisualizerPage() {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const currentAlgo = type || 'bubbleSort';
  
  const [algoState, setAlgoState] = useState<AlgorithmState | null>(null);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const controllerRef = useRef<AlgorithmController | null>(null);

  useEffect(() => {
      // Initialize controller on mount
      const data = generateRandomData();
      controllerRef.current = new AlgorithmController(data, (newState) => {
          setAlgoState(newState);
      });
      
      // Set initial algorithm based on URL
      controllerRef.current.setAlgorithm(currentAlgo);
      
      return () => {
          if (controllerRef.current) {
              controllerRef.current.pause();
          }
      }
      // We only want to run this once on mount, or if we want to reset on param change?
      // If param changes, we should update algorithm.
  }, []);

  useEffect(() => {
      if (controllerRef.current && currentAlgo) {
          controllerRef.current.setAlgorithm(currentAlgo);
      }
  }, [currentAlgo]);

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
      navigate(`/algorithm/${algo}`);
  };

  if (!algoState) return <Box sx={{ p: 4, textAlign: 'center' }}>Loading Visualizer...</Box>;

  const currentStep = algoState.currentStepIndex >= 0 ? algoState.history[algoState.currentStepIndex] : null;

  return (
    <Container maxWidth={false} sx={{ mt: 4, mb: 4, flex: 1 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Header with Selector */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
             <Box>
                 <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {currentAlgo === 'mergeSort' ? 'Merge Sort' : currentAlgo === 'quickSort' ? 'Quick Sort' : 'Bubble Sort'}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {currentAlgo === 'mergeSort' 
                        ? "Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves."
                        : currentAlgo === 'quickSort'
                        ? "Quick Sort is a highly efficient sorting algorithm and is based on partitioning of array of data into smaller arrays."
                        : "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order."}
                </Typography>
             </Box>
             
             <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                 <AlgorithmSelector value={currentAlgo} onChange={handleAlgoChange} disabled={algoState.isPlaying} />
                 <Button variant="outlined" color="primary" onClick={() => setIsInputOpen(true)}>
                  Custom Input
                 </Button>
             </Box>
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
                        Time: {currentAlgo === 'mergeSort' || currentAlgo === 'quickSort' ? 'O(N log N)' : 'O(N²)'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                         Space: {currentAlgo === 'mergeSort' ? 'O(N)' : currentAlgo === 'quickSort' ? 'O(log N)' : 'O(1)'}
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
      
      <InputDataDialog 
        open={isInputOpen} 
        onClose={() => setIsInputOpen(false)} 
        onSubmit={handleCustomInput} 
      />
    </Container>
  );
}
