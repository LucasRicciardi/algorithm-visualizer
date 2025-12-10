import { Container, Card, CardActionArea, CardContent, Typography, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BarChartIcon from '@mui/icons-material/BarChart';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import BoltIcon from '@mui/icons-material/Bolt';

// Import image will be done via absolute path for now as it's in artifacts, 
// usually we'd move it to public or src/assets. 
// For this environment, we will use a style that references it or a placeholder color if not easily importable in Vite dev without move.
// We will use a component approach to background.

const ALGORITHMS = [
    {
        category: 'Sorting Algorithms',
        description: 'Visualize how different sorting techniques process data.',
        items: [
            {
                id: 'bubbleSort',
                title: 'Bubble Sort',
                description: 'Simple but inefficient comparison sort that repeatedly swaps adjacent elements.',
                icon: <BarChartIcon fontSize="large" sx={{ color: '#00E5FF' }} />
            },
            {
                id: 'mergeSort',
                title: 'Merge Sort',
                description: 'Efficient, stable, divide-and-conquer algorithm that sorts subsplits.',
                icon: <CallSplitIcon fontSize="large" sx={{ color: '#F50057' }} />
            },
            {
                id: 'quickSort',
                title: 'Quick Sort',
                description: 'Highly efficient divide-and-conquer algorithm using partitioning.',
                icon: <BoltIcon fontSize="large" sx={{ color: '#FF9100' }} />
            },
            {
                id: 'heapSort',
                title: 'Heap Sort',
                description: 'Comparison-based sort using a Binary Heap data structure to find max elements.',
                icon: <BarChartIcon fontSize="large" sx={{ color: '#D500F9' }} />
            }
        ]
    },
    {
        category: 'Searching Algorithms',
        description: 'Understand mechanisms for finding specific keys in sequential data.',
        items: [
             {
                id: 'linearSearch',
                title: 'Linear Search',
                description: 'Sequentially checks every element until a match is found.',
                icon: <BarChartIcon fontSize="large" sx={{ color: '#00E676' }} /> 
            },
            {
                id: 'binarySearch',
                title: 'Binary Search',
                description: 'Efficiently locates a target value in a sorted array by dividing search interval.',
                icon: <CallSplitIcon fontSize="large" sx={{ color: '#2979FF' }} />
            }
        ]
    }
];

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <Box 
            sx={{ 
                minHeight: '100vh', 
                width: '100%',
                backgroundImage: 'url("/algorithm_dashboard_bg_1765375772535.png")', 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                '&::before': {
                     content: '""',
                     position: 'absolute',
                     top: 0,
                     left: 0,
                     right: 0,
                     bottom: 0,
                     background: 'rgba(10, 25, 41, 0.7)', // Dark overlay
                     zIndex: 0
                }
            }}
        >
            <Container maxWidth="lg" sx={{ mt: 10, mb: 10, position: 'relative', zIndex: 1 }}>
                
                {/* Hero Section */}
                <Box sx={{ textAlign: 'center', mb: 12 }}>
                     <Typography variant="h1" component="h1" sx={{ 
                         fontWeight: 800, 
                         letterSpacing: '-2px',
                         mb: 2,
                         background: 'linear-gradient(90deg, #FFFFFF 0%, #00E5FF 100%)',
                         backgroundClip: 'text',
                         textFillColor: 'transparent',
                         textShadow: '0px 10px 20px rgba(0, 229, 255, 0.3)'
                     }}>
                        Algorithm Visualizer
                    </Typography>
                    <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: '600px', mx: 'auto', lineHeight: 1.6 }}>
                        Explore the inner workings of complex algorithms through interactive, step-by-step visualizations.
                    </Typography>
                </Box>

                {ALGORITHMS.map((category) => (
                    <Box key={category.category} sx={{ mb: 8 }}>
                        <Box sx={{ mb: 4, textAlign: 'left', borderLeft: '4px solid #00E5FF', pl: 3 }}>
                             <Typography variant="h4" sx={{ fontWeight: 700, color: 'white' }}>
                                {category.category}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.6)', mt: 0.5 }}>
                                {category.description}
                            </Typography>
                        </Box>
                        
                        <Grid container spacing={4}>
                            {category.items.map((algo) => (
                                <Grid key={algo.id} size={{ xs: 12, sm: 6, md: 4 }}>
                                    <Card 
                                        sx={{ 
                                            height: '100%', 
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            borderRadius: 4,
                                            transition: 'all 0.3s ease-in-out',
                                            overflow: 'hidden',
                                            '&:hover': {
                                                transform: 'translateY(-10px)',
                                                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                                border: '1px solid rgba(0, 229, 255, 0.5)',
                                                background: 'rgba(255, 255, 255, 0.08)'
                                            }
                                        }}
                                    >
                                        <CardActionArea 
                                            onClick={() => navigate(`/algorithm/${algo.id}`)}
                                            sx={{ height: '100%', p: 3 }}
                                        >
                                            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
                                                <Box alignSelf="center" sx={{ 
                                                    p: 1.5, 
                                                    borderRadius: 2, 
                                                    background: 'rgba(0,0,0,0.2)',
                                                    border: '1px solid rgba(255,255,255,0.05)'
                                                }}>
                                                    {algo.icon}
                                                </Box>
                                                <Box>
                                                    <Typography variant="h5" textAlign="center" component="div" fontWeight="bold" sx={{ color: 'white', mb: 1 }}>
                                                        {algo.title}
                                                    </Typography>
                                                    <Typography variant="body2" textAlign="center" sx={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                                                        {algo.description}
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                ))}
                
                  <Box sx={{ mb: 6 }}>
                    <Box sx={{ mb: 4, textAlign: 'left', borderLeft: '4px solid #FF9100', pl: 3 }}>
                             <Typography variant="h4" sx={{ fontWeight: 700, color: 'white' }}>
                                Graph Algorithms
                            </Typography>
                            <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.6)', mt: 0.5 }}>
                                Analyze connectivity and pathfinding in network structures.
                            </Typography>
                    </Box>
                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                           <Card 
                                sx={{ 
                                    height: '100%', 
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: 4,
                                    transition: 'all 0.3s ease-in-out',
                                    overflow: 'hidden',
                                    '&:hover': {
                                        transform: 'translateY(-10px)',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                        border: '1px solid rgba(255, 145, 0, 0.5)',
                                        background: 'rgba(255, 255, 255, 0.08)'
                                    }
                                }}
                           >
                                <CardActionArea 
                                    onClick={() => navigate('/algorithm/dijkstra')}
                                    sx={{ height: '100%', p: 3 }}
                                >
                                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
                                        <Box sx={{ 
                                            p: 1.5, 
                                            borderRadius: 2, 
                                            background: 'rgba(0,0,0,0.2)', 
                                            border: '1px solid rgba(255,255,255,0.05)'
                                        }}>
                                            <BoltIcon fontSize="large" sx={{ color: '#FF9100' }} />
                                        </Box>
                                        <Box>
                                            <Typography variant="h5" component="div" fontWeight="bold" sx={{ color: 'white', mb: 1 }}>Dijkstra's Algorithm</Typography>
                                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                                                Finds the shortest paths between nodes in a graph.
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                           </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}
