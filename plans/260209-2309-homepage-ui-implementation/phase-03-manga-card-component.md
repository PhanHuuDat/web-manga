# Phase 3: Manga Card Components

## Context
- [theme.ts](../../src/theme/theme.ts) - Deep Ocean Blue palette
- [manga-types.ts](../../src/types/manga-types.ts) - Manga interface (from Phase 2)

## Overview
- **Priority:** P1
- **Status:** pending
- **Effort:** 45m

Build reusable manga card components for different layouts.

---

## Requirements

### Functional
- MangaRankCard: Horizontal card for Top 10 list (rank badge, thumbnail, title, views)
- MangaGridCard: Vertical card for grid layout (thumbnail, title, chapter, time)

### Non-functional
- Use MUI sx props only (no external CSS)
- Responsive sizing
- Accessible (alt text, focus states)

---

## Files to Create

| File | Purpose | Lines |
|------|---------|-------|
| `src/components/manga/MangaRankCard.tsx` | Ranked list card | ~70 |
| `src/components/manga/MangaGridCard.tsx` | Grid layout card | ~80 |

---

## Component Specs

### MangaRankCard

```typescript
interface MangaRankCardProps {
  manga: Manga;
  rank: number;
  viewPeriod: ViewPeriod;
}
```

**Layout:**
```
┌─────────────────────────────────────┐
│ [1] [Thumb] Title              999K │
│     60x80   Subtitle           views│
└─────────────────────────────────────┘
```

**Styling:**
- Rank badge: primary.main bg, white text, 24x24px circle
- Thumbnail: 60x80px, rounded corners
- Views: text.secondary, right-aligned

### MangaGridCard

```typescript
interface MangaGridCardProps {
  manga: Manga;
}
```

**Layout:**
```
┌──────────────────┐
│                  │
│    Thumbnail     │
│    200px tall    │
│                  │
├──────────────────┤
│ Title            │
│ Ch. 123 • 2h ago │
└──────────────────┘
```

**Styling:**
- Card: background.paper, 8px radius
- Thumbnail: 100% width, 200px height, object-fit cover
- Chapter badge: success.main for new releases

---

## Implementation Steps

1. Create `src/components/manga/` directory
2. Create `MangaRankCard.tsx`:
   - Import MUI components (Box, Typography, Paper)
   - Create rank badge with absolute positioning
   - Format view count (K/M suffix)
3. Create `MangaGridCard.tsx`:
   - Card with hover elevation
   - Thumbnail with aspect ratio
   - Chapter and time info at bottom
4. Run `pnpm lint`

---

## Utility: View Formatter

Add to component or create `src/utils/format-views.ts`:
```typescript
export function formatViews(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return count.toString();
}
```

---

## Todo

- [ ] Create src/components/manga/ directory
- [ ] Implement MangaRankCard.tsx
- [ ] Implement MangaGridCard.tsx
- [ ] Add formatViews utility
- [ ] Run `pnpm lint`
- [ ] Run `pnpm build`

---

## Success Criteria

- [ ] Both cards render correctly
- [ ] Cards use theme colors
- [ ] Hover states work
- [ ] Images have alt text
- [ ] Files under 100 lines each
