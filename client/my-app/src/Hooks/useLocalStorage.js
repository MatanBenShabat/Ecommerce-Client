import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsAdmin, setIsLogged, setUsername } from "../store/loginSlice";

const useLocalStorage = () => {
    const dispatch = useDispatch()
    useEffect(() => { 
      dispatch(setIsAdmin(localStorage.getItem("isAdmin")))
      dispatch(setIsLogged(localStorage.getItem("isLogged")))
      dispatch(setUsername(localStorage.getItem("userName")))
     },[dispatch]);
}
export default useLocalStorage