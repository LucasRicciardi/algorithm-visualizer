import { useState } from 'react';
import { 
    Dialog, DialogTitle, DialogContent, DialogActions, 
    Button, TextField, Typography, Alert 
} from '@mui/material';

interface InputDataDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: number[]) => void;
}

export default function InputDataDialog({ open, onClose, onSubmit }: InputDataDialogProps) {
    const [text, setText] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = () => {
        // Parse comma or space separated numbers
        const parts = text.split(/[\s,]+/);
        const numbers: number[] = [];
        
        for (const part of parts) {
            if (!part) continue;
            const num = Number(part);
            if (isNaN(num)) {
                setError(`Invalid number: "${part}"`);
                return;
            }
            if (num < 0 || num > 100) {
                 // Soft limit for visualization or hard? 
                 // Visualizer scales bar height, so any positive number works.
                 // But let's keep it reasonable or just allow it.
            }
            numbers.push(num);
        }

        if (numbers.length === 0) {
            setError("Please enter at least one number.");
            return;
        }

        if (numbers.length > 50) {
            setError("Too many elements (max 50 recommended).");
            return;
        }

        setError(null);
        onSubmit(numbers);
        onClose();
        setText(''); // Optional: clear or keep
    };

    const handleRandomize = () => {
        const randomData = Array.from({ length: 20 }, () => Math.floor(Math.random() * 90) + 10);
        setText(randomData.join(', '));
        setError(null);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Custom Input Data</DialogTitle>
            <DialogContent>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Enter numbers separated by commas or spaces.
                </Typography>
                <TextField
                    autoFocus
                    margin="dense"
                    id="input-data"
                    label="Array Elements"
                    type="text"
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={2}
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value);
                        setError(null);
                    }}
                    placeholder="e.g. 10, 5, 8, 3, 1"
                />
                {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleRandomize} color="secondary">Randomize</Button>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">Visualize</Button>
            </DialogActions>
        </Dialog>
    );
}
