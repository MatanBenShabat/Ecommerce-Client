import Login from "../Login/LoginPage";
import "./home-page.css";
import { useSelector } from "react-redux";
import { selectAdminLogStatus,selectCustomerLogStatus,selectShowLogin } from "../../Redux/logAdminReducer";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useEffect } from "react";
import Register from "../Register/Register";


function HomePage() {
  const isAdminLogged = useSelector(selectAdminLogStatus);
  const isCustomerLogged = useSelector(selectCustomerLogStatus);
  const registered = useSelector(selectShowLogin);
  // useEffect(() => {
  //   console.log(isAdminLogged);
  // }, [isAdminLogged]);

  return (
    <div className="home-page-container">
      <div className="first-container">
        <div className="first-header-container">
        </div>
        <div className="login-home-container">
          {registered ? <Login/> : <Register/>}
          {isAdminLogged  ? <LogOutButton/> : <h1>Log In 2</h1>}
          {isCustomerLogged  ? <LogOutButton/> : <h1>Log In 2</h1>}
          {/* {console.log(isAdminLogged)} */}

        </div>
      </div>
      <div className="colors-container">
        <div className="second-container">
          <h1>SearchBar</h1>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
