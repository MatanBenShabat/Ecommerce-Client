import React from 'react'
import Grid from "@mui/material/Grid";
import { Box } from '@mui/system';
import { Avatar, Typography } from '@mui/material';


function Profile({data}) {
  return (
    <Grid sx={{height:"100%",width:"100%", marginTop:"5%", display:"flex", justifyContent:"center",alignItems:"center"}}>
        <Box sx={{height:"70vh", width:"70%",border:"solid 1px white",borderRadius:"5px",boxShadow:"0px 1px 3px 3px gray", display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
            <Avatar sx={{height:"12vh",width:"12vh",marginBottom:"5%"}}></Avatar>
            <Typography sx={{color:"gray"}}>UserName: {data.username}</Typography>
            <Typography sx={{color:"gray"}}>UserType: {data.userType}</Typography>
        </Box>
    </Grid>
  )
}

export default Profile