import { Stack, Typography, Tooltip} from "@mui/material";
import React from "react";
import Select from "react-select";

const Dropdown = ({ name, label, placeholder, options, onChange, value, className, tooltip }) => {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: 'black',
      ':hover': {
        backgroundColor: '#e6e9eb',
      },
      backgroundColor: state.isSelected ? '#90d1f5' : 'white',
    }),
  };
  
  return (
    <Stack className={className} gap={1}>
      <Tooltip placement="top-start" title={tooltip}>
      {label && <Typography style={{ color: "black" }}>{label}</Typography>}
      </Tooltip>
      <Select
        styles={customStyles}
        placeholder={placeholder}
        options={options}
        isSearchable={true}
        isClearable={true}
        onChange={(e) => onChange(name, e)}
        defaultValue={
          name === "subField" || name === "position"
            ? ""
            : options[0]
        }
        value={value}
      />
    </Stack>
  );
};

export default Dropdown;
