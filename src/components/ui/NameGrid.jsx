import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import NameCard from './NameCard';

export default function NameGrid({ names = [], columns = { xs: 1, sm: 2, md: 3, lg: 4 }, onOpen = () => {} }) {
  return (
    <Box sx={{ display: 'grid', gap: 16, gridTemplateColumns: `repeat(auto-fit, minmax(220px, 1fr))` }}>
      {names.map((n, idx) => (
        <motion.div key={n.name + idx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: idx * 0.03 }}>
          <NameCard item={n} onOpen={onOpen} />
        </motion.div>
      ))}
    </Box>
  );
}
