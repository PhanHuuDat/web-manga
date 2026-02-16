import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { formatRelativeTime } from '../format-relative-time';

describe('formatRelativeTime', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('formats time from 1 minute ago', () => {
    const now = new Date('2026-02-16T12:00:00Z');
    vi.setSystemTime(now);
    const oneMinuteAgo = new Date('2026-02-16T11:59:00Z').toISOString();
    expect(formatRelativeTime(oneMinuteAgo)).toBe('1m ago');
  });

  it('formats time from 30 minutes ago', () => {
    const now = new Date('2026-02-16T12:00:00Z');
    vi.setSystemTime(now);
    const thirtyMinutesAgo = new Date('2026-02-16T11:30:00Z').toISOString();
    expect(formatRelativeTime(thirtyMinutesAgo)).toBe('30m ago');
  });

  it('formats time from 59 minutes ago in minutes', () => {
    const now = new Date('2026-02-16T12:00:00Z');
    vi.setSystemTime(now);
    const fiftyNineMinutesAgo = new Date('2026-02-16T11:01:00Z').toISOString();
    expect(formatRelativeTime(fiftyNineMinutesAgo)).toBe('59m ago');
  });

  it('formats time from 1 hour ago', () => {
    const now = new Date('2026-02-16T12:00:00Z');
    vi.setSystemTime(now);
    const oneHourAgo = new Date('2026-02-16T11:00:00Z').toISOString();
    expect(formatRelativeTime(oneHourAgo)).toBe('1h ago');
  });

  it('formats time from 12 hours ago', () => {
    const now = new Date('2026-02-16T12:00:00Z');
    vi.setSystemTime(now);
    const twelveHoursAgo = new Date('2026-02-16T00:00:00Z').toISOString();
    expect(formatRelativeTime(twelveHoursAgo)).toBe('12h ago');
  });

  it('formats time from 23 hours ago in hours', () => {
    const now = new Date('2026-02-16T12:00:00Z');
    vi.setSystemTime(now);
    const twentyThreeHoursAgo = new Date('2026-02-15T13:00:00Z').toISOString();
    expect(formatRelativeTime(twentyThreeHoursAgo)).toBe('23h ago');
  });

  it('formats time from 1 day ago', () => {
    const now = new Date('2026-02-16T12:00:00Z');
    vi.setSystemTime(now);
    const oneDayAgo = new Date('2026-02-15T12:00:00Z').toISOString();
    expect(formatRelativeTime(oneDayAgo)).toBe('1d ago');
  });

  it('formats time from 7 days ago', () => {
    const now = new Date('2026-02-16T12:00:00Z');
    vi.setSystemTime(now);
    const sevenDaysAgo = new Date('2026-02-09T12:00:00Z').toISOString();
    expect(formatRelativeTime(sevenDaysAgo)).toBe('7d ago');
  });

  it('formats time from 365 days ago', () => {
    const now = new Date('2026-02-16T12:00:00Z');
    vi.setSystemTime(now);
    const yearAgo = new Date('2025-02-16T12:00:00Z').toISOString();
    expect(formatRelativeTime(yearAgo)).toBe('365d ago');
  });

  it('handles edge case at 60 minute boundary', () => {
    const now = new Date('2026-02-16T12:00:00Z');
    vi.setSystemTime(now);
    const sixtyMinutesAgo = new Date('2026-02-16T11:00:00Z').toISOString();
    expect(formatRelativeTime(sixtyMinutesAgo)).toBe('1h ago');
  });

  it('handles edge case at 24 hour boundary', () => {
    const now = new Date('2026-02-16T12:00:00Z');
    vi.setSystemTime(now);
    const twentyFourHoursAgo = new Date('2026-02-15T12:00:00Z').toISOString();
    expect(formatRelativeTime(twentyFourHoursAgo)).toBe('1d ago');
  });

  it('handles very recent time (0 minutes)', () => {
    const now = new Date('2026-02-16T12:00:00Z');
    vi.setSystemTime(now);
    const justNow = new Date('2026-02-16T12:00:00Z').toISOString();
    expect(formatRelativeTime(justNow)).toBe('0m ago');
  });
});
