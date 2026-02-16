import { useEffect, useRef } from 'react';
import { viewTrackingApi } from '../services/api/view-tracking-api-service';
import type { ViewTargetType } from '../types/view-tracking-api-types';

/**
 * Fire-and-forget view tracking hook.
 * Tracks a single view event per unique targetId. Uses a ref guard to prevent
 * double-tracking in React StrictMode and handles same-mount navigation
 * (e.g., chapter-to-chapter without unmounting).
 */
export function useViewTracker(
  targetType: ViewTargetType,
  targetId: string | undefined,
): void {
  const trackedId = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!targetId || trackedId.current === targetId) return;

    trackedId.current = targetId;
    viewTrackingApi.trackView(targetType, targetId);
  }, [targetType, targetId]);
}
