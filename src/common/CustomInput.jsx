import { Box, Stack, TextField, Typography } from '@mui/material'
import React from 'react'

const CustomInput = ({ label, type, name, onChange, placeholder }) => {
    return (
        <Stack direction={"column"}>
            <Typography mb={1} textAlign="left" sx={{ color: "black" }}>{label}</Typography>
            <TextField
                name={name}
                onChange={(e) => onChange(name, e.target.value)}
                type={type ? type : "text"}
                placeholder={placeholder}
            />
        </Stack>
    )
}

export default CustomInput
