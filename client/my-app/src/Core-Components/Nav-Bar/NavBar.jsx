import { useQueryClient } from "react-query";
import { NavLink } from "react-router-dom";
import useGetUserData from "../../Hooks/useGetUserData";
import "./nav-bar.css";

const Navbar = () => {
  const userData = useGetUserData();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    queryClient.setQueryData("user-data", () => {
      return null;
    });
  };
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
        {userData && <button onClick={handleLogout}>LOGOUT</button>}
        <span></span>
      </nav>
    </header>
  );
};
export default Navbar;
