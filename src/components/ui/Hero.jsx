import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Chip, IconButton, InputBase, Paper, Typography } from '@mui/material';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';

const defaultFilters = [
  { key: 'all', label: 'All' },
  { key: 'boy', label: 'Boy' },
  { key: 'girl', label: 'Girl' },
  { key: 'unisex', label: 'Unisex' },
  { key: 'indian', label: 'Indian' },
  { key: 'modern', label: 'Modern' },
  { key: 'traditional', label: 'Traditional' },
];

export default function Hero({ onSearch = () => {}, onFilter = () => {}, onSurprise = () => {} }) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState(defaultFilters.map((f) => ({ ...f, active: f.key === 'all' })));

  useEffect(() => {
    const handler = setTimeout(() => onSearch(query), 220);
    return () => clearTimeout(handler);
  }, [query, onSearch]);

  const handleFilter = (key) => {
    setFilters((prev) => prev.map((f) => ({ ...f, active: f.key === key })));
    onFilter(key);
  };

  return (
    <Box sx={{ background: '#FCFBF7', py: 6, px: { xs: 3, sm: 6 } }}>
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
          <Typography variant="h2" sx={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 700, color: '#0F172A', mb: 2 }}>
            Find a name they'll carry forever.
          </Typography>

          <Typography sx={{ color: '#6B7280', mb: 4, fontSize: 18 }}>
            Discover beautiful names, meaningful stories, origins and inspiration for your little one's perfect name.
          </Typography>

          <Paper component="form" sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1, borderRadius: 3, boxShadow: '0 6px 20px rgba(16,24,40,0.06)', background: '#FFFFFF', border: '1px solid rgba(15,23,42,0.04)' }} onSubmit={(e) => e.preventDefault()}>
            <Box sx={{ px: 1 }}><Search size={18} /></Box>
            <InputBase
              placeholder="Search for a name, meaning or origin..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{ flex: 1, px: 1 }}
              inputProps={{ 'aria-label': 'Search names' }}
            />
            {query ? (
              <IconButton aria-label="clear" onClick={() => setQuery('')}>
                <X size={16} />
              </IconButton>
            ) : null}
          </Paper>

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 3, flexWrap: 'wrap' }}>
            {filters.map((f) => (
              <Chip
                key={f.key}
                label={f.label}
                clickable
                onClick={() => handleFilter(f.key)}
                color={f.active ? 'primary' : 'default'}
                variant={f.active ? 'filled' : 'outlined'}
                sx={{ borderRadius: 2, textTransform: 'none' }}
              />
            ))}

            <Button startIcon={<span style={{ fontSize: 18 }}>✦</span>} onClick={onSurprise} sx={{ ml: 'auto', borderRadius: 2, background: '#EDE9FE', color: '#4C1D95', '&:hover': { background: '#EDE9FE' } }}>
              Surprise Me
            </Button>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
}
