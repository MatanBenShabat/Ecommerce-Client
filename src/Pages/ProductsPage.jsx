import useGetUserData from "../Hooks/useGetUserData";
import Products from "../Core-Components/Products/Products";
import AddProduct from "../Core-Components/Products/AddProduct";
import { Box, Pagination } from "@mui/material";
import useGetProducts from "../Hooks/useGetProducts";
import { useNavigate, useParams } from "react-router";
import FilteringBar from "../Core-Components/Products/Filtering/FilteringBar";

const calcPageCount = (num)=>{
  return Math.ceil(num / 10)
}

const ProductsPage = () => {
  const {page} = useParams();
  const changePage = useNavigate()
  // const [page, setPage] = useState(pageParam);
  const userData = useGetUserData();
  const { products, numOfProducts, isLoading } = useGetProducts(true, page);

  const isSeller = userData?.userType === "seller";

  const handleChange = (_e, page) => {
    changePage(`/products/${page}`)
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      mb="5rem"
    >
      <FilteringBar />
      <Products page={page} isLoading={isLoading} products={products} />
      <Pagination onChange={handleChange} count={calcPageCount(numOfProducts)} defaultPage={page * 1} />
      {isSeller && <AddProduct />}
    </Box>
  );
};

export default ProductsPage;
