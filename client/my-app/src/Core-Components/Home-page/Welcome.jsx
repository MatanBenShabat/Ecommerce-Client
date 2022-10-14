import { motion } from "framer-motion";
import useGetUserData from "../../Hooks/useGetUserData";


const Welcome = () => {
const userData = useGetUserData()
console.log(userData)

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
            <h1>Welcome Back {userData.username}!</h1>
            <button>Your Profile</button>
            {userData.userType === "seller" && <button>Your Products</button>}
            <button>Your Bids</button>
        </motion.div>
        </div>
    )
}
export default Welcome