import LogOrReg from "../LogOrReg";
import "./home-page.css";




function HomePage() {


  return (
    <div className="home-page-container">
      <div className="first-container">
        <div className="first-header-container">
        </div>
        <div className="login-home-container">
          <LogOrReg/>
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
