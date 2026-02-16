import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mangaApi } from '../../services/api/manga-api-service';
import { extractError } from '../../utils/extract-api-error';
import type { PagedResponse, ListParams } from '../../types/api-types';
import type {
  MangaDto,
  MangaDetailDto,
  ChapterDto,
  ListMangaParams,
} from '../../types/manga-api-types';
import type { RootState } from '../index';

interface MangaState {
  list: {
    data: MangaDto[];
    loading: boolean;
    error: string | null;
    loaded: boolean;
    page: number;
    pageSize: number;
    totalCount: number;
    hasNext: boolean;
  };
  selected: {
    data: MangaDetailDto | null;
    loading: boolean;
    error: string | null;
  };
  chapters: {
    data: ChapterDto[];
    loading: boolean;
    error: string | null;
    page: number;
    totalCount: number;
    hasNext: boolean;
  };
  trending: {
    data: MangaDto[];
    loading: boolean;
    error: string | null;
    loaded: boolean;
  };
  search: {
    data: MangaDto[];
    loading: boolean;
    error: string | null;
    query: string;
    totalCount: number;
    hasNext: boolean;
  };
}

const initialState: MangaState = {
  list: { data: [], loading: false, error: null, loaded: false, page: 1, pageSize: 20, totalCount: 0, hasNext: false },
  selected: { data: null, loading: false, error: null },
  chapters: { data: [], loading: false, error: null, page: 1, totalCount: 0, hasNext: false },
  trending: { data: [], loading: false, error: null, loaded: false },
  search: { data: [], loading: false, error: null, query: '', totalCount: 0, hasNext: false },
};

export const fetchMangaList = createAsyncThunk<PagedResponse<MangaDto>, ListMangaParams>(
  'manga/fetchList',
  async (params, { rejectWithValue }) => {
    try {
      return await mangaApi.list(params);
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const fetchMangaDetail = createAsyncThunk<MangaDetailDto, string>(
  'manga/fetchDetail',
  async (id, { rejectWithValue }) => {
    try {
      return await mangaApi.get(id);
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const fetchMangaChapters = createAsyncThunk<
  PagedResponse<ChapterDto>,
  { mangaId: string } & ListParams
>(
  'manga/fetchChapters',
  async ({ mangaId, ...params }, { rejectWithValue }) => {
    try {
      return await mangaApi.getChapters(mangaId, params);
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const fetchTrendingManga = createAsyncThunk<PagedResponse<MangaDto>, { days?: number } | void>(
  'manga/fetchTrending',
  async (params, { rejectWithValue }) => {
    try {
      return await mangaApi.getTrending(params ?? {});
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const searchManga = createAsyncThunk<
  { query: string; response: PagedResponse<MangaDto> },
  { query: string; page?: number; pageSize?: number }
>(
  'manga/search',
  async ({ query, ...params }, { rejectWithValue }) => {
    try {
      const response = await mangaApi.search({ q: query, ...params });
      return { query, response };
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

const mangaSlice = createSlice({
  name: 'manga',
  initialState,
  reducers: {
    clearSelected(state) {
      state.selected = initialState.selected;
      state.chapters = initialState.chapters;
    },
    clearSearch(state) {
      state.search = initialState.search;
    },
  },
  extraReducers: (builder) => {
    builder
      // List
      .addCase(fetchMangaList.pending, (state) => {
        state.list.loading = true;
        state.list.error = null;
      })
      .addCase(fetchMangaList.fulfilled, (state, action) => {
        state.list.data = action.payload.data;
        state.list.page = action.payload.page;
        state.list.pageSize = action.payload.pageSize;
        state.list.totalCount = action.payload.totalCount;
        state.list.hasNext = action.payload.hasNext;
        state.list.loaded = true;
        state.list.loading = false;
      })
      .addCase(fetchMangaList.rejected, (state, action) => {
        state.list.loading = false;
        state.list.error = action.payload as string;
      })
      // Detail
      .addCase(fetchMangaDetail.pending, (state) => {
        state.selected.loading = true;
        state.selected.error = null;
      })
      .addCase(fetchMangaDetail.fulfilled, (state, action) => {
        state.selected.data = action.payload;
        state.selected.loading = false;
      })
      .addCase(fetchMangaDetail.rejected, (state, action) => {
        state.selected.loading = false;
        state.selected.error = action.payload as string;
      })
      // Chapters
      .addCase(fetchMangaChapters.pending, (state) => {
        state.chapters.loading = true;
        state.chapters.error = null;
      })
      .addCase(fetchMangaChapters.fulfilled, (state, action) => {
        state.chapters.data = action.payload.data;
        state.chapters.page = action.payload.page;
        state.chapters.totalCount = action.payload.totalCount;
        state.chapters.hasNext = action.payload.hasNext;
        state.chapters.loading = false;
      })
      .addCase(fetchMangaChapters.rejected, (state, action) => {
        state.chapters.loading = false;
        state.chapters.error = action.payload as string;
      })
      // Trending
      .addCase(fetchTrendingManga.pending, (state) => {
        state.trending.loading = true;
        state.trending.error = null;
      })
      .addCase(fetchTrendingManga.fulfilled, (state, action) => {
        state.trending.data = action.payload.data;
        state.trending.loaded = true;
        state.trending.loading = false;
      })
      .addCase(fetchTrendingManga.rejected, (state, action) => {
        state.trending.loading = false;
        state.trending.error = action.payload as string;
      })
      // Search
      .addCase(searchManga.pending, (state) => {
        state.search.loading = true;
        state.search.error = null;
      })
      .addCase(searchManga.fulfilled, (state, action) => {
        state.search.data = action.payload.response.data;
        state.search.query = action.payload.query;
        state.search.totalCount = action.payload.response.totalCount;
        state.search.hasNext = action.payload.response.hasNext;
        state.search.loading = false;
      })
      .addCase(searchManga.rejected, (state, action) => {
        state.search.loading = false;
        state.search.error = action.payload as string;
      });
  },
});

export const { clearSelected, clearSearch } = mangaSlice.actions;

// Selectors
export const selectMangaList = (state: RootState) => state.manga.list;
export const selectSelectedManga = (state: RootState) => state.manga.selected;
export const selectMangaChapters = (state: RootState) => state.manga.chapters;
export const selectTrendingManga = (state: RootState) => state.manga.trending;
export const selectMangaSearch = (state: RootState) => state.manga.search;

export default mangaSlice.reducer;
