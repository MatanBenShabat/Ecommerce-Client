import "./register.css";
import axios from "axios";
import { setSignUp } from "../../store/loginSlice";
import { useDispatch } from "react-redux";
import { useRef } from "react";


function Register() {
  const dispatch = useDispatch();

  const userNameRef = useRef()
  const passwordRef = useRef()

  const postRegisterDetails = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api-users/users", {
        username :userNameRef?.current.value,
        password: passwordRef?.current.value,
      })
      .then((res) => {
        // dispatch(setUsername(res.data.username));
        // dispatch(setIsLogged(true));
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="register-container">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-h1">Register</h1>
        </div>
        <form className="login-fieldes" onSubmit={postRegisterDetails}>
          <input
            className="log-input"
            placeholder="Username"
            ref={userNameRef}
          ></input>

          <input
            className="log-input"
            placeholder="Password"
            type="password"
            ref={passwordRef}

          ></input>
          <input
            className="log-input"
            placeholder="Re-enter Password"
            type="password"
          ></input>

          <button className="login-btn" >
            Sign Up
          </button>
        </form>
        <div className="sign-up-log">
          <h6>Already have an account?</h6>
          <button
            className="login-btn"
            onClick={() => dispatch(setSignUp(true))}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
