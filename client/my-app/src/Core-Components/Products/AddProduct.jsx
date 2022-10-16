import axios from "axios";
import { useMutation } from "react-query";
import React from "react";
import socket from "../../socket/socket";
import useGetUserData from "../../Hooks/useGetUserData";
import { Button, Dialog, Slide, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddProduct = ({ getProducts, isOpen, handleClose }) => {
  const userData = useGetUserData();
  const { handleSubmit, control } = useForm();

  const handleSuccess = React.useCallback(() => {
    socket.emit("add_product");
    getProducts();
  }, [getProducts]);

  const handleSubmitAdd = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    addItemMutation.mutate(data);
    handleClose();
  };

  const onSubmit = (values) => console.log(values);
  const addItemMutation = useMutation(
    (data) => {
      return axios.post("http://localhost:5000/api-products/products", {
        image: data.get("image"),
        productsName: data.get("name"),
        price: data.get("price"),
        brand: data.get("brand"),
        description: data.get("description"),
        seller: userData.username,
      });
    },
    { onSuccess: handleSuccess }
  );

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <Button onClick={handleClose}>CLOSE</Button>
      <form className="add-product-container" onSubmit={handleSubmitAdd}>
        <h1>Product:</h1>
        <TextField
          required
          placeholder="Image Url..."
          id="filled-required"
          label="Image"
          name="image"
          autoComplete="image"
          variant="filled"
        />
        <TextField
          required
          placeholder="Name..."
          id="filled-required"
          label="Product Name"
          name="name"
          autoComplete="name"
          variant="filled"
        />
        <TextField
          required
          placeholder="Brand..."
          id="filled-required"
          label="Brand"
          name="brand"
          autoComplete="brand"
          variant="filled"
        />
        <TextField
          required
          placeholder="Description..."
          id="filled-required"
          label="Description"
          name="description"
          autoComplete="description"
          variant="filled"
        />
        <TextField
          required
          placeholder="Price..."
          id="filled-required"
          label="Price"
          name="price"
          autoComplete="price"
          variant="filled"
        />
        <Button type="submit" size="small">
          Add
        </Button>
      </form>
    </Dialog>
  );
};

export default AddProduct;
