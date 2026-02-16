import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import chapterReducer, {
  fetchChapterDetail,
  clearChapter,
  selectSelectedChapter,
} from '../chapter-slice';
import { chapterApi } from '../../../services/api/chapter-api-service';
import type { RootState } from '../../index';

vi.mock('../../../services/api/chapter-api-service');

function createStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: { chapter: chapterReducer },
    preloadedState: preloadedState as RootState,
  });
}

describe('chapter-slice', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('initial state', () => {
    it('has correct initial state', () => {
      const state = chapterReducer(undefined, { type: 'unknown' });
      expect(state).toEqual({
        selected: { data: null, loading: false, error: null },
      });
    });
  });

  describe('clearChapter reducer', () => {
    it('clears selected chapter', () => {
      const prevState = {
        selected: {
          data: { id: 'ch1', title: 'Chapter 1', pages: [] },
          loading: false,
          error: null,
        },
      };
      const state = chapterReducer(prevState, clearChapter());
      expect(state.selected.data).toBeNull();
      expect(state.selected.loading).toBe(false);
      expect(state.selected.error).toBeNull();
    });
  });

  describe('fetchChapterDetail thunk', () => {
    it('sets loading true on pending', () => {
      const state = chapterReducer(undefined, { type: fetchChapterDetail.pending.type });
      expect(state.selected.loading).toBe(true);
      expect(state.selected.error).toBeNull();
    });

    it('sets chapter data on fulfilled', () => {
      const mockChapter = {
        id: 'ch1',
        title: 'Chapter 1',
        pages: [{ id: 'p1', url: 'img1.jpg' }],
      };
      const state = chapterReducer(undefined, {
        type: fetchChapterDetail.fulfilled.type,
        payload: mockChapter,
      });
      expect(state.selected.loading).toBe(false);
      expect(state.selected.data).toEqual(mockChapter);
    });

    it('sets error on rejected', () => {
      const state = chapterReducer(undefined, {
        type: fetchChapterDetail.rejected.type,
        payload: 'Chapter not found',
      });
      expect(state.selected.loading).toBe(false);
      expect(state.selected.error).toBe('Chapter not found');
    });

    it('replaces previous chapter on new fetch', () => {
      let state = chapterReducer(undefined, {
        type: fetchChapterDetail.fulfilled.type,
        payload: { id: 'ch1', title: 'Chapter 1', pages: [] },
      });
      state = chapterReducer(state, { type: fetchChapterDetail.pending.type });
      state = chapterReducer(state, {
        type: fetchChapterDetail.fulfilled.type,
        payload: { id: 'ch2', title: 'Chapter 2', pages: [] },
      });
      expect(state.selected.data?.id).toBe('ch2');
    });
  });

  describe('selectSelectedChapter selector', () => {
    it('returns selected chapter state', () => {
      const chapterData = { id: 'ch1', title: 'Chapter 1', pages: [] };
      const store = createStore({
        chapter: {
          selected: { data: chapterData, loading: false, error: null },
        },
      });
      const selected = selectSelectedChapter(store.getState());
      expect(selected.data).toEqual(chapterData);
    });

    it('returns loading state', () => {
      const store = createStore({
        chapter: {
          selected: { data: null, loading: true, error: null },
        },
      });
      const selected = selectSelectedChapter(store.getState());
      expect(selected.loading).toBe(true);
    });

    it('returns error state', () => {
      const store = createStore({
        chapter: {
          selected: { data: null, loading: false, error: 'Not found' },
        },
      });
      const selected = selectSelectedChapter(store.getState());
      expect(selected.error).toBe('Not found');
    });
  });
});
