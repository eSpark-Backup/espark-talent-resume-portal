import React from 'react'
import Modal from '@mui/material/Modal';
import { Box, Stack, Typography } from '@mui/material';
import { ImgUploader } from '@/app/components';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const CustomModal = ({ modalOpen, onClose, description, onChange, name, filename }) => {
    return (
        <Modal
            open={modalOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" color={"black"} sx={{textAlign:"center"}}>
                    {description}
                </Typography>
                <Box sx={{ display: "flex", marginTop: "15px", columnGap:"10px" }}>
                    <button onClick={onClose} style={{ width: "30%", height: "40px", backgroundColor: "white", borderRadius: "6px", border: "1px solid black", color: "black", cursor: "pointer" }}>Close</button>
                    <ImgUploader onChange={onChange} name={name} filename={filename} />
                </Box>
            </Box>
        </Modal>
    )
}

export default CustomModal
