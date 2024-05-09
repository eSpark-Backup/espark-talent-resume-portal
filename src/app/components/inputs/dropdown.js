import React from "react";
import Select from "react-select";

const Dropdown = ({ name, label, placeholder, options, onChange, value }) => {
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
    <div className="input-parent">
      {label && <label style={{ color: "black" }}>{label}</label>}
      <Select
        styles={customStyles}
        placeholder={placeholder}
        options={options}
        isSearchable={true}
        onChange={(e) => onChange(name, e)}
        defaultValue={options[0]}
        value={value}
      />
    </div>
  );
};

export default Dropdown;
