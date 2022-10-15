import { useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useMutation } from "react-query";
import React from "react";
import socket from "../../socket/socket";
import useGetUserData from "../../Hooks/useGetUserData";

const AddProduct = ({ getProducts }) => {
  const userData =useGetUserData()
  const imageRef = useRef();
  const productNameRef = useRef();
  const priceRef = useRef();
  const brandRef = useRef();
  const descriptionRef = useRef();
  // const isLogged = useSelector(isLoggedSelector);

  const handleSuccess = React.useCallback(() => {
    socket.emit("add_product");
    getProducts();
  }, [getProducts]);

  const addItemMutation = useMutation(
    ({ image, productsName, price, brand, description }) => {
      return axios.post("http://localhost:5000/api-products/products", {
        image: image,
        productsName: productsName,
        price: price,
        brand: brand,
        description: description,
        seller: userData.username
      });
    },
    { onSuccess: handleSuccess }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    addItemMutation.mutate({
      image: imageRef.current.value,
      productsName: productNameRef.current.value,
      price: priceRef.current.valueAsNumber,
      brand: brandRef.current.value,
      description: descriptionRef.current.value,
    });

    imageRef.current.value = '';
    productNameRef.current.value = '';
    priceRef.current.value = '';
    brandRef.current.value = '';
    descriptionRef.current.value = '';
  };
  return (
    <div>
      {/* {isLogged ? ( */}
      <form className="add-product-container" onSubmit={handleSubmit}>
        <h1>Product:</h1>
        <input type="text" placeholder="Image Url..." ref={imageRef} />
        <input type="text" placeholder="Enter Name..." ref={productNameRef} />
        <input type="text" placeholder="Enter Brand..." ref={brandRef} />
        <input type="text" placeholder="Enter Description..." ref={descriptionRef} />
        <input type="number" placeholder="Enter Price ..." ref={priceRef} />
        <button type="submit">Add</button>
      </form>
      {/* ) : null} */}
    </div>
  );
};

export default AddProduct;
