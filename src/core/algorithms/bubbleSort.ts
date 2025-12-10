import type { AlgorithmStep } from '../../types/types';

export function* bubbleSort(array: number[]): Generator<AlgorithmStep> {
  const arr = [...array]; // Work on a copy
  const n = arr.length;
  let swapped;

  for (let i = 0; i < n - 1; i++) {
    swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      // Compare
      yield {
        type: 'compare',
        indices: [j, j + 1],
        description: `Comparing ${arr[j]} and ${arr[j + 1]}`,
        line: 4
      };

      if (arr[j] > arr[j + 1]) {
        // Swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
        yield {
          type: 'swap',
          indices: [j, j + 1],
          description: `Swapped ${arr[j + 1]} and ${arr[j]}`,
          line: 5
        };
      }
    }
    // Element at n-i-1 is sorted
    yield {
      type: 'sorted',
      indices: [n - i - 1],
      description: `${arr[n - i - 1]} is now in its sorted position`,
      line: 1
    };
    
    if (!swapped) {
       // Optimisation: if no swaps, array is sorted.
       // Mark remaining as sorted
       for(let k = 0; k < n - i - 1; k++) {
           yield {
               type: 'sorted',
               indices: [k],
               description: `${arr[k]} is sorted`,
               line: 7
           }
       }
       break;
    }
  }
  // catch the last one (index 0) if loop finished naturally
  if (swapped) { // Check purely to avoid double yielding if optimized break happened
      yield {
        type: 'sorted',
        indices: [0],
        description: `${arr[0]} is sorted`,
        line: 3
    };
  }
}
