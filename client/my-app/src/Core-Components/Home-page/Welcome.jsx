import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { userNameSelector } from "../../store/loginSlice";


const Welcome = () => {
  const name =useSelector(userNameSelector)
  
    return(
        <div>
        <motion.div
          className="box"
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 180, 180, 0],
            borderRadius: ["0%", "0%", "50%", "50%", "0%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeatDelay: 1,
          }}
        >
            <h1>Welcome Back {localStorage.getItem("userName")}!</h1>
        </motion.div>
        </div>
    )
}
export default Welcome