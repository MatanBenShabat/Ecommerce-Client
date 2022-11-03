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
import { useNavigate, useParams } from "react-router";
import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import Loading from "../Loading";

const schema = yup.object().shape({
    password: yup.string().required("Please enter password").min(8).max(15),
    passwordConfirm: yup
      .string()
      .required("Please re-enter password")
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .min(8)
      .max(15),
});

const theme = createTheme();

export default function ResetPassword() {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({ message: "", severity: "success" });
  const {token} = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient()

  const {
    mutate: sendRequest,
    isLoading,
    isError,
  } = useMutation(
    "reset-password",
    (data) => {
      return axios.patch(`${process.env.REACT_APP_URL}/api-users/resetPassword/${token}`, {
        password: data.password,
        passwordConfirm: data.passwordConfirm,
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
          message: "Your password changed successfully!",
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
      password: "",
      passwordConfirm: "",
    },
    resolver: yupResolver(schema),
  });
  const handleSubmitResetPassword = (data) => {
    sendRequest(data)
  };

  const handleClose = () => {
    setOpen(false);
    if (!isError) {
      navigate("/");
      queryClient.invalidateQueries("user-data")
    }
  };

 

  if (isLoading) {
    return <Loading />;
  }

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
            height: "max",
          }}
        >
          <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
          >
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
            onSubmit={handleSubmit(handleSubmitResetPassword)}
          >
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.password}
                  helperText={errors.password?.message || " "}
                  label="New Password*"
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
                  label="Re-enter Password*"
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
              Change Password
            </Button>
          </Box>
        </Box>
      </Grid>
    </ThemeProvider>
  );
}
