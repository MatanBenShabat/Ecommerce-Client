import axios from "axios";
import { useQuery } from "react-query";

const useGetMyProducts = (username) => {
  const { data, refetch, isLoading } = useQuery(
    "fetch-my-products",
    () => {
      return axios.get(
        `${process.env.REACT_APP_URL}/api-products/products?seller=${username}`
      );
    },
    {
      staleTime: 1 * 60 * 1000,
      //   enabled,
      //   cacheTime: 1 * 60 * 1000,
    }
  );
  const products = data?.data?.data?.products;

  return { products, getMyProducts: refetch, loadingMyProducts: isLoading };
};

export default useGetMyProducts;
