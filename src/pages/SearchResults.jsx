import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MainCard from 'components/MainCard';
import SearchAndActions from '../components/SearchAndActions';
import SearchResult from 'components/SearchResult';

export default function SearchResults() {
  const location = useLocation();
  const products = useSelector((state) => state.search.items);
  const favoriteProducts = useSelector((state) => state.products.favoriteItems);
  const loading = useSelector((state) => state.search.loading);
  const error = useSelector((state) => state.search.error);

  const handleClick = (action) => {
    console.log(action);
  };
console.log("pathname", location.pathname);
  const filteredProducts = location.pathname === '/favouriteProducts'
    ? products.filter(product => favoriteProducts.includes(product._id))
    : products;

  return (
    <Box sx={{ p: 8 }}>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h2" sx={{ fontWeight: 700, mr: 2, letterSpacing: '0.1em' }}>
              Search Results
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SearchAndActions handleClick={handleClick} />
        </Grid>
      </Grid>

      <Grid item xs={12} md={10} lg={12}>
        <MainCard sx={{ mt: 4 }} content={false}>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : error ? (
            <Typography>Error: {error}</Typography>
          ) : (
            <SearchResult results={filteredProducts} query="Search Query" />
          )}
        </MainCard>
      </Grid>
    </Box>
  );
}