import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import MuiIconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import type { ChapterPageDto } from '../../types/chapter-api-types';
import { useTranslation } from 'react-i18next';

interface HorizontalReaderProps {
  pages: ChapterPageDto[];
  zoom: number;
  onPageChange?: (page: number) => void;
}

function HorizontalReader({ pages, zoom, onPageChange }: HorizontalReaderProps) {
  const { t } = useTranslation('reader');
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (onPageChange) {
      onPageChange(currentPage + 1); // Convert 0-based to 1-based
    }
  }, [currentPage, onPageChange]);

  const goToNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        bgcolor: 'background.default',
        position: 'relative',
      }}
    >
      {/* Previous button */}
      <MuiIconButton
        onClick={goToPrevPage}
        disabled={currentPage === 0}
        sx={{
          position: 'absolute',
          left: 16,
          zIndex: 10,
          bgcolor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          '&:hover': {
            bgcolor: 'rgba(0, 0, 0, 0.7)',
          },
          '&:disabled': {
            opacity: 0.3,
          },
        }}
      >
        <ArrowBackIosNewIcon />
      </MuiIconButton>

      {/* Current page */}
      <Box
        sx={{
          flex: 1,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Box
          component="img"
          src={pages[currentPage]?.imageUrl}
          alt={`Page ${currentPage + 1}`}
          sx={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            transform: `scale(${zoom / 100})`,
            transition: 'transform 0.3s ease',
          }}
        />
      </Box>

      {/* Next button */}
      <MuiIconButton
        onClick={goToNextPage}
        disabled={currentPage === pages.length - 1}
        sx={{
          position: 'absolute',
          right: 16,
          zIndex: 10,
          bgcolor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          '&:hover': {
            bgcolor: 'rgba(0, 0, 0, 0.7)',
          },
          '&:disabled': {
            opacity: 0.3,
          },
        }}
      >
        <ArrowForwardIosIcon />
      </MuiIconButton>

      {/* Page counter */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          bgcolor: 'rgba(0, 0, 0, 0.7)',
          px: 2,
          py: 1,
          borderRadius: 2,
          zIndex: 10,
        }}
      >
        <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
          {t('progress.page', { current: currentPage + 1, total: pages.length })}
        </Typography>
      </Box>
    </Box>
  );
}

export default HorizontalReader;
