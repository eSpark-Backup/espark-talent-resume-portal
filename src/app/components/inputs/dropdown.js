import { Fields_ENUMS } from "@/constant";
import React from "react";
import Select from "react-select";

const Dropdown = ({ name, label, placeholder, options, onChange, value, className }) => {
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
      {label && <label style={{ color: "black" }}>{label}</label>}
      <Select
        styles={customStyles}
        placeholder={placeholder}
        options={options}
        isSearchable={true}
        onChange={(e) => onChange(name, e)}
        defaultValue={
          name === Fields_ENUMS.SUB_FIELD || name === Fields_ENUMS.POSITION
            ? ""
            : options[0]
        }
        value={value}
      />
    </div>
  );
};

export default Dropdown;
