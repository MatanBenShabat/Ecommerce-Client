import { Grid } from "@mui/material";
import React from "react";
import Product from "./Product";
import useGetUserData from "../../Hooks/useGetUserData";


const RenderProducts = ({products, handleDelete}) => {
  const userData = useGetUserData();
  return products.map((item) => {
    if(item.isActive === false && userData.userName !== item.userName) return null;
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
  })
};

export default RenderProducts;
