import type { AlgorithmStep } from '../../types/types';

export function* linearSearch(array: number[], target: number): Generator<AlgorithmStep> {
    for (let i = 0; i < array.length; i++) {
        // Highlight current element being checked
        yield {
            type: 'compare',
            indices: [i],
            description: `Checking index ${i}: Is ${array[i]} equal to ${target}?`,
            line: 2 // if array[i] == target
        };

        if (array[i] === target) {
            yield {
                type: 'found',
                indices: [i],
                description: `Found target ${target} at index ${i}!`,
                line: 3 // return i
            };
            return;
        }
    }

    yield {
        type: 'highlight', // or strict highlight to show not found?
        indices: [],
        description: `Target ${target} not found in the array.`,
        line: 4 // return -1
    };
}
