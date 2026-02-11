# Phase 2: Create Translation Files

## Context

- **Parent Plan:** [plan.md](./plan.md)
- **Depends on:** [Phase 1](./phase-01-setup-i18next-dependencies.md)

## Overview

| Field | Value |
|-------|-------|
| Priority | P1 |
| Status | Complete |
| Effort | 1.5h |

Create JSON translation files for Vietnamese and English with nested structure by feature (common, home namespaces).

## Key Insights

- Nested JSON structure for organization by feature
- `common` namespace: shared UI (nav, buttons, errors)
- `home` namespace: HomePage-specific strings
- Pluralization uses `_one`, `_other` suffixes for i18next

## Requirements

**Functional:**
- Create vi/common.json and en/common.json
- Create vi/home.json and en/home.json
- Extract all hardcoded strings from existing components
- Support pluralization for countable items

**Strings to Extract:**

From `Navbar.tsx`:
- "MangaVerse" (brand name - keep same)
- "Search manga..." (placeholder)

From `SearchBar.tsx`:
- "Search manga..." (placeholder)
- "Search" (aria-label)

From `HomePage.tsx`:
- "Discover Your Next Manga"
- "Explore thousands of manga series from popular genres"
- "Featured Manga"
- "Manga cards will be displayed here"
- "Popular Genres"
- "Genre categories will be displayed here"
- "Latest Updates"
- "Recently updated manga will be displayed here"

From `GenreDropdown.tsx`:
- "Genres" (button label)
- Genre names and descriptions (12 genres)

From `UserMenu.tsx`:
- "User menu" (aria-label)

## Architecture

```
src/i18n/locales/
├── vi/
│   ├── common.json    # Nav, buttons, shared strings
│   └── home.json      # HomePage strings
└── en/
    ├── common.json
    └── home.json
```

## Related Code Files

**Create:**
- `src/i18n/locales/vi/common.json`
- `src/i18n/locales/vi/home.json`
- `src/i18n/locales/en/common.json`
- `src/i18n/locales/en/home.json`
- `src/i18n/i18n-types.ts`

**Modify:**
- `src/i18n/i18n-config.ts` - Import and register resources

## Implementation Steps

1. Create directory structure:
   ```bash
   mkdir -p src/i18n/locales/vi src/i18n/locales/en
   ```

2. Create `src/i18n/locales/en/common.json`:
   ```json
   {
     "nav": {
       "search": "Search manga...",
       "genres": "Genres",
       "userMenu": "User menu"
     },
     "aria": {
       "search": "Search",
       "searchManga": "Search manga"
     },
     "genres": {
       "action": { "name": "Action", "description": "High-energy battles and adventures" },
       "adventure": { "name": "Adventure", "description": "Exciting journeys and quests" },
       "comedy": { "name": "Comedy", "description": "Humorous and lighthearted stories" },
       "drama": { "name": "Drama", "description": "Emotional and serious narratives" },
       "fantasy": { "name": "Fantasy", "description": "Magical worlds and creatures" },
       "horror": { "name": "Horror", "description": "Scary and suspenseful tales" },
       "mystery": { "name": "Mystery", "description": "Puzzles and detective stories" },
       "romance": { "name": "Romance", "description": "Love stories and relationships" },
       "sciFi": { "name": "Sci-Fi", "description": "Science fiction and technology" },
       "sliceOfLife": { "name": "Slice of Life", "description": "Everyday life experiences" },
       "sports": { "name": "Sports", "description": "Athletic competitions and training" },
       "supernatural": { "name": "Supernatural", "description": "Paranormal and mystical elements" }
     },
     "chapter_one": "{{count}} chapter",
     "chapter_other": "{{count}} chapters"
   }
   ```

