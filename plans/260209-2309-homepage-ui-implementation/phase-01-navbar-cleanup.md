# Phase 1: Navbar Cleanup

## Context
- [Navbar.tsx](../../src/components/layout/Navbar.tsx) - Current navbar with GenreDropdown
- [Theme](../../src/theme/theme.ts) - Deep Ocean Blue palette

## Overview
- **Priority:** P1
- **Status:** pending
- **Effort:** 30m

Remove GenreDropdown from navbar. Keep order: Logo → SearchBar → LanguageSwitcher → UserMenu

---

## Requirements

### Functional
- Remove GenreDropdown import and usage from Navbar
- Maintain existing responsive behavior
- Keep all accessibility attributes

### Non-functional
- No visual regressions
- Pass ESLint

---

## Files to Modify

| File | Action |
|------|--------|
| `src/components/layout/Navbar.tsx` | Remove GenreDropdown |

---

## Implementation Steps

1. Open `src/components/layout/Navbar.tsx`
2. Remove import: `import GenreDropdown from '../navigation/GenreDropdown';`
3. Remove import: `import { GENRES } from '../../constants/genres';`
4. Remove handler: `handleGenreSelect` function
5. Remove JSX: `<GenreDropdown genres={GENRES} onGenreSelect={handleGenreSelect} />`
6. Run `pnpm lint` to verify

---

## Code Changes

### Before (lines 7-11, 19-22, 54)
```tsx
import GenreDropdown from '../navigation/GenreDropdown';
import { GENRES } from '../../constants/genres';

const handleGenreSelect = (genreId: string) => {
  console.log('Selected genre:', genreId);
};

<GenreDropdown genres={GENRES} onGenreSelect={handleGenreSelect} />
```

### After
Remove all above lines. Final navbar items:
```tsx
<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
  <SearchBar onSearch={handleSearch} />
  <LanguageSwitcher />
  <UserMenu />
</Box>
```

---

## Todo

- [ ] Remove GenreDropdown from Navbar.tsx
- [ ] Remove unused GENRES import
- [ ] Remove handleGenreSelect handler
- [ ] Run `pnpm lint`
- [ ] Run `pnpm build`

---

## Success Criteria

- [ ] Navbar renders without GenreDropdown
- [ ] Order: Logo | flex-spacer | SearchBar | LanguageSwitcher | UserMenu
- [ ] No TypeScript errors
- [ ] ESLint passes

---

## Notes

- GenreDropdown component kept in codebase (may use elsewhere later)
- No i18n changes needed for this phase
