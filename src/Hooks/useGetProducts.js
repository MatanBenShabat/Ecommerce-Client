import axios from "axios";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { brandSelector } from "../store/brandSlice";
import { greaterThanSelector, lessThanSelector } from "../store/priceFilterSlice";
import { sortSelector } from "../store/sortSlice";

const useGetProducts = (enabled = true, page = 1) => {
  const brand = useSelector(brandSelector);
  const sort = useSelector(sortSelector);
  const lessThan = useSelector(lessThanSelector)
  const greaterThan = useSelector(greaterThanSelector)
  const { data, refetch, isLoading } = useQuery(
    ["fetch-products", page,brand,sort,lessThan,greaterThan],
    () => {
      if (brand !== "" && sort === "") {
          return axios.get(
          `${process.env.REACT_APP_URL}/api-products/products/?price[gte]=${greaterThan}&price[lte]=${lessThan}&page=${page}&limit=10&brand=${brand}`
        );
      } else if (brand !== "" && sort !=="") {
        return axios.get(
        `${process.env.REACT_APP_URL}/api-products/products/?price[gte]=${greaterThan}&price[lte]=${lessThan}&page=${page}&limit=10&brand=${brand}&sort=${sort}`
      );
    }else if (brand === "" && sort !=="") {
      return axios.get(
      `${process.env.REACT_APP_URL}/api-products/products/?price[gte]=${greaterThan}&price[lte]=${lessThan}&page=${page}&limit=10&sort=${sort}`
    );
  }
      else {
        return axios.get(
          `${process.env.REACT_APP_URL}/api-products/products/?price[gte]=${greaterThan}&price[lte]=${lessThan}&page=${page}&limit=10`
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
