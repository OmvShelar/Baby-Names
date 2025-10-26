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
  ChildFriendly as GirlIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ariesGirlNames = [
  { name: 'Aadhya', meaning: 'First power, goddess Durga', origin: 'Sanskrit' },
  { name: 'Aarushi', meaning: 'First ray of sun', origin: 'Sanskrit' },
  { name: 'Advika', meaning: 'Unique, extraordinary', origin: 'Sanskrit' },
  { name: 'Anaya', meaning: 'Caring, compassionate', origin: 'Sanskrit' },
];

const AriesGirlNames = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#FCE4EC', pt: 2 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={() => navigate('/girl-names')}
            sx={{
              backgroundColor: '#E91E63',
              color: 'white',
              '&:hover': {
                backgroundColor: '#C2185B',
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
                color: '#E91E63',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <span style={{ fontSize: '2rem' }}>♈</span>
              Aries Girl Names
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#666',
                fontFamily: '"Poppins", sans-serif',
                mt: 1,
              }}
            >
              Energetic and bold names for Aries girls (Mar 21 - Apr 19)
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
              color: '#E91E63',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            ♈ Aries Names ({ariesGirlNames.length})
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
                    backgroundColor: '#FCE4EC',
                    '& th': {
                      fontFamily: '"Poppins", sans-serif',
                      fontWeight: 600,
                      color: '#E91E63',
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
                {ariesGirlNames.map((nameData, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      '&:nth-of-type(odd)': {
                        backgroundColor: '#f9f9f9',
                      },
                      '&:hover': {
                        backgroundColor: '#FCE4EC',
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
                    <TableCell sx={{ fontWeight: 600, color: '#E91E63' }}>
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

export default AriesGirlNames;
