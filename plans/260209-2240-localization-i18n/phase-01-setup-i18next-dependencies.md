# Phase 1: Setup i18next & Dependencies

## Context

- **Parent Plan:** [plan.md](./plan.md)
- **Brainstorm:** [brainstorm-260209-2240-localization-i18n.md](../reports/brainstorm-260209-2240-localization-i18n.md)

## Overview

| Field | Value |
|-------|-------|
| Priority | P1 - Foundation |
| Status | Complete |
| Effort | 1h |

Install i18next packages and create base configuration with browser language detection and localStorage persistence.

## Key Insights

- react-i18next provides hooks API (`useTranslation`) matching React 19 patterns
- `i18next-browser-languagedetector` handles both browser locale and localStorage
- No URL prefix needed - simpler setup

## Requirements

**Functional:**
- Install i18next, react-i18next, i18next-browser-languagedetector
- Create i18n configuration file
- Configure language detection (browser → localStorage)
- Configure fallback to English
- Import i18n in main.tsx before app renders

**Non-functional:**
- TypeScript strict mode compatible
- Bundle size ~19KB gzipped acceptable

## Architecture

```
src/
├── i18n/
│   └── i18n-config.ts    # Main i18next configuration
└── main.tsx              # Import i18n before app
```

## Related Code Files

**Create:**
- `src/i18n/i18n-config.ts`

**Modify:**
- `src/main.tsx`

## Implementation Steps

1. Install dependencies:
   ```bash
   pnpm add i18next react-i18next i18next-browser-languagedetector
   ```

2. Create `src/i18n/i18n-config.ts`:
   ```typescript
   import i18n from 'i18next';
   import { initReactI18next } from 'react-i18next';
   import LanguageDetector from 'i18next-browser-languagedetector';

   i18n
     .use(LanguageDetector)
     .use(initReactI18next)
     .init({
       resources: {},  // Will be populated in Phase 2
       fallbackLng: 'en',
       supportedLngs: ['en', 'vi'],
       defaultNS: 'common',
       detection: {
         order: ['localStorage', 'navigator'],
         caches: ['localStorage'],
         lookupLocalStorage: 'i18nextLng',
       },
       interpolation: {
         escapeValue: false, // React already escapes
       },
     });

   export default i18n;
   ```

3. Update `src/main.tsx` - add import at top:
   ```typescript
   import './i18n/i18n-config';  // Initialize i18n before app
   ```

4. Verify build passes:
   ```bash
   pnpm build
   ```

## Todo List

- [ ] Install i18next dependencies
- [ ] Create src/i18n directory
- [ ] Create i18n-config.ts with base setup
- [ ] Update main.tsx to import i18n
- [ ] Verify build passes

## Success Criteria

- [ ] Dependencies installed in package.json
- [ ] i18n-config.ts created with proper configuration
- [ ] main.tsx imports i18n config
- [ ] `pnpm build` passes without errors
- [ ] No TypeScript errors

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Package version conflicts | Low | Use latest stable versions |
| TypeScript types missing | Low | @types included in packages |

## Security Considerations

- No sensitive data in i18n config
- localStorage only stores language preference string

## Next Steps

After completion, proceed to [Phase 2: Create Translation Files](./phase-02-create-translation-files.md)
