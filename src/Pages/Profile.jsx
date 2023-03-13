import { useState, forwardRef } from "react";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import createDateStr from "../utils/createDateStr";

import {
  AppBar,
  Avatar,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import Loading from "../Loading";
import RadioButtonsGroup from "../Custom-Components/CustomRadioButtons";
import InventoryIcon from "@mui/icons-material/Inventory";
import ReviewsIcon from "@mui/icons-material/Reviews";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import useGetMyProducts from "../Hooks/useGetMyProducts";
import CloseIcon from "@mui/icons-material/Close";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Profile({ data }) {
  const styles = {
    container: {
      height: "100%",
      width: "100%",
      marginTop: "5%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    innerContainer: {
      height: "70vh",
      width: "70%",
      border: "solid 1px white",
      borderRadius: "5px",
      boxShadow: "0px 1px 3px 3px gray",
      display: "flex",
      flexDirection: "column",
    },
    avatar: {
      height: "13vh",
      width: "13vh",
      marginBottom: "1%",
      marginTop: "3%",
      alignSelf: "center",
    },
    uploadImageButton: {
      minWidth: "30%",
      maxWidth: "25%",
      display: "flex",
      alignItems: "center",
      gap: "3%",
      fontSize: "1rem",
      borderRadius: 2,
      backgroundColor: "#2196f3",
      alignSelf: "center",
      flexWrap: "wrap",
      marginBottom: "3%",
      color: "white",
      ":hover": {
        color: "#2196f3",
      },
    },
    username: {
      color: "gray",
      fontSize: "1.3rem",
      wordSpacing: "1rem",
      alignSelf: "center",
      marginBottom: "1%",
    },
    requestChangeType: {
      color: "gray",
      textDecoration: "underline",
      cursor: "pointer",
    },
    typesOptions: {
      marginLeft: "3%",
    },
    myProductsAndReviews: {
      width: "90%",
      height: "20%",
      margin: "3% auto",
      borderRadius: "5px",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    },
    my: {
      minWidth: "30%",
      maxWidth: "20%",
      display: "flex",
      alignItems: "center",
      gap: "3%",
      fontSize: "1rem",
      borderRadius: 2,
      backgroundColor: "#2196f3",
      // alignSelf: "center",
      flexWrap: "wrap",
      // marginBottom: "3%",
      color: "white",
      padding: "2%",
      ":hover": {
        color: "#2196f3",
      },
    },
  };

  const queryclient = useQueryClient();
  const [usertype, setUsertype] = useState(data.userType);
  const [openMyProducts, setOpenMyProducts] = useState(false);
  const { products, loadingMyProducts } = useGetMyProducts(data.username);

  const handleClick = () => {
    changeRole(data.userType === "seller" ? "customer" : "seller");
  };

  const handleOpenMyProducts = () => {
    setOpenMyProducts(true);
  };
  const handleCloseMyProducts = () => {
    setOpenMyProducts(false);
  };

  const { mutate: changeRole, isLoading } = useMutation((role) => {
    return axios
      .patch(`${process.env.REACT_APP_URL}/api-users/updateRole`, {
        userType: role,
      })
      .then((res) => {
        data = res?.data?.data?.user;
        setUsertype(data.userType);
        queryclient.setQueryData("user-data", () => {
          return {
            data: { data: data },
          };
        });
      });
  });

  return (
    <>
      {isLoading && loadingMyProducts ? (
        <Loading />
      ) : (
        <Grid sx={styles.container}>
          <Box sx={styles.innerContainer}>
            <Avatar sx={styles.avatar} src={`${data.image}`}></Avatar>
            <Typography sx={styles.username}>{data.username}</Typography>
            <IconButton sx={styles.uploadImageButton} variant="contained">
              UPDATE PHOTO
              <AddPhotoAlternateIcon />
            </IconButton>

            <Box sx={styles.typesOptions}>
              <RadioButtonsGroup type={usertype} sx={styles.typesOptions} />
              <Typography onClick={handleClick} sx={styles.requestChangeType}>
                Request to change my user type...{" "}
              </Typography>
            </Box>
            <Box sx={styles.myProductsAndReviews}>
              <IconButton
                onClick={handleOpenMyProducts}
                sx={styles.my}
                variant="contained"
              >
                MY PRODUCTS
                <InventoryIcon />
              </IconButton>
              <IconButton sx={styles.my} variant="contained">
                MY REVIEWS
                <ReviewsIcon />
              </IconButton>
              <IconButton sx={styles.my} variant="contained">
                MY CART
                <ShoppingCartIcon />
              </IconButton>
            </Box>
          </Box>
          <Dialog
            fullScreen
            open={openMyProducts}
            onClose={handleCloseMyProducts}
            TransitionComponent={Transition}
          >
            <AppBar sx={{ position: "relative" }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleCloseMyProducts}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant="h6"
                  component="div"
                >
                  My Products
                </Typography>
              </Toolbar>
            </AppBar>
            <List>
              {products?.map((product, i) => {
                return (
                  // <Typography>{product}</Typography>
                  <ListItem button>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar src={`${product.image}`}></Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${product.productsName}`}
                        secondary={`$${product.price}`}
                      />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText
                        primary={`Current Bidder: ${product.currentBidder}`}
                        secondary={`Auction ends at: ${createDateStr(product.endOfAuctionDate)}`}
                      />
                    </ListItem>
                  </ListItem>
                );
              })}
            </List>
          </Dialog>
        </Grid>
      )}
    </>
  );
}

export default Profile;
