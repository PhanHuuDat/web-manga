import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { bookmarkApi } from '../../services/api/bookmark-api-service';
import { extractError } from '../../utils/extract-api-error';
import type { BookmarkDto } from '../../types/bookmark-api-types';
import type { RootState } from '../index';

interface BookmarkState {
  list: {
    data: BookmarkDto[];
    loading: boolean;
    error: string | null;
    page: number;
    totalCount: number;
    hasNext: boolean;
  };
  /** Set of manga IDs currently bookmarked by the user */
  bookmarkedIds: Record<string, boolean>;
  toggling: Record<string, boolean>;
}

const initialState: BookmarkState = {
  list: { data: [], loading: false, error: null, page: 1, totalCount: 0, hasNext: false },
  bookmarkedIds: {},
  toggling: {},
};

export const fetchBookmarks = createAsyncThunk(
  'bookmark/fetchList',
  async (params: { page?: number; pageSize?: number } = {}, { rejectWithValue }) => {
    try {
      return await bookmarkApi.list(params);
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const toggleBookmark = createAsyncThunk(
  'bookmark/toggle',
  async (mangaSeriesId: string, { rejectWithValue }) => {
    try {
      const result = await bookmarkApi.toggle(mangaSeriesId);
      return { mangaSeriesId, ...result };
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const checkBookmark = createAsyncThunk(
  'bookmark/check',
  async (mangaId: string, { rejectWithValue }) => {
    try {
      const isBookmarked = await bookmarkApi.check(mangaId);
      return { mangaId, isBookmarked };
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch list
      .addCase(fetchBookmarks.pending, (state) => {
        state.list.loading = true;
        state.list.error = null;
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.list.loading = false;
        state.list.data = action.payload.data;
        state.list.page = action.payload.page;
        state.list.totalCount = action.payload.totalCount;
        state.list.hasNext = action.payload.hasNext;
        // Sync bookmarkedIds
        for (const bm of action.payload.data) {
          state.bookmarkedIds[bm.mangaSeriesId] = true;
        }
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.list.loading = false;
        state.list.error = action.payload as string;
      })
      // Toggle
      .addCase(toggleBookmark.pending, (state, action) => {
        state.toggling[action.meta.arg] = true;
      })
      .addCase(toggleBookmark.fulfilled, (state, action) => {
        const { mangaSeriesId, isBookmarked } = action.payload;
        state.toggling[mangaSeriesId] = false;
        state.bookmarkedIds[mangaSeriesId] = isBookmarked;
        if (!isBookmarked) {
          state.list.data = state.list.data.filter((b) => b.mangaSeriesId !== mangaSeriesId);
          state.list.totalCount = Math.max(0, state.list.totalCount - 1);
        }
      })
      .addCase(toggleBookmark.rejected, (state, action) => {
        state.toggling[action.meta.arg] = false;
      })
      // Check
      .addCase(checkBookmark.fulfilled, (state, action) => {
        state.bookmarkedIds[action.payload.mangaId] = action.payload.isBookmarked;
      });
  },
});

export const selectIsBookmarked = (mangaId: string) => (state: RootState) =>
  state.bookmark.bookmarkedIds[mangaId] ?? false;

export const selectIsToggling = (mangaId: string) => (state: RootState) =>
  state.bookmark.toggling[mangaId] ?? false;

export default bookmarkSlice.reducer;
