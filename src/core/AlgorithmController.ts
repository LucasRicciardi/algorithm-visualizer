import type { AlgorithmState, AlgorithmStep, GraphData, GraphNode, GraphEdge } from '../types/types';
import { bubbleSort } from './algorithms/bubbleSort';
import { mergeSort } from './algorithms/mergeSort';
import { quickSort } from './algorithms/quickSort';
import { linearSearch } from './algorithms/linearSearch';
import { binarySearch } from './algorithms/binarySearch';
import { dijkstra } from './algorithms/dijkstra';
import { heapSort } from './algorithms/heapSort';

type AlgorithmType = 'bubbleSort' | 'mergeSort' | 'quickSort' | 'heapSort' | 'linearSearch' | 'binarySearch' | 'dijkstra';

export class AlgorithmController {
  private initialArray: number[];
  private graphData: GraphData | undefined; 
  private steps: AlgorithmStep[] = [];
  private currentStepIndex: number = -1;
  private isPlaying: boolean = false;
  private speed: number = 1000;
  private timerId: ReturnType<typeof setInterval> | null = null;
  private onStateChange: (state: AlgorithmState) => void;
  private currentAlgorithm: AlgorithmType = 'bubbleSort';
  private targetValue: number = 0; // Default target
  private startNode: number = 0; // Dijkstra Start
  private endNode: number = 24; // Dijkstra End

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
  
  public setTarget(target: number) {
      if (this.targetValue === target) return;
      this.targetValue = target;
      // Only reset steps if current algorithm is a search algorithm
      if (this.currentAlgorithm === 'linearSearch' || this.currentAlgorithm === 'binarySearch') {
          this.reset();
      }
  }

  public setGraphParams(start: number, end: number) {
      if (this.startNode === start && this.endNode === end) return;
      this.startNode = start;
      this.endNode = end;
      if (this.currentAlgorithm === 'dijkstra') {
          this.reset(undefined, true); // Keep graph, just regen steps
      }
  }

  public getAlgorithm(): string {
      return this.currentAlgorithm;
  }

  private generateRandomGraph(nodeCount: number = 25): GraphData {
       const nodes: GraphNode[] = [];
       const edges: GraphEdge[] = [];
       const width = 800; // Canvas abstract width
       const height = 400; // Canvas abstract height
       
       // Generate Nodes
       // Generate Nodes
       const minDistance = 60; // Minimum distance between nodes to prevent overlap
       for (let i = 0; i < nodeCount; i++) {
           let x = 0, y = 0;
           let attempts = 0;
           let validPosition = false;

           while (!validPosition && attempts < 100) {
                x = Math.random() * (width - 100) + 50; // Keep away from edges
                y = Math.random() * (height - 100) + 50;
                
                validPosition = true;
                for (const node of nodes) {
                    const dx = node.x - x;
                    const dy = node.y - y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < minDistance) {
                        validPosition = false;
                        break;
                    }
                }
                attempts++;
           }
           
           // If we couldn't find a valid position after 100 tries, use the last random one
           // (Rare with 25 nodes on 800x400 canvas)
           nodes.push({ id: i, x, y });
       }

       // Generate Edges (Random connections)
       // Ensure connectivity (connect i to i+1 usually ensures string connectivity)
       // For 50 nodes, we want a bit more density but not too messy.
       for (let i = 0; i < nodeCount; i++) {
           // Always connect to next one (circular or line) to ensure some edges
           if (i < nodeCount - 1) {
                const weight = Math.floor(Math.random() * 20) + 1;
                edges.push({ source: i, target: i + 1, weight });
           }

           // Add random extra edges - reduce density slightly for 50 nodes so it's viewable
           // Let's say each node has chance to connect to 1-2 others nearby or random.
           const extraEdges = Math.floor(Math.random() * 2); // 0 or 1 extra edge per node
           for (let j = 0; j < extraEdges; j++) {
               const target = Math.floor(Math.random() * nodeCount);
               if (target !== i && !edges.some(e => (e.source === i && e.target === target) || (e.source === target && e.target === i))) {
                   const weight = Math.floor(Math.random() * 20) + 1;
                   edges.push({ source: i, target, weight });
               }
           }
       }
       return { nodes, edges };
  }

  private generateSteps() {
    let generator;
    
    // If Dijkstra, we need a graph. If not present, generate one.
    if (this.currentAlgorithm === 'dijkstra' && !this.graphData) {
        this.graphData = this.generateRandomGraph();
    }

    switch (this.currentAlgorithm) {
        case 'mergeSort':
            generator = mergeSort(this.initialArray);
            break;
        case 'quickSort':
            generator = quickSort(this.initialArray);
            break;
        case 'linearSearch':
            generator = linearSearch(this.initialArray, this.targetValue);
            break;
        case 'binarySearch':
            generator = binarySearch(this.initialArray, this.targetValue);
            break;
        case 'heapSort':
            generator = heapSort(this.initialArray);
            break;
        case 'dijkstra':
             generator = dijkstra(this.graphData!, this.startNode, this.endNode); 
             break;
        case 'bubbleSort':
        default:
            generator = bubbleSort(this.initialArray);
            break;
    }
        
    this.steps = [];
    if (generator && typeof generator[Symbol.iterator] === 'function') {
        for (const step of generator) {
          this.steps.push(step);
        }
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
      this.emitState(); 
  }

  public reset(newArray?: number[], keepGraph: boolean = false) {
      this.pause();
      if (newArray) {
          this.initialArray = [...newArray];
      }
      
      if (this.currentAlgorithm === 'dijkstra' && !keepGraph) {
           this.graphData = this.generateRandomGraph();
      } else if (this.currentAlgorithm !== 'dijkstra') {
           this.graphData = undefined;
      }

      this.generateSteps();
      this.currentStepIndex = -1;
      this.emitState();
  }

  public getCurrentState(): AlgorithmState {
      const currentArray = [...this.initialArray];
      for (let i = 0; i <= this.currentStepIndex; i++) {
            const step = this.steps[i];
            if (step.type === 'swap') {
                const [idx1, idx2] = step.indices;
                [currentArray[idx1], currentArray[idx2]] = [currentArray[idx2], currentArray[idx1]];
            } else if (step.type === 'overwrite' && step.value !== undefined) {
                const [idx] = step.indices;
                currentArray[idx] = step.value;
            }
      }

      return {
          array: currentArray,
          graph: this.graphData,
          history: this.steps,
          currentStepIndex: this.currentStepIndex,
          isPlaying: this.isPlaying,
          speed: this.speed,
          isFinished: this.currentStepIndex === this.steps.length - 1,
          startNode: this.currentAlgorithm === 'dijkstra' ? this.startNode : undefined,
          endNode: this.currentAlgorithm === 'dijkstra' ? this.endNode : undefined
      };
  }

  private emitState() {
      this.onStateChange(this.getCurrentState());
  }
  
  public getStepsCount() {
      return this.steps.length;
  }
}
