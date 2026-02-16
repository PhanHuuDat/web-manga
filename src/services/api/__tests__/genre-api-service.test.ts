import { describe, it, expect, vi, beforeEach } from 'vitest';
import { genreApi } from '../genre-api-service';
import apiClient from '../axios-instance';

vi.mock('../axios-instance');

const mockApiClient = apiClient as any;

describe('genre-api-service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('list', () => {
    it('fetches all genres', async () => {
      const mockGenres = [
        { id: 'g1', name: 'Action', count: 150 },
        { id: 'g2', name: 'Romance', count: 120 },
        { id: 'g3', name: 'Fantasy', count: 95 },
      ];
      mockApiClient.get.mockResolvedValue({ data: mockGenres });

      const result = await genreApi.list();

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/genres');
      expect(result).toEqual(mockGenres);
      expect(result).toHaveLength(3);
    });

    it('returns genre with count', async () => {
      mockApiClient.get.mockResolvedValue({
        data: [{ id: 'g1', name: 'Action', count: 150 }],
      });

      const result = await genreApi.list();

      expect(result[0]).toHaveProperty('count');
      expect(result[0].count).toBe(150);
    });

    it('returns empty array when no genres', async () => {
      mockApiClient.get.mockResolvedValue({ data: [] });

      const result = await genreApi.list();

      expect(result).toEqual([]);
    });

    it('returns genres in consistent order', async () => {
      const mockGenres = [
        { id: 'g1', name: 'Action', count: 150 },
        { id: 'g2', name: 'Comedy', count: 100 },
        { id: 'g3', name: 'Drama', count: 120 },
      ];
      mockApiClient.get.mockResolvedValue({ data: mockGenres });

      const result = await genreApi.list();

      expect(result[0].name).toBe('Action');
      expect(result[1].name).toBe('Comedy');
      expect(result[2].name).toBe('Drama');
    });

    it('throws error on network failure', async () => {
      mockApiClient.get.mockRejectedValue(new Error('Network error'));

      await expect(genreApi.list()).rejects.toThrow('Network error');
    });

    it('throws error on server error', async () => {
      mockApiClient.get.mockRejectedValue(new Error('Server error'));

      await expect(genreApi.list()).rejects.toThrow('Server error');
    });
  });
});
