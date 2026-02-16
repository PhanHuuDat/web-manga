import apiClient from './axios-instance';
import type {
  AttachmentDto,
  AttachmentType,
} from '../../types/attachment-api-types';

export const attachmentApi = {
  upload: (
    file: File,
    type: AttachmentType,
    onProgress?: (percent: number) => void,
  ): Promise<AttachmentDto> => {
    const formData = new FormData();
    formData.append('file', file);

    return apiClient
      .post<AttachmentDto>(`/api/attachments/upload?type=${type}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          if (e.total && onProgress) {
            onProgress(Math.round((e.loaded * 100) / e.total));
          }
        },
      })
      .then((r) => r.data);
  },
};