3. Create `src/i18n/locales/vi/common.json`:
   ```json
   {
     "nav": {
       "search": "Tìm kiếm manga...",
       "genres": "Thể loại",
       "userMenu": "Menu người dùng"
     },
     "aria": {
       "search": "Tìm kiếm",
       "searchManga": "Tìm kiếm manga"
     },
     "genres": {
       "action": { "name": "Hành động", "description": "Trận chiến và phiêu lưu kịch tính" },
       "adventure": { "name": "Phiêu lưu", "description": "Hành trình và nhiệm vụ thú vị" },
       "comedy": { "name": "Hài hước", "description": "Câu chuyện vui nhộn và nhẹ nhàng" },
       "drama": { "name": "Chính kịch", "description": "Cốt truyện cảm xúc và nghiêm túc" },
       "fantasy": { "name": "Giả tưởng", "description": "Thế giới phép thuật và sinh vật kỳ ảo" },
       "horror": { "name": "Kinh dị", "description": "Câu chuyện đáng sợ và hồi hộp" },
       "mystery": { "name": "Bí ẩn", "description": "Câu đố và truyện trinh thám" },
       "romance": { "name": "Lãng mạn", "description": "Câu chuyện tình yêu" },
       "sciFi": { "name": "Khoa học viễn tưởng", "description": "Khoa học và công nghệ" },
       "sliceOfLife": { "name": "Đời thường", "description": "Trải nghiệm cuộc sống hàng ngày" },
       "sports": { "name": "Thể thao", "description": "Thi đấu và luyện tập thể thao" },
       "supernatural": { "name": "Siêu nhiên", "description": "Yếu tố huyền bí và siêu nhiên" }
     },
     "chapter_one": "{{count}} chương",
     "chapter_other": "{{count}} chương"
   }
   ```

4. Create `src/i18n/locales/en/home.json`:
   ```json
   {
     "hero": {
       "title": "Discover Your Next Manga",
       "subtitle": "Explore thousands of manga series from popular genres"
     },
     "sections": {
       "featured": "Featured Manga",
       "featuredPlaceholder": "Manga cards will be displayed here",
       "genres": "Popular Genres",
       "genresPlaceholder": "Genre categories will be displayed here",
       "latest": "Latest Updates",
       "latestPlaceholder": "Recently updated manga will be displayed here"
     }
   }
   ```

5. Create `src/i18n/locales/vi/home.json`:
   ```json
   {
     "hero": {
       "title": "Khám phá Manga tiếp theo của bạn",
       "subtitle": "Khám phá hàng nghìn bộ manga từ các thể loại phổ biến"
     },
     "sections": {
       "featured": "Manga nổi bật",
       "featuredPlaceholder": "Các thẻ manga sẽ hiển thị ở đây",
       "genres": "Thể loại phổ biến",
       "genresPlaceholder": "Danh mục thể loại sẽ hiển thị ở đây",
       "latest": "Cập nhật mới nhất",
       "latestPlaceholder": "Manga cập nhật gần đây sẽ hiển thị ở đây"
     }
   }
   ```

6. Create `src/i18n/i18n-types.ts`:
   ```typescript
   import type enCommon from './locales/en/common.json';
   import type enHome from './locales/en/home.json';

   export type CommonTranslations = typeof enCommon;
   export type HomeTranslations = typeof enHome;

   export type TranslationResources = {
     common: CommonTranslations;
     home: HomeTranslations;
   };
   ```

7. Update `src/i18n/i18n-config.ts` to import resources:
   ```typescript
   import viCommon from './locales/vi/common.json';
   import viHome from './locales/vi/home.json';
   import enCommon from './locales/en/common.json';
   import enHome from './locales/en/home.json';

   // In init():
   resources: {
     vi: { common: viCommon, home: viHome },
     en: { common: enCommon, home: enHome },
   },
   ```

## Todo List

- [ ] Create locales directory structure
- [ ] Create en/common.json with all shared strings
- [ ] Create vi/common.json with Vietnamese translations
- [ ] Create en/home.json with HomePage strings
- [ ] Create vi/home.json with Vietnamese translations
- [ ] Create i18n-types.ts for TypeScript support
- [ ] Update i18n-config.ts to import resources
- [ ] Verify JSON syntax is valid
- [ ] Verify build passes

## Success Criteria

- [ ] All 4 JSON files created with proper structure
- [ ] All hardcoded strings extracted
- [ ] Vietnamese translations accurate
- [ ] TypeScript types defined
- [ ] i18n-config.ts loads all resources
- [ ] `pnpm build` passes

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Translation accuracy | Medium | Review Vietnamese text |
| Missing strings | Low | Audit components thoroughly |
| JSON syntax errors | Low | Validate JSON before commit |

## Next Steps

After completion, proceed to [Phase 3: Create LanguageSwitcher](./phase-03-create-language-switcher.md)
