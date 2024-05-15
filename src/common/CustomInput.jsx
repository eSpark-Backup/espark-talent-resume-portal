import React, { useState } from 'react';
import { Stack, TextField, Typography } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { NumericFormat } from 'react-number-format';

const CustomInput = ({ label, type, name, onChange, placeholder, maxLength, phone }) => {
    const handlePhoneChange = (value, country, e, formattedValue) => {
        onChange(name, formattedValue); // Assuming you want to pass the formatted phone number
    };

    const handleNumberChange = (values) => {
        onChange(name, values.value);
    };

    return (
        <Stack direction={"column"}>
            <Typography mb={1} textAlign="left" sx={{ color: "black" }}>{label}</Typography>
            {name === "salary_expection" ? (
                <NumericFormat allowNegative={false} min={"10"} placeholder={placeholder} name={name} allowLeadingZeros thousandSeparator="," onChange={(e) => onChange(name, e.target.value)} style={{height:"56px",backgroundColor:"white",color:"black"}} />
            ) : (
                type === "tel" ? (
                    <PhoneInput
                        country={'pk'}
                        value={phone}
                        onChange={handlePhoneChange}
                        inputStyle={{ color: "black" }}
                        onlyCountries={['pk']}
                        disableDropdown={true}
                    />
                ) : (
                    <TextField
                        name={name}
                        onChange={(e) => onChange(name, type === "file" ? e.target.files[0] : e.target.value)}
                        type={type ? type : "text"}
                        placeholder={placeholder}
                        required
                        {...(maxLength && { onInput: (e) => e.target.value = e.target.value.slice(0, maxLength) })}
                    />
                )
            )}
        </Stack>
    );
};

export default CustomInput;
