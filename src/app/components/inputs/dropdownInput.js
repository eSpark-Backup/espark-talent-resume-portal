import { Stack, Typography, Tooltip, Box, TextField } from '@mui/material';
import React from 'react';
import Select from 'react-select';
import InfoIcon from '@mui/icons-material/Info';

const DropdownInput = ({
  name,
  label,
  placeholder,
  options,
  onChange,
  value,
  className,
  tooltip,
  showTooltip,
}) => {
  const customInputStyles = {
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
  };
  console.log('value:', value);
  return (
    <Stack className={className} gap={1}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
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
        placeholder={placeholder}
        options={options}
        isSearchable={true}
        isClearable={true}
        onChange={(e) => onChange(name, e)}
        variant="outlined"
        sx={customInputStyles}
        fullWidth
        // options={positionOptions}
        value={value}
      />
    </Stack>
  );
};

export default DropdownInput;
