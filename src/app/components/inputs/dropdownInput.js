import {
  Stack,
  Typography,
  Tooltip,
  Box,
  TextField,
  Autocomplete,
} from '@mui/material';
import React from 'react';
import InfoIcon from '@mui/icons-material/Info';

const DropdownInput = ({
  name,
  label,
  placeholder,
  options = [],
  onChange,
  value = '',
  className,
  tooltip,
  showTooltip,
}) => {
  // Convert all options to string for consistency
  const optionLabels = options.map((opt) =>
    typeof opt === 'string' ? opt : opt?.label || ''
  );

  return (
    <Stack className={className} gap={1}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {label && <Typography style={{ color: 'black' }}>{label}</Typography>}
        {showTooltip && (
          <Tooltip placement="top-start" title={tooltip}>
            <InfoIcon
              style={{
                marginLeft: '5px',
                color: 'rgb(97, 192, 224)',
                fontSize: '13px',
                marginBottom: '12px',
              }}
            />
          </Tooltip>
        )}
      </Box>

      <Autocomplete
        freeSolo
        options={optionLabels}
        value={value}
        onChange={(event, newValue) => {
          // Handle selection from the dropdown
          onChange(name, newValue || '');
        }}
        onInputChange={(event, newInputValue) => {
          // Handle typing into the input
          if (event?.type === 'change') {
            onChange(name, newInputValue);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            variant="outlined"
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                height: '56px',
                backgroundColor: 'white',
                '&:hover': {
                  backgroundColor: '#e6e9eb',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#e6e9eb',
                },
                '&.Mui-focused': {
                  backgroundColor: '#fff',
                  borderColor: '#e6e9eb',
                },
              },
              '& input': {
                color: 'black',
              },
            }}
          />
        )}
      />
    </Stack>
  );
};

export default DropdownInput;
