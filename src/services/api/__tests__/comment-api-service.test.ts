import { describe, it, expect, vi, beforeEach } from 'vitest';
import { commentApi } from '../comment-api-service';
import apiClient from '../axios-instance';

vi.mock('../axios-instance');

const mockApiClient = vi.mocked(apiClient);

describe('comment-api-service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('creates comment with required fields', async () => {
      const createData = {
        content: 'Great manga!',
        mangaSeriesId: 'm1',
      };
      mockApiClient.post.mockResolvedValue({ data: { id: 'c1' } });

      const result = await commentApi.create(createData);

      expect(mockApiClient.post).toHaveBeenCalledWith('/api/comments', createData);
      expect(result).toEqual({ id: 'c1' });
    });

    it('creates reply with parentId', async () => {
      const replyData = {
        content: 'Great reply!',
        chapterId: 'ch1',
        parentId: 'c1',
      };
      mockApiClient.post.mockResolvedValue({ data: { id: 'c2' } });

      const result = await commentApi.create(replyData);

      expect(mockApiClient.post).toHaveBeenCalledWith('/api/comments', replyData);
      expect(result.id).toBe('c2');
    });

    it('throws error on invalid content', async () => {
      mockApiClient.post.mockRejectedValue(new Error('Invalid content'));

      await expect(
        commentApi.create({
          content: '',
          mangaSeriesId: 'm1',
        }),
      ).rejects.toThrow('Invalid content');
    });
  });

  describe('list', () => {
    it('lists comments with default params', async () => {
      const mockResponse = {
        data: {
          data: [{ id: 'c1', content: 'Comment 1' }],
          page: 1,
          pageSize: 20,
          totalCount: 1,
          hasNext: false,
        },
      };
      mockApiClient.get.mockResolvedValue(mockResponse);

      const result = await commentApi.list();

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/comments', { params: {} });
      expect(result).toEqual(mockResponse.data);
    });

    it('lists manga comments', async () => {
      mockApiClient.get.mockResolvedValue({
        data: {
          data: [{ id: 'c1', content: 'Manga comment' }],
          page: 1,
          pageSize: 20,
          totalCount: 1,
          hasNext: false,
        },
      });

      const result = await commentApi.list({ mangaSeriesId: 'm1' });

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/comments', {
        params: { mangaSeriesId: 'm1' },
      });
      expect(result.data).toHaveLength(1);
    });

    it('lists chapter comments', async () => {
      mockApiClient.get.mockResolvedValue({
        data: {
          data: [{ id: 'c1', content: 'Chapter comment' }],
          page: 1,
          pageSize: 20,
          totalCount: 1,
          hasNext: false,
        },
      });

      await commentApi.list({ chapterId: 'ch1' });

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/comments', {
        params: { chapterId: 'ch1' },
      });
    });

    it('lists page comments', async () => {
      mockApiClient.get.mockResolvedValue({
        data: {
          data: [{ id: 'c1', content: 'Page comment' }],
          page: 1,
          pageSize: 20,
          totalCount: 1,
          hasNext: false,
        },
      });

      await commentApi.list({ chapterId: 'ch1', pageNumber: 5 });

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/comments', {
        params: { chapterId: 'ch1', pageNumber: 5 },
      });
    });

    it('includes pagination in request', async () => {
      mockApiClient.get.mockResolvedValue({
        data: { data: [], page: 2, pageSize: 10, totalCount: 0, hasNext: false },
      });

      await commentApi.list({ mangaSeriesId: 'm1', page: 2, pageSize: 10 });

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/comments', {
        params: { mangaSeriesId: 'm1', page: 2, pageSize: 10 },
      });
    });
  });

  describe('update', () => {
    it('updates comment', async () => {
      const updateData = { content: 'Updated comment' };
      mockApiClient.put.mockResolvedValue({});

      await commentApi.update('c1', updateData);

      expect(mockApiClient.put).toHaveBeenCalledWith('/api/comments/c1', updateData);
    });
  });

  describe('remove', () => {
    it('deletes comment', async () => {
      mockApiClient.delete.mockResolvedValue({});

      await commentApi.remove('c1');

      expect(mockApiClient.delete).toHaveBeenCalledWith('/api/comments/c1');
    });
  });

  describe('toggleReaction', () => {
    it('toggles like reaction', async () => {
      const mockResponse = {
        data: {
          likes: 10,
          dislikes: 2,
          currentReaction: 1, // Like
        },
      };
      mockApiClient.post.mockResolvedValue(mockResponse);

      const result = await commentApi.toggleReaction('c1', 1);

      expect(mockApiClient.post).toHaveBeenCalledWith('/api/comments/c1/reactions', {
        reactionType: 1,
      });
      expect(result.likes).toBe(10);
      expect(result.dislikes).toBe(2);
    });

    it('toggles dislike reaction', async () => {
      const mockResponse = {
        data: {
          likes: 5,
          dislikes: 8,
          currentReaction: 2, // Dislike
        },
      };
      mockApiClient.post.mockResolvedValue(mockResponse);

      const result = await commentApi.toggleReaction('c1', 2);

      expect(mockApiClient.post).toHaveBeenCalledWith('/api/comments/c1/reactions', {
        reactionType: 2,
      });
      expect(result.dislikes).toBe(8);
    });

    it('throws error on invalid comment id', async () => {
      mockApiClient.post.mockRejectedValue(new Error('Comment not found'));

      await expect(commentApi.toggleReaction('invalid', 1)).rejects.toThrow('Comment not found');
    });
  });
});
