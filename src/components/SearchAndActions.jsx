import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import IconButton from '@mui/material/IconButton';
import starredIcon from '../assets/images/icons/starred.svg';
import { searchProducts } from 'redux/slices/searchSlice';

const SearchAndActions = ({ handleClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  const handleStarredIconClick = () => {
    navigate('/favouriteProducts');
  };

  const handleNewProductClick = () => {
    navigate('/addProduct');
  };

  const handleSearch = () => {
    
    dispatch(searchProducts(query));
    navigate('/searchResults');
  };

  return (
    <Grid container>
      <Grid item xs={12} md={12} lg={6}>
        <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
          <FormControl sx={{ width: { xs: '100%', md: 224 } }}>
            <OutlinedInput
              size="small"
              id="header-search"
              sx={{ borderRadius: '20px', width: '600px', backgroundColor: '#F7F7F7' }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              endAdornment={
                <InputAdornment position="end" sx={{ mr: -0.5 }}>
                  <Typography
                    onClick={handleSearch}
                    sx={{
                      backgroundColor: '#001EB9',
                      width: '100px',
                      color: 'white',
                      padding: '0 8px',
                      borderRadius: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <SearchOutlined sx={{ mr: 1 }} />
                    Search
                  </Typography>
                </InputAdornment>
              }
              aria-describedby="header-search-text"
              inputProps={{
                'aria-label': 'weight'
              }}
              placeholder="Search for products"
            />
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={12} md={12} lg={6}>
        <Grid container justifyContent="flex-end" alignItems="center" spacing={2}>
          <Grid item>
            <Typography
              onClick={handleNewProductClick}
              sx={{
                backgroundColor: '#001EB9',
                width: '100px',
                color: 'white',
                padding: '5px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              New Product
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              onClick={handleStarredIconClick}
              sx={{ border: '2px solid #001EB9', borderRadius: '4px' }}
            >
              <img src={starredIcon} alt="Favourite Products" style={{ cursor: 'pointer', height: '20px', width: '20px' }} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SearchAndActions;