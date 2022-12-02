import React from "react";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import {
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useMutation } from "react-query";
import axios from "axios";
import Loading from "../Loading";

function Profile({ data }) {
  const [role, setRole] = React.useState("");

  const handleChange = (event) => {
    setRole(event.target.value);
    changeRole(event.target.value);
  };


  const { mutate: changeRole, isLoading } = useMutation((role) => {
    return axios.patch(`${process.env.REACT_APP_URL}/api-users/updateRole`, {
      userType: role,
    });
  });
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Grid
          sx={{
            height: "100%",
            width: "100%",
            marginTop: "5%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: "70vh",
              width: "70%",
              border: "solid 1px white",
              borderRadius: "5px",
              boxShadow: "0px 1px 3px 3px gray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Avatar
              sx={{ height: "12vh", width: "12vh", marginBottom: "5%" }}
            ></Avatar>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Change Your User Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="Age"
                onChange={handleChange}
              >
                {data.userType === "customer" ? (
                  <MenuItem value={"seller"}>Seller</MenuItem>
                ) : (
                  <MenuItem value={"customer"}>Customer</MenuItem>
                )}
              </Select>
            </FormControl>

            <Typography sx={{ color: "gray" }}>
              UserName: {data.username}
            </Typography>
            <Typography sx={{ color: "gray" }}>
              UserType: {data.userType}
            </Typography>
          </Box>
        </Grid>
      )}
    </>
  );
}

export default Profile;
