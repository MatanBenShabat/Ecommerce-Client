import { Navigate, Route, Routes } from "react-router";
import SignIn from "./Pages/SignInPage";
import NavBar from "./Core-Components/Nav-Bar/NavBar";
import Products from "./Pages/ProductsPage";
import { useQuery } from "react-query";
import axios from "axios";
import React, { Suspense } from "react";
import WelcomePage from "./Pages/WelcomePage";
import { CircularProgress, Grid } from "@mui/material";
const SignUp = React.lazy(() => import("./Pages/SignUpPage"));
const tryLogin = () => {
  return axios.post("http://localhost:5000/api-users/startApp");
};

function App() {
  const { data, isLoading } = useQuery("user-data", tryLogin, {
    refetchOnWindowFocus: false,
    retry: false, // toDelete,
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
    </React.Fragment>
  );
}

export default App;
