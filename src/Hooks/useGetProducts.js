import axios from "axios";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { brandSelector } from "../store/brandSlice";

const useGetProducts = (enabled = true, page = 1) => {
  const brand = useSelector(brandSelector);
  const { data, refetch, isLoading } = useQuery(
    ["fetch-products", page,brand],
    () => {
      if (brand !== "" && brand !== "All") {
          return axios.get(
          `${process.env.REACT_APP_URL}/api-products/products/?page=${page}&limit=10&brand=${brand}`
        );
      } else {
        return axios.get(
          `${process.env.REACT_APP_URL}/api-products/products/?page=${page}&limit=10`
        );
      }
    },
    {
      staleTime: 1 * 60 * 1000,
      enabled,
      cacheTime: 1 * 60 * 1000,
    }
  );

  const products = data?.data.data.products || [];
  const numOfProducts = data?.data.length || 0;

  return { products, getProducts: refetch, isLoading, numOfProducts };
};

export default useGetProducts;
