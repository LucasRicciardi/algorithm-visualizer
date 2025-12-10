import { Box, Paper, Typography, useTheme } from '@mui/material';

interface CodeViewerProps {
    currentLine?: number;
    algorithm?: string;
}

const PSEUDOCODE_BUBBLE = [
    { line: 1, text: 'for i from 0 to n-1:' },
    { line: 2, text: '  swapped = false' },
    { line: 3, text: '  for j from 0 to n-i-1:' },
    { line: 4, text: '    if array[j] > array[j+1]:' },
    { line: 5, text: '      swap(array[j], array[j+1])' },
    { line: 6, text: '      swapped = true' },
    { line: 7, text: '  if not swapped: break' },
];

const PSEUDOCODE_MERGE = [
    { line: 1, text: 'merge(arr, left, mid, right):' },
    { line: 2, text: '  if leftArr[i] <= rightArr[j]:' },
    { line: 3, text: '    arr[k] = leftArr[i]; i++' },
    { line: 4, text: '  else: arr[k] = rightArr[j]; j++' },
    { line: 5, text: '  while i < left: arr[k] = left[i]' }, 
    { line: 6, text: '  while j < right: arr[k] = right[j]' },
    // Simplified representation mappings
];

const PSEUDOCODE_QUICK = [
    { line: 1, text: 'quickSort(arr, low, high):' },
    { line: 2, text: '  if low < high:' },
    { line: 3, text: '    pi = partition(arr, low, high)' }, // pivot index
    { line: 4, text: '    quickSort(arr, low, pi - 1)' },
    { line: 5, text: '    quickSort(arr, pi + 1, high)' },
    { line: 6, text: 'partition(arr, low, high):' },
    { line: 7, text: '  pivot = arr[high]; i = low - 1' },
    { line: 8, text: '  for j = low to high - 1:' },
    { line: 9, text: '    if arr[j] < pivot: i++; swap(arr[i], arr[j])' },
    { line: 10, text: '  swap(arr[i + 1], arr[high])' },
    { line: 11, text: '  return i + 1' },
];

const PSEUDOCODE_LINEAR = [
    { line: 1, text: 'linearSearch(arr, target):' },
    { line: 2, text: '  for i from 0 to n-1:' },
    { line: 3, text: '    if arr[i] == target: return i' },
    { line: 4, text: '  return -1' },
];

const PSEUDOCODES: Record<string, typeof PSEUDOCODE_BUBBLE> = {
    'bubbleSort': PSEUDOCODE_BUBBLE,
    'mergeSort': PSEUDOCODE_MERGE,
    'quickSort': PSEUDOCODE_QUICK,
    'linearSearch': PSEUDOCODE_LINEAR
};

export default function CodeViewer({ currentLine, algorithm = 'bubbleSort' }: CodeViewerProps) {
    const theme = useTheme();
    const code = PSEUDOCODES[algorithm] || PSEUDOCODE_BUBBLE;
    
    return (
        <Paper elevation={3} sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom color="primary">
                {algorithm === 'mergeSort' ? 'Merge Sort' : 'Bubble Sort'} Pseudocode
            </Typography>
            <Box component="pre" sx={{ m: 0, fontFamily: 'monospace', fontSize: '0.9rem' }}>
                {code.map((item) => (
                    <Box 
                        key={item.line}
                        sx={{ 
                            p: 0.5, 
                            borderRadius: 1,
                            bgcolor: currentLine === item.line ? 'rgba(124, 77, 255, 0.2)' : 'transparent',
                            color: currentLine === item.line ? theme.palette.primary.light : 'text.secondary',
                            borderLeft: currentLine === item.line ? `4px solid ${theme.palette.primary.main}` : '4px solid transparent',
                            pl: 2
                        }}
                    >
                        {item.text}
                    </Box>
                ))}
            </Box>
        </Paper>
    );
}
