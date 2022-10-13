// import { useEffect, useState } from "react";
import "./login-page.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import {
  setIsLogged,
  setSignUp,
  userNameSelector,
  setUsername,
  setUserType,
  setToken
} from "../../store/loginSlice";
import { useRef } from "react";

const LoginForm = () => {
  const dispatch = useDispatch();
  const userName = useSelector(userNameSelector);

  const userNameRef = useRef();
  const passwordRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api-users/login", {
        email: userNameRef.current.value,
        password: passwordRef.current.value,
      },{
        withCredentials: true
    })
      .then((result) => {
        dispatch(setUsername(result.data.data.user.username))
        setTimeout(dispatch(setIsLogged(true)),500)
        dispatch(setUserType(result.data.data.user.userType))

        })
      .catch((error) => console.log(error))

      
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
          onClick={() => dispatch(setSignUp(false))}
        >
          SIGN UP
        </button>
        <h1>{userName}</h1>
      </div>
    </div>
  );
};

export default LoginForm;
