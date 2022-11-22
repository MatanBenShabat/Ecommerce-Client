import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function Unauthorized() {
  return (
    <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center",heigt:"100%",width:"100%"}}>
      <Typography color={"primary"} fontSize={"30px"}>Please login first!</Typography>
    </Box>
  );
}

export default Unauthorized;
