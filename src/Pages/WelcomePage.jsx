import { Typography, Box, Button, Card, Grid, Paper } from "@mui/material";

import React from "react";
import useGetUserData from "../Hooks/useGetUserData";
import useGetHomeProducts from "../Hooks/useGetHomeProducts";
import Loading from "../Loading"

const WelcomePage = () => {
  const { products, isLoading } = useGetHomeProducts();
  const userData = useGetUserData();
  return (
    <>
      {isLoading && <Loading/>}
      {!isLoading && <Box
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
            background: "linear-gradient(to right, #03a9f4 , white)",
          }}
        >
          <Box
            sx={{
              color: "white",
              textAlign: "center",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: "40px",
                  fontWeight: "bold",
                  WebkitTextStroke: "1px #01579b",
                }}
              >
                It's almost time...
              </Typography>
              <Typography
                sx={{
                  fontSize: "20px",
                  WebkitTextStroke: "1px #01579b",
                }}
              >
                Get ready to take advantage of the deals.
              </Typography>
              <Button
                sx={{ color: "white", marginTop: "2vh" }}
                variant="outlined"
              >
                Outlined
              </Button>
            </Box>
          </Box>
        </Box>
        <Grid container sx={{ width: "100%" }}>
          <Grid
            display={"flex"}
            justifyContent="center"
            alignItems="center"
            xs={6}
            sm={6}
            md={8}
            lg={12}
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
                    border: "#03a9f4 2px solid",
                    textAlign: "center",
                    color: "#03a9f4",
                  }}
                  key={e.productsName}
                >
                  <Paper
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      overflow: "hidden",
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
                  <Typography sx={{ mt: "10px" }}>{e.productsName}</Typography>
                </Card>
              );
            })}
          </Grid>
        </Grid>
      </Box>}
    </>
  );
};

export default WelcomePage;
