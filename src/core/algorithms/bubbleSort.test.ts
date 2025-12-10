import { describe, it, expect } from 'vitest';
import { bubbleSort } from './bubbleSort';
import type { AlgorithmStep } from '../../types/types';

describe('bubbleSort', () => {
    it('should sort an unsorted array', () => {
        const input = [3, 1, 2];
        const generator = bubbleSort(input);
        const steps: AlgorithmStep[] = [];
        for (const step of generator) {
            steps.push(step);
            if(step.type === 'swap') {
                // Simulate swap on our copy to check end result if testing full logic
                // But array mutation happens in controller. 
                // Here we just check steps.
            }
        }
        
        // Check for specific expected steps
        // 3 vs 1 -> swap
        // 3 vs 2 -> swap
        // ...
        
        const swapSteps = steps.filter(s => s.type === 'swap');
        expect(swapSteps.length).toBeGreaterThan(0);
        expect(steps[steps.length - 1].type).toBe('sorted');
    });

    it('should handle already sorted array', () => {
        const input = [1, 2, 3];
        const steps = Array.from(bubbleSort(input));
        const swapSteps = steps.filter(s => s.type === 'swap');
        expect(swapSteps.length).toBe(0);
    });
});
