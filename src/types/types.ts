export type AlgorithmStepType = 'compare' | 'swap' | 'highlight' | 'sorted' | 'overwrite' | 'found';

export interface AlgorithmStep {
  type: AlgorithmStepType;
  indices: number[]; // Indices of elements involved
  description: string;
  line?: number; // Line number in pseudocode
  value?: number; // For overwrite operations
}

export interface AlgorithmState {
  array: number[];
  history: AlgorithmStep[];
  currentStepIndex: number;
  isPlaying: boolean;
  speed: number;
  isFinished: boolean;
}

export interface VizCommand {
  type: 'SET_ARRAY' | 'UPDATE_INDICES' | 'MARK_SORTED';
  payload: any;
}
