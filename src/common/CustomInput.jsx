import { Box, Stack, TextField, Typography } from '@mui/material'
import React from 'react'

const CustomInput = ({ label, type, name, onChange, placeholder }) => {
    return (
        <Stack direction={"column"} gap={2}>
            <Typography mb={1} textAlign="left">{label}</Typography>
            <TextField
                name={name}
                onChange={(e) => onChange(e)}
                type={type ? type : "text"}
                placeholder={placeholder}
            />
        </Stack>
    )
}

export default CustomInput
