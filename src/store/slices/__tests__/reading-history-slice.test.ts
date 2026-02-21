import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import readingHistoryReducer, {
  fetchReadingHistory,
  fetchResumePoint,
  clearHistory,
  saveReadingProgress,
  selectResumePoint,
} from '../reading-history-slice';
import '../../../services/api/reading-history-api-service';
import type { RootState } from '../../index';

vi.mock('../../../services/api/reading-history-api-service');

function createStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: { readingHistory: readingHistoryReducer },
    preloadedState: preloadedState as RootState,
  });
}

describe('reading-history-slice', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('initial state', () => {
    it('has correct initial state', () => {
      const state = readingHistoryReducer(undefined, { type: 'unknown' });
      expect(state).toEqual({
        list: { data: [], loading: false, error: null, page: 1, totalCount: 0, hasNext: false },
        resumePoints: {},
      });
    });
  });

  describe('fetchReadingHistory thunk', () => {
    it('sets loading true on pending', () => {
      const state = readingHistoryReducer(undefined, { type: fetchReadingHistory.pending.type });
      expect(state.list.loading).toBe(true);
      expect(state.list.error).toBeNull();
    });

    it('sets history data on fulfilled', () => {
      const mockHistory = [
        { mangaSeriesId: 'm1', mangaTitle: 'Manga 1', chapterId: 'ch1', lastPageNumber: 5 },
        { mangaSeriesId: 'm2', mangaTitle: 'Manga 2', chapterId: 'ch2', lastPageNumber: 10 },
      ];
      const state = readingHistoryReducer(undefined, {
        type: fetchReadingHistory.fulfilled.type,
        payload: {
          data: mockHistory,
          page: 1,
          pageSize: 20,
          totalCount: 2,
          hasNext: false,
        },
      });
      expect(state.list.loading).toBe(false);
      expect(state.list.data).toEqual(mockHistory);
      expect(state.list.totalCount).toBe(2);
      expect(state.list.hasNext).toBe(false);
    });

    it('sets error on rejected', () => {
      const state = readingHistoryReducer(undefined, {
        type: fetchReadingHistory.rejected.type,
        payload: 'Failed to fetch history',
      });
      expect(state.list.loading).toBe(false);
      expect(state.list.error).toBe('Failed to fetch history');
    });
  });

  describe('fetchResumePoint thunk', () => {
    it('sets resume point on fulfilled', () => {
      const mockResumePoint = {
        mangaSeriesId: 'm1',
        chapterId: 'ch1',
        lastPageNumber: 5,
      };
      const state = readingHistoryReducer(undefined, {
        type: fetchResumePoint.fulfilled.type,
        payload: { mangaId: 'm1', data: mockResumePoint },
      });
      expect(state.resumePoints['m1']).toEqual(mockResumePoint);
    });

    it('updates resume points for multiple manga', () => {
      let state = readingHistoryReducer(undefined, {
        type: fetchResumePoint.fulfilled.type,
        payload: {
          mangaId: 'm1',
          data: { mangaSeriesId: 'm1', chapterId: 'ch1', lastPageNumber: 5 },
        },
      });
      state = readingHistoryReducer(state, {
        type: fetchResumePoint.fulfilled.type,
        payload: {
          mangaId: 'm2',
          data: { mangaSeriesId: 'm2', chapterId: 'ch2', lastPageNumber: 10 },
        },
      });
      expect(state.resumePoints['m1']).toBeDefined();
      expect(state.resumePoints['m2']).toBeDefined();
      expect(state.resumePoints['m1'].lastPageNumber).toBe(5);
      expect(state.resumePoints['m2'].lastPageNumber).toBe(10);
    });
  });

  describe('clearHistory thunk', () => {
    it('removes manga from history list on fulfilled', () => {
      const prevState = {
        list: {
          data: [
            { mangaSeriesId: 'm1', mangaTitle: 'Manga 1', chapterId: 'ch1', lastPageNumber: 5 },
            { mangaSeriesId: 'm2', mangaTitle: 'Manga 2', chapterId: 'ch2', lastPageNumber: 10 },
          ],
          loading: false,
          error: null,
          page: 1,
          totalCount: 2,
          hasNext: false,
        },
        resumePoints: {
          m1: { mangaSeriesId: 'm1', chapterId: 'ch1', lastPageNumber: 5 },
          m2: { mangaSeriesId: 'm2', chapterId: 'ch2', lastPageNumber: 10 },
        },
      };
      const state = readingHistoryReducer(prevState, {
        type: clearHistory.fulfilled.type,
        payload: 'm1',
      });
      expect(state.list.data).toHaveLength(1);
      expect(state.list.data[0].mangaSeriesId).toBe('m2');
      expect(state.list.totalCount).toBe(1);
      expect(state.resumePoints['m1']).toBeUndefined();
    });

    it('decrements total count on clear', () => {
      const prevState = {
        list: {
          data: [{ mangaSeriesId: 'm1', mangaTitle: 'Manga 1', chapterId: 'ch1', lastPageNumber: 5 }],
          loading: false,
          error: null,
          page: 1,
          totalCount: 1,
          hasNext: false,
        },
        resumePoints: {
          m1: { mangaSeriesId: 'm1', chapterId: 'ch1', lastPageNumber: 5 },
        },
      };
      const state = readingHistoryReducer(prevState, {
        type: clearHistory.fulfilled.type,
        payload: 'm1',
      });
      expect(state.list.totalCount).toBe(0);
    });

    it('prevents negative total count', () => {
      const prevState = {
        list: {
          data: [],
          loading: false,
          error: null,
          page: 1,
          totalCount: 0,
          hasNext: false,
        },
        resumePoints: {},
      };
      const state = readingHistoryReducer(prevState, {
        type: clearHistory.fulfilled.type,
        payload: 'm1',
      });
      expect(state.list.totalCount).toBe(0);
    });
  });

  describe('saveReadingProgress thunk', () => {
    it('dispatches successfully', () => {
      // This thunk doesn't modify state on success, just returns the data
      const state = readingHistoryReducer(undefined, {
        type: saveReadingProgress.fulfilled.type,
        payload: { mangaSeriesId: 'm1', chapterId: 'ch1', lastPageNumber: 10 },
      });
      // State should remain unchanged after save
      expect(state.list.data).toEqual([]);
    });
  });

  describe('selectResumePoint selector', () => {
    it('returns resume point for manga', () => {
      const resumePoint = { mangaSeriesId: 'm1', chapterId: 'ch1', lastPageNumber: 5 };
      const store = createStore({
        readingHistory: {
          list: { data: [], loading: false, error: null, page: 1, totalCount: 0, hasNext: false },
          resumePoints: { m1: resumePoint },
        },
      });
      const selected = selectResumePoint('m1')(store.getState());
      expect(selected).toEqual(resumePoint);
    });

    it('returns null for unknown manga', () => {
      const store = createStore({
        readingHistory: {
          list: { data: [], loading: false, error: null, page: 1, totalCount: 0, hasNext: false },
          resumePoints: {},
        },
      });
      const selected = selectResumePoint('unknown-id')(store.getState());
      expect(selected).toBeNull();
    });

    it('returns null when resumePoints is empty', () => {
      const store = createStore({
        readingHistory: {
          list: { data: [], loading: false, error: null, page: 1, totalCount: 0, hasNext: false },
          resumePoints: {},
        },
      });
      const selected = selectResumePoint('m1')(store.getState());
      expect(selected).toBeNull();
    });
  });
});
