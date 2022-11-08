import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, Fragment } from "react";
import useGetNameAndBrand from "../../Hooks/useGetNameAndBrand";

export default function SearchBar() {
  const {
    productsNames,
    isLoading,
  } = useGetNameAndBrand();
  const [open, setOpen] = useState(false);

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
                {isLoading ? (
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
