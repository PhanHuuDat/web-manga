import { IconButton, CircularProgress, Tooltip } from '@mui/material';
import { Bookmark, BookmarkBorder } from '@mui/icons-material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  toggleBookmark,
  checkBookmark,
  selectIsBookmarked,
  selectIsToggling,
} from '../../store/slices/bookmark-slice';

interface BookmarkButtonProps {
  mangaId: string;
  size?: 'small' | 'medium' | 'large';
}

export default function BookmarkButton({ mangaId, size = 'medium' }: BookmarkButtonProps) {
  const dispatch = useAppDispatch();
  const isBookmarked = useAppSelector(selectIsBookmarked(mangaId));
  const isToggling = useAppSelector(selectIsToggling(mangaId));
  const isAuthenticated = useAppSelector((state) => !!state.auth.accessToken);

  useEffect(() => {
    if (isAuthenticated && mangaId) {
      dispatch(checkBookmark(mangaId));
    }
  }, [dispatch, mangaId, isAuthenticated]);

  if (!isAuthenticated) return null;

  const handleToggle = () => {
    if (!isToggling) dispatch(toggleBookmark(mangaId));
  };

  return (
    <Tooltip title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}>
      <IconButton
        onClick={handleToggle}
        disabled={isToggling}
        size={size}
        sx={{ color: isBookmarked ? '#f43f5e' : '#94a3b8' }}
      >
        {isToggling ? (
          <CircularProgress size={20} color="inherit" />
        ) : isBookmarked ? (
          <Bookmark />
        ) : (
          <BookmarkBorder />
        )}
      </IconButton>
    </Tooltip>
  );
}
