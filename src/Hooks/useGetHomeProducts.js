import axios from "axios";
import { useQuery } from "react-query";

const useGetHomeProducts = () => {
  const { data, refetch, isLoading } = useQuery(
    "fetch-home-products",
    () => {
      return axios.get(
        `${process.env.REACT_APP_URL}/api-products/home-page-products`
      );
    },
    {
      staleTime: 1 * 60 * 1000,
      //   enabled,
      //   cacheTime: 1 * 60 * 1000,
    }
  );
  //   const itemsObj = data?.data.data || [];
  //   const brandsArray = Object.values(itemsObj).map((e) => e.brand);
  //   const productsNames = Object.values(itemsObj).map((e) => e.productsName);
  //   const brandsSet = new Set([...brandsArray]);
  //   const brands = Array.from(brandsSet);
  const products = data?.data?.data?.products;

  return { products, getHomeProducts: refetch, isLoading };
};

export default useGetHomeProducts;
