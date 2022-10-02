import { useRef } from "react";
import { useSelector } from "react-redux";
import { isLoggedSelector, userNameSelector } from "../../store/loginSlice";
import axios from "axios";
import { useMutation } from "react-query";
// import { useState } from "react";

const AddProduct = ({ getProducts }) => {
  const imageRef = useRef();
  const productNameRef = useRef();
  const priceRef = useRef();
  const isLogged = useSelector(isLoggedSelector);
  const user = useSelector(userNameSelector);
  //   const [image,setImage] = useState("")
  //   const [name,setName] = useState("")
  //   const [price,setPrice] = useState("")

  const addItemMutation = useMutation(
    ({ image, productsName, price }) => {
        console.log(image,productsName,price);
      return axios.post("http://localhost:5000/api-products/products", {
        image: image,
        productsName: productsName,
        price: price,
      });
    },
    { onSuccess: getProducts }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    addItemMutation.mutate({
      image: imageRef.current.value,
      productsName: productNameRef.current.value,
      price: priceRef.current.valueAsNumber,
    });
    // imageRef.current.value = null;
    // productNameRef.current.value = null;
    // priceRef.current.value = null;
    console.log(imageRef.current.value);
    console.log(productNameRef.current.value);
    console.log(priceRef.current.value);
  };
  return (
    <div>
      {isLogged ? (
        <form className="add-product-container" onSubmit={handleSubmit}>
          <h1>Product:</h1>
          <input type="text" placeholder="Image Url..." ref={imageRef} />
          <input type="text" placeholder="Enter Name..." ref={productNameRef} />
          <input type="number" placeholder="Enter Price ..." ref={priceRef} />
          <button type="submit">Add</button>
        </form>
      ) : null}
    </div>
  );
};

export default AddProduct;
