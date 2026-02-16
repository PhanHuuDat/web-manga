import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { genreApi } from '../../services/api/genre-api-service';
import type { GenreWithCountDto } from '../../types/genre-api-types';
import type { RootState } from '../index';

interface GenreState {
  data: GenreWithCountDto[];
  loading: boolean;
  error: string | null;
  loaded: boolean;
}

const initialState: GenreState = {
  data: [],
  loading: false,
  error: null,
  loaded: false,
};

export const fetchGenres = createAsyncThunk<GenreWithCountDto[]>(
  'genre/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await genreApi.list();
    } catch (err) {
      if (typeof err === 'object' && err !== null && 'response' in err) {
        const resp = (err as { response?: { data?: { errors?: string[] } } }).response;
        if (resp?.data?.errors) return rejectWithValue(resp.data.errors.join('; '));
      }
      return rejectWithValue('Failed to load genres.');
    }
  },
);

const genreSlice = createSlice({
  name: 'genre',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenres.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.loaded = true;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectGenres = (state: RootState) => state.genre;

export default genreSlice.reducer;
