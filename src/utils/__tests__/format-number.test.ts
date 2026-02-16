import { describe, it, expect } from 'vitest';
import { formatNumber } from '../format-number';

describe('formatNumber', () => {
  it('returns zero as string', () => {
    expect(formatNumber(0)).toBe('0');
  });

  it('returns single digit numbers as string', () => {
    expect(formatNumber(1)).toBe('1');
    expect(formatNumber(5)).toBe('5');
    expect(formatNumber(9)).toBe('9');
  });

  it('returns numbers under 1000 as string', () => {
    expect(formatNumber(100)).toBe('100');
    expect(formatNumber(500)).toBe('500');
    expect(formatNumber(999)).toBe('999');
  });

  it('formats thousands with k suffix', () => {
    expect(formatNumber(1000)).toBe('1.0k');
    expect(formatNumber(1500)).toBe('1.5k');
    expect(formatNumber(10000)).toBe('10.0k');
    expect(formatNumber(99999)).toBe('100.0k');
  });

  it('formats millions with M suffix', () => {
    expect(formatNumber(1000000)).toBe('1.0M');
    expect(formatNumber(1500000)).toBe('1.5M');
    expect(formatNumber(10000000)).toBe('10.0M');
  });

  it('handles edge case at 1000 boundary', () => {
    expect(formatNumber(999)).toBe('999');
    expect(formatNumber(1000)).toBe('1.0k');
  });

  it('handles edge case at 1000000 boundary', () => {
    expect(formatNumber(999999)).toBe('1000.0k');
    expect(formatNumber(1000000)).toBe('1.0M');
  });

  it('formats large millions correctly', () => {
    expect(formatNumber(5000000)).toBe('5.0M');
    expect(formatNumber(100000000)).toBe('100.0M');
  });
});
