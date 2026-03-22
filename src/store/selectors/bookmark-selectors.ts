import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index';

// Per-mangaId memoized selector factory
// Usage: const sel = useMemo(() => makeSelectIsBookmarked(id), [id])
export const makeSelectIsBookmarked = (mangaId: string) =>
  createSelector(
    (state: RootState) => state.bookmark.bookmarkedIds,
    (ids) => ids[mangaId] ?? false,
  );

export const makeSelectIsToggling = (mangaId: string) =>
  createSelector(
    (state: RootState) => state.bookmark.toggling,
    (toggling) => toggling[mangaId] ?? false,
  );
