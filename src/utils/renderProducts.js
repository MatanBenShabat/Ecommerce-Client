import { Grid } from "@mui/material";
import React from "react";
import Product from "../Core-Components/Products/Product";


const renderProducts = (products, handleDelete) => {
  return products.map((item) => {
    if(item.isActive === false) return null;
    return (
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        key={item._id}
        display={"flex"}
        justifyContent="center"
        alignItems="center"
      >
        <Product item={item} onDelete={handleDelete} />
      </Grid>
    );
  });
};

export default renderProducts;
