import React from "react";
import useGetUserData from "../Hooks/useGetUserData";
import Products from "../Core-Components/Products/Products";

import AddProduct from "../Core-Components/Products/AddProduct";

const ProductsPage = () => {
  const userData = useGetUserData();
  const isSeller = userData?.userType === "seller";

  return (
    <React.Fragment>
      <Products />
      {isSeller && <AddProduct />}
    </React.Fragment>
  );
};

export default ProductsPage;
