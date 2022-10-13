import axios from "axios";
import { useSelector } from "react-redux";
import { useMutation } from "react-query";

import "./products.css";
import { userTypeSelector, userNameSelector } from "../../store/loginSlice";
import React, { useRef } from "react";
import socket from "../../socket/socket";
import DeleteProduct from "./DeleteProduct";

const Product = ({ item, getProducts }) => {
  const ref = useRef();
  const userType = useSelector(userTypeSelector);
  const user = useSelector(userNameSelector);

  // const token = localStorage.getItem("token");

  const handleDeleteSuccess = React.useCallback(() => {
    socket.emit("delete_product");
    getProducts();
  }, [getProducts]);

  const deleteMutation = useMutation(
    () => {
      return axios.delete(
        `http://localhost:5000/api-products/products/${item._id}`,
        { withCredentials: true }
      );
    },
    { onSuccess: handleDeleteSuccess }
  );

  const handleSuccess = React.useCallback(() => {
    socket.emit("add_bid");
    getProducts();
  }, [getProducts]);

  const mutation = useMutation(
    (newBid) => {
      return axios.patch(
        `http://localhost:5000/api-products/products/${item._id}`,
        {
          currentBid: newBid,
          currentBidder: user,
        },
        { withCredentials: true }
      );
    },
    { onSuccess: handleSuccess }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const changedBid = ref.current.value;

    if (changedBid === "") return;

    mutation.mutate(ref.current.value);
    ref.current.value = null;
  };

  return (
    <li className="product-card">
      <h2>{item.image}</h2>
      <h2>{item.productsName}</h2>
      <h2>Price:{item.price}$</h2>
      <h2>Current Bid:{item.currentBid}$</h2>
      <h2>Current Bidder:{item.currentBidder}</h2>
      {localStorage.getItem("isLogged") ? (
        <form className="bid-container" onSubmit={handleSubmit}>
          <input
            placeholder="Place Bid..."
            type="number"
            min={item.currentBid + 5}
            ref={ref}
          />
          <button>Bid</button>
          {mutation.isLoading && <h4>Loading...</h4>}
          {mutation.isSuccess && <h4>Your bid was placed successfully</h4>}
          {mutation.isSuccess && <h4>New bid is : {item.currentBid}$</h4>}
        </form>
      ) : null}
      {userType === "seller" || "admin" ? <button onClick={deleteMutation.mutate}>Delete</button>: null}
    </li>
  );
};

export default Product;
