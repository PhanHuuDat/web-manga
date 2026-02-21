import { describe, it, expect, vi, beforeEach } from 'vitest';
import { readingHistoryApi } from '../reading-history-api-service';
import apiClient from '../axios-instance';

vi.mock('../axios-instance');

const mockApiClient = vi.mocked(apiClient);

describe('reading-history-api-service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('upsert', () => {
    it('saves reading progress', async () => {
      const progressData = {
        mangaSeriesId: 'm1',
        chapterId: 'ch1',
        lastPageNumber: 5,
      };
      mockApiClient.post.mockResolvedValue({ data: { id: 'history-1' } });

      const result = await readingHistoryApi.upsert(progressData);

      expect(mockApiClient.post).toHaveBeenCalledWith('/api/reading-history', progressData);
      expect(result).toEqual({ id: 'history-1' });
    });

    it('updates existing progress', async () => {
      const progressData = {
        mangaSeriesId: 'm1',
        chapterId: 'ch2',
        lastPageNumber: 20,
      };
      mockApiClient.post.mockResolvedValue({ data: { id: 'history-1' } });

      const result = await readingHistoryApi.upsert(progressData);

      expect(mockApiClient.post).toHaveBeenCalledWith('/api/reading-history', progressData);
      expect(result.id).toBe('history-1');
    });

    it('throws error on invalid data', async () => {
      mockApiClient.post.mockRejectedValue(new Error('Invalid page number'));

      await expect(
        readingHistoryApi.upsert({
          mangaSeriesId: 'm1',
          chapterId: 'ch1',
          lastPageNumber: -1,
        }),
      ).rejects.toThrow('Invalid page number');
    });
  });

  describe('list', () => {
    it('lists reading history with default params', async () => {
      const mockResponse = {
        data: {
          data: [
            { mangaSeriesId: 'm1', chapterId: 'ch1', lastPageNumber: 5 },
            { mangaSeriesId: 'm2', chapterId: 'ch2', lastPageNumber: 10 },
          ],
          page: 1,
          pageSize: 20,
          totalCount: 2,
          hasNext: false,
        },
      };
      mockApiClient.get.mockResolvedValue(mockResponse);

      const result = await readingHistoryApi.list();

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/reading-history', { params: {} });
      expect(result).toEqual(mockResponse.data);
    });

    it('lists history with pagination', async () => {
      mockApiClient.get.mockResolvedValue({
        data: {
          data: [{ mangaSeriesId: 'm1', chapterId: 'ch1', lastPageNumber: 5 }],
          page: 2,
          pageSize: 10,
          totalCount: 25,
          hasNext: true,
        },
      });

      const result = await readingHistoryApi.list({ page: 2, pageSize: 10 });

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/reading-history', {
        params: { page: 2, pageSize: 10 },
      });
      expect(result.page).toBe(2);
      expect(result.hasNext).toBe(true);
    });

    it('returns empty list when no history', async () => {
      mockApiClient.get.mockResolvedValue({
        data: {
          data: [],
          page: 1,
          pageSize: 20,
          totalCount: 0,
          hasNext: false,
        },
      });

      const result = await readingHistoryApi.list();

      expect(result.data).toHaveLength(0);
      expect(result.totalCount).toBe(0);
    });
  });

  describe('getResumePoint', () => {
    it('gets resume point for manga', async () => {
      const mockResumePoint = {
        mangaSeriesId: 'm1',
        chapterId: 'ch1',
        lastPageNumber: 5,
      };
      mockApiClient.get.mockResolvedValue({ data: mockResumePoint });

      const result = await readingHistoryApi.getResumePoint('m1');

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/reading-history/m1');
      expect(result).toEqual(mockResumePoint);
    });

    it('returns null when no history for manga', async () => {
      mockApiClient.get.mockResolvedValue({ data: null });

      const result = await readingHistoryApi.getResumePoint('m1');

      expect(result).toBeNull();
    });

    it('throws error on invalid manga id', async () => {
      mockApiClient.get.mockRejectedValue(new Error('Not found'));

      await expect(readingHistoryApi.getResumePoint('invalid-id')).rejects.toThrow('Not found');
    });
  });

  describe('clear', () => {
    it('clears reading history for manga', async () => {
      mockApiClient.delete.mockResolvedValue({});

      await readingHistoryApi.clear('m1');

      expect(mockApiClient.delete).toHaveBeenCalledWith('/api/reading-history/m1');
    });

    it('throws error when manga not found', async () => {
      mockApiClient.delete.mockRejectedValue(new Error('Manga not found'));

      await expect(readingHistoryApi.clear('invalid-id')).rejects.toThrow('Manga not found');
    });
  });
});
