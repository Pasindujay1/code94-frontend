import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to search for products based on a query
export const searchProducts = createAsyncThunk('search/searchProducts', async (query, { rejectWithValue }) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/products/search?query=${query}`);
    return response.data.products;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Create a slice for search-related state and actions
const searchSlice = createSlice({
  name: 'search',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle pending state for searchProducts
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Handle fulfilled state for searchProducts
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      // Handle rejected state for searchProducts
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the reducer
export default searchSlice.reducer;