import { Stack, Typography, Tooltip, Box, TextField } from '@mui/material';
import React from 'react';
import InfoIcon from '@mui/icons-material/Info';

const PositionInput = ({
  name,
  label,
  placeholder,
  onChange,
  value = '',
  className,
  tooltip,
  showTooltip,
}) => {
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

      <TextField
        name={name}
        placeholder={placeholder}
        variant="outlined"
        fullWidth
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
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
    </Stack>
  );
};

export default PositionInput;
