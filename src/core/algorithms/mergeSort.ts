import type { AlgorithmStep } from '../../types/types';

export function* mergeSort(array: number[]): Generator<AlgorithmStep> {
  const arr = [...array];
  // Work with a copy for persistent indices references if needed, 
  // but for merge sort we usually need global index tracking.
  // We will perform recursive merge sort and yield 'overwrite' steps when merging back.
  
  yield* mergeSortHelper(arr, 0, arr.length - 1);
  
  // Final sorted confirmation for the whole array
  // (Optional, as individual merges might logically mark sections as sorted-ish)
  for (let i = 0; i < arr.length; i++) {
        yield {
            type: 'sorted',
            indices: [i],
            description: `${arr[i]} is in sorted position`,
            line: 0 // generic
        };
  }
}

function* mergeSortHelper(arr: number[], left: number, right: number): Generator<AlgorithmStep> {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    yield* mergeSortHelper(arr, left, mid);
    yield* mergeSortHelper(arr, mid + 1, right);
    yield* merge(arr, left, mid, right);
}

function* merge(arr: number[], left: number, mid: number, right: number): Generator<AlgorithmStep> {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
        // Highlighting elements being compared:
        // Original indices logic:
        // leftArr[i] came from index left + i
        // rightArr[j] came from index mid + 1 + j
        
        yield {
            type: 'compare',
            indices: [left + i, mid + 1 + j],
            description: `Comparing ${leftArr[i]} and ${rightArr[j]}`,
            line: 1 // Placeholder
        };

        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            
            yield {
                type: 'overwrite',
                indices: [k],
                value: leftArr[i],
                description: `Overwrite index ${k} with ${leftArr[i]}`,
                line: 2 
            };
            
            i++;
        } else {
            arr[k] = rightArr[j];
             yield {
                type: 'overwrite',
                indices: [k],
                value: rightArr[j],
                description: `Overwrite index ${k} with ${rightArr[j]}`,
                line: 3 
            };
            j++;
        }
        k++;
    }

    while (i < leftArr.length) {
        arr[k] = leftArr[i];
        yield {
                type: 'overwrite',
                indices: [k],
                value: leftArr[i],
                description: `Overwrite index ${k} with ${leftArr[i]}`,
                line: 4
        };
        i++;
        k++;
    }

    while (j < rightArr.length) {
        arr[k] = rightArr[j];
        yield {
                type: 'overwrite',
                indices: [k],
                value: rightArr[j],
                description: `Overwrite index ${k} with ${rightArr[j]}`,
                line: 5
        };
        j++;
        k++;
    }
}
