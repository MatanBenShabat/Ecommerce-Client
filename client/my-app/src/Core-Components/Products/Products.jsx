import useGetProducts from "../../Hooks/useGetProducts";
import AddProduct from "./AddProduct";
import React, { useEffect, useState } from "react";
import socket from "../../socket/socket";
import useGetUserData from "../../Hooks/useGetUserData";
import Product from "./Product";
import {
  Alert,
  Button,
  Container,
  Grid,
  Skeleton,
  Snackbar,
} from "@mui/material";
const Products = () => {
  const userData = useGetUserData();
  const [products, getProducts] = useGetProducts();
  const [open, setOpen] = useState(false);
  const [openAddItem, setOpenAddItem] = useState(true);
  const [openDeleteItem, setOpenDeleteItem] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenAddItem(true);
  };

  const handleCloseDeleteItem = () => {
    openDeleteItem(false);
  };

  const handleAddItemClose = () => {
    setOpenAddItem(false);
  };

  useEffect(() => {
    socket.on("product_added", () => {
      getProducts();
    });
  }, [getProducts]);

  return (
    <Container maxWidth="sm" sx={{ marginTop: "50px" }}>
      <Grid container spacing={2}>
        {products.map((item) => {
          return (
            <Grid item xs={12} md={6} key={item._id}>
              <Product
                item={item}
                getProducts={getProducts}
                setOpenDeleteItem={setOpenDeleteItem}
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
          <Snackbar
            open={openDeleteItem}
            autoHideDuration={3000}
            onClose={handleCloseDeleteItem}
          >
            <Alert
              severity="success"
              sx={{ width: "100%" }}
              onClose={handleCloseDeleteItem}
            >
              Product deleted successfully!
            </Alert>
          </Snackbar>
        </React.Fragment>
      )}
    </Container>
  );
};

export default Products;
