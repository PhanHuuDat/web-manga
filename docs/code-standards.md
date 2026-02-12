# Web-Manga: Code Standards & Conventions

## Overview

Coding standards for consistency, maintainability, and code quality.

**Enforcement:** ESLint + TypeScript strict mode
**Commands:** `pnpm lint` (check) | `pnpm lint -- --fix` (auto-fix)

---

## General Principles

1. **KISS:** Keep It Simple, Stupid
2. **DRY:** Don't Repeat Yourself
3. **YAGNI:** You Aren't Gonna Need It
4. **Type Safety:** Use TypeScript strict mode
5. **Accessibility:** Follow WCAG 2.1 standards

---

## File Naming Conventions

| Type | Format | Example |
|------|--------|---------|
| Components | PascalCase.tsx | `MangaCard.tsx`, `SearchBar.tsx` |
| Services/Utils | kebab-case.ts | `manga-service.ts`, `date-utils.ts` |
| Types | kebab-case.ts | `manga-types.ts`, `navigation-types.ts` |
| Styles | Match component | `Navbar.css`, `SearchBar.css` |
| Constants | kebab-case.ts | `genres.ts`, `api-constants.ts` |

---

## TypeScript Standards

### Strict Mode (Enabled)
- `noImplicitAny`, `strictNullChecks`, `noUnusedLocals`, `noUnusedParameters`

### Type Annotations Required For:
- Function parameters and return types
- Variable declarations (if not obvious)
- Class properties

### Interfaces vs Types
- **Interfaces:** Object contracts, class implementation, extensible types
- **Types:** Union types, tuple types, utility type operations

---

## React & Component Standards

### Functional Components
- Use function declaration with typed props
- Props interface: `{ComponentName}Props`
- One component per file

### Component File Structure
```
src/components/{category}/
├── ComponentName.tsx    # Component logic
└── ComponentName.css    # Component styles
```

### Code Order (within file)
1. Imports (React → 3rd party → local → styles)
2. Types/Interfaces
3. Component function
4. Export

### Hooks
- Custom hooks: `use{HookName}` in `src/hooks/`
- Document dependencies in comments
- Group related hooks at component top

---

## Import Organization

**Order:**
1. React and React DOM
2. Third-party libraries
3. Local components
4. Local utilities and types
5. Styles

**Style:**
- Named imports when possible
- Default imports for components
- Use `type` keyword for type imports

---

## Naming Conventions

| Type | Format | Example |
|------|--------|---------|
| Variables/Functions | camelCase | `mangaList`, `fetchData` |
| Booleans | is/has/can/should prefix | `isLoading`, `hasChapters` |
| Constants | UPPER_SNAKE_CASE | `API_BASE_URL`, `MAX_ITEMS` |
| Enums | PascalCase | `UserRole.Admin` |

---

## Code Style

- **Indentation:** 2 spaces
- **Semicolons:** Required
- **Trailing commas:** Use in multiline objects/arrays
- **Early returns:** Prefer over nested conditionals
- **Comments:** Explain "why", not "what"

---

## Error Handling

- Use try-catch for async operations
- Handle specific errors, not generic catches
- Log errors with context
- Use Error Boundaries for React rendering errors

---

## CSS & Styling Standards

### Design System
See [code-examples.md](./code-examples.md) for full color palette.

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | #0F172A | Main background |
| `--bg-secondary` | #1E293B | Cards, surfaces |
| `--accent-primary` | #0EA5E9 | Primary actions |
| `--text-primary` | #F8FAFC | Main text |
| `--text-secondary` | #94A3B8 | Muted text |

### Typography
- **Display:** Righteous (headings)
- **Body:** Poppins (reading)

### BEM Pattern
```css
.block { }           /* Component */
.block__element { }  /* Part of component */
.block--modifier { } /* Variation */
```

### Responsive Design
- Mobile-first approach
- Breakpoints: 768px (tablet), 1024px (desktop)

---

## Performance Guidelines

- **Bundle Target:** < 500KB gzipped
- **React:** Use memo(), useCallback() for expensive operations
- **Code Splitting:** Lazy load routes and heavy components

---

## Testing Standards

- **Unit Testing:** Vitest with React Testing Library
- **E2E Testing:** Playwright
- **Coverage:** 80%+
- **Location:** `__tests__/` or `.test.ts` suffix

---

## ESLint & Formatting

- **Config:** `eslint.config.js` (flat config, ESLint 9+)
- **Key Rules:** No unused variables, proper Hook dependencies

### Pre-commit
```bash
pnpm lint   # Must pass
pnpm build  # Verify TypeScript
pnpm test   # Unit tests should pass
```

---

## Git Commit Messages

**Format:** `<type>(<scope>): <subject>`

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

---

## Code Review Checklist

- [ ] TypeScript strict mode passes
- [ ] ESLint passes
- [ ] Components properly typed
- [ ] No console.log statements
- [ ] Accessibility considered
- [ ] Commit messages follow conventions

---

## Quick Reference

| Category | Standard |
|----------|----------|
| Components | PascalCase.tsx |
| Files | kebab-case.ts |
| Variables | camelCase |
| Constants | UPPER_SNAKE_CASE |
| Styles | kebab-case, BEM |
| Indentation | 2 spaces |
| Semicolons | Required |

---

## Redux Slice Naming Conventions

### File Structure
- Location: `src/store/slices/`
- Naming: `{feature}-slice.ts` (e.g., `comment-slice.ts`, `auth-slice.ts`)

### Slice Naming
- Slice name: `{feature}` (lowercase, singular)
- Actions: `{verb}{Noun}` (e.g., `addComment`, `updateUser`)
- Selectors: `select{Noun}` (e.g., `selectComments`, `selectUser`)

### Example
```typescript
const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    addComment: (state, action) => { },
    updateComment: (state, action) => { },
    deleteComment: (state, action) => { },
  },
});
```

---

## i18n Standards

### Namespace Organization
- **common.json** - Shared UI text (buttons, navigation, errors)
- **{feature}.json** - Feature-specific translations (auth, manga, reader, comment)

### Translation Keys
- Use dot notation: `{section}.{key}`
- Lowercase with underscores: `auth.login_button`, `manga.chapter_count`
- Avoid deep nesting (max 2 levels)

### Usage in Components
```typescript
import { useTranslation } from 'react-i18next';

const { t } = useTranslation('auth'); // Specify namespace
const buttonText = t('login_button');
```

---

## Error Boundary Guidelines

### When to Use
- Wrap root Routes in App.tsx
- Wrap critical sections (reader, payment flows)
- Around third-party components

### Implementation
```typescript
<ErrorBoundary>
  <Component />
</ErrorBoundary>
```

**Features:**
- Logs errors to console (production: send to monitoring service)
- Shows user-friendly fallback UI
- Provides reload button
- Does not catch event handler errors (use try-catch)

---

## Related Documentation

- [Code Examples](./code-examples.md) - Detailed code patterns and examples
- [System Architecture](./system-architecture.md) - Technical design
- [Codebase Summary](./codebase-summary.md) - File structure
