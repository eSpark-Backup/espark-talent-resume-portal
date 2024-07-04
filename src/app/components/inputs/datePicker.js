import React, { forwardRef } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import 'react-datepicker/dist/react-datepicker.css';
import { TextField } from '@mui/material';

export const CustomInputForDatePicker = forwardRef(
  ({ value, onClick }, ref) => {
    return (
      <TextField
        type="reset"
        className="example-custom-input"
        onClick={onClick}
        value={value || "MM-DD-YY to MM-DD-YY"}
        ref={ref}
        sx={{
          border: 'none',
          width: { xs: '100%', sm: '250px' },
          div: { background: '#fff', height: '44px' },
          input: {
            textAlign: 'center',
            padding: '8px',
            fontWeight: 600,
            fontSize: '13px'
          },
          '& .css-1v2az6r-MuiInputBase-root-MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
          {
            borderColor: '#eee'
          }
        }}
        InputProps={{
          startAdornment: (
            <KeyboardArrowLeftIcon color="common" />
          ),
          endAdornment: (
            <KeyboardArrowRightIcon color="common" />
          )
        }}
      />
    );
  }
);
