import { describe, it, expect, vi, beforeEach } from 'vitest';
import { bookmarkApi } from '../bookmark-api-service';
import apiClient from '../axios-instance';

vi.mock('../axios-instance');

const mockApiClient = apiClient as any;

describe('bookmark-api-service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('toggle', () => {
    it('toggles bookmark for manga', async () => {
      const mockResponse = {
        data: {
          isBookmarked: true,
        },
      };
      mockApiClient.post.mockResolvedValue(mockResponse);

      const result = await bookmarkApi.toggle('manga-1');

      expect(mockApiClient.post).toHaveBeenCalledWith('/api/bookmarks', {
        mangaSeriesId: 'manga-1',
      });
      expect(result.isBookmarked).toBe(true);
    });

    it('removes bookmark on second toggle', async () => {
      const mockResponse = {
        data: {
          isBookmarked: false,
        },
      };
      mockApiClient.post.mockResolvedValue(mockResponse);

      const result = await bookmarkApi.toggle('manga-1');

      expect(result.isBookmarked).toBe(false);
    });

    it('throws error on invalid manga id', async () => {
      mockApiClient.post.mockRejectedValue(new Error('Manga not found'));

      await expect(bookmarkApi.toggle('invalid-id')).rejects.toThrow('Manga not found');
    });
  });

  describe('list', () => {
    it('lists user bookmarks with default params', async () => {
      const mockResponse = {
        data: {
          data: [
            { mangaSeriesId: 'm1', mangaTitle: 'Manga 1' },
            { mangaSeriesId: 'm2', mangaTitle: 'Manga 2' },
          ],
          page: 1,
          pageSize: 20,
          totalCount: 2,
          hasNext: false,
        },
      };
      mockApiClient.get.mockResolvedValue(mockResponse);

      const result = await bookmarkApi.list();

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/bookmarks', { params: {} });
      expect(result).toEqual(mockResponse.data);
    });

    it('lists bookmarks with pagination', async () => {
      mockApiClient.get.mockResolvedValue({
        data: {
          data: [{ mangaSeriesId: 'm1', mangaTitle: 'Manga 1' }],
          page: 2,
          pageSize: 10,
          totalCount: 20,
          hasNext: true,
        },
      });

      const result = await bookmarkApi.list({ page: 2, pageSize: 10 });

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/bookmarks', {
        params: { page: 2, pageSize: 10 },
      });
      expect(result.page).toBe(2);
      expect(result.hasNext).toBe(true);
    });

    it('returns empty list when no bookmarks', async () => {
      mockApiClient.get.mockResolvedValue({
        data: {
          data: [],
          page: 1,
          pageSize: 20,
          totalCount: 0,
          hasNext: false,
        },
      });

      const result = await bookmarkApi.list();

      expect(result.data).toHaveLength(0);
      expect(result.totalCount).toBe(0);
    });
  });

  describe('check', () => {
    it('checks if manga is bookmarked', async () => {
      const mockResponse = {
        data: {
          isBookmarked: true,
        },
      };
      mockApiClient.get.mockResolvedValue(mockResponse);

      const result = await bookmarkApi.check('manga-1');

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/bookmarks/check/manga-1');
      expect(result).toBe(true);
    });

    it('returns false when not bookmarked', async () => {
      mockApiClient.get.mockResolvedValue({
        data: {
          isBookmarked: false,
        },
      });

      const result = await bookmarkApi.check('manga-1');

      expect(result).toBe(false);
    });

    it('throws error on invalid manga id', async () => {
      mockApiClient.get.mockRejectedValue(new Error('Manga not found'));

      await expect(bookmarkApi.check('invalid-id')).rejects.toThrow('Manga not found');
    });
  });

  describe('remove', () => {
    it('removes bookmark by id', async () => {
      mockApiClient.delete.mockResolvedValue({});

      const result = await bookmarkApi.remove('bookmark-1');

      expect(mockApiClient.delete).toHaveBeenCalledWith('/api/bookmarks/bookmark-1');
    });

    it('throws error when bookmark not found', async () => {
      mockApiClient.delete.mockRejectedValue(new Error('Bookmark not found'));

      await expect(bookmarkApi.remove('invalid-id')).rejects.toThrow('Bookmark not found');
    });
  });
});
