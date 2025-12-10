import { FormControl, Select, MenuItem, Box } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';

interface AlgorithmSelectorProps {
    value: string;
    onChange: (algo: string) => void;
    disabled?: boolean;
}

export default function AlgorithmSelector({ value, onChange, disabled }: AlgorithmSelectorProps) {
    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value as string);
    };

    return (
        <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth size="small">
                <Select
                    value={value}
                    onChange={handleChange}
                    disabled={disabled}
                    sx={{ 
                        color: 'text.primary',
                        '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'text.primary' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' }
                    }}
                >
                    <MenuItem value="bubbleSort">Bubble Sort</MenuItem>
                    <MenuItem value="mergeSort">Merge Sort</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
