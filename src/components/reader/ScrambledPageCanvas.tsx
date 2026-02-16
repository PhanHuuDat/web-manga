import { useRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { descrambleImage } from '../../utils/image-descrambler';

interface ScrambledPageCanvasProps {
  imageUrl: string;
  gridSize: number;
  seed: number;
  alt: string;
}

/**
 * Renders a scrambled chapter page by loading the image offscreen,
 * descrambling tiles onto a visible canvas element.
 * Includes lazy loading via IntersectionObserver.
 */
function ScrambledPageCanvas({
  imageUrl,
  gridSize,
  seed,
  alt,
}: ScrambledPageCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Lazy loading: only start image load when container is near viewport
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px' }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Load and descramble image when visible
  useEffect(() => {
    if (!isVisible || !canvasRef.current) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      descrambleImage(img, canvas, gridSize, seed);
      setIsLoading(false);
    };

    img.onerror = () => {
      setHasError(true);
      setIsLoading(false);
    };

    img.src = imageUrl;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [isVisible, imageUrl, gridSize, seed]);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: '100%',
        position: 'relative',
        minHeight: isLoading ? 400 : 'auto',
      }}
    >
      <canvas
        ref={canvasRef}
        aria-label={alt}
        role="img"
        style={{
          width: '100%',
          height: 'auto',
          display: isLoading ? 'none' : 'block',
          userSelect: 'none',
          WebkitUserSelect: 'none',
        }}
        onContextMenu={(e) => e.preventDefault()}
        draggable={false}
      />

      {isLoading && !hasError && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 400,
            bgcolor: 'background.paper',
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {hasError && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 200,
            bgcolor: 'background.paper',
            color: 'error.main',
            fontSize: 14,
          }}
        >
          Failed to load page
        </Box>
      )}
    </Box>
  );
}

export default ScrambledPageCanvas;
