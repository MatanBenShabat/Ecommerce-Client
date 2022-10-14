import { Route, Routes } from "react-router";
import ContactUs from "./Core-Components/Contact-Us/ContactUs";
import HomePage from "./Core-Components/Home-page/HomePage";
import LoginForm from "./Core-Components/Login/LoginForm";
import NavBar from "./Core-Components/Nav-Bar/NavBar";
import Products from "./Core-Components/Products/Products";
import Register from "./Core-Components/Register/Register";
import { useQuery } from "react-query";
import axios from "axios";
import React from "react";

const tryLogin = () => {
  return axios.post(
    "http://localhost:5000/api-users/startApp",
  );
};

function App() {
   useQuery("user-data", tryLogin, {
    refetchOnWindowFocus: false,
    retry: false, // toDelete,
  });

  return (
    <React.Fragment>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
