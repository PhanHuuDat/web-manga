import { useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, Skeleton, Button } from '@mui/material';
import { Delete, PlayArrow } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchReadingHistory, clearHistory } from '../../store/slices/reading-history-slice';

export default function ReadingHistoryPage() {
  const dispatch = useAppDispatch();
  const { data, loading, totalCount } = useAppSelector((state) => state.readingHistory.list);

  useEffect(() => {
    dispatch(fetchReadingHistory({ page: 1, pageSize: 50 }));
  }, [dispatch]);

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" sx={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#f1f5f9', mb: 3 }}>
        Reading History ({totalCount})
      </Typography>

      {loading ? (
        Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} variant="rectangular" height={72} sx={{ mb: 1, borderRadius: 1, bgcolor: '#1e293b' }} />
        ))
      ) : data.length === 0 ? (
        <Typography sx={{ color: '#94a3b8', textAlign: 'center', mt: 8 }}>
          No reading history yet. Start reading some manga!
        </Typography>
      ) : (
        <List>
          {data.map((item) => (
            <ListItem
              key={item.id}
              sx={{ bgcolor: '#1e293b', borderRadius: 2, mb: 1 }}
              secondaryAction={
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    component={Link}
                    to={`/read/${item.mangaSeriesId}/${item.chapterId}`}
                    size="small"
                    startIcon={<PlayArrow />}
                    sx={{ color: '#3b82f6', textTransform: 'none' }}
                  >
                    Continue
                  </Button>
                  <IconButton onClick={() => dispatch(clearHistory(item.mangaSeriesId))} sx={{ color: '#f43f5e' }}>
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              }
            >
              <ListItemAvatar>
                <Avatar
                  variant="rounded"
                  src={item.coverUrl || undefined}
                  sx={{ width: 48, height: 64 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography component={Link} to={`/manga/${item.mangaSeriesId}`}
                    sx={{ color: '#f1f5f9', textDecoration: 'none', fontWeight: 600, '&:hover': { color: '#3b82f6' } }}>
                    {item.mangaTitle}
                  </Typography>
                }
                secondary={
                  <Typography sx={{ color: '#94a3b8', fontSize: 13 }}>
                    Ch. {item.chapterNumber} &middot; Page {item.lastPageNumber} &middot; {formatTime(item.lastReadAt)}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
