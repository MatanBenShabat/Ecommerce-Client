import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import useGetProducts from "../../Hooks/useGetProducts";
import socket from "../../socket/socket";
import renderProducts from "../../utils/renderProducts";
import DeleteItemSnackbar from "../UI/DeleteItemSnackbar";
import ProductsPageSkeleton from "../UI/ProductsPageSkeleton";
import Lottie from "react-lottie";
import animationNoProducts from "../../assets/lotties/no-product.json";

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

const Products = () => {
  const { products, isLoading } = useGetProducts();
  const queryClient = useQueryClient();
  const [openDeleteItem, setOpenDeleteItem] = useState(false);

  useEffect(() => {
    socket.on("product_added", () => {
      queryClient.invalidateQueries("fetch-products");
    });
  }, [queryClient]);

  const handleCloseDeleteItem = () => {
    setOpenDeleteItem(false);
  };

  const handleDeleteItem = () => {
    setOpenDeleteItem(true);
  };

  return (
    <Grid
      container
      rowSpacing={3}
      columnSpacing={{ lg: 7, md: 5, sm: 4 }}
      sx={gridSX}
    >
      {!isLoading &&
        products?.length > 0 &&
        renderProducts(products, handleDeleteItem)}
      {!isLoading && products?.length === 0 && (
        <Lottie options={lottieOptions} height={400} width={400} />
      )}
      {isLoading && <ProductsPageSkeleton />}
      <DeleteItemSnackbar
        open={openDeleteItem}
        handleClose={handleCloseDeleteItem}
      />
    </Grid>
  );
};

export default Products;
