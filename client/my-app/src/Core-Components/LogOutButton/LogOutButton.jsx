import "./log-out-btn.css";
import axios from "axios";
import { useDispatch} from "react-redux";
// import { logOutAdminFront, logOutAdminBack } from "../../Redux/logAdminReducer";
import {
  adminLogoutBack,
  adminLogoutFront,
  customerLogoutBack,
  customerLogoutFront
} from "../../Redux/logAdminReducer";
// import { addOne } from "../../Redux/logRefresherReducer";
// // import { selectCount } from "../../Redux/logRefresherReducer";
// import { useEffect } from "react";
// import { useState } from "react";

const LogOutButton = () => {
  // const isAdminLogged = useSelector(selectAdminLogStatus);
  //   const counter = useSelector(selectCount);
  // const [counter, setCounter] = useState(0);
  const dispatch = useDispatch();
  const logOutAdmin = () => {
    axios
      .post("http://localhost:5000/api-login-status/login-status/log-out")
      .then((res) => {
        dispatch(adminLogoutBack(false))
        dispatch(adminLogoutFront(false))

      })
      
    };
  const logOutCustomer = () => {
    axios
      .post("http://localhost:5000/api-login-status/login-status/log-out-customer")
      .then((res) => {
        dispatch(customerLogoutBack(false))
        dispatch(customerLogoutFront(false))

      })
      
    };
    const logOut = () => {
      logOutAdmin()
      logOutCustomer()
    }
    // .then((res)=>{
    //   dispatch(logOutAdminFront(false))})
          // .then(() => {setCounter(counter + 1)})
    // const getBackLogStatus = () => {
  //   axios
  //     .get("http://localhost:5000/api-login-status/login-status")
  //     .then((res) => {
  //       dispatch(logInAdminBack(res.data[0].logged));
  //     });
  // };
  // const getFrontLogStatus = () => {
  //   axios
  //     .get("http://localhost:5000/api-login-status/login-status")
  //     .then((res) => {
  //       dispatch(logInAdminFront(res.data[1].logged));
  //     });
  // };

  // useEffect(() => {
  //   getBackLogStatus();
  //   getFrontLogStatus();
  //   console.log(isAdminLogged);
  //   console.log(counter);
  // }, [counter]);

  return (
    <div className="log-out-container">
      <button onClick={logOut}>Log Out</button>
    </div>
  );
};
export default LogOutButton;
