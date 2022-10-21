import { Navigate, Route, Routes } from "react-router";
import SignIn from "./Pages/SignInPage";
import NavBar from "./Core-Components/Nav-Bar/NavBar";
import Products from "./Pages/ProductsPage";
import { useQuery } from "react-query";
import axios from "axios";
import React, { Suspense, useState } from "react";
import WelcomePage from "./Pages/WelcomePage";
import { Alert, CircularProgress, Grid, Snackbar } from "@mui/material";
import upperFirstLetter from "./utils/upperFirstLetter";

const SignUp = React.lazy(() => import("./Pages/SignUpPage"));

const tryLogin = () => {
  return axios.post("http://localhost:5000/api-users/startApp");
};

function App() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = (data) => {
    if (data) setOpen(true);
  };

  const { data, isLoading } = useQuery("user-data", tryLogin, {
    refetchOnWindowFocus: false,
    retry: false, // toDelete,
    onSuccess: handleOpen,
  });

  if (isLoading) {
    return (
      <React.Fragment>
        <NavBar></NavBar>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            <CircularProgress />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
  console.log(data, { open });
  return (
    <React.Fragment>
      <NavBar></NavBar>
      <Routes>
        <Route path="/*" element={<Navigate to="/" replace />} />
        {!data && <Route path="/" element={<SignIn />} />}
        {!data && (
          <Route
            path="/signup"
            element={
              <Suspense fallback={<h1>Loading...</h1>}>
                <SignUp />
              </Suspense>
            }
          />
        )}
        {data && <Route path="/" element={<WelcomePage />} />}
        <Route path="/products" element={<Products />} />
      </Routes>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Welcome back {data && upperFirstLetter(data?.data.data.username)}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

export default App;
