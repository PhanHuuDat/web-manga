import { describe, it, expect, vi, beforeEach } from 'vitest';
import { chapterApi } from '../chapter-api-service';
import apiClient from '../axios-instance';

vi.mock('../axios-instance');

const mockApiClient = apiClient as any;

describe('chapter-api-service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('get', () => {
    it('fetches chapter detail by id', async () => {
      const mockChapter = {
        id: 'ch1',
        title: 'Chapter 1',
        chapterNumber: 1,
        pages: [
          { id: 'p1', url: 'img1.jpg' },
          { id: 'p2', url: 'img2.jpg' },
        ],
      };
      mockApiClient.get.mockResolvedValue({ data: mockChapter });

      const result = await chapterApi.get('ch1');

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/chapters/ch1');
      expect(result).toEqual(mockChapter);
    });

    it('includes pages in response', async () => {
      mockApiClient.get.mockResolvedValue({
        data: {
          id: 'ch1',
          title: 'Chapter 1',
          pages: [{ id: 'p1', url: 'img1.jpg' }],
        },
      });

      const result = await chapterApi.get('ch1');

      expect(result.pages).toHaveLength(1);
      expect(result.pages[0].url).toBe('img1.jpg');
    });

    it('throws error when chapter not found', async () => {
      mockApiClient.get.mockRejectedValue(new Error('Not found'));

      await expect(chapterApi.get('invalid-id')).rejects.toThrow('Not found');
    });
  });

  describe('create', () => {
    it('creates new chapter', async () => {
      const createData = {
        mangaSeriesId: 'm1',
        title: 'Chapter 1',
        chapterNumber: 1,
      };
      mockApiClient.post.mockResolvedValue({ data: 'new-chapter-id' });

      const result = await chapterApi.create(createData);

      expect(mockApiClient.post).toHaveBeenCalledWith('/api/chapters', createData);
      expect(result).toBe('new-chapter-id');
    });

    it('throws error on invalid data', async () => {
      mockApiClient.post.mockRejectedValue(new Error('Invalid chapter number'));

      await expect(
        chapterApi.create({
          mangaSeriesId: 'm1',
          title: 'Chapter 1',
          chapterNumber: -1,
        }),
      ).rejects.toThrow('Invalid chapter number');
    });
  });

  describe('update', () => {
    it('updates chapter', async () => {
      const updateData = {
        title: 'Updated Chapter Title',
      };
      mockApiClient.put.mockResolvedValue({});

      const result = await chapterApi.update('ch1', updateData);

      expect(mockApiClient.put).toHaveBeenCalledWith('/api/chapters/ch1', updateData);
      expect(result).toBeUndefined();
    });

    it('can update multiple fields', async () => {
      const updateData = {
        title: 'New Title',
        chapterNumber: 2,
      };
      mockApiClient.put.mockResolvedValue({});

      await chapterApi.update('ch1', updateData);

      expect(mockApiClient.put).toHaveBeenCalledWith('/api/chapters/ch1', updateData);
    });
  });

  describe('delete', () => {
    it('deletes chapter', async () => {
      mockApiClient.delete.mockResolvedValue({});

      const result = await chapterApi.delete('ch1');

      expect(mockApiClient.delete).toHaveBeenCalledWith('/api/chapters/ch1');
      expect(result).toBeUndefined();
    });

    it('throws error when chapter not found', async () => {
      mockApiClient.delete.mockRejectedValue(new Error('Chapter not found'));

      await expect(chapterApi.delete('invalid-id')).rejects.toThrow('Chapter not found');
    });
  });
});
