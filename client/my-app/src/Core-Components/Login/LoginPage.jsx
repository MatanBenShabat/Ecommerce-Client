import { useEffect, useState } from "react";
import "./login-page.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  adminLoginBack,
  customerLoginBack,
  adminLoginFront,
  customerLoginFront,
  selectAdminLogStatus,
  selectCustomerLogStatus,
  showLogin
} from "../../Redux/logAdminReducer";

const Login = () => {
  const dispatch = useDispatch();
  const isAdminLogged = useSelector(selectAdminLogStatus);
  const isCustomerLogged = useSelector(selectCustomerLogStatus);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkCustomerUsername, setCheckCustomerUsername] = useState(false);
  const [checkCustomerPassword, setCheckCustomerPassword] = useState(false);
  const [checkAdminUsername, setCheckAdminUsername] = useState(false);
  const [checkAdminPassword, setCheckAdminPassword] = useState(false);
  const [counter, setCounter] = useState(0);

  const postLoginDetailsBack = () => {
    axios
      .post("http://localhost:5000/api-login-status/login-status/login", {
        username: username,
        password: password,
      })
      .then((res) => {});
  };

  const getLogStatus = () => {
    axios
      .get("http://localhost:5000/api-login-status/login-status")
      .then((res) => {
        res.data[0].adminLogged === true && dispatch(adminLoginBack(true));
        res.data[1].customerLogged === true && dispatch(customerLoginBack(true)); 
      });
  };

  const checkLoginDetailsFront = () => {
    axios.get("http://localhost:5000/api-users/users").then((res) => {
      for (let i = 1; i < res.data.length; i++) {
        if(res.data[i].customerUserName === username) {setCheckCustomerUsername(true)};
        if(res.data[i].customerPassword === password) { setCheckCustomerPassword(true)};
      }
        if(res.data[0].adminUserName === username) { setCheckAdminUsername(true) };
        if(res.data[0].adminPassword === password)  {setCheckAdminPassword(true)};

      checkAdminUsername &&
        checkAdminPassword &&
        dispatch(adminLoginFront(true));
      checkCustomerUsername &&
        checkCustomerPassword &&
        dispatch(customerLoginFront(true));
    });
  };
  const authorize = () => {
    postLoginDetailsBack();
    checkLoginDetailsFront();
    getLogStatus();
    setTimeout( setCounter(counter+1),5000)
  };

  useEffect(() => {
    getLogStatus();
    console.log(isAdminLogged+"adminlogged")
    console.log(isCustomerLogged+"customerlogged");
  }, [isAdminLogged,isCustomerLogged,counter]);
  return (
    <div className="login-container">
      <div className="login-header">
        <h1 className="login-h1">Login</h1>
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
        <button className="login-btn" onClick={() => authorize()}>
          Login
        </button>
      </div>
      <div className="sign-up-log">
        <h6>Don't have an account?</h6>
        <button className="login-btn" onClick={()=>dispatch(showLogin(false))}>SIGN UP</button>
      </div>
    </div>
  );
};

export default Login;
