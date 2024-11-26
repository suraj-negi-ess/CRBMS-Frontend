import React from "react";
import { Box, Button, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DeleteModal = ({ open, onClose, onDeleteConfirm }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        <h2 id="child-modal-title">Confirm Deletion</h2>
        <p id="child-modal-description">
          Are you sure you want to delete this item?
        </p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" color="error" onClick={onDeleteConfirm}>
            Delete
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
