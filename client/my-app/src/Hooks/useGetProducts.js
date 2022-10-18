import axios from "axios";
import { useCallback, useEffect, useState } from "react";


const useGetProducts = () => {
  const [products, setProducts] = useState([]);
  
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
