import { useRef, useState, useEffect } from 'react';
import { Container, Box, Typography, Button, TextField, Paper, useTheme } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrayVisualizer from '../components/ArrayVisualizer';
import GraphVisualizer from '../components/GraphVisualizer';
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
  const theme = useTheme();
  const currentAlgo = type || 'bubbleSort';
  
  const [algoState, setAlgoState] = useState<AlgorithmState | null>(null);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const controllerRef = useRef<AlgorithmController | null>(null);

  const [targetValue, setTargetValue] = useState(42);
  const [startNode, setStartNode] = useState(0);
  const [endNode, setEndNode] = useState(24);

  useEffect(() => {
      // Initialize controller on mount
      const data = generateRandomData();
      controllerRef.current = new AlgorithmController(data, (newState) => {
          setAlgoState(newState);
      });
      
      // Set initial algorithm and target based on URL
      controllerRef.current.setAlgorithm(currentAlgo);
      
      // If binary search, ensure initial data is sorted
      if (currentAlgo === 'binarySearch') {
          const sortedData = [...data].sort((a, b) => a - b);
          controllerRef.current.reset(sortedData);
      }
      
      
      controllerRef.current.setTarget(targetValue);
      controllerRef.current.setGraphParams(startNode, endNode);
      
      return () => {
          if (controllerRef.current) {
              controllerRef.current.pause();
          }
      }
  }, []);

  useEffect(() => {
      if (controllerRef.current && currentAlgo) {
          controllerRef.current.setAlgorithm(currentAlgo);
          // If switching to search, make sure target is set
          if (currentAlgo === 'linearSearch' || currentAlgo === 'binarySearch') {
              controllerRef.current.setTarget(targetValue);
          }
          if (currentAlgo === 'dijkstra') {
              controllerRef.current.setGraphParams(startNode, endNode);
          }
          
          // If switching to binary search, sort the current data
          if (currentAlgo === 'binarySearch') {
              // Better to just generate new random sorted data to be clean
               const newData = generateRandomData();
               newData.sort((a, b) => a - b);
               controllerRef.current.reset(newData);
          }
      }
  }, [currentAlgo]);

  const handlePlay = () => controllerRef.current?.play();
  const handlePause = () => controllerRef.current?.pause();
  const handleNext = () => controllerRef.current?.next();
  const handlePrev = () => controllerRef.current?.prev();
  const handleReset = () => {
      const newData = generateRandomData();
      controllerRef.current?.reset(newData);
      // Also randomize target for linear search or binary search
      if (currentAlgo === 'linearSearch' || currentAlgo === 'binarySearch') {
          // 50% chance to pick a value from array, 50% random
          const shouldExist = Math.random() > 0.5;
          let newTarget;
          
          // For Binary Search, data MUST be sorted.
          // However, reset(newData) sets the array.
          // If we are in binary search, we should sort newData before setting it.
          let finalData = [...newData];
          if (currentAlgo === 'binarySearch') {
              finalData.sort((a, b) => a - b);
              controllerRef.current?.reset(finalData);
          } else {
              controllerRef.current?.reset(newData);
          }

          if (shouldExist && finalData.length > 0) {
               newTarget = finalData[Math.floor(Math.random() * finalData.length)];
          } else {
               newTarget = Math.floor(Math.random() * 90) + 10;
          }
          setTargetValue(newTarget);
          controllerRef.current?.setTarget(newTarget);
      } else {
           controllerRef.current?.reset(newData);
      }
  };
  const handleSpeedChange = (speed: number) => controllerRef.current?.setSpeed(speed);
  
  const handleCustomInput = (data: number[]) => {
      // If binary search, sort the custom input
      if (currentAlgo === 'binarySearch') {
          data.sort((a, b) => a - b);
      }
      controllerRef.current?.reset(data);
  };

  const handleGraphParamChange = (type: 'start' | 'end', val: string) => {
      const num = parseInt(val);
      if (!isNaN(num)) {
          if (type === 'start') {
              setStartNode(num);
              controllerRef.current?.setGraphParams(num, endNode);
          } else {
              setEndNode(num);
              controllerRef.current?.setGraphParams(startNode, num);
          }
      }
  };

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = parseInt(e.target.value);
      if (!isNaN(val)) {
          setTargetValue(val);
          controllerRef.current?.setTarget(val);
      }
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
                  {currentAlgo === 'mergeSort' ? 'Merge Sort' : currentAlgo === 'quickSort' ? 'Quick Sort' : currentAlgo === 'linearSearch' ? 'Linear Search' : currentAlgo === 'binarySearch' ? 'Binary Search' : currentAlgo === 'dijkstra' ? "Dijkstra's Algorithm" : 'Bubble Sort'}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {currentAlgo === 'mergeSort' 
                        ? "Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves."
                        : currentAlgo === 'quickSort'
                        ? "Quick Sort is a highly efficient sorting algorithm and is based on partitioning of array of data into smaller arrays."
                        : currentAlgo === 'linearSearch'
                        ? "Linear Search sequentially checks each element of the list until a match is found or the whole list has been searched."
                        : currentAlgo === 'binarySearch'
                        ? "Binary Search compares the target value to the middle element of the array. If they are not equal, the half in which the target cannot lie is eliminated."
                        : currentAlgo === 'dijkstra'
                        ? "Dijkstra's algorithm is an algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks."
                        : "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order."}
                </Typography>
             </Box>
             
             <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                 {(currentAlgo === 'linearSearch' || currentAlgo === 'binarySearch') && (
                     <TextField 
                         label="Target" 
                         type="number" 
                         size="small" 
                         value={targetValue} 
                         onChange={handleTargetChange}
                         sx={{ width: 100 }}
                         disabled={algoState.isPlaying}
                     />
                 )}
                 
                 {currentAlgo === 'dijkstra' && (
                     <>
                        <TextField 
                            label="Source" 
                            type="number" 
                            size="small" 
                            value={startNode} 
                            onChange={(e) => handleGraphParamChange('start', e.target.value)}
                            sx={{ width: 80 }}
                            disabled={algoState.isPlaying}
                        />
                         <TextField 
                            label="Target" 
                            type="number" 
                            size="small" 
                            value={endNode} 
                            onChange={(e) => handleGraphParamChange('end', e.target.value)}
                            sx={{ width: 80 }}
                            disabled={algoState.isPlaying}
                        />
                     </>
                 )}

                 <AlgorithmSelector value={currentAlgo} onChange={handleAlgoChange} disabled={algoState.isPlaying} />
                 <Button variant="outlined" color="primary" onClick={() => setIsInputOpen(true)}>
                  Custom Input
                 </Button>
             </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 3 }}>
            {/* Left Column: Visualization */}
            <Box sx={{ flex: { lg: 2 }, display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
                {currentAlgo === 'dijkstra' ? (
                    <GraphVisualizer state={algoState} />
                ) : (
                    <ArrayVisualizer state={algoState} />
                )}
                
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
                
                {/* Stats & Complexity Card */}
                 <Paper 
                    elevation={3} 
                    sx={{ 
                        p: 2, 
                        bgcolor: 'rgba(0, 0, 0, 0.6)', 
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.primary.main}`,
                        boxShadow: `0 0 15px ${theme.palette.primary.main}40`,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}
                >
                    <Box>
                        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.main, textShadow: `0 0 5px ${theme.palette.primary.main}` }}>
                            Complexity
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                            Time: {currentAlgo === 'binarySearch' ? 'O(log N)' : currentAlgo === 'linearSearch' ? 'O(N)' : currentAlgo === 'mergeSort' || currentAlgo === 'quickSort' ? 'O(N log N)' : currentAlgo === 'dijkstra' ? 'O(E + V log V)' : 'O(N²)'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                             Space: {currentAlgo === 'mergeSort' ? 'O(N)' : currentAlgo === 'quickSort' || currentAlgo === 'binarySearch' ? 'O(log N)' : currentAlgo === 'dijkstra' ? 'O(V + E)' : 'O(1)'}
                        </Typography>
                    </Box>
                    
                    <Box>
                        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.main, textShadow: `0 0 5px ${theme.palette.primary.main}` }}>
                            Stats
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Comparisons: {
                               algoState.history.slice(0, algoState.currentStepIndex + 1).filter(s => s.type === 'compare').length
                            }
                        </Typography>
                        {currentAlgo !== 'linearSearch' && currentAlgo !== 'binarySearch' && currentAlgo !== 'dijkstra' && (
                             <Typography variant="body2" color="text.secondary">
                                 {currentAlgo === 'mergeSort' ? 'Overwrites' : 'Swaps'}: {
                                algoState.history.slice(0, algoState.currentStepIndex + 1).filter(s => s.type === (currentAlgo === 'mergeSort' ? 'overwrite' : 'swap')).length
                            }</Typography>
                         )}
                    </Box>
                </Paper>
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
