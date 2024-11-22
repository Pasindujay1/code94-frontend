import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import MainCard from 'components/MainCard';
import OrdersTable from '../components/OrdersTable';
import SearchAndActions from '../components/SearchAndActions';
import { fetchProducts, fetchFavoriteProducts } from '../redux/slices/productSlice';

export default function DashboardDefault() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const favoriteProducts = useSelector((state) => state.products.favoriteItems);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

    // Fetch products and favorite products when the component mounts
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchFavoriteProducts());
  }, [dispatch]);

  const handleClick = (action) => {
    console.log(action);
  };

  return (
    <Box sx={{ p: 8 }}>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h2" sx={{ fontWeight: 700, mr: 2, letterSpacing: '0.1em' }}>
              PRODUCTS
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
                    {/* Search and action buttons */}
          <SearchAndActions handleClick={handleClick} />
        </Grid>
      </Grid>
      <Grid item xs={12} md={10} lg={11}>
        <MainCard sx={{ mt: 4 }} content={false}>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : error ? (
            <Typography>Error: {error}</Typography>
          ) : (
            <OrdersTable rows={products} favoriteProducts={favoriteProducts} />
          )}
        </MainCard>
      </Grid>
    </Box>
  );
}
