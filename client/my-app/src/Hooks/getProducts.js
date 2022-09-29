import axios from "axios";
import { useEffect, useState } from "react";
const useGetProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api-products/products").then((res) => {
      setProducts(res.data);
    });
  }, []);
  return products;
};

export default useGetProducts;
