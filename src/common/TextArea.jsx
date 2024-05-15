import { Stack, TextareaAutosize, Typography } from '@mui/material'
import React from 'react'

const TextArea = ({ name, placeholder, onChange, label }) => {
    return (
        <Stack>
            <Typography mb={1} textAlign="left" sx={{ color: "black" }}>{label}</Typography>
            <TextareaAutosize  placeholder={placeholder} name={name} onChange={onChange} style={{ backgroundColor: "white", color: "black", minHeight:"30px", padding:"10px", borderRadius:"8px", width:"100%", resize:"vertical"  }} />
        </Stack>
    )
}

export default TextArea
