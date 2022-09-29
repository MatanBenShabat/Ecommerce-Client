import { useEffect, useState } from "react";
import "./login-page.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  isAdminSelector,
  isRegisteredSelector,
  setIsRegistered,
  userNameSelector,
} from "../../store/loginSlice";
import { useRef } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector(isAdminSelector);
  const isRegistered = useSelector(isRegisteredSelector);
  const userName = useSelector(userNameSelector);

  const userNameRef = useRef();
  const passwordRef = useRef();

  const handleLogin = (e) => {
    e.preventDFefault();
    axios
      .post("http://localhost:5000/api-users/users/login", {
        username: userNameRef.current.value,
        password: passwordRef.current.value,
      })
      .then((res) => {});
  };

  return (
    <div className="login-container">
      <h1 className="login-h1">Login</h1>
      <form className="login-fieldes" onSubmit={handleLogin}>
        <input className="log-input" placeholder="Username" ref={userNameRef} />
        <input
          className="log-input"
          placeholder="Password"
          type="password"
          ref={passwordRef}
        />
        <button className="login-btn">Login</button>
      </form>
      <div className="sign-up-log">
        <h6>Don't have an account?</h6>
        <button
          className="login-btn"
          onClick={() => dispatch(setIsRegistered(true))}
        >
          SIGN UP
        </button>
      </div>
    </div>
  );
};

export default Login;
