# Phase 2: Types and Mock Data

## Context
- [genre-types.ts](../../src/types/genre-types.ts) - Existing type patterns
- [genres.ts](../../src/constants/genres.ts) - Existing constants pattern
- Reference HTML design provided by user

## Overview
- **Priority:** P1
- **Status:** pending
- **Effort:** 30m

Create TypeScript interfaces and mock data for manga, comments, and users.

---

## Files to Create

| File | Purpose |
|------|---------|
| `src/types/manga-types.ts` | Manga interfaces |
| `src/types/comment-types.ts` | Comment interface |
| `src/types/user-types.ts` | User interface |
| `src/constants/mock-manga-data.ts` | Featured + Latest + Top manga |
| `src/constants/mock-comment-data.ts` | Comments data |
| `src/constants/mock-user-data.ts` | Active users data |

---

## Type Definitions

### manga-types.ts
```typescript
export interface Manga {
  id: string;
  title: string;
  slug: string;
  coverUrl: string;
  author: string;
  genres: string[];
  latestChapter: number;
  totalChapters: number;
  views: number;
  updatedAt: string; // ISO date
  status: 'ongoing' | 'completed' | 'hiatus';
  badge?: 'hot' | 'top' | 'new';
}

export interface MangaRanked extends Manga {
  rank: number;
  viewsFormatted: string; // "2.4M Views"
}

export type ViewPeriod = 'daily' | 'weekly' | 'monthly';
```

### comment-types.ts
```typescript
export interface Comment {
  id: string;
  userId: string;
  username: string;
  avatarUrl: string;
  content: string;
  likes: number;
  createdAt: string;
  mangaId: string;
  mangaTitle: string;
}
```

### user-types.ts
```typescript
export interface User {
  id: string;
  username: string;
  avatarUrl: string;
  level: number;
  isOnline: boolean;
}
```

---

## Mock Data

### Featured Manga (10 items)
```typescript
export const FEATURED_MANGA: Manga[] = [
  {
    id: '1',
    title: 'Solo Leveling: Arise',
    slug: 'solo-leveling-arise',
    coverUrl: 'https://placehold.co/300x450/1a1e2e/3b82f6?text=Solo+Leveling',
    author: 'Chugong',
    genres: ['Action', 'Fantasy'],
    latestChapter: 248,
    totalChapters: 248,
    views: 2400000,
    updatedAt: '2026-02-10T10:00:00Z',
    status: 'completed',
    badge: 'hot',
  },
  // ... 9 more
];
```

### Latest Manga (8 items) - detailed info
### Top Manga Daily/Weekly/Monthly (10 each)
### Comments (5 items)
### Active Users (4 items)

---

## Implementation Steps

1. Create `src/types/manga-types.ts`
2. Create `src/types/comment-types.ts`
3. Create `src/types/user-types.ts`
4. Create `src/constants/mock-manga-data.ts`
5. Create `src/constants/mock-comment-data.ts`
6. Create `src/constants/mock-user-data.ts`
7. Run `pnpm build`

---

## Todo

- [ ] Create manga-types.ts
- [ ] Create comment-types.ts
- [ ] Create user-types.ts
- [ ] Create mock-manga-data.ts
- [ ] Create mock-comment-data.ts
- [ ] Create mock-user-data.ts
- [ ] Run `pnpm build`

---

## Success Criteria

- [ ] All types compile without errors
- [ ] Mock data matches type definitions
- [ ] Files under 100 lines each
