import { Alert, Grid, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import socket from "../../socket/socket";
import RenderProducts from "./RenderProducts";
import DeleteItemSnackbar from "../UI/DeleteItemSnackbar";
import ProductsPageSkeleton from "../UI/ProductsPageSkeleton";
import Lottie from "react-lottie";
import animationNoProducts from "../../assets/lotties/no-product.json";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSnackBar, snackBarSelector } from "../../store/snackBarSlice";

const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData: animationNoProducts,
};

const gridSX = {
  marginTop: "30px",
  marginBottom: "100px",
  paddingRight: "10vw",
  paddingLeft: "10vw",
};

const Products = ({ products, page, isLoading }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const snackBarOpened = useSelector(snackBarSelector);


  const [openDeleteItem, setOpenDeleteItem] = useState(false);

  useEffect(() => {
    socket.on("product_added", () => {
      queryClient.invalidateQueries(["fetch-products", page]);
    });
  }, [queryClient, page]);

  const handleCloseDeleteItem = () => setOpenDeleteItem(false);

  const handleDeleteItem = () => setOpenDeleteItem(true);

  const handleCloseSnackBar = () => dispatch(setOpenSnackBar(false));


  return (
    <>
      <Snackbar
        open={snackBarOpened}
        autoHideDuration={2000}
        onClose={handleCloseSnackBar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Your Product Was Added Successfully
        </Alert>
      </Snackbar>
      {/* {!isLoading && products?.length > 0 && <FilteringBar />} */}
      {!isLoading && products?.length === 0 && (
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            color: "#2196f3",
            alignItems: "center",
          }}
        >
          <Grid>
            <Lottie options={lottieOptions} height={400} width={400} />
            <h1>No Products Found</h1>
          </Grid>
        </Grid>
      )}
      <Grid
        container
        rowSpacing={3}
        columnSpacing={{ lg: 7, md: 5, sm: 4 }}
        sx={gridSX}
      >
        {!isLoading && products?.length > 0 && (
          <RenderProducts
            products={products}
            handleDeleteItem={handleDeleteItem}
          />
        )}
        {isLoading && <ProductsPageSkeleton />}
        <DeleteItemSnackbar
          open={openDeleteItem}
          handleClose={handleCloseDeleteItem}
        />
      </Grid>
    </>
  );
};

export default Products;
