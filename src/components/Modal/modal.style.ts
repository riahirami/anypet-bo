import React from 'react';
import { styled, createTheme } from '@mui/system';
import { Modal, Button, Typography } from '@mui/material';


interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export const CoreModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '12px',
}));

export const ModalContent = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
  padding: '2rem',
  borderRadius: '10px',
  position: 'relative',
}));

export const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#e63946',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#388e3c',
    boxShadow: 'none',
  },
  position: 'absolute',
  top: 0, 
  right: 0, 
  minWidth: 'auto', 
  padding: '0.2rem 0.5rem', 
  fontSize: '0.8rem',
  borderRadius: 0,
  boxShadow: 'none',
}));
