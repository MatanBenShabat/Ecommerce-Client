import axios from "axios";
import { useEffect, useState } from "react";
import {  useSelector } from "react-redux";

import "./products.css";
import { selectCustomerLogStatus } from "../../Redux/logAdminReducer";
import Product from "./Product";
const Products = () => {
  const [products, setProducts] = useState([]);
  
  const getProducts = () => {
    axios.get("http://localhost:5000/api-products/products").then((res) => {
      setProducts(res.data);
    });
  };


  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="products-container">
      <h1>Products</h1>
      {products.map((item) => {
        return <Product item={item} key={item._id}/>;
      })}
    </div>
  );
};

export default Products;
