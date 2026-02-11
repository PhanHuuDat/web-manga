# Brainstorm Report: Localization (i18n) Implementation

**Date:** 2026-02-09
**Status:** Agreed
**Decision:** Use react-i18next

---

## Problem Statement

Implement multi-language support for Web-Manga application with Vietnamese (vi) and English (en) languages.

---

## Requirements

| Requirement | Value |
|-------------|-------|
| Languages | Vietnamese (vi), English (en) |
| Default detection | Browser locale |
| URL strategy | localStorage only (no URL prefix) |
| Scope | UI text only |
| File structure | JSON nested by feature |
| Pluralization | Yes - required |

---

## Evaluated Approaches

### 1. react-i18next (Selected)

**Pros:**
- 2.1M weekly downloads, mature ecosystem
- Hooks API (`useTranslation`) - fits functional components
- Native nested JSON support
- Excellent pluralization with flexible syntax
- TypeScript auto-generated types support
- Namespace/lazy-loading built-in
- Browser language detection plugin available
- localStorage persistence built-in

**Cons:**
- Bundle size ~19KB gzipped
- Learning curve with namespace concept

### 2. react-intl (FormatJS)

**Pros:**
- ICU MessageFormat standard
- Good for enterprise standardization
- Bundle size similar (~18KB)

**Cons:**
- Declarative components, no native hooks API
- Verbose pluralization syntax
- Less flexible for dynamic scenarios
- Needs extra tooling for full type-safety

### 3. Custom solution (useContext + JSON)

**Pros:**
- Zero dependencies
- Full control
- Minimal bundle

**Cons:**
- Must implement pluralization manually
- No tooling ecosystem
- Time-consuming, bug-prone

---

## Final Solution: react-i18next

### Why Selected

1. **Hooks-first API** - Matches React 19 + functional components
2. **Nested JSON native** - Matches "JSON nested by feature" requirement
3. **Pluralization built-in** - No extra setup needed
4. **Browser detection** - `i18next-browser-languageDetector` plugin
5. **localStorage persistence** - Native support via detector plugin
6. **TypeScript** - Can generate types from resources
7. **Scalable** - Namespace system for lazy-loading as project grows

---

## Proposed Architecture

```
src/
├── i18n/
│   ├── index.ts              # i18next config & init
│   ├── locales/
│   │   ├── vi/
│   │   │   ├── common.json   # Shared: nav, buttons, errors
│   │   │   ├── home.json     # HomePage specific
│   │   │   └── manga.json    # Manga detail page (future)
│   │   └── en/
│   │       ├── common.json
│   │       ├── home.json
│   │       └── manga.json
│   └── types.ts              # TypeScript definitions
├── components/
│   └── common/
│       └── LanguageSwitcher.tsx
```

### Dependencies

```bash
pnpm add i18next react-i18next i18next-browser-languagedetector
```

### Translation File Example

```json
// locales/vi/common.json
{
  "nav": {
    "home": "Trang chủ",
    "search": "Tìm kiếm",
    "genres": "Thể loại",
    "login": "Đăng nhập"
  },
  "actions": {
    "read": "Đọc ngay",
    "bookmark": "Lưu truyện"
  },
  "chapter_one": "{{count}} chương",
  "chapter_other": "{{count}} chương"
}
```

### i18next Config

```typescript
// src/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import viCommon from './locales/vi/common.json';
import enCommon from './locales/en/common.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      vi: { common: viCommon },
      en: { common: enCommon },
    },
    fallbackLng: 'en',
    defaultNS: 'common',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false, // React already escapes
    },
  });

export default i18n;
```

### Usage in Components

```tsx
import { useTranslation } from 'react-i18next';

function Navbar() {
  const { t } = useTranslation('common');

  return (
    <nav>
      <a href="/">{t('nav.home')}</a>
      <a href="/search">{t('nav.search')}</a>
    </nav>
  );
}
```

### LanguageSwitcher Component

```tsx
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <select
      value={i18n.language}
      onChange={(e) => changeLanguage(e.target.value)}
    >
      <option value="vi">Tiếng Việt</option>
      <option value="en">English</option>
    </select>
  );
}
```

---

## Implementation Estimate

| Task | Effort |
|------|--------|
| Setup i18next + plugins | ~1h |
| Create translation structure & files | ~30m |
| Extract existing hardcoded text | ~2h |
| LanguageSwitcher component | ~1h |
| Update existing components | ~1h |
| Testing | ~1h |
| **Total** | **~6-7h** |

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Missing translations | Medium | Fallback to English, console warnings in dev |
| Bundle size impact | Low | Lazy-load namespaces when project grows |
| Type safety gaps | Low | Generate types from JSON with tooling |
| Translation inconsistency | Medium | Establish translation guidelines |

---

## Success Criteria

- [ ] Language auto-detected from browser on first visit
- [ ] User can switch between vi/en via UI toggle
- [ ] Language preference persisted in localStorage
- [ ] All existing UI text translatable
- [ ] Pluralization works correctly (e.g., chapter count)
- [ ] No visual/layout breaks when switching languages
- [ ] TypeScript properly typed translations

---

## Next Steps

1. Create detailed implementation plan with phases
2. Install dependencies
3. Setup i18n configuration
4. Create translation files
5. Update existing components
6. Add LanguageSwitcher to Navbar
7. Test thoroughly

---

## Sources

- [react-intl vs react-i18next - Locize](https://www.locize.com/blog/react-intl-vs-react-i18next/)
- [Comparing react-i18next and react-intl - i18nexus](https://i18nexus.com/posts/comparing-react-i18next-and-react-intl)
- [React i18n Best Libraries - Phrase](https://phrase.com/blog/posts/react-i18n-best-libraries/)
