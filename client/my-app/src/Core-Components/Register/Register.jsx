import { useState } from "react";
import "./register.css";
import axios from "axios";
import {
  setSignUp
} from "../..//store/loginSlice";
import { useDispatch} from "react-redux";



function Register() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [password2, setPassword2] = useState("");
  const postRegisterDetails = () => {
    axios
      .post("http://localhost:5000/api-users/users", {
        username,
        password,
      })
      .then((res) => {console.log(res)});
  };
  return (
    <div className="register-container">
          <div className="login-container">
      <div className="login-header">
        <h1 className="login-h1">Register</h1>
      </div>
      <div className="login-fieldes">
        <input
          className="log-input"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        ></input>

        <input
          className="log-input"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          className="log-input"
          placeholder="Re-enter Password"
          type="password"
          // onChange={(e) => setPassword2(e.target.value)}
        ></input>
        <button className="login-btn" onClick={postRegisterDetails}>
          Sign Up
        </button>
      </div>
      <div className="sign-up-log">
        <h6>Already have an account?</h6>
        <button className="login-btn" onClick={()=>dispatch(setSignUp(true))}>Sign In</button>
      </div>
    </div>
    </div>
  );
}

export default Register;