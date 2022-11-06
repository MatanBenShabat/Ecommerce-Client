import axios from "axios";
import { useQuery } from "react-query";

const useGetNameAndBrand = () => {
  const { data, refetch, isLoading } = useQuery(
    "fetch-name-and-brand",
    () => {
      return axios.get(`https://house-of--auctions.herokuapp.com/api-products/name-and-brand`);
      // return axios.get(`http://localhost:5000/api-products/name-and-brand`);
    },
    {
      staleTime: 1 * 60 * 1000,
      //   enabled,
      //   cacheTime: 1 * 60 * 1000,
    }
  );
  const itemsObj = data?.data.data || [];
  const brandsArray = Object.values(itemsObj).map((e) => e.brand);
  const brandsSet = new Set([...brandsArray]);
  const brands = Array.from(brandsSet);


  return { brands, getNameAndBrand: refetch, isLoading };
};

export default useGetNameAndBrand;