import { Stack, Typography, Tooltip, Box } from "@mui/material";
import React from "react";
import Select from "react-select";
import InfoIcon from '@mui/icons-material/Info';

const Dropdown = ({ name, label, placeholder, options, onChange, value, className, tooltip, showTooltip }) => {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: 'black',
      ':hover': {
        backgroundColor: '#e6e9eb',
      },
      backgroundColor: state.isSelected ? '#90d1f5' : 'white',
      boxShadow: 'none',
    }),
    control: (provided) => ({ 
      ...provided, 
      height: '56px',
    }),
    menu: (provided) => ({
      ...provided,
      border: "1px solid transparent",
    }),
  };

  return (
    <Stack className={className} gap={1}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {label && <Typography style={{ color: "black" }}>{label}</Typography>}
        {showTooltip
          &&
          <Tooltip placement="top-start" title={tooltip}>
            <InfoIcon
              style={{
                marginLeft: "5px",
                color: "rgb(97, 192, 224)",
                fontSize: "13px",
                marginBottom: "12px",
              }}
            />
          </Tooltip>
        }
      </Box>

      <Select
        styles={customStyles}
        placeholder={placeholder}
        options={options}
        isSearchable={true}
        isClearable={true}
        onChange={(e) => onChange(name, e)}
        // defaultValue={
        //   name === "subField" || name === "position"
        //     ? ""
        //     : options[0]
        // }
        value={value}
      />
    </Stack>
  );
};

export default Dropdown;
