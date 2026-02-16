import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import type { ChapterPageDto } from '../../types/chapter-api-types';
import ScrambledPageCanvas from './ScrambledPageCanvas';

interface VerticalReaderProps {
  pages: ChapterPageDto[];
  zoom: number;
  onPageChange?: (page: number) => void;
}

function VerticalReader({ pages, zoom, onPageChange }: VerticalReaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!onPageChange) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const pageNumber = parseInt(
              entry.target.getAttribute('data-page') || '1',
              10
            );
            onPageChange(pageNumber);
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of page is visible
        rootMargin: '-100px 0px',
      }
    );

    const pageElements = containerRef.current?.querySelectorAll('[data-page]');
    pageElements?.forEach((el) => observer.observe(el));

    return () => {
      pageElements?.forEach((el) => observer.unobserve(el));
    };
  }, [onPageChange, pages]);

  return (
    <Box
      ref={containerRef}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0,
        py: 2,
        bgcolor: 'background.default',
      }}
    >
      {pages.map((page) => (
        <Box
          key={page.pageNumber}
          data-page={page.pageNumber}
          sx={{
            width: '100%',
            maxWidth: 800 * (zoom / 100),
            position: 'relative',
            transition: 'max-width 0.3s ease',
          }}
        >
          {page.scrambleSeed != null && page.scrambleGridSize != null ? (
            <ScrambledPageCanvas
              imageUrl={page.imageUrl}
              gridSize={page.scrambleGridSize}
              seed={page.scrambleSeed}
              alt={`Page ${page.pageNumber}`}
            />
          ) : (
            <>
              <Box
                component="img"
                src={page.imageUrl}
                alt={`Page ${page.pageNumber}`}
                loading="lazy"
                sx={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  opacity: 0,
                  transition: 'opacity 0.3s',
                }}
                onLoad={(e) => {
                  const target = e.target as HTMLImageElement;
                  const parent = target.parentElement;
                  target.style.opacity = '1';
                  const placeholder = parent?.querySelector('.loading-placeholder') as HTMLElement;
                  if (placeholder) {
                    placeholder.style.opacity = '0';
                  }
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  const parent = target.parentElement;
                  target.style.opacity = '0.5';
                  const placeholder = parent?.querySelector('.loading-placeholder') as HTMLElement;
                  if (placeholder) {
                    placeholder.style.opacity = '0';
                  }
                }}
              />
              {/* Loading placeholder */}
              <Box
                className="loading-placeholder"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'background.paper',
                  opacity: 1,
                  transition: 'opacity 0.3s',
                  pointerEvents: 'none',
                }}
              >
                <CircularProgress />
              </Box>
            </>
          )}
        </Box>
      ))}
    </Box>
  );
}

export default VerticalReader;
