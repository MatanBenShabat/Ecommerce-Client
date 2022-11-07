// import "./register.css";
// import axios from "axios";
// import { setSignUp } from "../../store/loginSlice";
// import { useDispatch } from "react-redux";
// import { useRef } from "react";
// import { useQueryClient } from "react-query";

// function Register() {
//   const queryclient = useQueryClient();
//   const dispatch = useDispatch();

//   const userNameRef = useRef();
//   const emailRef = useRef();
//   const passwordRef = useRef();
//   const passwordConfirmRef = useRef();

//   const postRegisterDetails = (e) => {
//     e.preventDefault();
//     axios
//       .post("http://localhost:5000/api-users/signup", {
//         username: userNameRef?.current.value,
//         email: emailRef?.current.value,
//         password: passwordRef?.current.value,
//         passwordConfirm: passwordConfirmRef?.current.value,
//       })
//       .then((result) => {
//         const loginData = {username:result.data.data.user.username,
//           userType : result.data.data.user.userType};
//           queryclient.setQueryData("user-data", () => {
//             return {
//               data: { data: loginData },
//             };
//           });
//       })
//       .catch((e) => console.log(e));
//   };

//   return (
//     <div className="register-container">
//       <div className="login-container">
//         <div className="login-header">
//           <h1 className="login-h1">Register</h1>
//         </div>
//         <form className="login-fieldes" onSubmit={postRegisterDetails}>
//           <input
//             className="log-input"
//             placeholder="Username"
//             ref={userNameRef}
//           ></input>

//           <input
//             className="log-input"
//             placeholder="Email"
//             ref={emailRef}
//           ></input>

//           <input
//             className="log-input"
//             placeholder="Password"
//             type="password"
//             ref={passwordRef}
//           ></input>
//           <input
//             className="log-input"
//             placeholder="Re-enter Password"
//             type="password"
//             ref={passwordConfirmRef}
//           ></input>

//           <button className="login-btn">Sign Up</button>
//         </form>
//         <div className="sign-up-log">
//           <h6>Already have an account?</h6>
//           <button
//             className="login-btn"
//             onClick={() => dispatch(setSignUp(true))}
//           >
//             Sign In
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;
