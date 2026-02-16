import { describe, it, expect } from 'vitest';
import {
  createMulberry32,
  generatePermutation,
  invertPermutation,
} from '../image-descrambler';

describe('createMulberry32', () => {
  it('produces deterministic sequence for same seed', () => {
    const rng1 = createMulberry32(42);
    const rng2 = createMulberry32(42);

    const seq1 = Array.from({ length: 10 }, () => rng1());
    const seq2 = Array.from({ length: 10 }, () => rng2());

    expect(seq1).toEqual(seq2);
  });

  it('produces different sequences for different seeds', () => {
    const rng1 = createMulberry32(42);
    const rng2 = createMulberry32(99);

    const seq1 = Array.from({ length: 10 }, () => rng1());
    const seq2 = Array.from({ length: 10 }, () => rng2());

    expect(seq1).not.toEqual(seq2);
  });

  it('returns unsigned 32-bit integers', () => {
    const rng = createMulberry32(12345);
    for (let i = 0; i < 100; i++) {
      const val = rng();
      expect(val).toBeGreaterThanOrEqual(0);
      expect(val).toBeLessThan(2 ** 32);
      expect(Number.isInteger(val)).toBe(true);
    }
  });
});

describe('generatePermutation', () => {
  it('returns valid permutation (all indices present once)', () => {
    const perm = generatePermutation(64, 12345);

    expect(perm).toHaveLength(64);
    const sorted = [...perm].sort((a, b) => a - b);
    expect(sorted).toEqual(Array.from({ length: 64 }, (_, i) => i));
  });

  it('is shuffled (not identity)', () => {
    const perm = generatePermutation(64, 12345);
    const displaced = perm.filter((val, idx) => val !== idx).length;
    expect(displaced).toBeGreaterThan(10);
  });

  it('is deterministic for same seed', () => {
    const perm1 = generatePermutation(64, 999);
    const perm2 = generatePermutation(64, 999);
    expect(perm1).toEqual(perm2);
  });

  it('differs for different seeds', () => {
    const perm1 = generatePermutation(64, 100);
    const perm2 = generatePermutation(64, 200);
    expect(perm1).not.toEqual(perm2);
  });

  /**
   * CROSS-PLATFORM PARITY: Must match C# ImageScrambleServiceTests exactly.
   * If this fails, the frontend will not correctly descramble backend images.
   */
  it('matches backend C# output for known seed (parity test)', () => {
    const perm = generatePermutation(16, 12345);

    const expected = [11, 7, 14, 12, 1, 4, 2, 15, 10, 13, 3, 6, 8, 0, 9, 5];
    expect(perm).toEqual(expected);
  });
});

describe('invertPermutation', () => {
  it('produces correct inverse', () => {
    const perm = generatePermutation(64, 42);
    const inverse = invertPermutation(perm);

    for (let i = 0; i < perm.length; i++) {
      expect(inverse[perm[i]]).toBe(i);
    }
  });

  it('round-trips: double inversion equals original', () => {
    const perm = generatePermutation(64, 42);
    const inv = invertPermutation(perm);
    const doubleInv = invertPermutation(inv);

    expect(doubleInv).toEqual(perm);
  });

  it('identity permutation inverts to identity', () => {
    const identity = Array.from({ length: 16 }, (_, i) => i);
    const inverse = invertPermutation(identity);
    expect(inverse).toEqual(identity);
  });
});
