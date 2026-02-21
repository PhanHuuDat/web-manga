import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mangaApi } from '../manga-api-service';
import apiClient from '../axios-instance';

vi.mock('../axios-instance');

const mockApiClient = vi.mocked(apiClient);

describe('manga-api-service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('list', () => {
    it('fetches manga list with default params', async () => {
      const mockResponse = {
        data: {
          data: [{ id: 'm1', title: 'Manga 1' }],
          page: 1,
          pageSize: 20,
          totalCount: 1,
          hasNext: false,
        },
      };
      mockApiClient.get.mockResolvedValue(mockResponse);

      const result = await mangaApi.list();

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/manga', { params: {} });
      expect(result).toEqual(mockResponse.data);
    });

    it('fetches manga list with custom params', async () => {
      const mockResponse = {
        data: {
          data: [{ id: 'm1', title: 'Manga 1' }],
          page: 2,
          pageSize: 10,
          totalCount: 1,
          hasNext: false,
        },
      };
      mockApiClient.get.mockResolvedValue(mockResponse);

      const result = await mangaApi.list({ page: 2, pageSize: 10 });

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/manga', {
        params: { page: 2, pageSize: 10 },
      });
      expect(result).toEqual(mockResponse.data);
    });

    it('includes sorting in params', async () => {
      mockApiClient.get.mockResolvedValue({
        data: { data: [], page: 1, pageSize: 20, totalCount: 0, hasNext: false },
      });

      await mangaApi.list({ sortBy: 1 });

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/manga', {
        params: { sortBy: 1 },
      });
    });
  });

  describe('get', () => {
    it('fetches single manga by id', async () => {
      const mockManga = {
        id: 'm1',
        title: 'Manga 1',
        description: 'Test description',
      };
      mockApiClient.get.mockResolvedValue({ data: mockManga });

      const result = await mangaApi.get('m1');

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/manga/m1');
      expect(result).toEqual(mockManga);
    });

    it('throws error when manga not found', async () => {
      mockApiClient.get.mockRejectedValue(new Error('Not found'));

      await expect(mangaApi.get('invalid-id')).rejects.toThrow('Not found');
    });
  });

  describe('create', () => {
    it('creates new manga', async () => {
      const createData = {
        title: 'New Manga',
        description: 'Description',
      };
      mockApiClient.post.mockResolvedValue({ data: 'new-manga-id' });

      const result = await mangaApi.create(createData);

      expect(mockApiClient.post).toHaveBeenCalledWith('/api/manga', createData);
      expect(result).toBe('new-manga-id');
    });
  });

  describe('update', () => {
    it('updates manga', async () => {
      const updateData = {
        title: 'Updated Manga',
      };
      mockApiClient.put.mockResolvedValue({});

      const result = await mangaApi.update('m1', updateData);

      expect(mockApiClient.put).toHaveBeenCalledWith('/api/manga/m1', updateData);
      expect(result).toBeUndefined();
    });
  });

  describe('delete', () => {
    it('deletes manga', async () => {
      mockApiClient.delete.mockResolvedValue({});

      const result = await mangaApi.delete('m1');

      expect(mockApiClient.delete).toHaveBeenCalledWith('/api/manga/m1');
      expect(result).toBeUndefined();
    });
  });

  describe('getChapters', () => {
    it('fetches chapters for manga', async () => {
      const mockChapters = {
        data: [{ id: 'ch1', title: 'Chapter 1' }],
        page: 1,
        pageSize: 20,
        totalCount: 1,
        hasNext: false,
      };
      mockApiClient.get.mockResolvedValue({ data: mockChapters });

      const result = await mangaApi.getChapters('m1');

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/manga/m1/chapters', { params: {} });
      expect(result).toEqual(mockChapters);
    });

    it('fetches chapters with pagination params', async () => {
      mockApiClient.get.mockResolvedValue({
        data: {
          data: [],
          page: 2,
          pageSize: 10,
          totalCount: 0,
          hasNext: false,
        },
      });

      await mangaApi.getChapters('m1', { page: 2, pageSize: 10 });

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/manga/m1/chapters', {
        params: { page: 2, pageSize: 10 },
      });
    });
  });

  describe('search', () => {
    it('searches manga with query', async () => {
      const mockResults = {
        data: [{ id: 'm1', title: 'Found Manga' }],
        page: 1,
        pageSize: 20,
        totalCount: 1,
        hasNext: false,
      };
      mockApiClient.get.mockResolvedValue({ data: mockResults });

      const result = await mangaApi.search({ q: 'test' });

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/manga/search', {
        params: { q: 'test' },
      });
      expect(result).toEqual(mockResults);
    });

    it('includes pagination in search', async () => {
      mockApiClient.get.mockResolvedValue({
        data: { data: [], page: 1, pageSize: 20, totalCount: 0, hasNext: false },
      });

      await mangaApi.search({ q: 'test', page: 2, pageSize: 10 });

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/manga/search', {
        params: { q: 'test', page: 2, pageSize: 10 },
      });
    });

    it('returns empty results for no match', async () => {
      const mockResults = {
        data: [],
        page: 1,
        pageSize: 20,
        totalCount: 0,
        hasNext: false,
      };
      mockApiClient.get.mockResolvedValue({ data: mockResults });

      const result = await mangaApi.search({ q: 'nonexistent' });

      expect(result.data).toHaveLength(0);
      expect(result.totalCount).toBe(0);
    });
  });

  describe('getTrending', () => {
    it('fetches trending manga', async () => {
      const mockTrending = {
        data: [{ id: 'm1', title: 'Popular Manga' }],
        page: 1,
        pageSize: 20,
        totalCount: 1,
        hasNext: false,
      };
      mockApiClient.get.mockResolvedValue({ data: mockTrending });

      const result = await mangaApi.getTrending();

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/manga/trending', { params: {} });
      expect(result).toEqual(mockTrending);
    });

    it('includes days parameter in trending request', async () => {
      mockApiClient.get.mockResolvedValue({
        data: { data: [], page: 1, pageSize: 20, totalCount: 0, hasNext: false },
      });

      await mangaApi.getTrending({ days: 7 });

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/manga/trending', {
        params: { days: 7 },
      });
    });
  });
});
