import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { blue } from "@mui/material/colors";

const selectAddButton = (windowWidth, handleClick) => {
  return windowWidth > 500 ? (
    <Button variant="contained" onClick={handleClick}>
      Add Product
    </Button>
  ) : (
    <IconButton
      aria-label="add"
      size="large"
      onClick={handleClick}
      color="primary"
      sx={{ backgroundColor: blue[50] }}
    >
      <AddIcon />
    </IconButton>
  );
};

export default selectAddButton;
