import { Alert, Snackbar } from "@mui/material";
import React from "react";

const DeleteItemSnackbar = ({ open, handleClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert severity="success" sx={{ width: "100%" }} onClose={handleClose}>
        Product deleted successfully!
      </Alert>
    </Snackbar>
  );
};

export default DeleteItemSnackbar;
