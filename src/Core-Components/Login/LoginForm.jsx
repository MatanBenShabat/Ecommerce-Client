// import { useEffect, useState } from "react";
import "./login-page.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { setSignUp } from "../../store/loginSlice";
import { useRef } from "react";
import { useQueryClient } from "react-query";

const LoginForm = () => {
  const dispatch = useDispatch();
  const queryclient = useQueryClient();

  const userNameRef = useRef();
  const passwordRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api-users/login", {
      // .post(`${process.env.REACT_APP_URL}/api-users/login`, {
        email: userNameRef.current.value,
        password: passwordRef.current.value,
      })
      .then((result) => {
        const loginData = {username:result.data.data.user.username,
        userType : result.data.data.user.userType};
        queryclient.setQueryData("user-data", () => {
          return {
            data: { data: loginData },
          };
        });
      })
      // .catch((error));// shouldhandle
  };

  return (
    <div className="login-container">
      <h1 className="login-h1">Login</h1>
      <form className="login-fieldes" onSubmit={handleLogin}>
        <input
          className="log-input"
          placeholder="Username"
          ref={userNameRef}
          defaultValue="seller@jonas.io"
        />
        <input
          className="log-input"
          placeholder="Password"
          type="password"
          ref={passwordRef}
          defaultValue="12345678"
        />
        <button className="login-btn">Login</button>
      </form>
      <div className="sign-up-log">
        <h6>Don't have an account?</h6>
        <button
          className="login-btn"
          onClick={() => dispatch(setSignUp(false))}
        >
          SIGN UP
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
