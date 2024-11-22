import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TextField, Button, Link } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// project import
import arrowIcon from '../../assets/images/icons/arrow.svg';

// Ant Design icons
import { CheckCircleFilled, MinusCircleFilled } from '@ant-design/icons';
import { addProduct } from '../../redux/slices/productSlice';

export default function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const success = useSelector((state) => state.products.success);

  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [thumbnailIndex, setThumbnailIndex] = useState(null);

  useEffect(() => {
    if (success) {
      toast.success('Product added successfully!');
      setTimeout(() => {
        navigate('/');
      }, 2000); // Redirect after 2 seconds
    }
  }, [success, navigate]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImages(files);
  };

  const handleThumbnailSelect = (index) => {
    setThumbnailIndex(index);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (thumbnailIndex === null) {
      alert('Please select a thumbnail image.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('sku', sku);
    formData.append('quantity', quantity);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('thumbnailIndex', thumbnailIndex);

    selectedImages.forEach((image, index) => {
      formData.append('images', image);
    });

    dispatch(addProduct(formData));
  };

  return (
    <Box sx={{ p: 8 }}>
      <ToastContainer />
      {/* Header Section */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={12} lg={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h2" sx={{ fontWeight: 700, mr: 2, letterSpacing: '0.1em' }}>
              PRODUCTS
            </Typography>
            <img src={arrowIcon} alt="Arrow" style={{ height: '20px', width: '20px', marginRight: '8px' }} />
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: '#001EB9',
                fontSize: '16px',
                letterSpacing: '0.1em'
              }}
            >
              Add new product
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Form Section */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* SKU */}
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ width: '120px', fontWeight: 600, fontSize: '16px' }}>SKU</Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter SKU"
                sx={{ backgroundColor: '#F7F7F7' }}
                value={sku}
                onChange={(e) => setSku(e.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}></Grid>

          {/* Name */}
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ width: '120px', fontWeight: 600, fontSize: '16px' }}>Name</Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter Name"
                sx={{ backgroundColor: '#F7F7F7' }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
          </Grid>

          {/* QTY */}
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ width: '120px', fontWeight: 600, fontSize: '16px' }}>QTY</Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter Quantity"
                sx={{ backgroundColor: '#F7F7F7' }}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Box>
          </Grid>

          {/* Price */}
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ width: '120px', fontWeight: 600, fontSize: '16px' }}>Price</Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter Price"
                sx={{ backgroundColor: '#F7F7F7' }}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Box>
          </Grid>

          {/* Product Description */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography sx={{ fontWeight: 600, mt: 1, fontSize: '16px' }}>Product Description</Typography>
              <Typography sx={{ fontWeight: 600, color: '#969191', fontSize: '12px' }}>A small description about the product</Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="A small description about the product"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Box>
          </Grid>

          {/* Product Images */}
          <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="flex-start">
              <Grid item>
                <Typography sx={{ fontWeight: 600, mt: 1, mb: 3, fontSize: '16px' }}>Product Images</Typography>
                <Typography sx={{ fontWeight: 600, color: '#969191', fontSize: '12px', mt: 1 }}>JPEG, PNG, SVG or GIF</Typography>
                <Typography sx={{ fontWeight: 600, color: '#969191', fontSize: '12px' }}>(Maximum file size 50MB)</Typography>
              </Grid>
              <Grid item>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                  {selectedImages.map((image, index) => (
                    <Box key={index} sx={{ position: 'relative', mr: 2, mb: 2, mt: 4, ml: 3 }}>
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Selected ${index}`}
                        style={{ height: '100px', width: '100px', objectFit: 'cover', borderRadius: '8px' }}
                      />
                      <IconButton
                        onClick={() => handleThumbnailSelect(index)}
                        sx={{
                          position: 'absolute',
                          top: 4,
                          right: 4,
                          backgroundColor: '#F7F7F7',
                          borderRadius: '50%',
                          padding: '4px'
                        }}
                      >
                        {thumbnailIndex === index ? (
                          <CheckCircleFilled style={{ color: '#001EB9', fontSize: '20px' }} />
                        ) : (
                          <MinusCircleFilled style={{ color: '#001EB9', fontSize: '20px' }} />
                        )}
                      </IconButton>
                    </Box>
                  ))}
                  <Link
                    component="label"
                    underline="hover"
                    sx={{
                      color: '#001EB9',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Add Images
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      hidden
                      onChange={handleImageChange}
                    />
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, textAlign: 'right' }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#001EB9',
              textTransform: 'none',
              color: 'white',
              px: 4
            }}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Product'}
          </Button>
        </Box>
      </form>
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
}