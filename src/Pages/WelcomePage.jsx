import React from "react";
import useGetUserData from "../Hooks/useGetUserData";
import useGetHomeProducts from "../Hooks/useGetHomeProducts";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import { Typography, Box, Button, Card, Grid, Paper } from "@mui/material";
import { blue } from "@mui/material/colors";

const WelcomePage = () => {
  const { products, isLoading } = useGetHomeProducts();
  const userData = useGetUserData();
  const navigate = useNavigate();

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100vw",
            height: "91vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginTop: "5vh",
              width: "100%",
              height: "50%",
              border: "1px solid white",
            }}
          >
            <Box
              sx={{
                color: "white",
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  transition: "all ease 2s",
                  backgroundImage: `linear-gradient(to right, ${blue[50]} , ${blue[400]})`,
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                <Typography
                  component={"h1"}
                  sx={{
                    fontSize: "40px",
                    fontWeight: "bold",
                  }}
                >
                  It's almost time...
                </Typography>
                <Typography
                  component={"h2"}
                  sx={{
                    fontSize: "20px",
                  }}
                >
                  Get ready to take advantage of the deals.
                </Typography>
                <Button
                  sx={{  marginTop: "2rem" }}
                  variant="contained"
                  onClick={() => {
                    userData ? navigate('/products/1') : navigate('/login')
                  }}
                >
                  {userData ? "Start bidding" : "Join HOA Today"}
                </Button>
              </Box>
            </Box>
          </Box>
          <Grid container sx={{ width: "100%", mt: 2 }}>
            <Grid
              display={"flex"}
              flexDirection={{ xs: "column", md: "row" }}
              justifyContent="center"
              alignItems="center"
              gap={"2vw"}
              xs={12}
              item
            >
              {products.slice(0, 3).map((e) => {
                if (e.isActive === false && userData.userName !== e.userName)
                  return null;
                return (
                  <Card
                    sx={{
                      width: "250px",
                      height: "300px",
                      textAlign: "center",
                      boxShadow: "none",
                      cursor: "pointer",
                      transition: "all ease 1s",
                      "&:hover": {
                        dropShadow: "1px 1px 1px black",
                        transform: "scale(1.1)",
                      },
                      color: "#03a9f4",
                    }}
                    key={e.productsName}
                  >
                    <Paper
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        overflow: "hidden",
                        boxShadow: "none",
                        height: "70%",
                        width: "100%",
                      }}
                    >
                      <img
                        style={{ size: "fill" }}
                        alt={e.productsName}
                        src={`${e.image}`}
                      ></img>
                    </Paper>
                    <Typography sx={{ mt: "10px" }}>
                      {e.productsName}
                    </Typography>
                  </Card>
                );
              })}
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default WelcomePage;
