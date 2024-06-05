import React from 'react'
import Modal from '@mui/material/Modal';
import { Box, Stack, Typography } from '@mui/material';
import { ImgUploader, Loader } from '@/app/components';
import { Oval } from 'react-loader-spinner';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    // p: 3,
};

const CustomModal = ({ modalOpen, onClose, description, onChange, name, filename, modalLoader }) => {
    return (
        <Modal
            open={modalOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} width={modalLoader ? "auto" : 400} p={modalLoader ? 1 : 3}>
                <Box>
                    {modalLoader ? <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Oval
                            visible={true}
                            height="70"
                            width="70"
                            color="#000000"
                            ariaLabel="oval-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            secondaryColor="#fff"
                        />
                    </Box> : <>
                        <Typography id="modal-modal-title" variant="h6" component="h2" color={"black"} sx={{ textAlign: "center" }}>
                            {description}
                        </Typography>
                        <Box sx={{ display: "flex", marginTop: "15px", columnGap: "10px", justifyContent: "center" }}>
                            <button onClick={onClose} style={{ height: "40px", width: "80px", backgroundColor: "white", borderRadius: "6px", border: "1px solid black", color: "black", cursor: "pointer", padding: "3px 15px", fontSize: "16px" }}>Close</button>
                            <ImgUploader onChange={onChange} name={name} filename={filename} modalLoader={modalLoader} />
                        </Box>
                    </>}
                </Box>
            </Box>
        </Modal>
    )
}

export default CustomModal
