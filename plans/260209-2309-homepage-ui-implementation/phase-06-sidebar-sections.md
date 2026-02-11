# Phase 6: Sidebar Sections

## Context
- Reference HTML - Right sidebar sections
- Types from Phase 2

## Overview
- **Priority:** P1
- **Status:** pending
- **Effort:** 60m

Create sidebar: Top 10 Views, Comments, Active Users.

---

## Reference Design

```
┌─ RIGHT SIDEBAR (35%) ────────────────────────────┐
│  ┌─ TOP 10 LƯỢT XEM (purple accent) ───────────┐ │
│  │  [DAILY] [WEEKLY] [MONTHLY]                 │ │
│  │  [01] 🖼 Title - 2.4M Views                 │ │
│  │  [02] 🖼 Title - 1.8M Views                 │ │
│  └──────────────────────────────────────────────┘ │
│                                                   │
│  ┌─ BÌNH LUẬN MỚI (blue accent) ───────────────┐ │
│  │  [avatar] Username        5m ago            │ │
│  │  "Comment content..."                       │ │
│  └──────────────────────────────────────────────┘ │
│                                                   │
│  ┌─ ACTIVE USERS (green accent) ───────────────┐ │
│  │  ┌────┐ ┌────┐                              │ │
│  │  │ 🟢 │ │ 🟢 │  (2-col grid)                │ │
│  │  │Name│ │Name│                              │ │
│  │  │Lv42│ │Lv38│                              │ │
│  │  └────┘ └────┘                              │ │
│  └──────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────┘
```

---

## Files to Create

| File | Purpose | Lines |
|------|---------|-------|
| `src/components/manga/MangaRankCard.tsx` | Compact rank card | ~70 |
| `src/components/home/TopViewsSection.tsx` | Top 10 + tabs | ~90 |
| `src/components/home/CommentCard.tsx` | Single comment | ~50 |
| `src/components/home/TopCommentsSection.tsx` | Comments list | ~40 |
| `src/components/home/ActiveUsersSection.tsx` | Users grid | ~60 |
| `src/components/home/HomeSidebar.tsx` | Sidebar container | ~30 |

---

## Component Specs

### Section Card (shared style)
```tsx
sx={{
  bgcolor: 'rgba(26, 30, 46, 0.5)',
  borderRadius: 4,
  border: '1px solid rgba(255,255,255,0.05)',
  p: 3,
}}
```

### Accent Lines
```tsx
// Purple (Top Views)
sx={{ width: 6, height: 24, bgcolor: 'secondary.main', borderRadius: 1 }}
// Blue (Comments)
sx={{ width: 6, height: 24, bgcolor: 'primary.main', borderRadius: 1 }}
// Green (Active Users)
sx={{ width: 6, height: 24, bgcolor: 'success.main', borderRadius: 1 }}
```

### MangaRankCard
- Rank badge: #1 blue, others gray
- Thumbnail: 48x64px
- Title + views

### Tab Buttons
```tsx
// Active
sx={{
  flex: 1, py: 0.75, fontSize: 10, fontWeight: 700,
  borderRadius: 1, bgcolor: 'primary.main', color: 'white',
}}
// Inactive
sx={{
  flex: 1, py: 0.75, fontSize: 10, fontWeight: 700,
  borderRadius: 1, color: 'text.secondary',
  '&:hover': { color: 'white' }
}}
```

### Online Status Dot
```tsx
// Online (green)
sx={{
  position: 'absolute', bottom: -4, right: -4,
  width: 14, height: 14,
  bgcolor: 'success.main',
  border: '2px solid #0a0c14',
  borderRadius: '50%',
}}
// Offline (gray)
sx={{ ...same, bgcolor: 'text.disabled' }}
```

---

## i18n Keys

### en/home.json
```json
{
  "topViews": {
    "title": "Top 10 Views",
    "daily": "DAILY",
    "weekly": "WEEKLY",
    "monthly": "MONTHLY",
    "views": "{{count}} Views"
  },
  "comments": {
    "title": "Latest Comments"
  },
  "activeUsers": {
    "title": "Active Users",
    "level": "Lv. {{level}}"
  }
}
```

### vi/home.json
```json
{
  "topViews": {
    "title": "Top 10 Lượt Xem",
    "daily": "NGÀY",
    "weekly": "TUẦN",
    "monthly": "THÁNG",
    "views": "{{count}} lượt xem"
  },
  "comments": {
    "title": "Bình Luận Mới"
  },
  "activeUsers": {
    "title": "Đang Hoạt Động",
    "level": "Cấp {{level}}"
  }
}
```

---

## Todo

- [ ] Create MangaRankCard.tsx
- [ ] Create TopViewsSection.tsx with tabs
- [ ] Create CommentCard.tsx
- [ ] Create TopCommentsSection.tsx
- [ ] Create ActiveUsersSection.tsx
- [ ] Create HomeSidebar.tsx
- [ ] Add i18n keys
- [ ] Run `pnpm build`

---

## Success Criteria

- [ ] Top 10 tabs switch content
- [ ] Rank #1 has blue badge
- [ ] Comments show avatar + time
- [ ] Active users show online dot
- [ ] Correct accent colors
- [ ] i18n works EN/VI
