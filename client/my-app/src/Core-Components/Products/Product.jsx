import axios from "axios";
import { useSelector } from "react-redux";
import { useMutation } from "react-query";

import "./products.css";
import { selectCustomerLogStatus } from "../../Redux/logAdminReducer";
import { useRef } from "react";

const Product = ({ item, getProducts }) => {
  const ref = useRef();

  const mutation = useMutation(
    (newBid) => {
      return axios.patch(
        `http://localhost:5000/api-products/products/${item._id}`,
        {
          currentBid: newBid,
        }
      );
    },
    { onSuccess: getProducts }
  );


  const isCustomerLogged = useSelector(selectCustomerLogStatus);

  const handleSubmit = (e) => {
    e.preventDefault();
    const changedBid = ref.current.value;
    
    if(changedBid === "") return;

    mutation.mutate(ref.current.value);
    ref.current.value = null;
  };

  return (
    <li className="product-card">
      <h2>{item.image}</h2>
      <h2>{item.productsName}</h2>
      <h2>Price:{item.price}$</h2>
      <h2>Current Bid:{item.currentBid}$</h2>
      {isCustomerLogged ? (
        <form className="bid-container" onSubmit={handleSubmit}>
          <input placeholder="Place Bid..." type="number" min={(item.currentBid + 5)} ref={ref} />
          <button>Bid</button>
          {mutation.isLoading && <h4>Loading...</h4>}
          {mutation.isSuccess && <h4>Your bid was placed successfully</h4>}
          {mutation.isSuccess && <h4>New bid is : {item.currentBid}$</h4>}
        </form>
      ) : null}
    </li>
  );
};

export default Product;
