# Phase 4: Featured Manga Section

## Context
- Reference HTML design - "Truyện Tiêu Điểm" section
- [manga-types.ts](../../src/types/manga-types.ts) - Manga interface

## Overview
- **Priority:** P1
- **Status:** pending
- **Effort:** 45m

Create Featured Manga section with 5-column responsive grid.

---

## Reference Design

```
┌─ TRUYỆN TIÊU ĐIỂM ─────────────────────────────────────────────┐
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐       │
│  │ [HOT]  │ │ [TOP]  │ │        │ │        │ │        │       │
│  │  img   │ │  img   │ │  img   │ │  img   │ │  img   │       │
│  │        │ │        │ │        │ │        │ │        │       │
│  │ Title  │ │ Title  │ │ Title  │ │ Title  │ │ Title  │       │
│  │ Ch.248 │ │ Ch.120 │ │ Ch.54  │ │ Ch.205 │ │ Ch.182 │       │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘       │
└────────────────────────────────────────────────────────────────┘
```

---

## Files to Create

| File | Purpose | Lines |
|------|---------|-------|
| `src/components/common/SectionHeader.tsx` | Reusable header | ~30 |
| `src/components/manga/MangaFeaturedCard.tsx` | Featured card | ~80 |
| `src/components/home/FeaturedSection.tsx` | Section wrapper | ~40 |

---

## Component Specs

### SectionHeader
```tsx
interface SectionHeaderProps {
  title: string;
  action?: React.ReactNode;
}
// Blue line (w-12 h-1) + Title (uppercase, tracking-widest)
```

### MangaFeaturedCard
```tsx
interface MangaFeaturedCardProps {
  manga: Manga;
}
```

**Features:**
- Aspect ratio: 3/4.5
- Hover: translateY(-8px), ring glow
- Badge: HOT (purple), TOP (blue), NEW (green)
- Gradient overlay from bottom
- Title + Chapter number

**Styling:**
```tsx
// Hover effect
sx={{
  transition: 'all 0.3s',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 0 20px rgba(59,130,246,0.2)',
    outline: '2px solid rgba(59,130,246,0.5)',
  }
}}

// Badge colors
const badgeColors = {
  hot: 'rgba(168, 85, 247, 0.8)',  // purple
  top: 'rgba(37, 99, 235, 0.8)',   // blue
  new: 'rgba(34, 197, 94, 0.8)',   // green
};

// Gradient overlay
background: 'linear-gradient(to top, #0a0c14 0%, transparent 60%)'
```

### FeaturedSection
- Grid: 2 cols (xs), 3 cols (sm), 5 cols (lg)
- Gap: 24px
- Map FEATURED_MANGA to cards

---

## i18n Keys

### en/home.json
```json
{
  "featured": {
    "title": "Featured Manga"
  }
}
```

### vi/home.json
```json
{
  "featured": {
    "title": "Truyện Tiêu Điểm"
  }
}
```

---

## Todo

- [ ] Create SectionHeader.tsx
- [ ] Create MangaFeaturedCard.tsx
- [ ] Create FeaturedSection.tsx
- [ ] Add i18n keys
- [ ] Run `pnpm build`

---

## Success Criteria

- [ ] 5 columns on desktop, 2-3 on mobile
- [ ] Hover effects work (translate + glow)
- [ ] Badges display correctly
- [ ] Gradient overlay visible
- [ ] Section header matches design
