import { describe, it, expect } from 'vitest';
import { quickSort } from './quickSort';
import type { AlgorithmStep } from '../../types/types';

describe('quickSort', () => {
    it('should sort an unsorted array', () => {
        const input = [3, 1, 2];
        const generator = quickSort(input);
        const steps: AlgorithmStep[] = [];
        for (const step of generator) {
            steps.push(step);
        }
        
        const swapSteps = steps.filter(s => s.type === 'swap');
        // Quick sort typically swaps elements
        expect(swapSteps.length).toBeGreaterThan(0);
        
        const lastStep = steps[steps.length - 1];
        expect(lastStep.type).toBe('sorted');
    });

    it('should handle already sorted array', () => {
        const input = [1, 2, 3];
        const steps = Array.from(quickSort(input));
        // Even sorted, quick sort does comparisons and possibly swaps (if pivot selection is simple)
        expect(steps.length).toBeGreaterThan(0);
        expect(steps[steps.length - 1].type).toBe('sorted');
    });

    it('should handle reverse sorted array', () => {
        const input = [3, 2, 1];
        const steps = Array.from(quickSort(input));
        expect(steps.length).toBeGreaterThan(0);
        expect(steps[steps.length - 1].type).toBe('sorted');
    });
});
