# Phase 6: Latest Updated Manga Section

## Context
- [MangaGridCard](../../src/components/manga/MangaGridCard.tsx) - From Phase 3
- [mock-manga-data](../../src/constants/mock-manga-data.ts) - From Phase 2
- [SectionHeader](../../src/components/common/SectionHeader.tsx) - From Phase 4

## Overview
- **Priority:** P1
- **Status:** pending
- **Effort:** 30m

Build responsive grid of recently updated manga.

---

## Requirements

### Functional
- Section header "Latest Updates"
- Grid of manga cards (8 items)
- Show thumbnail, title, latest chapter, update time

### Non-functional
- Responsive grid: 2 cols (mobile) → 3 cols (tablet) → 4 cols (desktop)
- Cards have consistent height
- Time formatted as relative (e.g., "2h ago")

---

## Files to Create

| File | Purpose | Lines |
|------|---------|-------|
| `src/components/home/LatestMangaSection.tsx` | Grid section | ~60 |
| `src/utils/format-relative-time.ts` | Time formatting utility | ~25 |

---

## Component Spec

### LatestMangaSection

```typescript
function LatestMangaSection(): JSX.Element
```

**Layout:**
```
┌─────────────────────────────────────────┐
│ Latest Updates                          │
├─────────────────────────────────────────┤
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐        │
│ │     │ │     │ │     │ │     │        │
│ │ Img │ │ Img │ │ Img │ │ Img │        │
│ │     │ │     │ │     │ │     │        │
│ ├─────┤ ├─────┤ ├─────┤ ├─────┤        │
│ │Title│ │Title│ │Title│ │Title│        │
│ │Ch.12│ │Ch.45│ │Ch.8 │ │Ch.99│        │
│ └─────┘ └─────┘ └─────┘ └─────┘        │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐        │
│ │ ... │ │ ... │ │ ... │ │ ... │        │
│ └─────┘ └─────┘ └─────┘ └─────┘        │
└─────────────────────────────────────────┘
```

---

## Grid Breakpoints

```tsx
<Box
  sx={{
    display: 'grid',
    gridTemplateColumns: {
      xs: 'repeat(2, 1fr)',
      sm: 'repeat(3, 1fr)',
      md: 'repeat(4, 1fr)',
    },
    gap: 2,
  }}
>
  {manga.map((m) => (
    <MangaGridCard key={m.id} manga={m} />
  ))}
</Box>
```

---

## Relative Time Utility

### format-relative-time.ts

```typescript
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  return date.toLocaleDateString();
}
```

---

## i18n Keys Required

Add to `src/i18n/locales/en/home.json`:
```json
{
  "latestManga": {
    "title": "Latest Updates",
    "chapter": "Ch. {{number}}",
    "ago": "ago"
  }
}
```

Add to `src/i18n/locales/vi/home.json`:
```json
{
  "latestManga": {
    "title": "Cập nhật mới nhất",
    "chapter": "Ch. {{number}}",
    "ago": "trước"
  }
}
```

---

## Implementation Steps

1. Create `src/utils/format-relative-time.ts`
2. Create `src/components/home/LatestMangaSection.tsx`:
   - SectionHeader with title
   - Responsive grid with MUI Box
   - Sort mock data by updatedAt descending
   - Slice first 8 items
   - Map to MangaGridCard
3. Update MangaGridCard to use formatRelativeTime
4. Update i18n files
5. Run `pnpm lint`

---

## Todo

- [ ] Create format-relative-time.ts utility
- [ ] Create LatestMangaSection.tsx
- [ ] Update MangaGridCard with time formatting
- [ ] Add i18n keys (en/vi)
- [ ] Test responsive grid
- [ ] Run `pnpm lint`
- [ ] Run `pnpm build`

---

## Success Criteria

- [ ] Grid displays 8 manga cards
- [ ] Responsive: 2 → 3 → 4 columns
- [ ] Update time shows relative format
- [ ] Chapter number displays
- [ ] i18n works for EN/VI
