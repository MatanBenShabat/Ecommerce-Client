// import { flushSync } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
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
import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import { useMutation } from "react-query";
import Loading from "../Loading";

const schema = yup.object().shape({
  email: yup.string().email().required("Please enter email"),
});

const theme = createTheme();

export default function ForgotPassword() {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({ message: "", severity: "success" });
  const navigate = useNavigate();

  const {
    mutate: sendRequest,
    isLoading,
    isError,
  } = useMutation(
    "forgot-password",
    (email) => {
      // return axios.post(`${process.env.REACT_APP_URL}/api-users/forgotPassword`, {
      return axios.post(`https://house-of--auctions.herokuapp.com/api-users/forgotPassword`, {
      // return axios.post(`http://localhost:5000/api-users/forgotPassword`, {
        email,
      });
    },
    {
      enabled: false,
      retry: false,
      cacheTime: 0,
      onError: (err) => {
        setOpen(true);
        setAlert({
          message:
            err?.response?.data?.message ??
            "Something went wrong, please try again.",
          severity: "error",
        });
      },
      onSuccess: () => {
        setOpen(true);
        setAlert({
          message: "Your email was sent successfully!",
          severity: "success",
        });
      },
    }
  );

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

  const handleClose = () => {
    setOpen(false);
    if (!isError) {
      navigate("/");
    }
  };

  const handleSubmitForgotPassword = (data) => {
    sendRequest(data.email);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ThemeProvider theme={theme}>
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
          <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert
              severity={alert.severity}
              sx={{ width: "100%" }}
              onClose={handleClose}
            >
              {alert.message}
            </Alert>
          </Snackbar>
            
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
              Send Email
            </Button>
          </Box>
        </Box>
      </Grid>
    </ThemeProvider>
  );
}
