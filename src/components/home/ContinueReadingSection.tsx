import { useEffect } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Button, Stack } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchReadingHistory } from '../../store/slices/reading-history-slice';

/** Horizontal scroll section showing recently-read manga on the homepage. */
export default function ContinueReadingSection() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => !!state.auth.accessToken);
  const { data, loading } = useAppSelector((state) => state.readingHistory.list);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchReadingHistory({ page: 1, pageSize: 10 }));
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated || (!loading && data.length === 0)) return null;

  return (
    <Box sx={{ mb: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#f1f5f9' }}>
          Continue Reading
        </Typography>
        <Button component={Link} to="/history" sx={{ color: '#3b82f6', textTransform: 'none' }}>
          View All
        </Button>
      </Stack>
      <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1, '&::-webkit-scrollbar': { height: 4 } }}>
        {data.slice(0, 10).map((item) => (
          <Card
            key={item.id}
            component={Link}
            to={`/read/${item.mangaSeriesId}/${item.chapterId}`}
            sx={{
              minWidth: 160, maxWidth: 160, bgcolor: '#1e293b', borderRadius: 2,
              textDecoration: 'none', flexShrink: 0, transition: 'transform 0.2s',
              '&:hover': { transform: 'translateY(-4px)' },
            }}
          >
            <CardMedia
              image={item.coverUrl || '/placeholder-cover.webp'}
              sx={{ height: 200, position: 'relative' }}
            >
              <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, bgcolor: 'rgba(0,0,0,0.7)', px: 1, py: 0.5 }}>
                <Typography sx={{ color: '#fff', fontSize: 11, fontWeight: 600 }}>
                  <PlayArrow sx={{ fontSize: 12, verticalAlign: 'middle', mr: 0.3 }} />
                  Ch. {item.chapterNumber} · P.{item.lastPageNumber}
                </Typography>
              </Box>
            </CardMedia>
            <CardContent sx={{ py: 1, px: 1.5 }}>
              <Typography sx={{
                color: '#f1f5f9', fontWeight: 600, fontSize: 13,
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
              }}>
                {item.mangaTitle}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
