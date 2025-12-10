import { Container, Card, CardActionArea, CardContent, Typography, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BarChartIcon from '@mui/icons-material/BarChart';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import BoltIcon from '@mui/icons-material/Bolt';

const ALGORITHMS = [
    {
        category: 'Sorting',
        items: [
            {
                id: 'bubbleSort',
                title: 'Bubble Sort',
                description: 'A simple comparison-based sorting algorithm.',
                icon: <BarChartIcon fontSize="large" color="primary" />
            },
            {
                id: 'mergeSort',
                title: 'Merge Sort',
                description: 'A divide-and-conquer sorting algorithm.',
                icon: <CallSplitIcon fontSize="large" color="secondary" />
            },
            {
                id: 'quickSort',
                title: 'Quick Sort',
                description: 'An efficient, divide-and-conquer sorting algorithm.',
                icon: <BoltIcon fontSize="large" sx={{ color: '#ff9100' }} />
            },
            {
                id: 'heapSort',
                title: 'Heap Sort',
                description: 'A comparison-based sorting technique based on Binary Heap data structure.',
                icon: <BarChartIcon fontSize="large" sx={{ color: '#d500f9' }} />
            }
        ]
    },
    {
        category: 'Searching',
        items: [
             {
                id: 'linearSearch',
                title: 'Linear Search',
                description: 'Sequentially checks each element of the list matches the target value.',
                icon: <BarChartIcon fontSize="large" sx={{ color: '#00e676' }} /> 
            },
            {
                id: 'binarySearch',
                title: 'Binary Search',
                description: 'Efficiently finds a target in a sorted array by repeated halving.',
                icon: <CallSplitIcon fontSize="large" sx={{ color: '#2979ff' }} />
            }
        ]
    }
];

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <Container maxWidth={false} sx={{ mt: 8, mb: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
                 <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 800 }}>
                    Visualize Algorithms
                </Typography>
                <Typography variant="h5" color="text.secondary">
                    Select an algorithm to see how it works step-by-step.
                </Typography>
            </Box>

            {ALGORITHMS.map((category) => (
                <Box key={category.category} sx={{ mb: 6 }}>
                    <Typography variant="h4" gutterBottom sx={{ mb: 3, pl: 2, borderLeft: '4px solid', borderColor: 'primary.main' }}>
                        {category.category}
                    </Typography>
                    <Grid container spacing={4}>
                        {category.items.map((algo) => (
                            <Grid key={algo.id} size={{ xs: 12, sm: 6, md: 4 }}>
                                <Card 
                                    elevation={0}
                                    sx={{ 
                                        height: '100%', 
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        transition: 'transform 0.2s, box-shadow 0.2s',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: (theme) => `0 8px 24px ${theme.palette.primary.main}40`,
                                            borderColor: 'primary.main'
                                        }
                                    }}
                                >
                                    <CardActionArea 
                                        onClick={() => navigate(`/algorithm/${algo.id}`)}
                                        sx={{ height: '100%', p: 2 }}
                                    >
                                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                            {algo.icon}
                                            <Typography variant="h5" component="div" fontWeight="bold">
                                                {algo.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" align="center">
                                                {algo.description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            ))}
              <Box sx={{ mb: 6 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 3, pl: 2, borderLeft: '4px solid', borderColor: 'primary.main' }}>
                Graph Algorithms
            </Typography>
            <Grid container spacing={4}>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                   <Card 
                        elevation={0}
                        sx={{ 
                            height: '100%', 
                            border: '1px solid rgba(255,255,255,0.1)',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: (theme) => `0 8px 24px ${theme.palette.primary.main}40`,
                                borderColor: 'primary.main'
                            }
                        }}
                   >
                        <CardActionArea 
                            onClick={() => navigate('/algorithm/dijkstra')}
                            sx={{ height: '100%', p: 2 }}
                        >
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                <BoltIcon fontSize="large" sx={{ color: '#ff9100' }} />
                                <Typography variant="h5" component="div" fontWeight="bold">Dijkstra's Algorithm</Typography>
                                <Typography variant="body2" color="text.secondary" align="center">
                                    Finds the shortest paths between nodes in a graph.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                   </Card>
                </Grid>
            </Grid>
        </Box>
    </Container>
    );
}
