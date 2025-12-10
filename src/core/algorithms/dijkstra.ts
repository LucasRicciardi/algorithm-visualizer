import type { AlgorithmStep, GraphData } from '../../types/types';

export function* dijkstra(graph: GraphData, startNodeId: number, endNodeId: number = -1): Generator<AlgorithmStep> {
    const { nodes, edges } = graph;
    const distances: Record<number, number> = {};
    const previous: Record<number, number | null> = {};
    const unvisited = new Set<number>();
    
    // Initialize
    for (const node of nodes) {
        distances[node.id] = Infinity;
        previous[node.id] = null;
        unvisited.add(node.id);
    }
    distances[startNodeId] = 0;
    
    yield {
        type: 'highlight',
        indices: [startNodeId],
        description: `Initialize distances. Start node ${startNodeId} is 0, others Infinity.`
    };
    
    while (unvisited.size > 0) {
        // Find node with min distance in unvisited
        let minNodeId: number | null = null;
        let minDistance = Infinity;
        
        for (const nodeId of unvisited) {
            if (distances[nodeId] < minDistance) {
                minDistance = distances[nodeId];
                minNodeId = nodeId;
            }
        }
        
        // If no reachable nodes left (or target found logic could go here)
        if (minNodeId === null || minDistance === Infinity) break;
        if (endNodeId !== -1 && minNodeId === endNodeId) break; // Found target
        
        unvisited.delete(minNodeId);
        
        yield {
            type: 'visit',
            indices: [minNodeId],
            description: `Visit node ${minNodeId} with current shortest distance ${Math.floor(minDistance)}.`
        };
        
        // Get neighbors
        const neighbors = edges.filter(e => e.source === minNodeId || e.target === minNodeId);
        
        for (const edge of neighbors) {
            const neighborId = edge.source === minNodeId ? edge.target : edge.source;
            if (!unvisited.has(neighborId)) continue;
            
            yield {
                type: 'compare',
                indices: [minNodeId, neighborId],
                description: `Check neighbor ${neighborId} via edge weight ${edge.weight}.`,
                edge: { source: minNodeId, target: neighborId }
            };
            
            const alt = distances[minNodeId] + edge.weight;
            if (alt < distances[neighborId]) {
                distances[neighborId] = alt;
                previous[neighborId] = minNodeId;
                
                yield {
                    type: 'relax',
                    indices: [neighborId],
                    value: alt,
                    description: `Update distance of node ${neighborId} to ${Math.floor(alt)}.`,
                    edge: { source: minNodeId, target: neighborId }
                };
            }
        }
    }
    
    // Reconstruct path if endNode provided, else just finish?
    // Let's assume we want to show SPT or path to all?
    // Usually Dijkstra is for single target or all. 
    // If we pick a random target in the visualizer, we can show path.
    yield {
        type: 'sorted',
        indices: nodes.map(n => n.id),
        description: 'Dijkstra Algorithm Completed.'
    };
}
