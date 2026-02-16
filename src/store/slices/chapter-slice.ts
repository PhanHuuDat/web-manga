import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { chapterApi } from '../../services/api/chapter-api-service';
import { extractError } from '../../utils/extract-api-error';
import type { ChapterDetailDto } from '../../types/chapter-api-types';
import type { RootState } from '../index';

interface ChapterState {
  selected: {
    data: ChapterDetailDto | null;
    loading: boolean;
    error: string | null;
  };
}

const initialState: ChapterState = {
  selected: { data: null, loading: false, error: null },
};

export const fetchChapterDetail = createAsyncThunk<ChapterDetailDto, string>(
  'chapter/fetchDetail',
  async (id, { rejectWithValue }) => {
    try {
      return await chapterApi.get(id);
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

const chapterSlice = createSlice({
  name: 'chapter',
  initialState,
  reducers: {
    clearChapter(state) {
      state.selected = initialState.selected;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChapterDetail.pending, (state) => {
        state.selected.loading = true;
        state.selected.error = null;
      })
      .addCase(fetchChapterDetail.fulfilled, (state, action) => {
        state.selected.data = action.payload;
        state.selected.loading = false;
      })
      .addCase(fetchChapterDetail.rejected, (state, action) => {
        state.selected.loading = false;
        state.selected.error = action.payload as string;
      });
  },
});

export const { clearChapter } = chapterSlice.actions;

export const selectSelectedChapter = (state: RootState) => state.chapter.selected;

export default chapterSlice.reducer;
