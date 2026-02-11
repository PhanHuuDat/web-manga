---
title: "Homepage UI Implementation"
description: "Implement manga homepage based on reference design with Featured, Latest, Top 10, Comments sections"
status: pending
priority: P1
effort: 5h
branch: main
tags: [homepage, ui, mui, i18n]
created: 2026-02-09
updated: 2026-02-10
---

# Homepage UI Implementation Plan

## Summary

Implement homepage based on reference HTML design:
1. Navbar with Logo, SearchBar, Nav Links, Login button
2. Featured Manga section (5-col grid)
3. Two-column main content:
   - Left (65%): Latest Manga List with pagination
   - Right (35%): Top 10 Views + Comments + Active Users

---

## Reference Design Analysis

### Color Palette (Update Theme)
| Token | Current | Reference | Action |
|-------|---------|-----------|--------|
| background.default | #0F172A | #0a0c14 (dark-navy) | Update |
| background.paper | #1E293B | #1a1e2e (card-bg) | Update |
| primary.main | #0EA5E9 | #3b82f6 (neon-blue) | Update |
| secondary.main | #38BDF8 | #a855f7 (neon-purple) | Update |

### Typography (Update Theme)
| Type | Current | Reference |
|------|---------|-----------|
| Display | Righteous | Outfit (bold, display) |
| Body | Poppins | Spline Sans |

---

## Phases Overview

| Phase | Description | Effort | Status |
|-------|-------------|--------|--------|
| [Phase 1](./phase-01-theme-update.md) | Update theme colors & fonts | 30m | pending |
| [Phase 2](./phase-02-types-and-mock-data.md) | Create types and mock data | 30m | pending |
| [Phase 3](./phase-03-navbar-update.md) | Update navbar with nav links | 30m | pending |
| [Phase 4](./phase-04-featured-section.md) | Featured Manga grid section | 45m | pending |
| [Phase 5](./phase-05-manga-list-section.md) | Latest Manga list with pagination | 45m | pending |
| [Phase 6](./phase-06-sidebar-sections.md) | Top 10 + Comments + Active Users | 60m | pending |
| [Phase 7](./phase-07-homepage-integration.md) | Integrate all sections | 30m | pending |
| [Phase 8](./phase-08-footer.md) | Footer component | 30m | pending |

---

## File Structure (Final State)

```
src/
├── components/
│   ├── common/
│   │   ├── LanguageSwitcher.tsx     # existing
│   │   └── SectionHeader.tsx        # NEW - reusable section header
│   ├── layout/
│   │   ├── Navbar.tsx               # MODIFY - add nav links
│   │   ├── Layout.tsx               # existing
│   │   └── Footer.tsx               # NEW - footer component
│   ├── manga/
│   │   ├── MangaFeaturedCard.tsx    # NEW - featured grid card
│   │   ├── MangaListCard.tsx        # NEW - detailed list card
│   │   └── MangaRankCard.tsx        # NEW - compact rank card
│   ├── home/
│   │   ├── FeaturedSection.tsx      # NEW - featured manga grid
│   │   ├── LatestMangaSection.tsx   # NEW - manga list + pagination
│   │   ├── TopViewsSection.tsx      # NEW - Top 10 with tabs
│   │   ├── TopCommentsSection.tsx   # NEW - Recent comments
│   │   ├── ActiveUsersSection.tsx   # NEW - Online users grid
│   │   └── HomeSidebar.tsx          # NEW - Right column container
│   └── navigation/
│       ├── SearchBar.tsx            # existing
│       ├── GenreDropdown.tsx        # existing (keep for later)
│       └── UserMenu.tsx             # existing
├── types/
│   ├── manga-types.ts               # NEW
│   ├── comment-types.ts             # NEW
│   └── user-types.ts                # NEW
├── constants/
│   ├── mock-manga-data.ts           # NEW
│   ├── mock-comment-data.ts         # NEW
│   ├── mock-user-data.ts            # NEW
│   └── genres.ts                    # existing
├── theme/
│   └── theme.ts                     # MODIFY - update colors & fonts
├── i18n/locales/
│   ├── en/home.json                 # MODIFY
│   └── vi/home.json                 # MODIFY
└── pages/
    └── HomePage.tsx                 # MODIFY - integrate sections
```

---

## Design Tokens (Reference-based)

### Colors
```typescript
palette: {
  mode: 'dark',
  primary: {
    main: '#3b82f6',      // neon-blue
    light: '#60a5fa',
    dark: '#2563eb',
  },
  secondary: {
    main: '#a855f7',      // neon-purple
  },
  background: {
    default: '#0a0c14',   // dark-navy
    paper: '#1a1e2e',     // card-bg
  },
  // ... rest
}
```

### Typography
```typescript
typography: {
  fontFamily: '"Spline Sans", sans-serif',
  h1: { fontFamily: '"Outfit", sans-serif', fontWeight: 800 },
  // ... headings use Outfit
}
```

---

## Component Specifications

### MangaFeaturedCard
- Aspect ratio: 3/4.5
- Hover: translate-y-2, ring glow effect
- Badge: HOT (purple), TOP (blue), NEW (green)
- Overlay gradient from bottom

### MangaListCard
- Horizontal layout: thumbnail (w-32) + content
- Show: title, author, genres, update time, views
- Hover: bg highlight, title color change

### MangaRankCard
- Compact: rank badge + small thumbnail + title + views
- Rank #1 gets blue badge, others gray

---

## i18n Keys

```json
{
  "navbar": {
    "browse": "Browse",
    "popular": "Popular",
    "schedule": "Schedule"
  },
  "featured": {
    "title": "Featured Manga"
  },
  "latest": {
    "title": "Latest Updates",
    "viewAll": "View All"
  },
  "topViews": {
    "title": "Top 10 Views",
    "daily": "Daily",
    "weekly": "Weekly",
    "monthly": "Monthly",
    "views": "{{count}} Views"
  },
  "comments": {
    "title": "Latest Comments"
  },
  "activeUsers": {
    "title": "Active Users"
  }
}
```

---

## Success Criteria

- [ ] Theme matches reference colors (dark-navy, neon-blue, neon-purple)
- [ ] Fonts: Outfit (display) + Spline Sans (body)
- [ ] Navbar: Logo | Search | Browse/Popular/Schedule | Login
- [ ] Featured section: 5-col grid with hover effects
- [ ] Latest section: Detailed cards with pagination
- [ ] Sidebar: Top 10 tabs + Comments + Active Users
- [ ] Footer matches reference
- [ ] Responsive: mobile/tablet/desktop
- [ ] All text uses i18n
- [ ] No TypeScript errors
- [ ] ESLint passes

---

## Next Steps

1. Start with Phase 1 (Theme Update)
2. Proceed sequentially
3. Run `pnpm lint` and `pnpm build` after each phase
