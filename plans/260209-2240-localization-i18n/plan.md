---
title: "Localization (i18n) Implementation"
description: "Add Vietnamese and English language support using react-i18next"
status: complete
priority: P2
effort: 5h
branch: main
tags: [i18n, localization, react-i18next, feature]
created: 2026-02-09
---

# Localization (i18n) Implementation Plan

## Overview

Implement multi-language support for Web-Manga with Vietnamese (vi) and English (en) using react-i18next.

**Brainstorm Report:** [brainstorm-260209-2240-localization-i18n.md](../reports/brainstorm-260209-2240-localization-i18n.md)

## Requirements Summary

| Requirement | Value |
|-------------|-------|
| Languages | Vietnamese (vi), English (en) |
| Detection | Browser locale → localStorage |
| Persistence | localStorage only (no URL prefix) |
| File structure | JSON nested by feature |
| Pluralization | Yes |
| TypeScript | Typed translations |

## Dependencies

```bash
pnpm add i18next react-i18next i18next-browser-languagedetector
```

## Architecture

```
src/
├── i18n/
│   ├── i18n-config.ts           # i18next initialization
│   ├── locales/
│   │   ├── vi/
│   │   │   ├── common.json      # Shared UI strings
│   │   │   └── home.json        # HomePage strings
│   │   └── en/
│   │       ├── common.json
│   │       └── home.json
│   └── i18n-types.ts            # TypeScript definitions
├── components/
│   └── common/
│       └── LanguageSwitcher.tsx # Language toggle component
```

## Implementation Phases

| Phase | Description | Status | Effort |
|-------|-------------|--------|--------|
| [Phase 1](./phase-01-setup-i18next-dependencies.md) | Setup i18next & dependencies | Complete | 1h |
| [Phase 2](./phase-02-create-translation-files.md) | Create translation JSON files | Complete | 1.5h |
| [Phase 3](./phase-03-create-language-switcher.md) | Create LanguageSwitcher component | Complete | 1h |
| [Phase 4](./phase-04-integrate-translations.md) | Integrate translations into components | Complete | 1.5h |

## Success Criteria

- [x] Language auto-detected from browser on first visit
- [x] User can switch between vi/en via UI
- [x] Language preference persisted in localStorage
- [x] All UI text translatable
- [x] Pluralization works (e.g., chapter count)
- [x] No visual breaks when switching languages
- [x] TypeScript typed translations
- [x] Build passes without errors

## Files to Modify

**New Files:**
- `src/i18n/i18n-config.ts`
- `src/i18n/i18n-types.ts`
- `src/i18n/locales/vi/common.json`
- `src/i18n/locales/vi/home.json`
- `src/i18n/locales/en/common.json`
- `src/i18n/locales/en/home.json`
- `src/components/common/LanguageSwitcher.tsx`

**Modified Files:**
- `src/main.tsx` - Import i18n config
- `src/components/layout/Navbar.tsx` - Add LanguageSwitcher, translate strings
- `src/components/navigation/SearchBar.tsx` - Translate placeholder
- `src/pages/HomePage.tsx` - Translate all strings

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Missing translations | Fallback to English |
| Bundle size (+19KB) | Acceptable for feature value |
| Type safety gaps | Generate types from JSON |
