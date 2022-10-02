import useGetProducts from "../../Hooks/useGetProducts";
import "./products.css";
import Product from "./Product";
import AddProduct from "./AddProduct";
import { useEffect } from "react";
import socket from "../../socket/socket"
const Products = () => {
  const [products,getProducts] = useGetProducts();


  useEffect(() => {
    socket.on('product_added',()=>{
      getProducts()
    })
   }, [socket,getProducts]);

  return (
    <div className="products-container">
      <h1>Products</h1>
      {products.map((item) => {
        return <Product item={item} key={item._id} getProducts={getProducts} />;
      })}
            <AddProduct getProducts={getProducts}/>

    </div>
  );
};

export default Products;
