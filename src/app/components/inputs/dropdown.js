import { Tooltip } from "@mui/material";
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
    <div className={className}>
       <Tooltip placement="top-start" title={tooltip}>
      {label && <label style={{ color: "black" }}>{label}</label>}
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
    </div>
  );
};

export default Dropdown;
