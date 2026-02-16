import { useEffect, useRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { saveReadingProgress } from '../store/slices/reading-history-slice';

const SAVE_INTERVAL_MS = 10_000; // 10 seconds

/**
 * Auto-saves reading progress every 10s and on unmount.
 * Only active when user is authenticated.
 */
export function useReadingProgressTracker(
  mangaId: string | undefined,
  chapterId: string | undefined,
  currentPage: number,
) {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => !!state.auth.accessToken);
  const lastSavedRef = useRef({ chapterId: '', page: 0 });

  const save = useCallback(() => {
    if (!isAuthenticated || !mangaId || !chapterId || currentPage < 1) return;
    // Skip if nothing changed since last save
    if (lastSavedRef.current.chapterId === chapterId && lastSavedRef.current.page === currentPage) return;

    lastSavedRef.current = { chapterId, page: currentPage };
    dispatch(saveReadingProgress({ mangaSeriesId: mangaId, chapterId, lastPageNumber: currentPage }));
  }, [dispatch, isAuthenticated, mangaId, chapterId, currentPage]);

  // Periodic save
  useEffect(() => {
    if (!isAuthenticated || !mangaId || !chapterId) return;

    const interval = setInterval(save, SAVE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [save, isAuthenticated, mangaId, chapterId]);

  // Save on page change (debounced via the interval above, but also immediate on unmount)
  useEffect(() => {
    return () => { save(); };
  }, [save]);
}
