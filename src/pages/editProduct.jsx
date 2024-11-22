import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TextField, Button, Link } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// project import
import arrowIcon from '../assets/images/icons/arrow.svg';
import { CheckCircleFilled, MinusCircleFilled } from '@ant-design/icons';
import { updateProduct, resetSuccess } from '../redux/slices/productSlice';

export default function EditProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [thumbnailIndex, setThumbnailIndex] = useState(null);

  const { success, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(resetSuccess());
  }, [dispatch]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setSku(product.sku);
      setQuantity(product.quantity);
      setDescription(product.description);
      setPrice(product.price);
      setSelectedImages(product.images);
      setThumbnailIndex(product.images.indexOf(product.thumbnail));
    }
  }, [product]);

  useEffect(() => {
    if (success) {
      toast.success('Product updated successfully!');
      setTimeout(() => {
        navigate('/');
      }, 2000); // Redirect after 2 seconds
    }
  }, [success, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(`Error updating product: ${error}`);
    }
  }, [error]);

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

    dispatch(updateProduct({ id: product._id, formData }));
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
              Edit Product
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
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: 600, mt: 1, fontSize: '16px' }}>Product Images</Typography>
                <Link
                  component="label"
                  underline="hover"
                  sx={{
                    color: '#001EB9',
                    fontSize: '14px',
                    fontWeight: '500',
                    ml: 10,
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
              <Typography sx={{ fontWeight: 600, color: '#969191', fontSize: '12px' }}>JPEG, PNG, SVG or GIF</Typography>
              <Typography sx={{ fontWeight: 600, color: '#969191', fontSize: '12px' }}>(Maximum file size 50MB)</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
              {selectedImages.map((image, index) => (
                <Box key={index} sx={{ position: 'relative', mr: 2, mb: 2 }}>
                  <img
                    src={typeof image === 'string' ? `http://localhost:8000/api/products/image/${image}` : URL.createObjectURL(image)}
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
            </Box>
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
          >
            Save Changes
          </Button>
        </Box>
      </form>
    </Box>
  );
}