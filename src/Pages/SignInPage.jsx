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
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Link as ReactRouterLink } from "react-router-dom";

import axios from "axios";
import { useQueryClient } from "react-query";
import { useState } from "react";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Please enter email"),
  password: yup.string().required("Please enter password"),
});

const theme = createTheme();

export default function SignIn() {
  const [err, setErr] = useState("");
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const queryclient = useQueryClient();

  const handleSubmitSignIn = (data) => {
    setErr("");
    axios
      .post(`${process.env.REACT_APP_URL}/api-users/login`, {
        email: data.email,
        password: data.password,
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
      .catch((error) => setErr("Incorrect email or password")); //setErr("Incorrect email or password"));
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(handleSubmitSignIn)}
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
              {err && (
                <Typography
                  component="h6"
                  color={"error"}
                  variant="h6"
                  textAlign={"center"}
                >
                  {err}
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    component={ReactRouterLink}
                    to={"/forgotpassword"}
                    variant="body2"
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    component={ReactRouterLink}
                    to={"/signup"}
                    variant="body2"
                  >
                    {"Don't have an account? Sign Up"}
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
