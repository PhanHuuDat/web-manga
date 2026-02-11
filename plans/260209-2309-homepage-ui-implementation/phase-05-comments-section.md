# Phase 5: Top Comments Section

## Context
- [comment-types.ts](../../src/types/comment-types.ts) - Comment interface (Phase 2)
- [mock-comment-data](../../src/constants/mock-comment-data.ts) - Mock data (Phase 2)
- [SectionHeader](../../src/components/common/SectionHeader.tsx) - From Phase 4

## Overview
- **Priority:** P2
- **Status:** pending
- **Effort:** 30m

Build Top Comments section with sort by likes or date.

---

## Requirements

### Functional
- Section header with title "Top Comments"
- Toggle: Sort by Likes / Sort by Date
- Display 5 comments with user info, content, likes

### Non-functional
- Use MUI ToggleButtonGroup or Chip for sort options
- Truncate long comments with "..."
- Avatar with fallback

---

## Files to Create

| File | Purpose | Lines |
|------|---------|-------|
| `src/components/home/TopCommentsSection.tsx` | Section with comments list | ~100 |
| `src/components/home/CommentCard.tsx` | Individual comment card | ~60 |

---

## Component Specs

### TopCommentsSection

```typescript
function TopCommentsSection(): JSX.Element
```

**Layout:**
```
┌─────────────────────────────────────────┐
│ Top Comments        [By Likes][By Date] │
├─────────────────────────────────────────┤
│ [Avatar] Username                       │
│ Comment text preview...        12 likes │
│ on "Manga Title"                        │
├─────────────────────────────────────────┤
│ [Avatar] Username                       │
│ Comment text...                 8 likes │
└─────────────────────────────────────────┘
```

**State:**
```typescript
const [sortBy, setSortBy] = useState<CommentSortBy>('likes');
```

### CommentCard

```typescript
interface CommentCardProps {
  comment: Comment;
}
```

**Elements:**
- Avatar: 40x40px, rounded
- Username: text.primary, semi-bold
- Content: text.secondary, max 2 lines
- Likes: with ThumbUp icon
- Manga title: link style, primary.main

---

## i18n Keys Required

Add to `src/i18n/locales/en/home.json`:
```json
{
  "topComments": {
    "title": "Top Comments",
    "sortByLikes": "By Likes",
    "sortByDate": "By Date",
    "likes": "{{count}} likes",
    "on": "on"
  }
}
```

Add to `src/i18n/locales/vi/home.json`:
```json
{
  "topComments": {
    "title": "Bình luận nổi bật",
    "sortByLikes": "Lượt thích",
    "sortByDate": "Mới nhất",
    "likes": "{{count}} thích",
    "on": "về"
  }
}
```

---

## Implementation Steps

1. Create `src/components/home/CommentCard.tsx`:
   - Avatar with MUI Avatar component
   - Typography for username and content
   - Flex layout for likes count
2. Create `src/components/home/TopCommentsSection.tsx`:
   - SectionHeader with toggle buttons as action
   - Sort logic based on sortBy state
   - Map to CommentCard components
3. Update i18n files
4. Run `pnpm lint`

---

## Sort Toggle Styling

```tsx
<ToggleButtonGroup
  value={sortBy}
  exclusive
  onChange={(_, v) => v && setSortBy(v)}
  size="small"
  sx={{
    '& .MuiToggleButton-root': {
      textTransform: 'none',
      px: 2,
      py: 0.5,
    },
  }}
>
  <ToggleButton value="likes">{t('topComments.sortByLikes')}</ToggleButton>
  <ToggleButton value="date">{t('topComments.sortByDate')}</ToggleButton>
</ToggleButtonGroup>
```

---

## Todo

- [ ] Create CommentCard.tsx
- [ ] Create TopCommentsSection.tsx
- [ ] Add i18n keys (en/vi)
- [ ] Test sort toggle
- [ ] Run `pnpm lint`
- [ ] Run `pnpm build`

---

## Success Criteria

- [ ] Toggle switches between likes/date sort
- [ ] Comments display with avatar, username, content
- [ ] Likes count shows with icon
- [ ] i18n works for EN/VI
- [ ] Long comments truncate properly
