import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import mangaReducer, {
  fetchMangaList,
  fetchMangaDetail,
  fetchMangaChapters,
  fetchTrendingManga,
  searchManga,
  clearSelected,
  clearSearch,
  selectMangaList,
  selectSelectedManga,
  selectMangaChapters,
  selectTrendingManga,
  selectMangaSearch,
} from '../manga-slice';
import '../../../services/api/manga-api-service';
import type { RootState } from '../../index';
import type { MangaDto, MangaDetailDto, ChapterDto } from '../../../types/manga-api-types';

vi.mock('../../../services/api/manga-api-service');

function createStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: { manga: mangaReducer },
    preloadedState: preloadedState as RootState,
  });
}

describe('manga-slice', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('initial state', () => {
    it('has correct initial state', () => {
      const state = mangaReducer(undefined, { type: 'unknown' });
      expect(state).toEqual({
        list: { data: [], loading: false, error: null, loaded: false, page: 1, pageSize: 20, totalCount: 0, hasNext: false },
        selected: { data: null, loading: false, error: null },
        chapters: { data: [], loading: false, error: null, page: 1, totalCount: 0, hasNext: false },
        trending: { data: [], loading: false, error: null, loaded: false },
        search: { data: [], loading: false, error: null, query: '', totalCount: 0, hasNext: false },
      });
    });
  });

  describe('clearSelected reducer', () => {
    it('clears selected manga and chapters', () => {
      const prevState = {
        list: { data: [], loading: false, error: null, loaded: false, page: 1, pageSize: 20, totalCount: 0, hasNext: false },
        selected: { data: { id: '1', title: 'Test' } as MangaDetailDto, loading: false, error: null },
        chapters: { data: [{ id: 'ch1' }] as ChapterDto[], loading: false, error: null, page: 1, totalCount: 1, hasNext: false },
        trending: { data: [], loading: false, error: null, loaded: false },
        search: { data: [], loading: false, error: null, query: '', totalCount: 0, hasNext: false },
      };
      const state = mangaReducer(prevState, clearSelected());
      expect(state.selected.data).toBeNull();
      expect(state.chapters.data).toEqual([]);
    });
  });

  describe('clearSearch reducer', () => {
    it('clears search results', () => {
      const prevState = {
        list: { data: [], loading: false, error: null, loaded: false, page: 1, pageSize: 20, totalCount: 0, hasNext: false },
        selected: { data: null, loading: false, error: null },
        chapters: { data: [], loading: false, error: null, page: 1, totalCount: 0, hasNext: false },
        trending: { data: [], loading: false, error: null, loaded: false },
        search: { data: [{ id: '1', title: 'Found' }] as MangaDto[], loading: false, error: null, query: 'test', totalCount: 1, hasNext: false },
      };
      const state = mangaReducer(prevState, clearSearch());
      expect(state.search.data).toEqual([]);
      expect(state.search.query).toBe('');
      expect(state.search.totalCount).toBe(0);
    });
  });

  describe('fetchMangaList thunk', () => {
    it('sets loading true on pending', () => {
      const state = mangaReducer(undefined, { type: fetchMangaList.pending.type });
      expect(state.list.loading).toBe(true);
      expect(state.list.error).toBeNull();
    });

    it('sets data and loaded on fulfilled', () => {
      const mockData = [{ id: '1', title: 'Manga 1' }];
      const state = mangaReducer(undefined, {
        type: fetchMangaList.fulfilled.type,
        payload: { data: mockData, page: 1, pageSize: 20, totalCount: 1, hasNext: false },
      });
      expect(state.list.loading).toBe(false);
      expect(state.list.data).toEqual(mockData);
      expect(state.list.loaded).toBe(true);
      expect(state.list.page).toBe(1);
      expect(state.list.pageSize).toBe(20);
      expect(state.list.totalCount).toBe(1);
      expect(state.list.hasNext).toBe(false);
    });

    it('sets error on rejected', () => {
      const state = mangaReducer(undefined, {
        type: fetchMangaList.rejected.type,
        payload: 'Network error',
      });
      expect(state.list.loading).toBe(false);
      expect(state.list.error).toBe('Network error');
    });
  });

  describe('fetchMangaDetail thunk', () => {
    it('sets loading true on pending', () => {
      const state = mangaReducer(undefined, { type: fetchMangaDetail.pending.type });
      expect(state.selected.loading).toBe(true);
      expect(state.selected.error).toBeNull();
    });

    it('sets selected data on fulfilled', () => {
      const mockData = { id: '1', title: 'Manga 1', description: 'Test' };
      const state = mangaReducer(undefined, {
        type: fetchMangaDetail.fulfilled.type,
        payload: mockData,
      });
      expect(state.selected.loading).toBe(false);
      expect(state.selected.data).toEqual(mockData);
    });

    it('sets error on rejected', () => {
      const state = mangaReducer(undefined, {
        type: fetchMangaDetail.rejected.type,
        payload: 'Not found',
      });
      expect(state.selected.loading).toBe(false);
      expect(state.selected.error).toBe('Not found');
    });
  });

  describe('fetchMangaChapters thunk', () => {
    it('sets loading true on pending', () => {
      const state = mangaReducer(undefined, { type: fetchMangaChapters.pending.type });
      expect(state.chapters.loading).toBe(true);
      expect(state.chapters.error).toBeNull();
    });

    it('sets chapters data on fulfilled', () => {
      const mockData = [{ id: 'ch1', title: 'Chapter 1' }];
      const state = mangaReducer(undefined, {
        type: fetchMangaChapters.fulfilled.type,
        payload: { data: mockData, page: 1, totalCount: 1, hasNext: false },
      });
      expect(state.chapters.loading).toBe(false);
      expect(state.chapters.data).toEqual(mockData);
      expect(state.chapters.totalCount).toBe(1);
    });

    it('sets error on rejected', () => {
      const state = mangaReducer(undefined, {
        type: fetchMangaChapters.rejected.type,
        payload: 'Chapters not found',
      });
      expect(state.chapters.loading).toBe(false);
      expect(state.chapters.error).toBe('Chapters not found');
    });
  });

  describe('fetchTrendingManga thunk', () => {
    it('sets loading true on pending', () => {
      const state = mangaReducer(undefined, { type: fetchTrendingManga.pending.type });
      expect(state.trending.loading).toBe(true);
      expect(state.trending.error).toBeNull();
    });

    it('sets trending data on fulfilled', () => {
      const mockData = [{ id: '1', title: 'Popular' }];
      const state = mangaReducer(undefined, {
        type: fetchTrendingManga.fulfilled.type,
        payload: { data: mockData, page: 1, pageSize: 20, totalCount: 1, hasNext: false },
      });
      expect(state.trending.loading).toBe(false);
      expect(state.trending.data).toEqual(mockData);
      expect(state.trending.loaded).toBe(true);
    });

    it('sets error on rejected', () => {
      const state = mangaReducer(undefined, {
        type: fetchTrendingManga.rejected.type,
        payload: 'Failed to fetch trending',
      });
      expect(state.trending.loading).toBe(false);
      expect(state.trending.error).toBe('Failed to fetch trending');
    });
  });

  describe('searchManga thunk', () => {
    it('sets loading true on pending', () => {
      const state = mangaReducer(undefined, { type: searchManga.pending.type });
      expect(state.search.loading).toBe(true);
      expect(state.search.error).toBeNull();
    });

    it('sets search results on fulfilled', () => {
      const mockData = [{ id: '1', title: 'Found' }];
      const state = mangaReducer(undefined, {
        type: searchManga.fulfilled.type,
        payload: { query: 'test', response: { data: mockData, page: 1, pageSize: 20, totalCount: 1, hasNext: false } },
      });
      expect(state.search.loading).toBe(false);
      expect(state.search.data).toEqual(mockData);
      expect(state.search.query).toBe('test');
      expect(state.search.totalCount).toBe(1);
    });

    it('sets error on rejected', () => {
      const state = mangaReducer(undefined, {
        type: searchManga.rejected.type,
        payload: 'Search failed',
      });
      expect(state.search.loading).toBe(false);
      expect(state.search.error).toBe('Search failed');
    });
  });

  describe('selectors', () => {
    it('selectMangaList returns list state', () => {
      const store = createStore({
        manga: {
          list: { data: [{ id: '1' }] as MangaDto[], loading: false, error: null, loaded: true, page: 1, pageSize: 20, totalCount: 1, hasNext: false },
          selected: { data: null, loading: false, error: null },
          chapters: { data: [], loading: false, error: null, page: 1, totalCount: 0, hasNext: false },
          trending: { data: [], loading: false, error: null, loaded: false },
          search: { data: [], loading: false, error: null, query: '', totalCount: 0, hasNext: false },
        },
      });
      const list = selectMangaList(store.getState());
      expect(list.data).toHaveLength(1);
      expect(list.loaded).toBe(true);
    });

    it('selectSelectedManga returns selected state', () => {
      const selectedData = { id: '1', title: 'Test' };
      const store = createStore({
        manga: {
          list: { data: [], loading: false, error: null, loaded: false, page: 1, pageSize: 20, totalCount: 0, hasNext: false },
          selected: { data: selectedData as MangaDetailDto, loading: false, error: null },
          chapters: { data: [], loading: false, error: null, page: 1, totalCount: 0, hasNext: false },
          trending: { data: [], loading: false, error: null, loaded: false },
          search: { data: [], loading: false, error: null, query: '', totalCount: 0, hasNext: false },
        },
      });
      const selected = selectSelectedManga(store.getState());
      expect(selected.data).toEqual(selectedData);
    });

    it('selectMangaChapters returns chapters state', () => {
      const store = createStore({
        manga: {
          list: { data: [], loading: false, error: null, loaded: false, page: 1, pageSize: 20, totalCount: 0, hasNext: false },
          selected: { data: null, loading: false, error: null },
          chapters: { data: [{ id: 'ch1' }] as ChapterDto[], loading: false, error: null, page: 1, totalCount: 1, hasNext: false },
          trending: { data: [], loading: false, error: null, loaded: false },
          search: { data: [], loading: false, error: null, query: '', totalCount: 0, hasNext: false },
        },
      });
      const chapters = selectMangaChapters(store.getState());
      expect(chapters.data).toHaveLength(1);
    });

    it('selectTrendingManga returns trending state', () => {
      const store = createStore({
        manga: {
          list: { data: [], loading: false, error: null, loaded: false, page: 1, pageSize: 20, totalCount: 0, hasNext: false },
          selected: { data: null, loading: false, error: null },
          chapters: { data: [], loading: false, error: null, page: 1, totalCount: 0, hasNext: false },
          trending: { data: [{ id: '1' }] as MangaDto[], loading: false, error: null, loaded: true },
          search: { data: [], loading: false, error: null, query: '', totalCount: 0, hasNext: false },
        },
      });
      const trending = selectTrendingManga(store.getState());
      expect(trending.loaded).toBe(true);
      expect(trending.data).toHaveLength(1);
    });

    it('selectMangaSearch returns search state', () => {
      const store = createStore({
        manga: {
          list: { data: [], loading: false, error: null, loaded: false, page: 1, pageSize: 20, totalCount: 0, hasNext: false },
          selected: { data: null, loading: false, error: null },
          chapters: { data: [], loading: false, error: null, page: 1, totalCount: 0, hasNext: false },
          trending: { data: [], loading: false, error: null, loaded: false },
          search: { data: [{ id: '1' }] as MangaDto[], loading: false, error: null, query: 'test', totalCount: 1, hasNext: false },
        },
      });
      const search = selectMangaSearch(store.getState());
      expect(search.query).toBe('test');
      expect(search.data).toHaveLength(1);
    });
  });
});
