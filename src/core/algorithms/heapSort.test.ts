import { describe, it, expect } from 'vitest';
import { heapSort } from './heapSort';
import type { AlgorithmStep } from '../../types/types';

describe('heapSort', () => {
    it('should sort an unsorted array', () => {
        const input = [3, 1, 2];
        const generator = heapSort(input);
        const steps: AlgorithmStep[] = [];
        for (const step of generator) {
            steps.push(step);
        }
        
        const swapSteps = steps.filter(s => s.type === 'swap');
        expect(swapSteps.length).toBeGreaterThan(0);
        
        const lastStep = steps[steps.length - 1];
        expect(lastStep.type).toBe('sorted');
        expect(lastStep.description).toBe('Array is fully sorted');
    });

    it('should handle already sorted array', () => {
        const input = [1, 2, 3];
        const steps = Array.from(heapSort(input));
        
        // Heap Sort will still perform swaps to build heap and then sort
        expect(steps.length).toBeGreaterThan(0);
        expect(steps[steps.length - 1].type).toBe('sorted');
    });

    it('should handle reverse sorted array', () => {
        const input = [3, 2, 1];
        const steps = Array.from(heapSort(input));
        expect(steps.length).toBeGreaterThan(0);
        expect(steps[steps.length - 1].type).toBe('sorted');
    });

    it('should handle array with duplicates', () => {
        const input = [3, 1, 2, 1];
        const steps = Array.from(heapSort(input));
        expect(steps.length).toBeGreaterThan(0);
        expect(steps[steps.length - 1].type).toBe('sorted');
    });
});
