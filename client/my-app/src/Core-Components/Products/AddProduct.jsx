import React, { useState } from "react";
import AddProductForm from "./AddProductForm";
import { Snackbar } from "@mui/material";
import useResizeWindow from "../../Hooks/useResizeWindow";
import selectAddButton from "../../utils/selectAddButton";

const AddProduct = () => {
  const windowWidth = useResizeWindow();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenForm = () => {
    setIsOpen(true);
  };

  const handleCloseForm = () => {
    setIsOpen(false);
  };

  return (
    <React.Fragment>
      <AddProductForm isOpen={isOpen} handleClose={handleCloseForm} />
      <Snackbar
        open={!isOpen}
        onClick={handleOpenForm}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {selectAddButton(windowWidth, handleOpenForm)}
      </Snackbar>
    </React.Fragment>
  );
};

export default AddProduct;
