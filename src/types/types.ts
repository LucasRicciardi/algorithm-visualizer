export type AlgorithmStepType = 'compare' | 'swap' | 'highlight' | 'sorted' | 'overwrite' | 'found' | 'visit' | 'relax' | 'path';

export interface AlgorithmStep {
  type: AlgorithmStepType;
  indices: number[]; // Indices of elements involved (or Node IDs for graph)
  value?: number;
  description: string;
  line?: number;
  edge?: { source: number, target: number };
  path?: number[]; // Sequence of node IDs representing the current path
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
    startNode?: number;
    endNode?: number;
}

export interface VizCommand {
  type: 'SET_ARRAY' | 'UPDATE_INDICES' | 'MARK_SORTED';
  payload: any;
}
