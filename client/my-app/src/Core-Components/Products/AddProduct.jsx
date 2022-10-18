import axios from "axios";
import { useMutation } from "react-query";
import React from "react";
import socket from "../../socket/socket";
import useGetUserData from "../../Hooks/useGetUserData";
import {
  Button,
  Container,
  Dialog,
  Slide,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  productsName: yup.string().required("The Product's name is required"),
  description: yup.string().required("Description is required."),
  price: yup
    .number("Enter a number")
    .positive("Must be a positive number")
    .integer("Enter a full number")
    .required(),
  image: yup.string().required("Please enter image"),
  brand: yup.string().required("Please enter brand name"),
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddProduct = ({ getProducts, isOpen, handleClose }) => {
  const userData = useGetUserData();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      image: "",
      productsName: "",
      brand: "",
      description: "",
      price: "",
    },
    resolver: yupResolver(schema),
  });

  const handleSuccess = React.useCallback(() => {
    socket.emit("add_product");
    getProducts();
    reset();
    window.scrollTo(0, 0);
  }, [reset, getProducts]);

  const addItemMutation = useMutation(
    (data) => {
      return axios.post("http://localhost:5000/api-products/products", {
        image: data.image,
        productsName: data.productsName,
        price: data.price,
        brand: data.brand,
        description: data.description,
        seller: userData.username,
      });
    },
    { onSuccess: handleSuccess }
  );

  const handleSubmitAdd = (data) => {
    addItemMutation.mutate(data);
    handleClose();
  };

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <Button onClick={handleClose}>CLOSE</Button>
      <Container component={"form"} onSubmit={handleSubmit(handleSubmitAdd)}>
        <Typography textAlign={"center"}>Product:</Typography>
        <Stack direction={"column"}>
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.image}
                helperText={errors.image?.message}
                label="Image"
                variant="filled"
              />
            )}
          />

          <Controller
            name="productsName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.productsName}
                helperText={errors.productsName?.message}
                label="Products Name"
                variant="filled"
              />
            )}
          />

          <Controller
            name="brand"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.brand}
                helperText={errors.brand?.message}
                label="Brand Name"
                variant="filled"
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.description}
                helperText={errors.description?.message}
                label="Description"
                variant="filled"
              />
            )}
          />

          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.price}
                helperText={errors.price?.message}
                label="Price"
                type={"number"}
                variant="filled"
              />
            )}
          />
          <Button type="submit" size="small">
            Add
          </Button>
        </Stack>
      </Container>
    </Dialog>
  );
};

export default AddProduct;
