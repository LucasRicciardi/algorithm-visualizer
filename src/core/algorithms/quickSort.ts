import type { AlgorithmStep } from '../../types/types';

function* partition(
    arr: number[],
    low: number,
    high: number
): Generator<AlgorithmStep, number, unknown> {
    const pivot = arr[high];
    
    // Highlight pivot
    yield {
        type: 'highlight',
        indices: [high],
        description: `Choosing pivot element: ${pivot}`,
        line: 1 // Assuming pseudocode line for pivot selection
    };

    let i = low - 1;

    for (let j = low; j < high; j++) {
        // Compare current element with pivot
        yield {
            type: 'compare',
            indices: [j, high],
            description: `Comparing ${arr[j]} with pivot ${pivot}`,
            line: 3 // Comparing arr[j] < pivot
        };

        if (arr[j] < pivot) {
            i++;
            // Swap arr[i] and arr[j]
            [arr[i], arr[j]] = [arr[j], arr[i]];
            yield {
                type: 'swap',
                indices: [i, j],
                description: `Swapping ${arr[i]} and ${arr[j]}`,
                line: 4 // swap(arr[i], arr[j])
            };
        }
    }

    // Swap pivot to its correct position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    
    yield {
        type: 'swap',
        indices: [i + 1, high],
        description: `Placing pivot ${pivot} at correct position ${i + 1}`,
        line: 5 // swap(arr[i+1], arr[high]) (placing pivot)
    };
    
    // Highlight the sorted position of pivot
    yield {
        type: 'sorted',
        indices: [i + 1],
        description: `Pivot ${pivot} is now at its sorted position`,
        line: 6
    };

    return i + 1;
}

function* quickSortRecursive(
    arr: number[],
    low: number,
    high: number
): Generator<AlgorithmStep, void, unknown> {
    if (low < high) {
        // Yield step for partitioning call
        yield {
            type: 'highlight',
            indices: [], // Maybe range highlight? 
            description: `Partitioning range [${low}, ${high}]`,
            line: 1 // quickSort(arr, low, high) entry
        };

        // We need to yield* from generator return value
        // But generators in JS return iterator, getting return value is tricky with yield*
        // However, yield* returns the return value of the delegated generator!
        const pi = yield* partition(arr, low, high);

        // Recursively sort elements before partition and after partition
        yield* quickSortRecursive(arr, low, pi - 1);
        yield* quickSortRecursive(arr, pi + 1, high);
    } else if (low === high) {
         yield {
            type: 'sorted',
            indices: [low],
            description: `Element at ${low} is sorted`,
            line: 1
        };
    }
}

export function* quickSort(array: number[]): Generator<AlgorithmStep> {
    const arr = [...array]; // Work on a copy initially? Or reference? 
    // The controller passes limits, but usually we modifying the array in place.
    // The controller reconstructs state steps. 
    // So 'arr' here is just logical state tracking.
    
    yield* quickSortRecursive(arr, 0, arr.length - 1);
    
    // Ensure all range is marked sorted at the end
    yield {
        type: 'sorted',
        indices: Array.from({length: arr.length}, (_, i) => i),
        description: 'Array is fully sorted',
        line: 7
    };
}
