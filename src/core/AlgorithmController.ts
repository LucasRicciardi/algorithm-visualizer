import type { AlgorithmState, AlgorithmStep } from '../types/types';
import { bubbleSort } from './algorithms/bubbleSort';

export class AlgorithmController {
  private initialArray: number[];
  private steps: AlgorithmStep[] = [];
  private currentStepIndex: number = -1;
  private isPlaying: boolean = false;
  private speed: number = 1000;
  private timerId: ReturnType<typeof setInterval> | null = null;
  private onStateChange: (state: AlgorithmState) => void;

  constructor(initialArray: number[], onStateChange: (state: AlgorithmState) => void) {
    this.initialArray = [...initialArray];
    this.onStateChange = onStateChange;
    this.generateSteps();
    this.emitState();
  }

  private generateSteps() {
    const generator = bubbleSort(this.initialArray);
    this.steps = [];
    for (const step of generator) {
      this.steps.push(step);
    }
  }

  public play() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.emitState();
    
    this.timerId = setInterval(() => {
        if (this.currentStepIndex < this.steps.length - 1) {
            this.next();
        } else {
            this.pause();
        }
    }, this.speed);
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
    }
    this.emitState();
  }

  public next() {
    if (this.currentStepIndex < this.steps.length - 1) {
      this.currentStepIndex++;
      this.emitState();
    }
  }

  public prev() {
    if (this.currentStepIndex >= 0) {
        this.currentStepIndex--;
        this.emitState();
    }
  }

  public setSpeed(ms: number) {
      this.speed = ms;
      if (this.isPlaying) {
          this.pause();
          this.play();
      }
      this.emitState(); // Update speed in state
  }

  public reset(newArray?: number[]) {
      this.pause();
      if (newArray) {
          this.initialArray = [...newArray];
          this.generateSteps();
      }
      this.currentStepIndex = -1;
      this.emitState();
  }

  public getCurrentState(): AlgorithmState {
      // Reconstruct array state up to currentStepIndex
      // This is less efficient than mutating, but safer for React state (immutability).
      // Optimization: Could store intermediate array snapshots if performance becomes issue.
      
      const currentArray = [...this.initialArray];
      for (let i = 0; i <= this.currentStepIndex; i++) {
            const step = this.steps[i];
            if (step.type === 'swap') {
                const [idx1, idx2] = step.indices;
                [currentArray[idx1], currentArray[idx2]] = [currentArray[idx2], currentArray[idx1]];
            }
      }

      return {
          array: currentArray,
          history: this.steps,
          currentStepIndex: this.currentStepIndex,
          isPlaying: this.isPlaying,
          speed: this.speed,
          isFinished: this.currentStepIndex === this.steps.length - 1
      };
  }

  private emitState() {
      this.onStateChange(this.getCurrentState());
  }
  
  public getStepsCount() {
      return this.steps.length;
  }
}
