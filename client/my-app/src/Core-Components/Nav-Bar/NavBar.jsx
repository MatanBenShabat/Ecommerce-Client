import { NavLink } from "react-router-dom";
import "./nav-bar.css";

const Navbar = () => {
  return (
    <header>
      <nav>
        <NavLink className="nav-btn" to="/">
          <strong>Home</strong>
        </NavLink>
        <NavLink className="nav-btn" to="/products">
          <strong>Products</strong>
        </NavLink>

        <NavLink className="nav-btn" to="/contact-us">
          <strong>Contact Us</strong>
        </NavLink>
        <span></span>
      </nav>
    </header>
  );
};
export default Navbar;
