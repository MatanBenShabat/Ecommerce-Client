import React, { useState } from "react";
import useGetUserData from "../Hooks/useGetUserData";
import Products from "../Core-Components/Products/Products";
import AddProduct from "../Core-Components/Products/AddProduct";
import { Box, Pagination } from "@mui/material";

const ProductsPage = () => {
  const [page,setPage]= useState(1)
  const userData = useGetUserData();
  const isSeller = userData?.userType === "seller";

  const handleChange = (_e,page)=>{
    setPage(page)
  }

  return (
    <Box display='flex' flexDirection='column' alignItems='center' justifyContent="center" mb='5rem'>
      <Products page={page}/>
      <Pagination onChange={handleChange} count={10} />
      {isSeller && <AddProduct />}
    </Box>
  );
};

export default ProductsPage;
