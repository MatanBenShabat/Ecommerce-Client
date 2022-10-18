import useGetProducts from "../../Hooks/useGetProducts";
import AddProduct from "./AddProduct";
import React, { useEffect, useState } from "react";
import socket from "../../socket/socket";
import useGetUserData from "../../Hooks/useGetUserData";
import MUIProduct from "./MUIProduct";
import { Button, Container, Grid, Skeleton, Snackbar } from "@mui/material";
const Products = () => {
  const userData = useGetUserData();
  const [products, getProducts] = useGetProducts();
  const [open, setOpen] = useState(false);
  const [openAddItem, setOpenAddItem] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenAddItem(true);
  };

  const handleAddItemClose = () => {
    setOpenAddItem(false);
  };

  useEffect(() => {
    socket.on("product_added", () => {
      getProducts();
    });
  }, [socket, getProducts]);
  
  return (
    <Container maxWidth="sm" sx={{ marginTop: "50px" }}>
      <Grid container spacing={2}>
        {products.map((item) => {
          return (
            <Grid item xs={12} md={6} key={item._id}>
              <MUIProduct
                item={item}
                getProducts={getProducts}
              />
            </Grid>
          );
        })}
        </Grid>
        {/* <Skeleton variant="rectangular" width={210} height={118} /> */}

      {userData?.userType === "seller" && (
        <React.Fragment>
          <AddProduct
            getProducts={getProducts}
            isOpen={open}
            handleClose={handleClose}
          />
          <Snackbar
            open={openAddItem}
            onClick={handleAddItemClose}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <Button onClick={handleClickOpen}>Add Product</Button>
          </Snackbar>
        </React.Fragment>
      )}
    </Container>
  );
};

export default Products;
