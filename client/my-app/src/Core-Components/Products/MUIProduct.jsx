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
  FilledInput,
  InputAdornment,
  Skeleton,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import minBid from "../../utils/minBid";

const MUIProduct = ({ item, getProducts }) => {
  const userData = useGetUserData();
  const [bid, setBid] = useState(0);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteSuccess = React.useCallback(() => {
    socket.emit("delete_product");
    getProducts();
  }, [getProducts]);

  const deleteMutation = useMutation(
    () => {
      return axios.delete(
        `http://localhost:5000/api-products/products/${item._id}`,
        { withCredentials: true }
      );
    },
    { onSuccess: handleDeleteSuccess }
  );

  const handleSuccess = React.useCallback(() => {
    setOpen(true);
    setBid(0);
    socket.emit("add_bid");
    getProducts();
  }, [getProducts]);

  const mutation = useMutation(
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
    { onSuccess: handleSuccess }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bid < minBid(item.currentBid)) {
      return;
    }
    const changedBid = bid;

    if (changedBid === "") return;

    mutation.mutate(bid);
  };

  const handleChange = (e) => {
    setBid(e.target.valueAsNumber);
  };

  const handleDelete = () => {
    deleteMutation.mutate(item._id)
  }

  let ended;
  let winner;
  let deleteButton;
  let cardSx = { maxWidth: 345 };


  // Change to from backend, based on userType and username
  if (
    new Date(item.endOfAuctionDate) < Date.now() &&
    userData?.username !== item.seller
  ) {
    return null;
  }
  if (new Date(item.endOfAuctionDate) < Date.now()) {
    cardSx.backgroundColor = "#4BB543";
    ended = true;
    winner = (
      <Typography variant="body2" color="text.secondary">
        Winner: {item.currentBidder}
        <br /> Auction ended!
      </Typography>
    );
  }
  if(userData?.username === item.seller){
    deleteButton = <Button onClick={handleDelete}>Delete</Button>
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
        {userData?.username === item.seller && !winner && (
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
        {winner}
      </CardContent>

      {!ended && (
        <CardActions>
          <form className="bid-container" onSubmit={handleSubmit}>
            <FilledInput
              inputProps={{ min: minBid(item.currentBid) }}
              type="number"
              label="Place Bid..."
              variant="outlined"
              onChange={handleChange}
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
              {deleteButton}

              <Button size="small" disabled>
                Buy now for {item.price}
              </Button>
            </ButtonGroup>
            {mutation.isLoading && <Alert severity="info">Loading...</Alert>}
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
              <Alert
                severity="success"
                sx={{ width: "100%" }}
                onClose={handleClose}
              >
                Your bid was placed successfully!
              </Alert>
            </Snackbar>
            {mutation.isSuccess && open && (
              <Alert severity="success" onClose={handleClose}>
                New bid is : {item.currentBid}$
              </Alert>
            )}
          </form>
        </CardActions>
      )}
    </Card>
    
  );
};

export default MUIProduct;
