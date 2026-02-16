import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import genreReducer, { fetchGenres, selectGenres } from '../genre-slice';
import { genreApi } from '../../../services/api/genre-api-service';
import type { RootState } from '../../index';

vi.mock('../../../services/api/genre-api-service');

function createStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: { genre: genreReducer },
    preloadedState: preloadedState as RootState,
  });
}

describe('genre-slice', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('initial state', () => {
    it('has correct initial state', () => {
      const state = genreReducer(undefined, { type: 'unknown' });
      expect(state).toEqual({
        data: [],
        loading: false,
        error: null,
        loaded: false,
      });
    });
  });

  describe('fetchGenres thunk', () => {
    it('sets loading true on pending', () => {
      const state = genreReducer(undefined, { type: fetchGenres.pending.type });
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('sets genres data on fulfilled', () => {
      const mockGenres = [
        { id: 'g1', name: 'Action', count: 100 },
        { id: 'g2', name: 'Drama', count: 80 },
      ];
      const state = genreReducer(undefined, {
        type: fetchGenres.fulfilled.type,
        payload: mockGenres,
      });
      expect(state.loading).toBe(false);
      expect(state.data).toEqual(mockGenres);
      expect(state.loaded).toBe(true);
    });

    it('sets error on rejected', () => {
      const state = genreReducer(undefined, {
        type: fetchGenres.rejected.type,
        payload: 'Failed to load genres.',
      });
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Failed to load genres.');
    });

    it('maintains loaded flag on rejection', () => {
      let state = genreReducer(undefined, { type: fetchGenres.pending.type });
      state = genreReducer(state, {
        type: fetchGenres.fulfilled.type,
        payload: [{ id: 'g1', name: 'Action', count: 100 }],
      });
      expect(state.loaded).toBe(true);
    });
  });

  describe('selectGenres selector', () => {
    it('returns genre state', () => {
      const genreData = [{ id: 'g1', name: 'Action', count: 100 }];
      const store = createStore({
        genre: {
          data: genreData,
          loading: false,
          error: null,
          loaded: true,
        },
      });
      const genres = selectGenres(store.getState());
      expect(genres.data).toEqual(genreData);
      expect(genres.loaded).toBe(true);
    });

    it('returns loading state', () => {
      const store = createStore({
        genre: {
          data: [],
          loading: true,
          error: null,
          loaded: false,
        },
      });
      const genres = selectGenres(store.getState());
      expect(genres.loading).toBe(true);
    });

    it('returns error state', () => {
      const store = createStore({
        genre: {
          data: [],
          loading: false,
          error: 'Network error',
          loaded: false,
        },
      });
      const genres = selectGenres(store.getState());
      expect(genres.error).toBe('Network error');
    });
  });
});
