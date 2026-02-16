import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { readingHistoryApi } from '../../services/api/reading-history-api-service';
import { extractError } from '../../utils/extract-api-error';
import type { ReadingHistoryDto, ResumePointDto } from '../../types/reading-history-api-types';
import type { RootState } from '../index';
import { logoutThunk } from './auth-slice';

interface ReadingHistoryState {
  list: {
    data: ReadingHistoryDto[];
    loading: boolean;
    error: string | null;
    page: number;
    totalCount: number;
    hasNext: boolean;
  };
  resumePoints: Record<string, ResumePointDto | null>;
}

const initialState: ReadingHistoryState = {
  list: { data: [], loading: false, error: null, page: 1, totalCount: 0, hasNext: false },
  resumePoints: {},
};

export const saveReadingProgress = createAsyncThunk(
  'readingHistory/save',
  async (data: { mangaSeriesId: string; chapterId: string; lastPageNumber: number }, { rejectWithValue }) => {
    try {
      return await readingHistoryApi.upsert(data);
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const fetchReadingHistory = createAsyncThunk(
  'readingHistory/fetchList',
  async (params: { page?: number; pageSize?: number } = {}, { rejectWithValue }) => {
    try {
      return await readingHistoryApi.list(params);
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const fetchResumePoint = createAsyncThunk(
  'readingHistory/fetchResume',
  async (mangaId: string, { rejectWithValue }) => {
    try {
      const data = await readingHistoryApi.getResumePoint(mangaId);
      return { mangaId, data };
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const clearHistory = createAsyncThunk(
  'readingHistory/clear',
  async (mangaId: string, { rejectWithValue }) => {
    try {
      await readingHistoryApi.clear(mangaId);
      return mangaId;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

const readingHistorySlice = createSlice({
  name: 'readingHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReadingHistory.pending, (state) => {
        state.list.loading = true;
        state.list.error = null;
      })
      .addCase(fetchReadingHistory.fulfilled, (state, action) => {
        state.list.loading = false;
        state.list.data = action.payload.data;
        state.list.page = action.payload.page;
        state.list.totalCount = action.payload.totalCount;
        state.list.hasNext = action.payload.hasNext;
      })
      .addCase(fetchReadingHistory.rejected, (state, action) => {
        state.list.loading = false;
        state.list.error = action.payload as string;
      })
      .addCase(fetchResumePoint.fulfilled, (state, action) => {
        state.resumePoints[action.payload.mangaId] = action.payload.data;
      })
      .addCase(clearHistory.fulfilled, (state, action) => {
        state.list.data = state.list.data.filter((h) => h.mangaSeriesId !== action.payload);
        state.list.totalCount = Math.max(0, state.list.totalCount - 1);
        delete state.resumePoints[action.payload];
      })
      // Logout - reset state
      .addCase(logoutThunk.fulfilled, () => initialState);
  },
});

export const selectResumePoint = (mangaId: string) => (state: RootState) =>
  state.readingHistory.resumePoints[mangaId] ?? null;

export default readingHistorySlice.reducer;
