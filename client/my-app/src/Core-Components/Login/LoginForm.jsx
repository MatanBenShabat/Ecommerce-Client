// import { useEffect, useState } from "react";
import "./login-page.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  isAdminSelector,
  // signUpSelector,
  setIsLogged,
  setSignUp,
  userNameSelector,
  setUsername,
  setIsAdmin
} from "../../store/loginSlice";
import { useRef } from "react";

const LoginForm = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector(isAdminSelector);
  // const signUp = useSelector(signUpSelector);
  const userName = useSelector(userNameSelector);

  const userNameRef = useRef();
  const passwordRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api-users/users/login", {
        username: userNameRef.current.value,
        password: passwordRef.current.value,
      })
      .then((result) => {console.log(result.data.data.user.username)
        dispatch(setUsername(result.data.data.user.username))
        dispatch(setIsLogged(true))
        dispatch(setIsAdmin(result.data.data.user.userType === "ADMIN"))

        })
      .catch((error) => console.log(error.response.data.messege))

      
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
