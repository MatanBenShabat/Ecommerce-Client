import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, Fragment } from "react";
import useGetNameAndBrand from "../../Hooks/useGetNameAndBrand";
import { useNavigate } from "react-router";
import useGetUserData from "../../Hooks/useGetUserData";

export default function SearchBar() {
  const navigate = useNavigate();
  const userData = useGetUserData()

  const { productsNames, isLoading } = useGetNameAndBrand();
  const [open, setOpen] = useState(false);
  // const [value,setValue] = useState('')

  const options = productsNames.map((item) => ({
    title: item?.toLowerCase(),
  }));

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Autocomplete
      id="products-list"
      sx={{
        width: "50%",
        maxWidth: "300px",
        marginLeft: "auto",
        marginRight: "50px",
      }}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option.title}
      onChange={(_e,value,reason) => {
        // if (reason === 'clear') {
        //   setValue('')
        //   return
        // } else {
          navigate(`/products/product/${value.title}`, { replace: true });
        //   setValue(value)
        // }
      }}
      // value={value}
      blurOnSelect={true}
      
      // onInputChange={(event, newInputValue, reason) => {

      // }}
      openOnFocus={true}
      options={options}
      loading={isLoading}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search Product..."
          sx={{ bgcolor: "white", color: "black", borderRadius: "40px" }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {userData && isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
          }}
        />
      )}
    />
  );
}
