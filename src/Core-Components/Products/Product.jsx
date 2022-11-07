import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

import React, { useState } from "react";
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
  Chip,
  FilledInput,
  InputAdornment,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import GavelIcon from "@mui/icons-material/Gavel";

import minBid from "../../utils/minBid";
import SellerActions from "./SellerActions";

const cardSx = {
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "initial",
};

const Product = ({ item, onDelete }) => {
  const userData = useGetUserData();
  const queryClient = useQueryClient();

  const [bid, setBid] = useState(0);
  const [openBid, setOpenBid] = useState(false);

  const userIsSeller = userData?.username === item.seller;
  const userIsCurrentBidder = userData?.username === item.currentBidder;

  const handleCloseBid = () => {
    setOpenBid(false);
  };

  const handleBidChange = (e) => {
    setBid(e.target.valueAsNumber);
  };

  const handleDeleteSuccess = React.useCallback(() => {
    socket.emit("delete_product");
    onDelete(true);
    queryClient.invalidateQueries("fetch-products");
  }, [queryClient, onDelete]);

  const deleteMutation = useMutation(
    () => {
      return axios.delete(
        `https://house-of--auctions.herokuapp.com/api-products/products/${item._id}`,
        // `http://localhost:5000/api-products/products/${item._id}`,
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
    socket.emit("add_bid");

    queryClient.invalidateQueries("fetch-products");
  }, [queryClient]);

  const placeBidMutation = useMutation(
    (newBid) => {
      return axios.patch(
        // `${process.env.REACT_APP_URL}/api-products/products/${item._id}`,
        `https://house-of--auctions.herokuapp.com/api-products/products/${item._id}`,
        // `http://localhost:5000/api-products/products/${item._id}`,
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

    if (userIsCurrentBidder) {
      return;
    }

    if (bid < minBid(item.currentBid)) {
      return;
    }

    placeBidMutation.mutate(bid);
  };

  // Change to from backend, based on userType and username
  let ended;
  if (new Date(item.endOfAuctionDate) < Date.now() && !userIsSeller) {
    return null;
  }
  //

  if (new Date(item.endOfAuctionDate) < Date.now()) {
    ended = true;
  }

  return (
    <Card sx={cardSx}>
      {userIsCurrentBidder && (
        <Chip
          label="Active Bid"
          color="success"
          icon={<GavelIcon sx={{ fontSize: 15 }} />}
          sx={{
            position: "absolute",
            top: "0",
            right: "0",
            transform: "translate(10%,-35%)",
            boxShadow: "-3px -4px 0px inset rgb(0 0 0 / 20%)",
            zIndex: "10",
          }}
        />
      )}
      {ended && (
        <Chip
          label="Auction Ended!"
          color="success"
          sx={{
            position: "absolute",
            top: "0",
            right: "0",
            transform: "translate(10%,-35%)",
            boxShadow: "-3px -4px 0px inset rgb(0 0 0 / 20%)",
            zIndex: "10",
          }}
        />
      )}
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
        <Typography
          variant="body2"
          color="text.secondary"
          mb={userIsSeller ? 10 : ""}
        >
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
                variant=""
                onChange={handleBidChange}
                fullWidth
                disabled={userIsCurrentBidder}
                sx={{ bgcolor: blue[50], lineHeight: 1.5 }}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
              <Tooltip
                title={`At least $${
                  item.currentBid < 100
                    ? item.currentBid + 5
                    : item.currentBid + 50
                }`}
                placement="left-end"
                arrow
              >
                <ButtonGroup fullWidth>
                  <Button
                    type="submit"
                    disabled={userIsCurrentBidder}
                    variant="contained"
                    disableElevation
                    sx={{ borderTopLeftRadius: 0 }}
                  >
                    Bid
                  </Button>
                  <Button
                    size="small"
                    disabled
                    sx={{ borderTopRightRadius: 0 }}
                  >
                    Buy now for {item.price}
                  </Button>
                </ButtonGroup>
              </Tooltip>

              {placeBidMutation.isLoading && (
                <Alert severity="info">Placing Bid...</Alert>
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
                <Alert severity="info" onClose={handleCloseBid}>
                  New bid is : {bid}$
                  
                </Alert>
              )}
            </form>
          )}
          {userIsSeller && <SellerActions handleDelete={handleDelete} />}
        </CardActions>
      )}
    </Card>
  );
};

export default Product;
