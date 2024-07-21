import React from 'react';
import MUIPagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled } from '@mui/system';

const primaryColor = '#81c784'; 
const darkColor = '#4caf50';

const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
      dark: darkColor
    },
  },
});

const StyledPaginationItem = styled(PaginationItem)(({ theme }) => ({
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: '#ffffff',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const Pagination = ({ currentPage, totalPages, onPageChange, limit, totalProducts }) => {
  if (limit >= totalProducts) return null;

  const handleChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <MUIPagination 
          count={totalPages}
          page={currentPage}
          onChange={handleChange}
          siblingCount={0}
          boundaryCount={1}
          size="small"
          renderItem={(item) => (
            <StyledPaginationItem {...item} />
          )}
        />
      </div>
    </ThemeProvider>
  );
};

export default Pagination;