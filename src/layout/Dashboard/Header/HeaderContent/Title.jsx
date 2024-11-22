import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

export default function Title() {
  return (
    <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mr: 2, letterSpacing: '0.1em',color:'#162427' }}>
      E-Commerce APP
        </Typography>
      </Link>
    </Box>
  );
}