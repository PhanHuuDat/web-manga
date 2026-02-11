# Phase 5: Latest Manga List Section

## Context
- Reference HTML - "Danh Sách Truyện Mới" section
- [manga-types.ts](../../src/types/manga-types.ts)

## Overview
- **Priority:** P1
- **Status:** pending
- **Effort:** 45m

Create Latest Manga list with detailed horizontal cards and pagination.

---

## Reference Design

```
┌─ DANH SÁCH TRUYỆN MỚI ──────────────────────────── [VIEW ALL →] ─┐
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ ┌──────┐  Title                                             │ │
│  │ │ img  │  Author: Name                                      │ │
│  │ │      │  [Action] [Fantasy]                                │ │
│  │ └──────┘  ⏰ 2 hours ago  👁 14.5k                          │ │
│  └─────────────────────────────────────────────────────────────┘ │
│  ... more cards ...                                              │
│  [1] [2] [3] ... [12] [→]                                        │
└───────────────────────────────────────────────────────────────────┘
```

---

## Files to Create

| File | Purpose | Lines |
|------|---------|-------|
| `src/components/manga/MangaListCard.tsx` | Horizontal card | ~90 |
| `src/components/home/LatestMangaSection.tsx` | Section + pagination | ~80 |
| `src/utils/format-relative-time.ts` | Time formatter | ~25 |
| `src/utils/format-number.ts` | Number formatter | ~15 |

---

## Component Specs

### MangaListCard
```tsx
interface MangaListCardProps {
  manga: Manga;
}
```

**Layout:**
- Horizontal flex
- Left: Thumbnail (w-24 sm:w-32, aspect 3/4)
- Right: Title, Author, Genres, Meta (time + views)

**Styling:**
```tsx
// Container
sx={{
  display: 'flex',
  gap: 3,
  p: 2,
  borderRadius: 2,
  bgcolor: 'rgba(26, 30, 46, 0.3)',
  border: '1px solid rgba(255,255,255,0.05)',
  '&:hover': { bgcolor: 'rgba(26, 30, 46, 0.8)' }
}}

// Genre chip
sx={{
  fontSize: 10,
  textTransform: 'uppercase',
  fontWeight: 700,
  px: 1,
  py: 0.25,
  bgcolor: 'rgba(59,130,246,0.1)',
  border: '1px solid rgba(59,130,246,0.2)',
  color: 'primary.main',
}}
```

### Pagination
- Number buttons: 40x40px
- Active: paper bg, primary text
- Inactive: glass bg, hover border
- Next button: primary bg with arrow

---

## Utility Functions

### format-relative-time.ts
```typescript
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}
```

### format-number.ts
```typescript
export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return num.toString();
}
```

---

## i18n Keys

### en/home.json
```json
{
  "latest": {
    "title": "Latest Updates",
    "viewAll": "VIEW ALL",
    "chapter": "Ch. {{number}}",
    "updated": "{{time}}"
  }
}
```

### vi/home.json
```json
{
  "latest": {
    "title": "Truyện Mới Cập Nhật",
    "viewAll": "XEM TẤT CẢ",
    "chapter": "Ch. {{number}}",
    "updated": "{{time}}"
  }
}
```

---

## Todo

- [ ] Create format-relative-time.ts
- [ ] Create format-number.ts
- [ ] Create MangaListCard.tsx
- [ ] Create LatestMangaSection.tsx with pagination
- [ ] Add i18n keys
- [ ] Run `pnpm build`

---

## Success Criteria

- [ ] Cards display horizontally
- [ ] Genre chips styled correctly
- [ ] Relative time displays
- [ ] Views formatted (14.5k)
- [ ] Pagination renders
- [ ] Hover effects work
