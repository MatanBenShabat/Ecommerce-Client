import axios from "axios";
import { useQuery } from "react-query";

const useGetProducts = (enabled = true,page=1) => {
  const { data, refetch, isLoading } = useQuery(
    ["fetch-products",page],
    () => {
     return axios.get(`http://localhost:5000/api-products/products/?page=${page}&limit=10`);
    },
    {
      staleTime: 1 * 60 * 1000,
      enabled,
      cacheTime: 1 * 60 * 1000
    }
  );
  const products = data?.data.data.products || [];

  return { products, getProducts: refetch, isLoading };
};

export default useGetProducts;
