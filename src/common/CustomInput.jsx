import { Box, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const CustomInput = ({ label, type, name, onChange, placeholder, maxLength, phone }) => {
    const handlePhoneChange = (value, country, e, formattedValue) => {
        onChange(name, formattedValue); // Assuming you want to pass the formatted phone number
    };

    return (
        type === "tel"
            ?
            <Stack>
                <Typography mb={1} textAlign="left" sx={{ color: "black" }}>{label}</Typography>
                <PhoneInput
                    country={'pk'}
                    value={phone}
                    onChange={handlePhoneChange}
                    inputStyle={{ color: "black" }}
                    onlyCountries={['pk']}
                    disableDropdown={true}
                // disableCountryCode={true}
                />
            </Stack>
            :
            <Stack direction={"column"}>
                <Typography mb={1} textAlign="left" sx={{ color: "black" }}>{label}</Typography>
                <TextField
                    name={name}
                    onChange={(e) => onChange(name, type === "file" ? e.target.files[0] : e.target.value)}
                    type={type ? type : "text"}
                    placeholder={placeholder}
                    required
                    {...(maxLength && { onInput: (e) => e.target.value = e.target.value.slice(0, maxLength) })}
                />
            </Stack>
    )
}

export default CustomInput;
