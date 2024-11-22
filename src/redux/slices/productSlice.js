import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch all products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('http://localhost:8000/api/products');
  return response.data;
});

// Async thunk to fetch favorite products
export const fetchFavoriteProducts = createAsyncThunk('products/fetchFavoriteProducts', async (_, { getState, rejectWithValue }) => {
  const state = getState();
  const token = state.auth.token;

  try {
    const response = await axios.get('http://localhost:8000/api/products/favorites', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const favoriteProductIds = response.data.favoriteProducts;
    const favoriteProductObjects = await Promise.all(
      favoriteProductIds.map(async (id) => {
        const productResponse = await axios.get(`http://localhost:8000/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return productResponse.data;
      })
    );
    return { favoriteProductIds, favoriteProductObjects };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Async thunk to delete a product
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId, { getState, rejectWithValue }) => {
  const state = getState();
  const token = state.auth.token;

  try {
    await axios.delete(`http://localhost:8000/api/products/delete/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return productId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Async thunk to toggle favorite status of a product
export const toggleFavorite = createAsyncThunk('products/toggleFavorite', async (productId, { getState, rejectWithValue }) => {
  const state = getState();
  const token = state.auth.token;

  try {
    const response = await axios.patch(`http://localhost:8000/api/products/favorite/${productId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.favoriteProducts;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Async thunk to add a new product
export const addProduct = createAsyncThunk('products/addProduct', async (formData, { getState, rejectWithValue }) => {
  const state = getState();
  const token = state.auth.token;

  try {
    const response = await axios.post('http://localhost:8000/api/products/add', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Async thunk to update an existing product
export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, formData }, { getState, rejectWithValue }) => {
  const state = getState();
  const token = state.auth.token;

  try {
    const response = await axios.put(`http://localhost:8000/api/products/edit/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Create a slice for product-related state and actions
const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    favoriteItems: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchFavoriteProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavoriteProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.favoriteItems = action.payload.favoriteProductIds;
        localStorage.setItem('favoriteProducts', JSON.stringify(action.payload.favoriteProductIds));
        localStorage.setItem('favoriteProductObjects', JSON.stringify(action.payload.favoriteProductObjects));
      })
      .addCase(fetchFavoriteProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.loading = false;
        const favoriteProductIds = action.payload;
        state.items = state.items.map((item) => ({
          ...item,
          isFavorite: favoriteProductIds.includes(item._id),
        }));
        state.favoriteItems = favoriteProductIds;
        localStorage.setItem('favoriteProducts', JSON.stringify(favoriteProductIds));
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload.product);
        state.success = true;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((item) => item._id === action.payload.updatedProduct._id);
        if (index !== -1) {
          state.items[index] = action.payload.updatedProduct;
        }
        state.success = true;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

// Export the resetSuccess action and the reducer
export const { resetSuccess } = productSlice.actions;

export default productSlice.reducer;