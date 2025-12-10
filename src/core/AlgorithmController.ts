import type { AlgorithmState, AlgorithmStep } from '../types/types';
import { bubbleSort } from './algorithms/bubbleSort';
import { mergeSort } from './algorithms/mergeSort';

type AlgorithmType = 'bubbleSort' | 'mergeSort';

export class AlgorithmController {
  private initialArray: number[];
  private steps: AlgorithmStep[] = [];
  private currentStepIndex: number = -1;
  private isPlaying: boolean = false;
  private speed: number = 1000;
  private timerId: ReturnType<typeof setInterval> | null = null;
  private onStateChange: (state: AlgorithmState) => void;
  private currentAlgorithm: AlgorithmType = 'bubbleSort';

  constructor(initialArray: number[], onStateChange: (state: AlgorithmState) => void) {
    this.initialArray = [...initialArray];
    this.onStateChange = onStateChange;
    this.generateSteps();
    this.emitState();
  }

  public setAlgorithm(algo: string) {
      if (algo === this.currentAlgorithm) return;
      this.currentAlgorithm = algo as AlgorithmType;
      this.reset();
  }

  public getAlgorithm(): string {
      return this.currentAlgorithm;
  }

  private generateSteps() {
    const generator = this.currentAlgorithm === 'mergeSort' 
        ? mergeSort(this.initialArray) 
        : bubbleSort(this.initialArray);
        
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
      }
      // Always regenerate steps on reset as algorithm might have changed 
      // or array might have changed
      this.generateSteps();
      this.currentStepIndex = -1;
      this.emitState();
  }

  public getCurrentState(): AlgorithmState {
      // Reconstruct array state up to currentStepIndex
      
      const currentArray = [...this.initialArray];
      for (let i = 0; i <= this.currentStepIndex; i++) {
            const step = this.steps[i];
            if (step.type === 'swap') {
                const [idx1, idx2] = step.indices;
                [currentArray[idx1], currentArray[idx2]] = [currentArray[idx2], currentArray[idx1]];
            } else if (step.type === 'overwrite' && step.value !== undefined) {
                // Handle overwrite
                const [idx] = step.indices;
                currentArray[idx] = step.value;
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
