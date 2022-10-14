import useGetUserData from "../../Hooks/useGetUserData";
import LogOrReg from "../LogOrReg";
import "./home-page.css";
import Welcome from "./Welcome";

function HomePage() {
const userData = useGetUserData()  ;

  return (
    <div className="home-page-container">
      <div className="first-container">
        <div className="first-header-container"></div>
        <div className="login-home-container">
          {userData ? <Welcome /> : <LogOrReg />}
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
