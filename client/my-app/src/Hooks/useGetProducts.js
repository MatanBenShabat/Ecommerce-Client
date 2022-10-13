import axios from "axios";
import { useCallback, useEffect, useState } from "react";


const useGetProducts = () => {
  // const token = localStorage.getItem("token");
  const [products, setProducts] = useState([]);
  // const config = {
  //   headers: { authorization: `Bearer ${token}` },
  // };
  const getProducts = useCallback(() => {
    axios
      .get("http://localhost:5000/api-products/products",{
        withCredentials: true
    })
      .then((res) => {
        setProducts(res.data.data.products);
      });
  }, [setProducts]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return [products, getProducts];
};

export default useGetProducts;
