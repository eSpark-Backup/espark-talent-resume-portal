import { Box, Stack, TextField, Tooltip, Typography } from '@mui/material'
import React from 'react'

const CustomInput = ({ label, type, name, onChange, placeholder, maxLength, tooltip}) => {
    return (
        <Stack direction={"column"}>
            <Tooltip placement="top-start" title={tooltip}>
                <Typography mb={1} textAlign="left" sx={{ color: "black" }}>{label}</Typography>
            </Tooltip>
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

export default CustomInput
