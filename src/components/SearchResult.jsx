import React from 'react';
import { Box, Typography, Divider, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowIcon from '../assets/images/icons/arrow.svg';

const SearchResult = ({ results, query }) => {
  const navigate = useNavigate();

  const handleViewProduct = (product) => {
    navigate('/viewProduct', { state: { product } });
  };

  return (
    <Box sx={{ p: 1 }}>
      {/* Heading */}
      <Typography sx={{ fontWeight: 600, mb: 3, fontSize: '20px', color: '#969191' }}>
        {results.length} {results.length === 1 ? 'result' : 'results'} found for ‘{query}’
      </Typography>

      <Box sx={{ pl: 15, pr: 15 }}>
        {/* Results List */}
        {results.map((result, index) => (
          <Box key={result.id}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2
              }}
            >
              {/* Product Information */}
              <Box>
                <Typography variant="subtitle2" sx={{ color: '#001EB9', fontWeight: 600, mb: 0.5 }}>
                  {result.sku}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {result.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#757575', fontSize: '14px' }}>
                  {result.description}
                </Typography>
              </Box>

              {/* Arrow Icon */}
              <IconButton onClick={() => handleViewProduct(result)}>
                <img src={ArrowIcon} alt="View" style={{ cursor: 'pointer', height: '20px', width: '20px' }} />
              </IconButton>
            </Box>
            {/* Divider */}
            {index < results.length - 1 && <Divider />}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SearchResult;