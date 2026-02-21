import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import bookmarkReducer, {
  fetchBookmarks,
  toggleBookmark,
  checkBookmark,
  selectIsBookmarked,
  selectIsToggling,
} from '../bookmark-slice';
import '../../../services/api/bookmark-api-service';
import type { RootState } from '../../index';

vi.mock('../../../services/api/bookmark-api-service');

function createStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: { bookmark: bookmarkReducer },
    preloadedState: preloadedState as RootState,
  });
}

describe('bookmark-slice', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('initial state', () => {
    it('has correct initial state', () => {
      const state = bookmarkReducer(undefined, { type: 'unknown' });
      expect(state).toEqual({
        list: { data: [], loading: false, error: null, page: 1, totalCount: 0, hasNext: false },
        bookmarkedIds: {},
        toggling: {},
      });
    });
  });

  describe('fetchBookmarks thunk', () => {
    it('sets loading true on pending', () => {
      const state = bookmarkReducer(undefined, { type: fetchBookmarks.pending.type });
      expect(state.list.loading).toBe(true);
      expect(state.list.error).toBeNull();
    });

    it('sets bookmarks data on fulfilled', () => {
      const mockBookmarks = [
        { mangaSeriesId: 'm1', mangaTitle: 'Manga 1' },
        { mangaSeriesId: 'm2', mangaTitle: 'Manga 2' },
      ];
      const state = bookmarkReducer(undefined, {
        type: fetchBookmarks.fulfilled.type,
        payload: {
          data: mockBookmarks,
          page: 1,
          pageSize: 20,
          totalCount: 2,
          hasNext: false,
        },
      });
      expect(state.list.loading).toBe(false);
      expect(state.list.data).toEqual(mockBookmarks);
      expect(state.bookmarkedIds['m1']).toBe(true);
      expect(state.bookmarkedIds['m2']).toBe(true);
      expect(state.list.totalCount).toBe(2);
    });

    it('sets error on rejected', () => {
      const state = bookmarkReducer(undefined, {
        type: fetchBookmarks.rejected.type,
        payload: 'Failed to fetch bookmarks',
      });
      expect(state.list.loading).toBe(false);
      expect(state.list.error).toBe('Failed to fetch bookmarks');
    });
  });

  describe('toggleBookmark thunk', () => {
    it('sets toggling true on pending', () => {
      const state = bookmarkReducer(undefined, {
        type: toggleBookmark.pending.type,
        meta: { arg: 'manga-1', requestId: '', requestStatus: 'pending' },
      });
      expect(state.toggling['manga-1']).toBe(true);
    });

    it('toggles bookmark on fulfilled', () => {
      const prevState = {
        list: { data: [], loading: false, error: null, page: 1, totalCount: 0, hasNext: false },
        bookmarkedIds: { 'manga-1': false },
        toggling: { 'manga-1': true },
      };
      const state = bookmarkReducer(prevState, {
        type: toggleBookmark.fulfilled.type,
        payload: { mangaSeriesId: 'manga-1', isBookmarked: true },
      });
      expect(state.bookmarkedIds['manga-1']).toBe(true);
      expect(state.toggling['manga-1']).toBe(false);
    });

    it('removes bookmark from list on toggle to false', () => {
      const prevState = {
        list: {
          data: [
            { mangaSeriesId: 'm1', mangaTitle: 'Manga 1' },
            { mangaSeriesId: 'm2', mangaTitle: 'Manga 2' },
          ],
          loading: false,
          error: null,
          page: 1,
          totalCount: 2,
          hasNext: false,
        },
        bookmarkedIds: { m1: true, m2: true },
        toggling: { m1: true },
      };
      const state = bookmarkReducer(prevState, {
        type: toggleBookmark.fulfilled.type,
        payload: { mangaSeriesId: 'm1', isBookmarked: false },
      });
      expect(state.list.data).toHaveLength(1);
      expect(state.list.data[0].mangaSeriesId).toBe('m2');
      expect(state.list.totalCount).toBe(1);
    });

    it('sets toggling false on rejected', () => {
      const state = bookmarkReducer(
        {
          list: { data: [], loading: false, error: null, page: 1, totalCount: 0, hasNext: false },
          bookmarkedIds: {},
          toggling: { 'manga-1': true },
        },
        {
          type: toggleBookmark.rejected.type,
          meta: { arg: 'manga-1', requestId: '', requestStatus: 'rejected' },
        },
      );
      expect(state.toggling['manga-1']).toBe(false);
    });
  });

  describe('checkBookmark thunk', () => {
    it('updates bookmarkedIds on fulfilled', () => {
      const state = bookmarkReducer(undefined, {
        type: checkBookmark.fulfilled.type,
        payload: { mangaId: 'manga-1', isBookmarked: true },
      });
      expect(state.bookmarkedIds['manga-1']).toBe(true);
    });

    it('sets isBookmarked to false', () => {
      const state = bookmarkReducer(undefined, {
        type: checkBookmark.fulfilled.type,
        payload: { mangaId: 'manga-1', isBookmarked: false },
      });
      expect(state.bookmarkedIds['manga-1']).toBe(false);
    });
  });

  describe('selectIsBookmarked selector', () => {
    it('returns true when manga is bookmarked', () => {
      const store = createStore({
        bookmark: {
          list: { data: [], loading: false, error: null, page: 1, totalCount: 0, hasNext: false },
          bookmarkedIds: { 'manga-1': true },
          toggling: {},
        },
      });
      const isBookmarked = selectIsBookmarked('manga-1')(store.getState());
      expect(isBookmarked).toBe(true);
    });

    it('returns false when manga is not bookmarked', () => {
      const store = createStore({
        bookmark: {
          list: { data: [], loading: false, error: null, page: 1, totalCount: 0, hasNext: false },
          bookmarkedIds: { 'manga-1': false },
          toggling: {},
        },
      });
      const isBookmarked = selectIsBookmarked('manga-1')(store.getState());
      expect(isBookmarked).toBe(false);
    });

    it('returns false for unknown manga', () => {
      const store = createStore({
        bookmark: {
          list: { data: [], loading: false, error: null, page: 1, totalCount: 0, hasNext: false },
          bookmarkedIds: {},
          toggling: {},
        },
      });
      const isBookmarked = selectIsBookmarked('unknown-id')(store.getState());
      expect(isBookmarked).toBe(false);
    });
  });

  describe('selectIsToggling selector', () => {
    it('returns true when toggling is in progress', () => {
      const store = createStore({
        bookmark: {
          list: { data: [], loading: false, error: null, page: 1, totalCount: 0, hasNext: false },
          bookmarkedIds: {},
          toggling: { 'manga-1': true },
        },
      });
      const isToggling = selectIsToggling('manga-1')(store.getState());
      expect(isToggling).toBe(true);
    });

    it('returns false when not toggling', () => {
      const store = createStore({
        bookmark: {
          list: { data: [], loading: false, error: null, page: 1, totalCount: 0, hasNext: false },
          bookmarkedIds: {},
          toggling: { 'manga-1': false },
        },
      });
      const isToggling = selectIsToggling('manga-1')(store.getState());
      expect(isToggling).toBe(false);
    });

    it('returns false for unknown manga', () => {
      const store = createStore({
        bookmark: {
          list: { data: [], loading: false, error: null, page: 1, totalCount: 0, hasNext: false },
          bookmarkedIds: {},
          toggling: {},
        },
      });
      const isToggling = selectIsToggling('unknown-id')(store.getState());
      expect(isToggling).toBe(false);
    });
  });
});
