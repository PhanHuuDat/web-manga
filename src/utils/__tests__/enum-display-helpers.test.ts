import { describe, it, expect } from 'vitest';
import { getStatusLabel, getBadgeLabel } from '../enum-display-helpers';
import { SeriesStatus, MangaBadge } from '../../types/manga-api-types';

describe('enum-display-helpers', () => {
  describe('getStatusLabel', () => {
    it('returns ongoing for SeriesStatus.Ongoing (0)', () => {
      expect(getStatusLabel(SeriesStatus.Ongoing)).toBe('ongoing');
    });

    it('returns completed for SeriesStatus.Completed (1)', () => {
      expect(getStatusLabel(SeriesStatus.Completed)).toBe('completed');
    });

    it('returns hiatus for SeriesStatus.Hiatus (2)', () => {
      expect(getStatusLabel(SeriesStatus.Hiatus)).toBe('hiatus');
    });

    it('returns ongoing as default for unknown status', () => {
      expect(getStatusLabel(999)).toBe('ongoing');
    });

    it('returns ongoing as default for negative numbers', () => {
      expect(getStatusLabel(-1)).toBe('ongoing');
    });

    it('returns correct type for all valid statuses', () => {
      const ongoingLabel = getStatusLabel(SeriesStatus.Ongoing);
      const completedLabel = getStatusLabel(SeriesStatus.Completed);
      const hiatusLabel = getStatusLabel(SeriesStatus.Hiatus);

      expect(['ongoing', 'completed', 'hiatus']).toContain(ongoingLabel);
      expect(['ongoing', 'completed', 'hiatus']).toContain(completedLabel);
      expect(['ongoing', 'completed', 'hiatus']).toContain(hiatusLabel);
    });
  });

  describe('getBadgeLabel', () => {
    it('returns hot for MangaBadge.Hot (0)', () => {
      expect(getBadgeLabel(MangaBadge.Hot)).toBe('hot');
    });

    it('returns top for MangaBadge.Top (1)', () => {
      expect(getBadgeLabel(MangaBadge.Top)).toBe('top');
    });

    it('returns new for MangaBadge.New (2)', () => {
      expect(getBadgeLabel(MangaBadge.New)).toBe('new');
    });

    it('returns null for null input', () => {
      expect(getBadgeLabel(null)).toBeNull();
    });

    it('returns null for undefined input', () => {
      expect(getBadgeLabel(undefined as any)).toBeNull();
    });

    it('returns null for unknown badge', () => {
      expect(getBadgeLabel(999)).toBeNull();
    });

    it('returns null for negative numbers', () => {
      expect(getBadgeLabel(-1)).toBeNull();
    });

    it('returns correct type for all valid badges', () => {
      const hotLabel = getBadgeLabel(MangaBadge.Hot);
      const topLabel = getBadgeLabel(MangaBadge.Top);
      const newLabel = getBadgeLabel(MangaBadge.New);

      expect(['hot', 'top', 'new']).toContain(hotLabel);
      expect(['hot', 'top', 'new']).toContain(topLabel);
      expect(['hot', 'top', 'new']).toContain(newLabel);
    });
  });
});
