import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

import "./products.css";
import { selectCustomerLogStatus } from "../../Redux/logAdminReducer";
const Product = ({ item }) => {
  const [bidValue, setBidValue] = useState(item.currentBid);

  const isCustomerLogged = useSelector(selectCustomerLogStatus);

  const bid = () => {
    axios.patch(`http://localhost:5000/api-products/products/${item._id}`, {
      currentBid: bidValue
    });
  };

  const handleChange = (e) => {
    setBidValue(e.target.value);
  };

  return (
    <li className="product-card">
      <h2>{item.image}</h2>
      <h2>{item.productsName}</h2>
      <h2>Price:{item.price}$</h2>
      <h2>Current Bid:{item.currentBid}$</h2>
      {isCustomerLogged ? (
        <div className="bid-container">
          <input placeholder="Place Bid..." onChange={handleChange} />
          <button onClick={bid}>Bid</button>
        </div>
      ) : null}
    </li>
  );
};

export default Product;
