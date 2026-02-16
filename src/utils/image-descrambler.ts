/**
 * Deterministic PRNG: mulberry32.
 * Must produce identical sequence as backend C# implementation.
 * Returns a function that yields next random uint32 on each call.
 */
export function createMulberry32(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return (t ^ (t >>> 14)) >>> 0;
  };
}

/**
 * Fisher-Yates shuffle: identical algorithm to backend.
 * Returns permutation array where perm[dstIdx] = srcIdx.
 */
export function generatePermutation(count: number, seed: number): number[] {
  const perm = Array.from({ length: count }, (_, i) => i);
  const rng = createMulberry32(seed);

  for (let i = count - 1; i > 0; i--) {
    const j = rng() % (i + 1);
    [perm[i], perm[j]] = [perm[j], perm[i]];
  }

  return perm;
}

/**
 * Compute inverse permutation: inverse[srcIdx] = dstIdx.
 * Used to find where each scrambled tile belongs in the original image.
 */
export function invertPermutation(perm: number[]): number[] {
  const inverse = new Array<number>(perm.length);
  for (let i = 0; i < perm.length; i++) {
    inverse[perm[i]] = i;
  }
  return inverse;
}

/**
 * Get tile rectangle for a given index in the grid.
 * Last row/column absorbs remainder pixels (matches backend GetTileRect).
 */
function getTileRect(
  imageW: number,
  imageH: number,
  gridSize: number,
  tileIndex: number
): { x: number; y: number; w: number; h: number } {
  const col = tileIndex % gridSize;
  const row = Math.floor(tileIndex / gridSize);

  const baseTileW = Math.floor(imageW / gridSize);
  const baseTileH = Math.floor(imageH / gridSize);

  const x = col * baseTileW;
  const y = row * baseTileH;
  const w = col === gridSize - 1 ? imageW - x : baseTileW;
  const h = row === gridSize - 1 ? imageH - y : baseTileH;

  return { x, y, w, h };
}

/**
 * Descramble a scrambled image onto a canvas.
 *
 * The scrambled image has tiles shuffled by Fisher-Yates with the given seed.
 * This function computes the inverse permutation and draws each tile
 * from its scrambled position to its correct original position.
 */
export function descrambleImage(
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  gridSize: number,
  seed: number
): void {
  if (!gridSize || gridSize < 2 || !Number.isFinite(seed)) return;

  const w = image.naturalWidth;
  const h = image.naturalHeight;

  if (w < gridSize || h < gridSize) return;

  // HiDPI scaling
  const dpr = window.devicePixelRatio || 1;
  canvas.width = w * dpr;
  canvas.height = h * dpr;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.scale(dpr, dpr);

  const totalTiles = gridSize * gridSize;
  const perm = generatePermutation(totalTiles, seed);
  const inverse = invertPermutation(perm);

  for (let originalIdx = 0; originalIdx < totalTiles; originalIdx++) {
    const scrambledIdx = inverse[originalIdx];

    const src = getTileRect(w, h, gridSize, scrambledIdx);
    const dst = getTileRect(w, h, gridSize, originalIdx);

    ctx.drawImage(
      image,
      src.x,
      src.y,
      src.w,
      src.h,
      dst.x,
      dst.y,
      dst.w,
      dst.h
    );
  }
}
