import type { AlgorithmStep } from '../../types/types';

function* heapify(
    arr: number[],
    n: number,
    i: number
): Generator<AlgorithmStep, void, unknown> {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    // Highlight current node and children being considered
    const indicesToHighlight = [i];
    if (left < n) indicesToHighlight.push(left);
    if (right < n) indicesToHighlight.push(right);

    yield {
        type: 'highlight',
        indices: indicesToHighlight,
        description: `Heapify: Checking node ${i} with children ${left < n ? left : ''} ${right < n ? right : ''}`,
        line: 2 // Assuming pseudocode mapping
    };

    // Compare left child
    if (left < n) {
        yield {
            type: 'compare',
            indices: [left, largest],
            description: `Comparing left child ${arr[left]} with current largest ${arr[largest]}`,
            line: 3
        };
        if (arr[left] > arr[largest]) {
            largest = left;
        }
    }

    // Compare right child
    if (right < n) {
        yield {
            type: 'compare',
            indices: [right, largest],
            description: `Comparing right child ${arr[right]} with current largest ${arr[largest]}`,
            line: 4
        };
        if (arr[right] > arr[largest]) {
            largest = right;
        }
    }

    if (largest !== i) {
        // Swap
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        yield {
            type: 'swap',
            indices: [i, largest],
            description: `Swapping ${arr[i]} and ${arr[largest]} to maintain max-heap property`,
            line: 5
        };

        // Recursively heapify the affected sub-tree
        yield* heapify(arr, n, largest);
    }
}

export function* heapSort(array: number[]): Generator<AlgorithmStep> {
    const arr = [...array];
    const n = arr.length;

    yield {
        type: 'highlight',
        indices: Array.from({ length: n }, (_, k) => k),
        description: 'Building Max Heap',
        line: 1
    };

    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        yield* heapify(arr, n, i);
    }

    // One by one extract an element from heap
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        [arr[0], arr[i]] = [arr[i], arr[0]];
        yield {
            type: 'swap',
            indices: [0, i],
            description: `Moving max element ${arr[i]} to the end (position ${i})`,
            line: 8
        };

        yield {
            type: 'sorted',
            indices: [i],
            description: `Element ${arr[i]} is now sorted`,
            line: 9
        };

        // call max heapify on the reduced heap
        yield* heapify(arr, i, 0);
    }

    yield {
        type: 'sorted',
        indices: [0],
        description: `Last element ${arr[0]} is sorted`,
        line: 9
    };

    yield {
        type: 'sorted',
        indices: Array.from({ length: n }, (_, k) => k),
        description: 'Array is fully sorted',
        line: 10
    };
}
