import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Typography, Box, Chip } from '@mui/material';
import { X, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NameDetails({ open, onClose, item }) {
  if (!item) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" aria-labelledby="name-details-title">
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} id="name-details-title">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Volume2 />
          <Typography variant="h6" sx={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 700 }}>{item.name}</Typography>
        </Box>
        <IconButton aria-label="close" onClick={onClose}><X /></IconButton>
      </DialogTitle>

      <DialogContent>
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
          {item.meaning && (
            <Typography sx={{ mb: 2 }}>{item.meaning}</Typography>
          )}

          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            {item.origin && <Chip label={`Origin: ${item.origin}`} />}
            {item.popularity && <Chip label={`Popularity: ${item.popularity}`} color={item.popularity === 'High' ? 'success' : 'default'} />}
          </Box>

          {item.notes && (
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ fontWeight: 600, mb: 1 }}>Notes</Typography>
              <Typography>{item.notes}</Typography>
            </Box>
          )}

          {/* Placeholder for pronunciation/audio if available */}
          {item.pronunciation && (
            <Box sx={{ mt: 3 }}>
              <Typography sx={{ fontWeight: 600, mb: 1 }}>Pronunciation</Typography>
              <audio controls src={item.pronunciation} style={{ width: '100%' }} />
            </Box>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
