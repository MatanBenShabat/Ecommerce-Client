import Register from "../Core-Components/Register/Register";
import LoginForm from "../Core-Components/Login/LoginForm";
import { useSelector } from "react-redux";
import { isLoggedSelector, signUpSelector } from "../store/loginSlice";
import Welcome from "./Home-page/Welcome";


const LogOrReg = () => {
    const isSignedUp = useSelector(signUpSelector);
    const isLogged = localStorage.getItem("isLogged");
    if(isLogged) return <Welcome/>
    if(isSignedUp) return <LoginForm/>
    return <Register/>

}
export default LogOrReg