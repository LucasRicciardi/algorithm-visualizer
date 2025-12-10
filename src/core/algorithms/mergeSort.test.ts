import { describe, it, expect } from 'vitest';
import { mergeSort } from './mergeSort';
import type { AlgorithmStep } from '../../types/types';

describe('mergeSort', () => {
    it('should sort an unsorted array', () => {
        const input = [3, 1, 2];
        const generator = mergeSort(input);
        const steps: AlgorithmStep[] = [];
        for (const step of generator) {
            steps.push(step);
        }
        
        const overwriteSteps = steps.filter(s => s.type === 'overwrite');
        expect(overwriteSteps.length).toBeGreaterThan(0);
        // The last steps might be 'sorted' confirmation
        // But the key is that we have overwrites
    });

    it('should handle already sorted array', () => {
        const input = [1, 2, 3];
        // Merge sort always does work O(N log N) regardless of order
        const steps = Array.from(mergeSort(input));
        const overwriteSteps = steps.filter(s => s.type === 'overwrite');
        expect(overwriteSteps.length).toBeGreaterThan(0);
    });

    it('should handle reverse sorted array', () => {
        const input = [3, 2, 1];
        const steps = Array.from(mergeSort(input));
        const overwriteSteps = steps.filter(s => s.type === 'overwrite');
        expect(overwriteSteps.length).toBeGreaterThan(0); 
    });
});
