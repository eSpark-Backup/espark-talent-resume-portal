import React from 'react'
import { Box, Stack, TextareaAutosize, Tooltip, Typography } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info';


const TextArea = ({ name, placeholder, onChange, label, tooltip }) => {
    return (
        <Stack>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Typography mb={1} textAlign="left" sx={{ color: "black" }}>{label}</Typography>
                <Tooltip placement="top-start" title={tooltip}>
                    <InfoIcon
                        style={{
                            marginLeft: "5px",
                            color: "rgb(97, 192, 224)",
                            fontSize: "13px",
                            marginBottom: "12px",
                        }}
                    />
                </Tooltip>
            </Box>
            <TextareaAutosize placeholder={placeholder} name={name} onChange={(e) => onChange(name, e.target.value)} style={{ backgroundColor: "white", color: "black", minHeight: "30px", padding: "10px", borderRadius: "8px", width: "100%", resize: "vertical" }} />
        </Stack>
    )
}

export default TextArea
