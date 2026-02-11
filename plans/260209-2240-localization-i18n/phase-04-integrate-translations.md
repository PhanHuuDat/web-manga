# Phase 4: Integrate Translations into Components

## Context

- **Parent Plan:** [plan.md](./plan.md)
- **Depends on:** [Phase 3](./phase-03-create-language-switcher.md)

## Overview

| Field | Value |
|-------|-------|
| Priority | P1 |
| Status | Complete |
| Effort | 1.5h |

Replace all hardcoded strings in existing components with translation keys using `useTranslation` hook.

## Key Insights

- Use `useTranslation('namespace')` to load specific namespace
- Multiple namespaces: `useTranslation(['common', 'home'])`
- Access nested keys with dot notation: `t('nav.search')`
- Interpolation: `t('chapter', { count: 5 })`

## Requirements

**Functional:**
- Replace all hardcoded UI strings with `t()` calls
- Maintain existing component behavior
- Support namespace separation (common vs home)

**Components to Update:**
1. `Navbar.tsx` - search placeholder, brand stays "MangaVerse"
2. `SearchBar.tsx` - placeholder, aria-labels
3. `GenreDropdown.tsx` - button label, genre names/descriptions
4. `UserMenu.tsx` - aria-label
5. `HomePage.tsx` - all section titles and placeholders

## Architecture

No new files. Only modifications to existing components.

## Related Code Files

**Modify:**
- `src/components/layout/Navbar.tsx`
- `src/components/navigation/SearchBar.tsx`
- `src/components/navigation/GenreDropdown.tsx`
- `src/components/navigation/UserMenu.tsx`
- `src/pages/HomePage.tsx`
- `src/constants/genres.ts` - Update to use translation keys

## Implementation Steps

### 1. Update `src/components/navigation/SearchBar.tsx`

```tsx
import { useTranslation } from 'react-i18next';

function SearchBar({ onSearch, placeholder }: SearchBarProps) {
  const { t } = useTranslation('common');
  // ...

  // Replace hardcoded strings:
  // placeholder={placeholder} → placeholder={placeholder || t('nav.search')}
  // aria-label="Search" → aria-label={t('aria.search')}
  // 'aria-label': 'Search manga' → 'aria-label': t('aria.searchManga')
}
```

### 2. Update `src/components/navigation/UserMenu.tsx`

```tsx
import { useTranslation } from 'react-i18next';

function UserMenu() {
  const { t } = useTranslation('common');

  // Replace:
  // aria-label="User menu" → aria-label={t('nav.userMenu')}
}
```

### 3. Update `src/components/navigation/GenreDropdown.tsx`

```tsx
import { useTranslation } from 'react-i18next';

function GenreDropdown({ genres, onGenreSelect }: GenreDropdownProps) {
  const { t } = useTranslation('common');

  // Button label:
  // "Genres" → {t('nav.genres')}

  // For genre names/descriptions, use translation keys:
  // genre.name → t(`genres.${genre.id}.name`)
  // genre.description → t(`genres.${genre.id}.description`)
}
```

**Note:** Update `src/constants/genres.ts` to use IDs that match translation keys:
- `'sci-fi'` → `'sciFi'`
- `'slice-of-life'` → `'sliceOfLife'`

### 4. Update `src/components/layout/Navbar.tsx`

```tsx
import { useTranslation } from 'react-i18next';

function Navbar() {
  const { t } = useTranslation('common');

  // SearchBar placeholder:
  // placeholder="Search manga..." → placeholder={t('nav.search')}
}
```

### 5. Update `src/pages/HomePage.tsx`

```tsx
import { useTranslation } from 'react-i18next';

function HomePage() {
  const { t } = useTranslation('home');

  // Hero section:
  // "Discover Your Next Manga" → {t('hero.title')}
  // "Explore thousands..." → {t('hero.subtitle')}

  // Sections:
  // "Featured Manga" → {t('sections.featured')}
  // "Manga cards will be displayed here" → {t('sections.featuredPlaceholder')}
  // "Popular Genres" → {t('sections.genres')}
  // "Genre categories will be displayed here" → {t('sections.genresPlaceholder')}
  // "Latest Updates" → {t('sections.latest')}
  // "Recently updated manga will be displayed here" → {t('sections.latestPlaceholder')}
}
```

### 6. Update `src/constants/genres.ts`

Update genre IDs to match translation keys (camelCase):
```typescript
export const GENRES: Genre[] = [
  { id: 'action', name: 'Action', slug: 'action', ... },
  // ...
  { id: 'sciFi', name: 'Sci-Fi', slug: 'sci-fi', ... },  // Changed from 'sci-fi'
  { id: 'sliceOfLife', name: 'Slice of Life', slug: 'slice-of-life', ... },  // Changed
  // ...
];
```

### 7. Verify and Test

```bash
pnpm build
pnpm dev
```

Test:
- Switch languages via LanguageSwitcher
- Verify all text changes
- Check no hardcoded strings remain
- Verify pluralization if applicable

## Todo List

- [ ] Update SearchBar.tsx with translations
- [ ] Update UserMenu.tsx with translations
- [ ] Update GenreDropdown.tsx with translations
- [ ] Update Navbar.tsx with translations
- [ ] Update HomePage.tsx with translations
- [ ] Update genres.ts IDs to match translation keys
- [ ] Test language switching on all pages
- [ ] Verify no hardcoded strings remain
- [ ] Verify build passes
- [ ] Test localStorage persistence

## Success Criteria

- [ ] All UI text translatable
- [ ] Language switch updates all visible text
- [ ] No console warnings about missing keys
- [ ] Pluralization works (if used)
- [ ] No TypeScript errors
- [ ] `pnpm build` passes
- [ ] `pnpm lint` passes

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Missing translation keys | Medium | Check console for warnings |
| Breaking existing props | Low | Keep placeholder prop as fallback |
| Genre ID mismatch | Medium | Update both constants and JSON |

## Security Considerations

- Translation strings are static, no user input
- React auto-escapes output (XSS safe)

## Next Steps

After completion:
1. Run full test suite
2. Manual QA - switch languages, verify all text
3. Update documentation if needed
4. Mark plan as complete
