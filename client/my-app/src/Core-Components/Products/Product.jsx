import axios from "axios";
import { useMutation } from "react-query";

import React, { useRef, useState } from "react";
import socket from "../../socket/socket";
import useGetUserData from "../../Hooks/useGetUserData";
import createDateStr from "../../utils/createDateStr";

import Card from "@mui/material/Card";
import {
  Alert,
  Button,
  ButtonGroup,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Fab,
  FilledInput,
  InputAdornment,
  Skeleton,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import minBid from "../../utils/minBid";

const Product = ({ item, getProducts, setOpenDeleteItem }) => {
  const userData = useGetUserData();
  const [bid, setBid] = useState(0);
  const [openBid, setOpenBid] = useState(false);

  const handleCloseBid = () => {
    setOpenBid(false);
  };

  const handleDeleteSuccess = React.useCallback(() => {
    socket.emit("delete_product");
    setOpenDeleteItem(true);
    getProducts();
  }, [getProducts, setOpenDeleteItem]);

  const deleteMutation = useMutation(
    () => {
      return axios.delete(
        `http://localhost:5000/api-products/products/${item._id}`,
        { withCredentials: true }
      );
    },
    { onSuccess: handleDeleteSuccess }
  );

  const handleDelete = () => {
    deleteMutation.mutate(item._id);
  };

  const handlePlaceBidSuccess = React.useCallback(() => {
    setOpenBid(true);
    setBid(0);
    socket.emit("add_bid");

    getProducts();
  }, [getProducts]);

  const placeBidMutation = useMutation(
    (newBid) => {
      return axios.patch(
        `http://localhost:5000/api-products/products/${item._id}`,
        {
          currentBid: newBid,
          currentBidder: userData.username,
        },
        { withCredentials: true }
      );
    },
    { onSuccess: handlePlaceBidSuccess }
  );

  const handlePlaceBidSubmit = (e) => {
    e.preventDefault();
    if (bid < minBid(item.currentBid)) {
      return;
    }
    const changedBid = bid;

    if (changedBid === "") return;

    placeBidMutation.mutate(bid);
  };

  const handleBidChange = (e) => {
    setBid(e.target.valueAsNumber);
  };

  let ended;
  const userIsSeller = userData?.username === item.seller;
  let cardSx = { maxWidth: 345, position: "relative" };

  // Change to from backend, based on userType and username
  if (
    new Date(item.endOfAuctionDate) < Date.now() &&
    userData?.username !== item.seller
  ) {
    return null;
  }
  //

  if (new Date(item.endOfAuctionDate) < Date.now()) {
    cardSx.backgroundColor = "#4BB543";
    ended = true;
  }

  return (
    <Card sx={cardSx}>
      <CardHeader
        title={item.productsName}
        subheader={`Current Bid: $${item.currentBid}`}
      />
      <CardMedia
        component="img"
        alt={item.productsName}
        height="140"
        image={item.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.productsName}
        </Typography>
        {userIsSeller && !ended && (
          <Typography variant="body2" color="text.secondary">
            Current Bidder:{item.currentBidder}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {!ended && "Auction ends at: " + createDateStr(item.endOfAuctionDate)}
        </Typography>
        {ended && (
          <Typography variant="body2" color="text.secondary">
            Winner: {item.currentBidder}
            <br /> Auction ended!
          </Typography>
        )}
      </CardContent>

      {!ended && (
        <CardActions>
          {!userIsSeller && (
            <form className="bid-container" onSubmit={handlePlaceBidSubmit}>
              <FilledInput
                inputProps={{ min: minBid(item.currentBid) }}
                type="number"
                label="Place Bid..."
                variant="outlined"
                onChange={handleBidChange}
                fullWidth
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />

              <ButtonGroup fullWidth>
                <Tooltip
                  title={`At least ${
                    item.currentBid < 100
                      ? item.currentBid + 5
                      : item.currentBid + 50
                  }`}
                >
                  <Button>Bid</Button>
                </Tooltip>

                <Button size="small" disabled>
                  Buy now for {item.price}
                </Button>
              </ButtonGroup>
              {placeBidMutation.isLoading && (
                <Alert severity="info">Loading...</Alert>
              )}
              <Snackbar
                open={openBid}
                autoHideDuration={3000}
                onClose={handleCloseBid}
              >
                <Alert
                  severity="success"
                  sx={{ width: "100%" }}
                  onClose={handleCloseBid}
                >
                  Your bid was placed successfully!
                </Alert>
              </Snackbar>
              {placeBidMutation.isSuccess && openBid && (
                <Alert severity="success" onClose={handleCloseBid}>
                  New bid is : {item.currentBid}$
                </Alert>
              )}
            </form>
          )}
          {userIsSeller && (
            <Fab
              size="small"
              color="primary"
              aria-label="delete"
              sx={{ position: "absolute", bottom: "10px", right: "10px" }}
              onClick={handleDelete}
            >
              <DeleteIcon />
            </Fab>
          )}
        </CardActions>
      )}
    </Card>
  );
};

export default Product;
