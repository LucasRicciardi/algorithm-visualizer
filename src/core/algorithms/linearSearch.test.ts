import { describe, it, expect } from 'vitest';
import { linearSearch } from './linearSearch';
import type { AlgorithmStep } from '../../types/types';

describe('linearSearch', () => {
    it('should find the target if it exists', () => {
        const input = [10, 20, 30, 40, 50];
        const target = 30;
        const generator = linearSearch(input, target);
        const steps: AlgorithmStep[] = [];
        for (const step of generator) {
            steps.push(step);
        }
        
        const foundStep = steps.find(s => s.type === 'found');
        expect(foundStep).toBeDefined();
        expect(foundStep?.indices).toContain(2); // Index of 30 is 2
    });

    it('should return not found if target does not exist', () => {
        const input = [10, 20, 30];
        const target = 99;
        const steps = Array.from(linearSearch(input, target));
        
        const foundStep = steps.find(s => s.type === 'found');
        expect(foundStep).toBeUndefined();
        
        const lastStep = steps[steps.length - 1];
        expect(lastStep.type).toBe('highlight'); // Final "not found" highlight
    });
});
