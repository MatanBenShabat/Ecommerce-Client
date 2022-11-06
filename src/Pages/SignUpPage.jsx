import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Link as ReactRouterLink } from "react-router-dom";

import axios from "axios";
import { useQueryClient } from "react-query";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  email: yup.string().email().required("Please enter email"),
  username: yup.string().required("Please choose username").min(6).max(12),
  password: yup.string().required("Please enter password").min(8).max(15),
  passwordConfirm: yup
    .string()
    .required("Please re-enter password")
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .min(8)
    .max(15),
});

const theme = createTheme();

export default function SignUp() {
  const queryclient = useQueryClient();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      passwordConfirm: "",
    },
    resolver: yupResolver(schema),
  });

  const handleSubmitSignUp = (data) => {
    axios
      .post(`https://house-of--auctions.herokuapp.com/api-users/signup`, {
      // .post(`http://localhost:5000/api-users/signup`, {
        email: data.email,
        username: data.username,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
      })
      .then((result) => {
        const loginData = {
          username: result.data.data.user.username,
          userType: result.data.data.user.userType,
        };
        queryclient.setQueryData("user-data", () => {
          return {
            data: { data: loginData },
          };
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "info.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(handleSubmitSignUp)}
              sx={{ mt: 1 }}
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
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!errors.username}
                    helperText={errors.username?.message || " "}
                    label="Username*"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!errors.password}
                    helperText={errors.password?.message || " "}
                    label="Password*"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="password"
                  />
                )}
              />
              <Controller
                name="passwordConfirm"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!errors.passwordConfirm}
                    helperText={errors.passwordConfirm?.message || " "}
                    label="Re-enter password*"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="password"
                  />
                )}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={ReactRouterLink} to={"/"} variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
