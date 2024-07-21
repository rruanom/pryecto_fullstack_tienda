import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

const FloatingCartIcon = () => {
  const numberItems = useSelector(state => state.cart.numberItems);

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '50px',
        right: '30px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: 'white',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        '&:hover': {
          backgroundColor: '#45a049',
        },
      }}
    >
      <Link to="/cart" style={{ textDecoration: 'none', color: 'white', fontSize: '24px' }}>
        🛒
        <span style={{
          position: 'absolute',
          top: '0',
          right: '0',
          backgroundColor: 'yellow',
          color: 'black',
          borderRadius: '50%',
          padding: '2px 6px',
          fontSize: '12px',
        }}>
          {numberItems}
        </span>
      </Link>
    </Box>
  );
};

export default FloatingCartIcon;
