import { useEffect } from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button, Skeleton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchBookmarks, toggleBookmark } from '../../store/slices/bookmark-slice';

export default function BookmarkListPage() {
  const dispatch = useAppDispatch();
  const { data, loading, totalCount } = useAppSelector((state) => state.bookmark.list);

  useEffect(() => {
    dispatch(fetchBookmarks({ page: 1, pageSize: 50 }));
  }, [dispatch]);

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Typography variant="h4" sx={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#f1f5f9', mb: 3 }}>
        My Bookmarks ({totalCount})
      </Typography>

      {loading ? (
        <Grid container spacing={2}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Grid key={i} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
              <Skeleton variant="rectangular" height={280} sx={{ borderRadius: 2, bgcolor: '#1e293b' }} />
            </Grid>
          ))}
        </Grid>
      ) : data.length === 0 ? (
        <Typography sx={{ color: '#94a3b8', textAlign: 'center', mt: 8 }}>
          No bookmarks yet. Browse manga and bookmark your favorites!
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {data.map((bm) => (
            <Grid key={bm.id} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
              <Card sx={{ bgcolor: '#1e293b', borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component={Link}
                  to={`/manga/${bm.mangaSeriesId}`}
                  image={bm.coverUrl || '/placeholder-cover.webp'}
                  sx={{ height: 200, objectFit: 'cover' }}
                />
                <CardContent sx={{ flex: 1, py: 1, px: 1.5 }}>
                  <Typography
                    component={Link}
                    to={`/manga/${bm.mangaSeriesId}`}
                    sx={{
                      color: '#f1f5f9',
                      fontWeight: 600,
                      fontSize: 14,
                      textDecoration: 'none',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      '&:hover': { color: '#3b82f6' },
                    }}
                  >
                    {bm.mangaTitle}
                  </Typography>
                </CardContent>
                <CardActions sx={{ pt: 0, px: 1.5, pb: 1 }}>
                  <Button
                    size="small"
                    startIcon={<Delete />}
                    onClick={() => dispatch(toggleBookmark(bm.mangaSeriesId))}
                    sx={{ color: '#f43f5e', textTransform: 'none', fontSize: 12 }}
                  >
                    Remove
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
