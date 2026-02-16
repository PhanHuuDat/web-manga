import apiClient from './axios-instance';
import type { ViewTargetType } from '../../types/view-tracking-api-types';
import { VIEW_TARGET_TYPE_MAP } from '../../types/view-tracking-api-types';

export const viewTrackingApi = {
  /** Fire-and-forget view tracking. Errors are silently caught. */
  trackView: (targetType: ViewTargetType, targetId: string): void => {
    apiClient
      .post('/api/views/track', {
        targetType: VIEW_TARGET_TYPE_MAP[targetType],
        targetId,
      })
      .catch(() => {
        // Silently ignore — view tracking should never block UI
      });
  },
};
