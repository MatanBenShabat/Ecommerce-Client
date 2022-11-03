import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import React from "react";
import socket from "../../socket/socket";
import useGetUserData from "../../Hooks/useGetUserData";
import {useDispatch} from 'react-redux'
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
import { setOpenSnackBar } from "../../store/snackBarSlice";

const schema = yup.object().shape({
  productsName: yup
    .string()
    .required("The Product's name is required")
    .min(2, "Products Name must be at least 2 characters"),
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

const AddProductForm = ({ isOpen, handleClose }) => {
  const userData = useGetUserData();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();


  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      image: "",
      productsName: "",
      brand: "",
      description: "",
      price: 0,
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const handleSuccess = React.useCallback(() => {
    socket.emit("add_product");
    queryClient.invalidateQueries("fetch-products");
    reset();
    window.scrollTo(0, 0);
    dispatch(setOpenSnackBar(true))

  }, [reset, queryClient, dispatch]);

  const addItemMutation = useMutation(
    (data) => {
      return axios.post(`${process.env.REACT_APP_URL}/api-products/products`, {
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
        <Stack direction={"column"} gap={2}>
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.image}
                helperText={errors.image?.message || " "}
                label="Image"
                variant="outlined"
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
                helperText={errors.productsName?.message || " "}
                label="Products Name"
                variant="outlined"
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
                helperText={errors.brand?.message || " "}
                label="Brand Name"
                variant="outlined"
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
                helperText={errors.description?.message || " "}
                label="Description"
                variant="outlined"
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
                helperText={errors.price?.message || " "}
                label="Price"
                type="number"
                variant="outlined"
              />
            )}
          />
          <Button type="submit" size="small" disabled={!isValid}>
            Add
          </Button>
        </Stack>
      </Container>
    </Dialog>
  );
};

export default AddProductForm;
