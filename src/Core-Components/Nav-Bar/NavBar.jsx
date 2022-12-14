import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
// import Savings from "@mui/icons-material/Savings";

import axios from "axios";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import useGetUserData from "../../Hooks/useGetUserData";
import { Link } from "@mui/material";
import { useCallback } from "react";
import { useMemo } from "react";
import SearchBar from "./SearchBar";



const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const userData = useGetUserData();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const pages = React.useMemo(()=>
    [
      { name: "Home", link: userData ? "/" : '/home' },
      { name: "Products", link: "/products" },
    ]
  ,[userData])

  const handleLogout = useCallback(async () => {
    try {
      await axios.post(`${process.env.REACT_APP_URL}/api-users/logout`);
      queryClient.setQueryData("user-data", () => {
        return null;
      });
      navigate("/");
    } catch (error) {}
  }, [queryClient, navigate]);

  const settings = useMemo(
    () => [
      { name: "Profile", function: () => {navigate("/profile")} },
      { name: "Logout", function: handleLogout },
    ],
    [handleLogout,navigate]
  );

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <Savings sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            House Of Auctions
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" },alignItems:'center',justifyContent:"center",gap:1 }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              
              {pages.map((page, i) => (
                <MenuItem key={i} onClick={handleCloseNavMenu}>
                  <Link component={NavLink} to={page.link}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
              
            </Menu>
            <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none",sm:'flex' },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            HOA
          </Typography>
            <SearchBar />
          </Box>
          
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" },alignItems:"center"}}>
            
            {pages.map((page, i) => (
              <Button
                key={i}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link component={NavLink} to={page.link}>
                  <Typography textAlign="center" color={"white"}>
                    {page.name}
                  </Typography>
                </Link>
              </Button>
            ))}
            <SearchBar />
          </Box>

          {userData && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={userData.username}>
                    {userData.username[0].toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, i) => (
                  <MenuItem key={i} onClick={handleCloseUserMenu}>
                    <Button onClick={setting.function}>
                      <Typography textAlign="center">{setting.name}</Typography>
                    </Button>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
