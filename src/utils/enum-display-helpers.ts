/** Maps backend integer enums to display strings for UI components. */
import { SeriesStatus, MangaBadge } from '../types/manga-api-types';

const statusLabels: Record<number, string> = {
  [SeriesStatus.Ongoing]: 'ongoing',
  [SeriesStatus.Completed]: 'completed',
  [SeriesStatus.Hiatus]: 'hiatus',
};

const badgeLabels: Record<number, string> = {
  [MangaBadge.Hot]: 'hot',
  [MangaBadge.Top]: 'top',
  [MangaBadge.New]: 'new',
};

export function getStatusLabel(status: number): 'ongoing' | 'completed' | 'hiatus' {
  return (statusLabels[status] ?? 'ongoing') as 'ongoing' | 'completed' | 'hiatus';
}

export function getBadgeLabel(badge: number | null): 'hot' | 'top' | 'new' | null {
  if (badge === null || badge === undefined) return null;
  return (badgeLabels[badge] ?? null) as 'hot' | 'top' | 'new' | null;
}
