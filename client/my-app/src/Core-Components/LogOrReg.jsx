import Register from "../Core-Components/Register/Register";
import LoginForm from "../Core-Components/Login/LoginForm";
import { useSelector } from "react-redux";
import { signUpSelector } from "../store/loginSlice";


const LogOrReg = () => {
    const isSignedUp = useSelector(signUpSelector);
    if(isSignedUp) return <LoginForm/>
    return <Register/>

}
export default LogOrReg