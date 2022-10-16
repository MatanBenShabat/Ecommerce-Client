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
import Savings from "@mui/icons-material/Savings";

import axios from "axios";
import { useQueryClient } from "react-query";
import { redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import useGetUserData from "../../Hooks/useGetUserData";
import { Link } from "@mui/material";

const pages = [
  { name: "Home", link: "/" },
  { name: "Products", link: "/products" },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const userData = useGetUserData();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    axios.post("http://localhost:5000/api-users/logout").then(
      queryClient.setQueryData("user-data", () => {
        redirect("/");
        return null;
      })
    );
  };

  const settings = [
    { name: "Profile", function: () => {} },
    { name: "Logout", function: handleLogout },
  ];

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
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Savings sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Auction House
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
          </Box>
          <Savings sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Auction House
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
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

// const Navbar = () => {
//   const userData = useGetUserData();
//   const queryClient = useQueryClient();

//   const handleLogout = () => {
//     axios
//       .post("http://localhost:5000/api-users/logout")
//       .then(
//         queryClient.setQueryData("user-data", () => {
//           return null;
//         })
//       )
//       .catch();
//   };
//   return (
//     <header>
//       <nav>
//         <NavLink className="nav-btn" to="/">
//           <strong>Home</strong>
//         </NavLink>
//         <NavLink className="nav-btn" to="/products">
//           <strong>Products</strong>
//         </NavLink>

//         <NavLink className="nav-btn" to="/contact-us">
//           <strong>Contact Us</strong>
//         </NavLink>
//         {userData && <button onClick={handleLogout}>LOGOUT</button>}
//         <span></span>
//       </nav>
//     </header>
//   );
// };
export default Navbar;
