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

const PSEUDOCODE_DIJKSTRA = [
    { line: 1, text: 'function Dijkstra(Graph, source):' },
    { line: 2, text: '  dist[source] = 0' },
    { line: 3, text: '  create vertex set Q' },
    { line: 4, text: '  for each vertex v in Graph:' },
    { line: 5, text: '    if v ≠ source: dist[v] = INFINITY' },
    { line: 6, text: '    add v to Q' },
    { line: 7, text: '  while Q is not empty:' },
    { line: 8, text: '    u = vertex in Q with min dist[u]' },
    { line: 9, text: '    remove u from Q' },
    { line: 10, text: '    for each neighbor v of u:' },
    { line: 11, text: '      alt = dist[u] + length(u, v)' },
    { line: 12, text: '      if alt < dist[v]:' },
    { line: 13, text: '        dist[v] = alt' },
];

const PSEUDOCODE_HEAP = [
    { line: 1, text: 'heapSort(arr): buildMaxHeap(arr)' },
    { line: 2, text: '  for i = n/2 - 1 to 0: heapify(arr, n, i)' },
    { line: 3, text: '  for i = n - 1 to 1:' },
    { line: 4, text: '    swap(arr[0], arr[i])' },
    { line: 5, text: '    heapify(arr, i, 0)' },
    { line: 6, text: 'heapify(arr, n, i):' },
    { line: 7, text: '  largest = i; l = 2*i + 1; r = 2*i + 2' },
    { line: 8, text: '  if l < n && arr[l] > arr[largest]: largest = l' },
    { line: 9, text: '  if r < n && arr[r] > arr[largest]: largest = r' },
    { line: 10, text: '  if largest != i: swap(arr[i], arr[largest]); heapify(arr, n, largest)' }
];

const PSEUDOCODES: Record<string, { line: number; text: string }[]> = {
    'bubbleSort': PSEUDOCODE_BUBBLE,
    'mergeSort': PSEUDOCODE_MERGE,
    'quickSort': PSEUDOCODE_QUICK,
    'heapSort': PSEUDOCODE_HEAP,
    'linearSearch': PSEUDOCODE_LINEAR,
    'binarySearch': PSEUDOCODE_BINARY,
    'dijkstra': PSEUDOCODE_DIJKSTRA,
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
                {algorithm === 'mergeSort' ? 'Merge Sort' : algorithm === 'quickSort' ? 'Quick Sort' : algorithm === 'heapSort' ? 'Heap Sort' : algorithm === 'linearSearch' ? 'Linear Search' : algorithm === 'binarySearch' ? 'Binary Search' : 'Bubble Sort'} Pseudocode
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
