import Register from "../Core-Components/Register/Register";
import LoginForm from "../Core-Components/Login/LoginForm";
import { useSelector } from "react-redux";
import { isLoggedSelector, signUpSelector } from "../store/loginSlice";


const LogOrReg = () => {
    const isSignedUp = useSelector(signUpSelector);
    const isLogged = useSelector(isLoggedSelector);
    if(isLogged) return
    if(isSignedUp) return <LoginForm/>
    return <Register/>

}
export default LogOrReg