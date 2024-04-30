import React from "react";
import Select from "react-select";

const Dropdown = ({ name, label, placeholder, options, onChange, value }) => {
  return (
    <div className="input-parent">
      {label && <label>{label}</label>}
      <Select
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
