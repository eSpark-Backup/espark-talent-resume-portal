import { Stack, TextareaAutosize, Tooltip, Typography } from '@mui/material'
import React from 'react'

const TextArea = ({ name, placeholder, onChange, label, tooltip }) => {
    return (
        <Stack>
            <Tooltip placement="top-start" title={tooltip}>
                <Typography mb={1} textAlign="left" sx={{ color: "black" }}>{label}</Typography>
            </Tooltip>
            <TextareaAutosize placeholder={placeholder} name={name} onChange={onChange} style={{ backgroundColor: "white", color: "black", minHeight: "30px", padding: "10px", borderRadius: "8px", width: "100%", resize: "vertical" }} />
        </Stack>
    )
}

export default TextArea
