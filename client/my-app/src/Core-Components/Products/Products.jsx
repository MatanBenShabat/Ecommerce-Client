import useGetProducts from "../../Hooks/useGetProducts";
import "./products.css";
import Product from "./Product";
import AddProduct from "./AddProduct";
import { useEffect } from "react";
import socket from "../../socket/socket"
import useGetUserData from "../../Hooks/useGetUserData";
const Products = () => {

  const userData = useGetUserData()
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
            { userData?.userType === "seller" && <AddProduct getProducts={getProducts}/>}

    </div>
  );
};

export default Products;
