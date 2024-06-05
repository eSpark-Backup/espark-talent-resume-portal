import React from "react";
import { Box, Modal, Stack, Typography } from "@mui/material";

const ConfirmationModal = ({
  open,
  handleClose,
  title,
  description,
  confirmText,
  canceltext,
  confirmAction,
  cancelAction,
  loading,
}) => {
  return (
    <Modal
      sx={{ background: "#fff" }}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        className="modal card"
        sx={{
          background: "#fff",
          maxWidth: "500px",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          padding: "20px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2" color={"black"}>
          {title}
        </Typography>
        <Typography id="modal-modal-description" color={"black"}>
          {description}
        </Typography>
        <Stack width="100%" direction="row" justifyContent="space-between" alignItems="center" gap="10px">
          <button className="btn btn-cancel" onClick={cancelAction}>{canceltext}</button>
          <button
            onClick={confirmAction}
            className={`btn btn-confirm ${loading ? "disabled" : ""}`}
            disabled={loading}
          >
            {loading ? "loading..." : confirmText}
          </button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
