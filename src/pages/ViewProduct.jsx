import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TextField, Link } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { CheckCircleFilled, MinusCircleFilled } from '@ant-design/icons';

export default function ViewProduct() {
  const location = useLocation();
  const product = location.state?.product;

  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [thumbnailIndex, setThumbnailIndex] = useState(null);

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

  return (
    <Box sx={{ p: 8 }}>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={12} lg={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h2" sx={{ fontWeight: 700, mr: 2, letterSpacing: '0.1em' }}>
              View Product
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* SKU */}
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: '120px', fontWeight: 600, fontSize: '16px' }}>SKU</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={sku}
              InputProps={{
                readOnly: true,
              }}
              sx={{ backgroundColor: '#F7F7F7' }}
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
              value={name}
              InputProps={{
                readOnly: true,
              }}
              sx={{ backgroundColor: '#F7F7F7' }}
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
              value={quantity}
              InputProps={{
                readOnly: true,
              }}
              sx={{ backgroundColor: '#F7F7F7' }}
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
              value={price}
              InputProps={{
                readOnly: true,
              }}
              sx={{ backgroundColor: '#F7F7F7' }}
            />
          </Box>
        </Grid>

        {/* Product Description */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography sx={{ fontWeight: 600, mt: 1, fontSize: '16px' }}>Product Description</Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={description}
              InputProps={{
                readOnly: true,
              }}
              sx={{ backgroundColor: '#F7F7F7' }}
            />
          </Box>
        </Grid>

        {/* Product Images */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ fontWeight: 600, mt: 1, fontSize: '16px' }}>Product Images</Typography>
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
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}