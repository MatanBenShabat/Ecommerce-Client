import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import useGetProducts from "../../Hooks/useGetProducts";
import "./search-bar.css";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

const SearchBar = () => {
  const { products, isLoading } = useGetProducts();
  const [value, setValue] = useState("");
  const ref = useRef("");
  const onChangeInput = (event) => {
    setValue(event.target.value);
  };

  const inputFocusHandler = () => {
    ref.current?.classList.remove("hidden");
  };

  const inputBlurHandler = () => {
    setTimeout(() => {
      ref.current?.classList.add("hidden");
    }, 200);
  };

  return (
    <div className="search-container">
      <div className="search-line">
        <IconButton type="submit" aria-label="search" className="search-icon" sx={{bottom:"0"}}>
          <SearchIcon style={{ fill: "primary" }} />
        </IconButton>
        <div className="search-inner">
          <TextField
            className="search-input"
            type="text"
            variant="outlined"
            label="Enter Product Name"
            value={value}
            onFocus={inputFocusHandler}
            onBlur={inputBlurHandler}
            onChange={onChangeInput}
            placeholder="Find Your Product..."
          ></TextField>
          <div className="dropdown" ref={ref}>
            {!isLoading &&
              products
                .map((el) => el.productsName)
                .filter((item) => {
                  const searchTerm = value.toLowerCase();
                  const pruductsName = item.toLowerCase();

                  return searchTerm && pruductsName.startsWith(searchTerm);
                })
                .map((item) => (
                  <Link className="dropdown-row" key={item} to="/">
                    {item}
                  </Link>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
