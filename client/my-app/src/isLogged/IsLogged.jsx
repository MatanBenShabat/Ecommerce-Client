import {  useSelector } from "react-redux";
import {
    selectCustomerLogStatus,
    selectAdminLogStatus
} from "../../Redux/logAdminReducer";

const  ContactUs = () => {
  const isCustomerLogged = useSelector(selectCustomerLogStatus);
  const isAdminLogged = useSelector(selectAdminLogStatus);
    return(
        <div className="contact-us-container">
              {isCustomerLogged ? 
              <input placeholder="Place Bid..."></input>
             : null}
        </div>
    )
}

export default ContactUs