import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import editIcon from '../assets/images/icons/edit-icon.svg';
import deleteIcon from '../assets/images/icons/delete-icon.svg';
import starredIcon from '../assets/images/icons/starred.svg';
import AlertIcon from '../assets/images/icons/alert.svg';
import StarIcon from '../assets/images/icons/star.svg';
import { deleteProduct, toggleFavorite } from '../redux/slices/productSlice';

const columns = [
  { id: 'sku', label: 'SKU', minWidth: 170 },
  { id: 'image', label: 'Image', minWidth: 100 },
  { id: 'name', label: 'Product Name', minWidth: 100, align: 'left' },
  { id: 'price', label: 'Price', minWidth: 50, align: 'left' }
];

export default function OrdersTable({ rows, favoriteProducts }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setProductToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      dispatch(deleteProduct(productToDelete._id));
    }
    handleClose();
  };

  const handleToggleFavorite = (product) => {
    dispatch(toggleFavorite(product._id));
  };

  const handleEditClick = (product) => {
    console.log('Edit product:', product);
    navigate('/editProduct', { state: { product } });
  };

  const isFavorite = (productId) => {
    return favoriteProducts.includes(productId);
  };

  return (
    <Box sx={{ p: 3 }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth, color: '#001EB9' }}>
                  {column.label}
                </TableCell>
              ))}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    const imageID = row.thumbnail;
                    return (
                      <TableCell key={column.id} align={column.align} style={column.id === 'sku' ? { color: '#969191' } : {}}>
                        {column.id === 'image' ? (
                          <img src={`http://localhost:8000/api/products/image/${imageID}`} alt={row.name} style={{ height: '50px' }} />
                        ) : column.id === 'sku' ? (
                          value ? (
                            `#${value}`
                          ) : (
                            ''
                          )
                        ) : column.id === 'price' ? (
                          value ? (
                            `$${value}`
                          ) : (
                            ''
                          )
                        ) : (
                          value || ''
                        )}
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    <IconButton onClick={() => handleDeleteClick(row)}>
                      <img src={deleteIcon} alt="Delete" style={{ cursor: 'pointer', height: '20px', width: '20px' }} />
                    </IconButton>
                    <IconButton onClick={() => handleEditClick(row)}>
                      <img src={editIcon} alt="Edit" style={{ cursor: 'pointer', height: '20px', width: '20px' }} />
                    </IconButton>
                    <IconButton onClick={() => handleToggleFavorite(row)}>
                      <img
                        src={isFavorite(row._id) ? starredIcon : StarIcon}
                        alt="Favorite"
                        style={{ cursor: 'pointer', height: '20px', width: '20px' }}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' }}>
          <img src={AlertIcon} alt="Alert" style={{ cursor: 'pointer', height: '50px', width: '50px' }} />
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ textAlign: 'center', fontSize: '18px', fontWeight: '800', color: '#162427', letterSpacing: '0.1em' }}
          >
            ARE YOU SURE?
          </DialogContentText>
          <DialogContentText
            id="alert-dialog-description"
            style={{ textAlign: 'center', fontSize: '14px', marginTop: 10, color: '#162427', fontWeight: '700' }}
          >
            You will not be able to undo this action if you proceed!
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center', marginBottom: 15 }}>
          <Button onClick={handleClose} style={{ color: 'black', border: '2px solid #001EB9', marginRight: 10 }}>
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} style={{ backgroundColor: '#001EB9', color: 'white' }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

OrdersTable.propTypes = {
  rows: PropTypes.array.isRequired,
  favoriteProducts: PropTypes.array.isRequired,
};