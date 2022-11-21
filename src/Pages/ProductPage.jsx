import React from "react";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import { Paper, Typography } from "@mui/material";
import useGetProducts from "../Hooks/useGetProducts";
import { useParams } from "react-router";
import Loading from "../Loading";
import createDateStr from "../utils/createDateStr";

function ProductPage() {
  const { products, isLoading } = useGetProducts();
  const { name } = useParams();

  const product = products?.find((e) => e.productsName.toLowerCase() === name.toLowerCase());
 if(!product){
  return <Loading/>
 }
  return (
    <Grid
      sx={{
        height: "100%",
        width: "100%",
        marginTop: "5%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          height: "80vh",
          width: "80%",
          border: "solid 1px white",
          borderRadius: "5px",
          boxShadow: "0px 1px 3px 3px gray",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {isLoading && <Loading />}
        {!isLoading && (
          <Paper
            alt={product.productsName}
            sx={{ height: "300px", width: "300px",display:"flex",justifyContent:"center",alignItems:"center" }}
          >
            <img alt={product.productsName} src={`${product.image}`}></img>
          </Paper>
        )}
        {!isLoading && (
          <Typography sx={{ color: "gray" }}>
            {product?.productsName}
          </Typography>
        )}
        {!isLoading && (
          <Typography sx={{ color: "gray" }}>{product?.description}</Typography>
        )}
        {!isLoading && (
          <Typography sx={{ color: "gray" }}>{product?.currentBid}</Typography>
        )}
        {!isLoading && (
          <Typography sx={{ color: "gray" }}>
            {createDateStr(product?.endOfAuctionDate)}
          </Typography>
        )}
      </Box>
    </Grid>
  );
}

export default ProductPage;
