import React from "react";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import { Paper, Typography } from "@mui/material";
import useGetProducts from "../Hooks/useGetProducts";
import { useParams } from "react-router";
import Loading from "../Loading";
import createDateStr from "../utils/createDateStr";

function ProductPage() {
  const styles = {
    container: {
      height: "100%",
      width: "100%",
      marginTop: "5%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    innerContainer: {
      height: "80vh",
      width: "80%",
      border: "solid 1px white",
      borderRadius: "5px",
      boxShadow: "0px 1px 3px 3px gray",
    },
    image: {
      height: "40%",
      width: "30%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    productContainer: {
      alignSelf: "flex-start",
      display: "flex",
      gap: "10%",
      marginLeft: "5%",
      marginTop: "5%",
    },
  };
  const { products, isLoading } = useGetProducts();
  const { name } = useParams();

  const product = products?.find(
    (e) => e.productsName.toLowerCase() === name.toLowerCase()
  );
  if (!product) {
    return <Loading />;
  }

  return (
    <Grid sx={styles.container}>
      <Box sx={styles.innerContainer}>
        {isLoading ? (
          <Loading />
        ) : (
          <Box>
            <Box sx={styles.productContainer}>
              <Paper alt={product.productsName} sx={styles.image}>
                <img alt={product.productsName} src={`${product.image}`}></img>
              </Paper>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "2%" }}>
                <Typography sx={{ color: "black", fontSize: "1.5rem" }}>
                  {product?.productsName}
                </Typography>
                <Typography sx={{ color: "gray" }}>
                  {product?.description}
                </Typography>
                <Typography
                  sx={{
                    color: "black",
                    fontSize: "1.1rem",
                    display: "flex",
                    gap: "30%",
                  }}
                >
                  Current Bid:
                  <Typography sx={{ color: "black", fontSize: "2rem" }}>
                    ${product?.currentBid}
                  </Typography>
                </Typography>
                <Typography sx={{ color: "gray" }}>
                  End Date: {createDateStr(product?.endOfAuctionDate)}
                </Typography>
              </Box>
            </Box>
            
          </Box>
        )}
      </Box>
    </Grid>
  );
}

export default ProductPage;
