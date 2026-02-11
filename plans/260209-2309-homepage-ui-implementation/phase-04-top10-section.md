# Phase 4: Top 10 Manga Section

## Context
- [MangaRankCard](../../src/components/manga/MangaRankCard.tsx) - From Phase 3
- [mock-manga-data](../../src/constants/mock-manga-data.ts) - From Phase 2
- [theme.ts](../../src/theme/theme.ts) - MUI theme

## Overview
- **Priority:** P1
- **Status:** pending
- **Effort:** 45m

Build Top 10 Manga section with Daily/Weekly/Monthly tabs.

---

## Requirements

### Functional
- Section header with title "Top 10 Manga"
- 3 tabs: Daily, Weekly, Monthly
- List of 10 MangaRankCards per tab
- Sort by views for selected period

### Non-functional
- Use MUI Tabs component
- Persist tab selection in URL or local state
- Smooth tab transitions

---

## Files to Create

| File | Purpose | Lines |
|------|---------|-------|
| `src/components/home/TopMangaSection.tsx` | Section with tabs and list | ~90 |
| `src/components/common/SectionHeader.tsx` | Reusable section title | ~30 |

---

## Component Specs

### TopMangaSection

```typescript
// No props needed - uses mock data internally
function TopMangaSection(): JSX.Element
```

**Layout:**
```
┌─────────────────────────────────────┐
│ Top 10 Manga                        │
├─────────────────────────────────────┤
│ [Daily] [Weekly] [Monthly]          │
├─────────────────────────────────────┤
│ 1. Manga Title          12.5K views │
│ 2. Manga Title           9.2K views │
│ ...                                 │
│ 10. Manga Title          1.1K views │
└─────────────────────────────────────┘
```

**State:**
```typescript
const [period, setPeriod] = useState<ViewPeriod>('daily');
```

### SectionHeader

```typescript
interface SectionHeaderProps {
  title: string;
  action?: React.ReactNode; // Optional right-side action
}
```

---

## i18n Keys Required

Add to `src/i18n/locales/en/home.json`:
```json
{
  "topManga": {
    "title": "Top 10 Manga",
    "daily": "Daily",
    "weekly": "Weekly",
    "monthly": "Monthly",
    "views": "{{count}} views"
  }
}
```

Add to `src/i18n/locales/vi/home.json`:
```json
{
  "topManga": {
    "title": "Top 10 Manga",
    "daily": "Hàng ngày",
    "weekly": "Hàng tuần",
    "monthly": "Hàng tháng",
    "views": "{{count}} lượt xem"
  }
}
```

---

## Implementation Steps

1. Create `src/components/common/SectionHeader.tsx`
2. Create `src/components/home/TopMangaSection.tsx`:
   - Import MUI Tabs, Tab, Box
   - Use useState for period selection
   - Sort and slice mock data by period views
   - Map to MangaRankCard components
3. Update i18n files with new keys
4. Update `src/i18n/i18n-types.ts` if needed
5. Run `pnpm lint`

---

## MUI Tabs Styling

```tsx
<Tabs
  value={period}
  onChange={(_, v) => setPeriod(v)}
  sx={{
    minHeight: 40,
    '& .MuiTab-root': {
      minHeight: 40,
      textTransform: 'none',
      fontWeight: 500,
    },
  }}
>
  <Tab value="daily" label={t('topManga.daily')} />
  <Tab value="weekly" label={t('topManga.weekly')} />
  <Tab value="monthly" label={t('topManga.monthly')} />
</Tabs>
```

---

## Todo

- [ ] Create SectionHeader.tsx
- [ ] Create TopMangaSection.tsx
- [ ] Add i18n keys (en/vi)
- [ ] Test tab switching
- [ ] Run `pnpm lint`
- [ ] Run `pnpm build`

---

## Success Criteria

- [ ] 3 tabs switch correctly
- [ ] List shows 10 manga sorted by selected period
- [ ] Rank badges display 1-10
- [ ] i18n works for EN/VI
- [ ] Files under 100 lines
