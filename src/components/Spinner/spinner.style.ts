import React from 'react';
import { styled, createTheme } from '@mui/system';
import Box from '@mui/material/Box';


export const StyledBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   height: '100vh'
}));