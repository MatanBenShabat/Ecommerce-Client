import useGetProducts from "../../Hooks/getProducts";
import "./products.css";
import Product from "./Product";
const Products = () => {
  const products = useGetProducts();

  return (
    <div className="products-container">
      <h1>Products</h1>
      {products.map((item) => {
        return <Product item={item} key={item._id} />;
      })}
    </div>
  );
};

export default Products;
