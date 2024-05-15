import { Box, Stack, TextField, Typography } from '@mui/material'
import React from 'react'

const CustomInput = ({ label, type, name, onChange, placeholder, maxLength, disabled }) => {
    return (
        <Stack direction={"column"}>
            <Typography mb={1} textAlign="left" sx={{ color: "black" }}>{label}</Typography>
            <TextField
                disabled={disabled}
                name={name}
                onChange={(e) => onChange(name, type ==="file" ? e.target.files[0] : e.target.value)}
                type={type ? type : "text"}
                placeholder={placeholder}
                required
                {...(maxLength && { onInput: (e) => e.target.value = e.target.value.slice(0, maxLength) })}
            />
        </Stack>
    )
}

export default CustomInput
