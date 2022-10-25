import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// import { Link as ReactRouterLink } from "react-router-dom";

import axios from "axios";
// import { useQueryClient } from "react-query";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";

const schema = yup.object().shape({
  email: yup.string().email().required("Please enter email")
});

const theme = createTheme();

export default function ForgotPassword() {
  //   const queryclient = useQueryClient();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate()
  const handleSubmitForgotPassword = (data) => {
    axios
      .post("http://localhost:5000/api-users/forgotPassword", {
        email: data.email,
      })
      .then(() => {
        /////should be using react query with isLoading and wait untill we get success
        alert("email sent!") /////put modal
        navigate("/")////// put Choose new password component
      })
      .catch((error) => console.log(error));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "column",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "info.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Choose your new password
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit(handleSubmitForgotPassword)}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.email}
                  helperText={errors.email?.message || " "}
                  label="Email Address*"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              )}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
          </Box>
        </Box>
      </Grid>
    </ThemeProvider>
  );
}
// import * as React from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
// import Paper from "@mui/material/Paper";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { useForm, Controller } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";

// import { Link as ReactRouterLink } from "react-router-dom";

// import axios from "axios";
// import { useQueryClient } from "react-query";

// const schema = yup.object().shape({
//   email: yup
//     .string()
//     .email("Please enter valid email")
//     .required("Please enter email")
// });

// const theme = createTheme();

// export default function ForgotPassword() {
//   const {
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       email: "",
//     },
//     resolver: yupResolver(schema),
//   });

//   const handleSubmitForgotPassword = (data) => {
//     axios
//       .post("http://localhost:5000/api-users/forgotPassword", {
//         email: data.email,
//       })
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((error) => console.log(error)); //setErr("Incorrect email or password"));
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Grid container component="main" sx={{ height: "50vh" }}>
//         <CssBaseline />
//         <Grid
//           item
//           xs={false}
//           sm={4}
//           md={7}
//           sx={{
//             backgroundColor: (t) =>
//               t.palette.mode === "light"
//                 ? t.palette.grey[50]
//                 : t.palette.grey[900],
//           }}
//         />
//         <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//           <Box
//             sx={{
//               my: 8,
//               mx: 4,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5">
//               Reset Password
//             </Typography>
//             <Box
//               component="form"
//               noValidate
//               onSubmit={handleSubmit(handleSubmitForgotPassword)}
//               sx={{ mt: 1 }}
//             >
//               <Controller
//                 name="email"
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     error={!!errors.email}
//                     helperText={errors.email?.message || " "}
//                     label="Email Address*"
//                     variant="outlined"
//                     margin="normal"
//                     fullWidth
//                   />
//                 )}
//               />

//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}
//               >
//                 Send Email
//               </Button>
//               <Grid container>
//                 <Grid item xs>
//                 </Grid>
//                 <Grid item>
//                 </Grid>
//               </Grid>
//               {/* <Copyright sx={{ mt: 5 }} /> */}
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </ThemeProvider>
//   );
// }
