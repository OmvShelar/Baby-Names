import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  ChildCare as BoyIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const taurusBoyNames = [
  { name: 'Bodhi', meaning: 'Enlightenment, wisdom', origin: 'Sanskrit' },
  { name: 'Bharat', meaning: 'India, universal monarch', origin: 'Sanskrit' },
  { name: 'Bhavin', meaning: 'Winner, achiever', origin: 'Sanskrit' },
  { name: 'Brijesh', meaning: 'Lord Krishna', origin: 'Sanskrit' },
];

const TaurusBoyNames = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#E3F2FD', pt: 2 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={() => navigate('/boy-names')}
            sx={{
              backgroundColor: '#1976D2',
              color: 'white',
              '&:hover': {
                backgroundColor: '#1565C0',
              },
            }}
          >
            <BackIcon />
          </IconButton>
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 700,
                color: '#1976D2',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <span style={{ fontSize: '2rem' }}>♉</span>
              Taurus Boy Names
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#666',
                fontFamily: '"Poppins", sans-serif',
                mt: 1,
              }}
            >
              Strong and reliable names for Taurus boys (Apr 20 - May 20)
            </Typography>
          </Box>
        </Box>

        <Box sx={{ backgroundColor: 'white', borderRadius: 3, p: 3, mb: 4 }}>
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 600,
              color: '#1976D2',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            ♉ Taurus Names ({taurusBoyNames.length})
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              overflowX: 'auto',
              backgroundColor: 'white',
              transition: 'opacity 0.3s ease-in-out',
            }}
          >
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: '#E3F2FD',
                    '& th': {
                      fontFamily: '"Poppins", sans-serif',
                      fontWeight: 600,
                      color: '#1976D2',
                      borderBottom: '2px solid #ddd',
                    },
                  }}
                >
                  <TableCell>Name</TableCell>
                  <TableCell>Meaning</TableCell>
                  <TableCell>Origin</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {taurusBoyNames.map((nameData, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      '&:nth-of-type(odd)': {
                        backgroundColor: '#f9f9f9',
                      },
                      '&:hover': {
                        backgroundColor: '#E3F2FD',
                        transform: 'scale(1.02)',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        transition: 'all 0.2s ease-in-out',
                      },
                      '& td': {
                        fontFamily: '"Poppins", sans-serif',
                        borderBottom: '1px solid #eee',
                      },
                    }}
                  >
                    <TableCell sx={{ fontWeight: 600, color: '#1976D2' }}>
                      {nameData.name}
                    </TableCell>
                    <TableCell>{nameData.meaning}</TableCell>
                    <TableCell>{nameData.origin}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </Box>
  );
};

export default TaurusBoyNames;
