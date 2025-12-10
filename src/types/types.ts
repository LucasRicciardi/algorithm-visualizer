export type AlgorithmStepType = 'compare' | 'swap' | 'highlight' | 'sorted' | 'overwrite' | 'found' | 'visit' | 'relax' | 'path';

export interface AlgorithmStep {
  type: AlgorithmStepType;
  indices: number[]; // Indices of elements involved (or Node IDs for graph)
  description: string;
  line?: number; // Line number in pseudocode
  value?: number; // For overwrite operations or current distance/weight
  edge?: { source: number, target: number }; // For graph edges
}

export interface GraphNode {
  id: number;
  x: number;
  y: number;
}

export interface GraphEdge {
  source: number;
  target: number;
  weight: number;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface AlgorithmState {
  array: number[];
  graph?: GraphData;
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
