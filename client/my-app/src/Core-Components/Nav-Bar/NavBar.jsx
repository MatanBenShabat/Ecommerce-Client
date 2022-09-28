import { NavLink } from "react-router-dom";
import "./nav-bar.css";
import { useDispatch, useSelector } from "react-redux";
import {
selectWhosConnected
} from "../../Redux/logAdminReducer";



const Navbar = () => {
  const whoConnected = useSelector(selectWhosConnected);

  return (
    <div className="nav-bar-container">
      <div className="nav-btns-container">
        <div className="logo-container">
          <NavLink className="nav-btn" to="/">
            <strong>Logo</strong>
          </NavLink>
        </div>
        <div className="middle-btns-container">
          <div className="middle-btns-inner-container">
            <NavLink className="nav-btn" to="/">
              <strong>Home</strong>
            </NavLink>
            <NavLink className="nav-btn" to="/products">
              <strong>Products</strong>
            </NavLink>
            <NavLink className="nav-btn" to="/contact-us">
              <strong>Contact Us</strong>
            </NavLink>
          </div>
        </div>
        <div className="log-reg-btns">
          <NavLink className="nav-btn" to="/login">
            <strong>Login</strong>
          </NavLink>
          <NavLink className="nav-btn" to="/register">
            <strong>Register</strong>
          </NavLink>
          <div>{whoConnected}</div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
