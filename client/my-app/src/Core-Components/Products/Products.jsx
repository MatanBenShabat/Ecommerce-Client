import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./products.css"
import {
    whosLogged,
    selectCustomerLogStatus,
    selectAdminLogStatus
  } from "../../Redux/logAdminReducer";
const Products = () => {
  const[bidValue,setBidValue] = useState(0)
  const isAdminLogged = useSelector(selectAdminLogStatus);
  const isCustomerLogged = useSelector(selectCustomerLogStatus);
  const [products, setProducts] = useState([]);
  const getProducts = () => {
    axios.get("http://localhost:5000/api-products/products").then((res) => {
      setProducts(res.data);
    });
  };
  const bid = () => {
    axios.get("http://localhost:5000/api-products/products").then((res) => {
      if(res.data.product.price < bidValue && res.data.product.currentBid < bidValue ){
      axios.patch("http://localhost:5000/api-products/products", {currentBid: bidValue})} else{ console.log("bid is too low")}

      })
  }

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="products-container">
      <h1>Products</h1>
      {products.map((item, i) => {
        return (
          <div key={i} className="product-container">
            <ul key={i}>
              <li>{item.product.image}</li>
              <li>{item.product.productsName}</li>
              <li>Price:{item.product.price}$</li>
              <li>Current Bid:{item.product.currentBid}$</li>
              {isCustomerLogged ? 
              <div className="bid-container">
              <input placeholder="Place Bid..." onChange={(e) => setBidValue(e.target.value)}></input>
              <button>Bid</button>
              </div>
             : null}
              {isAdminLogged ? 
              <div className="bid-container">
              <input placeholder="Place Bid..." onChange={(e) => setBidValue(e.target.value)}></input>
              <button>Bid</button>
              </div>
             : null}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
