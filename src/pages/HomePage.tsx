import { Container, Grid, Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BarChartIcon from '@mui/icons-material/BarChart';
import CallSplitIcon from '@mui/icons-material/CallSplit';

const ALGORITHMS = [
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
    }
];

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
                 <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 800 }}>
                    Visualize Algorithms
                </Typography>
                <Typography variant="h5" color="text.secondary">
                    Select an algorithm to see how it works step-by-step.
                </Typography>
            </Box>

            <Grid container spacing={4}>
                {ALGORITHMS.map((algo) => (
                    <Grid item xs={12} sm={6} md={4} key={algo.id}>
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
        </Container>
    );
}
