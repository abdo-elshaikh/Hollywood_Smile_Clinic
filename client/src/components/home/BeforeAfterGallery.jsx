import React, { useState } from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import BeforeAfterSlider from 'react-before-after-slider';
import { useTranslation } from 'react-i18next';

const BeforeAfterImageSlider = ({ beforeImage, afterImage, t }) => (
  <Box
    component={motion.div}
    sx={{
      position: 'relative',
      overflow: 'hidden',
      height: 400,
      backgroundColor: 'background.paper',
      borderRadius: 2,
      boxShadow: 3,
      mb: 3,
      '&:hover': {
        boxShadow: 6,
        transform: 'translateY(-4px)',
      },
    }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <BeforeAfterSlider
      before={beforeImage}
      after={afterImage}
      width={600}
      height={400}
      hover={true}
    />
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
      <Typography variant="subtitle1" color="text.secondary">{t('BeforeAfterGallery.before')}</Typography>
      <Typography variant="subtitle1" color="text.secondary">{t('BeforeAfterGallery.after')}</Typography>
    </Box>
  </Box>
);

const BeforeAfterGallery = () => {
  const { t } = useTranslation();
  const data = [
    { id: 1, beforeImage: 'https://via.placeholder.com/600x400?text=Before+1', afterImage: 'https://via.placeholder.com/600x400?text=After+1' },
    { id: 2, beforeImage: 'https://via.placeholder.com/600x400?text=Before+2', afterImage: 'https://via.placeholder.com/600x400?text=After+2' },
    { id: 3, beforeImage: 'https://via.placeholder.com/600x400?text=Before+3', afterImage: 'https://via.placeholder.com/600x400?text=After+3' },
    { id: 4, beforeImage: 'https://via.placeholder.com/600x400?text=Before+4', afterImage: 'https://via.placeholder.com/600x400?text=After+4' },
    { id: 5, beforeImage: 'https://via.placeholder.com/600x400?text=Before+5', afterImage: 'https://via.placeholder.com/600x400?text=After+5' },
    { id: 6, beforeImage: 'https://via.placeholder.com/600x400?text=Before+6', afterImage: 'https://via.placeholder.com/600x400?text=After+6' },
    { id: 7, beforeImage: 'https://via.placeholder.com/600x400?text=Before+7', afterImage: 'https://via.placeholder.com/600x400?text=After+7' },
    { id: 8, beforeImage: 'https://via.placeholder.com/600x400?text=Before+8', afterImage: 'https://via.placeholder.com/600x400?text=After+8' },
    { id: 9, beforeImage: 'https://via.placeholder.com/600x400?text=Before+9', afterImage: 'https://via.placeholder.com/600x400?text=After+9' },
  ];

  const [visibleCount, setVisibleCount] = useState(3);
  const [showAll, setShowAll] = useState(false);

  const handleToggleView = () => {
    setVisibleCount(showAll ? 3 : data.length);
    setShowAll(!showAll);
  };

  return (
    <Box sx={{ backgroundColor: 'background.default', py: 10, px: 4 }}>
      <Typography variant="h2" color='primary.main' align="center" gutterBottom>
        {t('BeforeAfterGallery.title')}
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom sx={{ mb: 4 }}>
        {t('BeforeAfterGallery.description')}
      </Typography>
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {data.slice(0, visibleCount).map((patient, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={patient.id}
            component={motion.div}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <BeforeAfterImageSlider
              beforeImage={patient.beforeImage}
              afterImage={patient.afterImage}
              t={t}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleToggleView}
          sx={{ borderRadius: 20, textTransform: 'none' }}
        >
          {showAll ? t('BeforeAfterGallery.viewLess') : t('BeforeAfterGallery.viewMore')}
        </Button>
      </Box>
    </Box>
  );
};

export default BeforeAfterGallery;
