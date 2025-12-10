import type { AlgorithmStep } from '../../types/types';

export function* binarySearch(array: number[], target: number): Generator<AlgorithmStep> {
    let low = 0;
    let high = array.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);

        // Highlight the current range
        yield {
            type: 'highlight',
            indices: Array.from({ length: high - low + 1 }, (_, k) => k + low), // Highlight full range? Or just low/high/mid?
            // Highlighting full range might be too noisy. Let's start with highlighting bounds and mid.
            // Actually, visually dimming outside range is cool, but 'highlight' usually means active color.
            // Let's just highlight low, mid, high.
            description: `Searching range [${low}, ${high}]. Mid index: ${mid}, Value: ${array[mid]}`,
            line: 2 // while low <= high
        };
        
        // Explicitly highlight mid comparison
        yield {
            type: 'compare',
            indices: [mid],
            description: `Comparing target ${target} with ${array[mid]}`,
            line: 3 // mid calculation or comparison
        };

        if (array[mid] === target) {
            yield {
                type: 'found',
                indices: [mid],
                description: `Found target ${target} at index ${mid}!`,
                line: 4 // return mid
            };
            return;
        }

        if (array[mid] < target) {
            yield {
                type: 'highlight',
                indices: [low, mid, high], // Show what we are discarding?
                description: `${array[mid]} < ${target}, ignoring left half.`,
                line: 5 // low = mid + 1
            };
            low = mid + 1;
        } else {
            yield {
                type: 'highlight',
                indices: [low, mid, high],
                description: `${array[mid]} > ${target}, ignoring right half.`,
                line: 6 // high = mid - 1
            };
            high = mid - 1;
        }
    }

    yield {
        type: 'highlight',
        indices: [],
        description: `Target ${target} not found.`,
        line: 7 // return -1
    };
}
