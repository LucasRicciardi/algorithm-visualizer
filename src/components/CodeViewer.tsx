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

const PSEUDOCODE_BINARY = [
    { line: 1, text: 'binarySearch(arr, target):' },
    { line: 2, text: '  low = 0, high = arr.length - 1' },
    { line: 3, text: '  while low <= high:' },
    { line: 4, text: '    mid = floor((low + high) / 2)' },
    { line: 5, text: '    if arr[mid] == target: return mid' },
    { line: 6, text: '    else if arr[mid] < target: low = mid + 1' },
    { line: 7, text: '    else: high = mid - 1' },
    { line: 8, text: '  return -1' },
];

const PSEUDOCODES: Record<string, typeof PSEUDOCODE_BUBBLE> = {
    'bubbleSort': PSEUDOCODE_BUBBLE,
    'mergeSort': PSEUDOCODE_MERGE,
    'quickSort': PSEUDOCODE_QUICK,
    'linearSearch': PSEUDOCODE_LINEAR,
    'binarySearch': PSEUDOCODE_BINARY
};

export default function CodeViewer({ currentLine, algorithm = 'bubbleSort' }: CodeViewerProps) {
    const code = PSEUDOCODES[algorithm] || PSEUDOCODE_BUBBLE;
    const theme = useTheme();

    return (
        <Paper 
            elevation={3} 
            sx={{ 
                p: 2, 
                bgcolor: 'rgba(0, 0, 0, 0.6)', 
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                border: `1px solid ${theme.palette.secondary.main}`,
                boxShadow: `0 0 15px ${theme.palette.secondary.main}40`, // Transparent neon green glow
                minHeight: '200px'
            }}
        >
            <Typography variant="h6" gutterBottom sx={{ color: theme.palette.secondary.main, textShadow: `0 0 5px ${theme.palette.secondary.main}` }}>
                {algorithm === 'mergeSort' ? 'Merge Sort' : algorithm === 'quickSort' ? 'Quick Sort' : algorithm === 'linearSearch' ? 'Linear Search' : algorithm === 'binarySearch' ? 'Binary Search' : 'Bubble Sort'} Pseudocode
            </Typography>
            {code.map((line) => (
                <Box 
                    key={line.line}
                    sx={{
                        color: currentLine === line.line ? '#000' : 'text.secondary',
                        bgcolor: currentLine === line.line ? theme.palette.primary.main : 'transparent',
                        p: 0.5,
                        borderRadius: 1,
                        pl: line.text.startsWith('  ') ? 4 : line.text.startsWith('    ') ? 6 : 1, // Simple indentation handling
                        transition: 'background-color 0.2s',
                        boxShadow: currentLine === line.line ? `0 0 10px ${theme.palette.primary.main}` : 'none',
                        fontWeight: currentLine === line.line ? 'bold' : 'normal'
                    }}
                >
                    {line.text}
                </Box>
            ))}
        </Paper>
    );
}
