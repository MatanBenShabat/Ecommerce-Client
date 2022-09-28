import {  useSelector } from "react-redux";
import {
selectWhosConnected
} from "../../Redux/logAdminReducer";

const  ContactUs = () => {
  const whoConnected = useSelector(selectWhosConnected);
  console.log(whoConnected);
    return(
        <div className="contact-us-container">
            <h1>Contact Us</h1>
            <div>{whoConnected}</div>
        </div>
    )
}

export default ContactUs