import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import useGetProducts from '../../Hooks/useGetProducts';
import { useState ,Fragment} from 'react';



export default function SearchBar(){
const {products,getProducts,isLoading} = useGetProducts(false)
  const [open, setOpen] = useState(false);

  const options = products.map(item => ({title: item?.productsName.toLowerCase()}))


const handleOpen = ()=>{
    getProducts();
    setOpen(true);
}

const handleClose = ()=>{
    setOpen(false);
}


  return (
    <Autocomplete
      id="products-list"
      sx={{ width: '50%',maxWidth:'300px',marginLeft:'auto',marginRight:'50px', }}
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
          sx={{bgcolor:'white',color:'black',borderRadius:'40px'}}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
          }}
        />
      )}
    />
  );
}
