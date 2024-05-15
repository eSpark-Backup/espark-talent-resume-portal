import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { TextField, Typography, Stack, Tooltip } from '@mui/material';
import { NumericFormat } from 'react-number-format'; // Assuming NumericFormat is correctly imported

const CustomInput = ({ label, type, name, onChange, placeholder, maxLength, disabled, phone, tooltip }) => {
    const handlePhoneChange = (value, country, e, formattedValue) => {
        onChange(name, formattedValue); // Assuming you want to pass the formatted phone number
    };

    const handleNumberChange = (values) => {
        onChange(name, values.value);
    };

    return (
        type === "tel" ? (
            <Stack>
                <Tooltip placement="top-start" title={tooltip}>
                    <Typography mb={1} textAlign="left" sx={{ color: "black" }}>{label}</Typography>
                </Tooltip>
                <PhoneInput
                    country={'pk'}
                    value={phone}
                    onChange={handlePhoneChange}
                    inputStyle={{ color: "black" }}
                    onlyCountries={['pk']}
                    disableDropdown={true}
                />
            </Stack>
        ) : name === "salary_expection" ? (
            <Stack direction="column">
                <Tooltip placement="top-start" title={tooltip}>
                    <Typography mb={1} textAlign="left" sx={{ color: "black" }}>{label}</Typography>
                </Tooltip>
                <NumericFormat
                    allowNegative={false}
                    min={10}
                    placeholder={placeholder}
                    name={name}
                    allowLeadingZeros
                    thousandSeparator=","
                    onChange={(e) => onChange(name, e.target.value)}
                    style={{ height: "56px", backgroundColor: "white", color: "black" }}
                />
            </Stack>
        ) : (
            <Stack direction="column">
                <Tooltip placement="top-start" title={tooltip}>
                    <Typography mb={1} textAlign="left" sx={{ color: "black" }}>{label}</Typography>
                </Tooltip>
                <TextField
                    disabled={disabled}
                    name={name}
                    onChange={(e) => onChange(name, type === "file" ? e.target.files[0] : e.target.value)}
                    type={type ? type : "text"}
                    placeholder={placeholder}
                    required
                    {...(maxLength && { onInput: (e) => e.target.value = e.target.value.slice(0, maxLength) })}
                />
            </Stack>
        )
    );
}

export default CustomInput;