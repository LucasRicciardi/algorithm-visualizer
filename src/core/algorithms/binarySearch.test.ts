import { describe, it, expect } from 'vitest';
import { binarySearch } from './binarySearch';
import type { AlgorithmStep } from '../../types/types';

describe('binarySearch', () => {
    it('should find the target if it exists', () => {
        const input = [10, 20, 30, 40, 50]; // Sorted
        const target = 40;
        const generator = binarySearch(input, target);
        const steps: AlgorithmStep[] = [];
        for (const step of generator) {
            steps.push(step);
        }
        
        const foundStep = steps.find(s => s.type === 'found');
        expect(foundStep).toBeDefined();
        expect(foundStep?.indices).toContain(3); // Index of 40 is 3
    });

    it('should return not found if target does not exist', () => {
        const input = [10, 20, 30, 40, 50];
        const target = 25;
        const steps = Array.from(binarySearch(input, target));
        
        const foundStep = steps.find(s => s.type === 'found');
        expect(foundStep).toBeUndefined();
        
        const lastStep = steps[steps.length - 1];
        expect(lastStep.type).toBe('highlight'); // Final "not found" highlight
        expect(lastStep.description).toContain('not found');
    });

    it('should correctly reduce range', () => {
        const input = [10, 20, 30, 40, 50, 60, 70];
        const target = 20;
        const generator = binarySearch(input, target);
        
        // Initial range 0-6, mid 3 (40) > 20 -> go left (0-2)
        // Range 0-2, mid 1 (20) == 20 -> found
        
        const steps = Array.from(generator);
        
        // Check for range highlight updates
        const rangeHighlights = steps.filter(s => s.type === 'highlight' && s.description.startsWith('Searching range'));
        expect(rangeHighlights.length).toBeGreaterThanOrEqual(2);
    });
});
