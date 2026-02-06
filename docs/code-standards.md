# Web-Manga: Code Standards & Conventions

## Overview

This document defines coding standards for the web-manga project to ensure consistency, maintainability, and code quality across the codebase.

**Enforcement:** ESLint + TypeScript strict mode
**Auto-fix:** `npm run lint -- --fix`
**Check Only:** `npm run lint`

---

## General Principles

1. **KISS:** Keep It Simple, Stupid - prefer clarity over cleverness
2. **DRY:** Don't Repeat Yourself - extract reusable code
3. **YAGNI:** You Aren't Gonna Need It - don't over-engineer
4. **Type Safety:** Use TypeScript strict mode
5. **Performance:** Consider bundle size and runtime performance
6. **Accessibility:** Follow WCAG 2.1 standards

---

## File Naming Conventions

### Components
- **Format:** PascalCase with `.tsx` extension
- **Example:** `MangaCard.tsx`, `UserProfile.tsx`
- **Rationale:** Distinguishes React components from utilities

### Services & Utilities
- **Format:** kebab-case with `.ts` extension
- **Example:** `manga-service.ts`, `date-utils.ts`, `format-text.ts`
- **Rationale:** Consistent with non-component modules

### Type Definitions
- **Format:** kebab-case with `.ts` extension
- **Example:** `manga-types.ts`, `api-types.ts`
- **Alternative:** Suffix with `.types.ts` (e.g., `manga.types.ts`)

### Styles
- **Format:** Match component/module name
- **Example:** `MangaCard.css`, `global-styles.css`
- **Note:** Consider CSS-in-JS or CSS modules for scale

### Constants
- **Format:** kebab-case
- **Example:** `manga-constants.ts`
- **Export:** Named exports with descriptive names

---

## TypeScript Standards

### Strict Mode

**Enabled:** Yes (tsconfig.app.json)

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### Type Annotations

**Required for:**
- Function parameters
- Function return types
- Variable declarations (if not obvious)
- Class properties

**Optional for:**
- Loop variables with obvious types
- Object destructuring with clear context

### Examples

```typescript
// Good: Explicit types
function calculateTotal(items: MangaItem[]): number {
  return items.reduce((sum, item) => sum + item.price, 0)
}

const user: User = getUserFromAPI()

// Good: Inferred from context
const items = manga.chapters.filter(ch => ch.available)

// Avoid: Any type
function process(data: any) { }  // BAD

// Better: Unknown or specific type
function process(data: unknown) { }
function process(data: MangaData) { }
```

### Interfaces vs Types

**Use Interfaces for:**
- Object contracts
- Class implementation
- Extensible types

**Use Types for:**
- Union types
- Tuple types
- Utility type operations

```typescript
// Interface: extendable object contract
interface MangaBase {
  id: string
  title: string
}

interface Manga extends MangaBase {
  chapters: Chapter[]
  author: string
}

// Type: union or specialized
type MangaStatus = 'ongoing' | 'completed' | 'hiatus'
type MangaOrChapter = Manga | Chapter
```

---

## React & Component Standards

### Functional Components
- **Format:** Use function declaration or arrow function
- **Typing:** Export typed components
- **Props:** Use interface for props type

```typescript
// Good: Function declaration with typed props
interface MangaCardProps {
  manga: Manga
  onSelect: (id: string) => void
}

function MangaCard({ manga, onSelect }: MangaCardProps) {
  return (
    <div onClick={() => onSelect(manga.id)}>
      <h2>{manga.title}</h2>
    </div>
  )
}

export default MangaCard
```

### Props Interface Naming
- **Format:** `{ComponentName}Props`
- **Location:** Same file or separate types file
- **Export:** Named export

### Component Organization

```typescript
// Order of code in component file:
// 1. Imports
// 2. Types/Interfaces
// 3. Constants
// 4. Component function
// 5. Styles (if local)
// 6. Export
```

### Hooks Usage

**Custom Hooks:**
- **Naming:** `use{HookName}` (e.g., `useManga`, `useLocalStorage`)
- **Location:** `src/hooks/` directory
- **Export:** Named export

```typescript
// Good: Custom hook with clear contract
function useManga(id: string): { manga: Manga | null; loading: boolean } {
  const [manga, setManga] = useState<Manga | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchManga(id).then(setManga).finally(() => setLoading(false))
  }, [id])

  return { manga, loading }
}
```

**Built-in Hooks:**
- Document dependencies properly in comments
- Group related hooks at component top
- Use custom hooks to reduce logic duplication

### Component Props

**Guidelines:**
- Keep props interface small and focused
- Use spread operator for sub-component props
- Avoid prop drilling (use context if needed)
- Document complex props

```typescript
// Good: Focused props
interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

// Good: Spreading for flexibility
function Card({ children, ...props }: CardProps) {
  return <div className="card" {...props}>{children}</div>
}

// Avoid: Prop drilling multiple levels
function Page({ user, theme, language, onLogout, ... }) {
  return <Header user={user} theme={theme} language={language} />
}
```

---

## Import Organization

**Order:**
1. React and React DOM
2. Third-party libraries
3. Local components (relative)
4. Local utilities and types (relative)
5. Styles (local)

```typescript
// Good import ordering
import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'  // 3rd party

import MangaCard from '../components/MangaCard'  // Components
import { fetchManga } from '../services/manga-service'  // Services
import type { Manga } from '../types/manga'  // Types
import './HomePage.css'  // Styles
```

**Style:**
- Use named imports when possible
- Use default imports for components
- Use `type` keyword for type imports (TypeScript)
- Avoid relative paths beyond `../../../` (restructure instead)

---

## Naming Conventions

### Variables & Functions
- **Format:** camelCase
- **Clarity:** Descriptive names (not `x`, `temp`, `data`)
- **Booleans:** Prefix with `is`, `has`, `can`, `should`

```typescript
// Good
const isMangaLoaded = true
const hasChapters = manga.chapters.length > 0
const canRead = user.isSubscribed || manga.isFree
const shouldShowAd = !user.isPremium

// Avoid
const loaded = true
const chapters = true
const read = true
```

### Constants
- **Format:** UPPER_SNAKE_CASE (if module-level)
- **Location:** Top of file or separate constants file
- **Scope:** Only for true constants (not magic strings)

```typescript
// Good
const API_BASE_URL = 'https://api.manga.com'
const MAX_CHAPTERS_PER_PAGE = 20
const VALID_IMAGE_FORMATS = ['jpg', 'png', 'webp']

// Avoid magic strings
const status = 'completed'  // Should use enum or constant
```

### Enums
- **Format:** PascalCase for enum, UPPER_CASE for values
- **Usage:** Prefer union types for simple cases

```typescript
// Good: Union type for simple cases
type MangaStatus = 'ongoing' | 'completed' | 'hiatus'

// Good: Enum for complex cases
enum UserRole {
  Admin = 'admin',
  Moderator = 'moderator',
  User = 'user',
}
```

---

## Code Style

### Indentation & Spacing
- **Indentation:** 2 spaces (configured in ESLint)
- **Line length:** Aim for 80-100 characters (flexibility allowed)
- **Semicolons:** Required (ESLint enforces)
- **Trailing commas:** Use in multiline objects/arrays

```typescript
// Good
const manga: Manga = {
  id: '123',
  title: 'Popular Manga',
  chapters: [1, 2, 3],
}

// Good: Function formatting
function renderMangaList(
  mangas: Manga[],
  onSelect: (id: string) => void,
  filter?: MangaFilter,
): JSX.Element {
  return <div>...</div>
}
```

### Conditionals

**Prefer:**
- Early returns in functions
- Ternary for simple cases
- Guard clauses for validation

```typescript
// Good: Early return
function getMangaDisplay(manga: Manga | null) {
  if (!manga) return <div>No manga found</div>
  return <MangaCard manga={manga} />
}

// Good: Guard clause
function processManga(id: string) {
  if (!id) throw new Error('ID required')
  const manga = getManga(id)
  // Process manga...
}

// Avoid: Nested conditionals
if (manga) {
  if (manga.available) {
    if (user.canRead) {
      // Deep nesting - refactor
    }
  }
}
```

### Comments

**Write:**
- Comments explaining "why", not "what"
- Complex algorithm explanations
- Important assumptions
- TODO/FIXME for known issues

```typescript
// Good: Explains reasoning
// We cache manga data for 5 minutes to reduce API calls
const cacheTTL = 5 * 60 * 1000

// Good: Explains complex logic
// Use modified timestamp to handle clock skew
const isExpired = Date.now() - modified > tolerance

// Avoid: Obvious comments
const title = manga.title  // Set title
```

---

## Error Handling

### Try-Catch Blocks
- **Use:** For async operations and critical sections
- **Handle:** Specific errors, not generic catches
- **Log:** Errors with context

```typescript
// Good: Specific error handling
async function fetchMangaData(id: string): Promise<Manga> {
  try {
    const response = await fetch(`/api/manga/${id}`)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    if (error instanceof TypeError) {
      console.error('Network error fetching manga:', error)
    } else {
      console.error('Failed to fetch manga:', error)
    }
    throw error
  }
}
```

### Error Boundaries
- **Location:** Wrap major sections
- **Purpose:** Catch React rendering errors
- **Fallback:** Display user-friendly error message

---

## CSS & Styling Standards

### Class Naming
- **Format:** kebab-case
- **Structure:** BEM-like (Block-Element-Modifier)

```css
/* Block */
.manga-card { }

/* Element */
.manga-card__header { }
.manga-card__image { }

/* Modifier */
.manga-card--featured { }
.manga-card--compact { }
```

### CSS Variables
- **Format:** `--category-name-property`
- **Location:** `:root` for globals, component for locals

```css
:root {
  --color-primary: #1f2937
  --color-secondary: #6b7280
  --spacing-base: 1rem
  --spacing-lg: 1.5rem
  --border-radius: 0.5rem
}

.manga-card {
  background: var(--color-bg-card)
  padding: var(--spacing-base)
  border-radius: var(--border-radius)
}
```

### Responsive Design
- **Mobile First:** Base styles for mobile
- **Breakpoints:** Use consistent values
- **Media Queries:** Place near related styles

```css
.manga-grid {
  grid-template-columns: 1fr  /* Mobile */
}

@media (min-width: 768px) {
  .manga-grid {
    grid-template-columns: repeat(2, 1fr)  /* Tablet */
  }
}

@media (min-width: 1024px) {
  .manga-grid {
    grid-template-columns: repeat(3, 1fr)  /* Desktop */
  }
}
```

---

## Performance Guidelines

### Bundle Size
- **Target:** < 500KB gzipped
- **Monitor:** Use Vite analyze plugin
- **Optimize:** Code splitting by route, lazy load components

### React Performance
- **Memoization:** Use memo() for expensive components
- **Callbacks:** Wrap in useCallback when passing as props
- **Effects:** Specify proper dependencies

```typescript
// Good: Memoized component
const MangaCard = memo(function MangaCard({ manga, onSelect }: Props) {
  return <div onClick={() => onSelect(manga.id)}>{manga.title}</div>
})

// Good: Callback dependency
const handleSelect = useCallback((id: string) => {
  navigate(`/manga/${id}`)
}, [navigate])
```

---

## Testing Standards

### Unit Tests
- **Framework:** Jest (to be set up)
- **Coverage:** 80%+
- **Location:** `__tests__/` or `.test.ts` suffix

### Test Naming
```typescript
describe('useManga hook', () => {
  it('should fetch manga data on mount', () => { })
  it('should handle network errors gracefully', () => { })
  it('should cache results for 5 minutes', () => { })
})
```

---

## ESLint & Formatting

### Configuration
- **File:** `eslint.config.js`
- **Format:** Flat config (ESLint 9+)
- **Auto-fix:** `npm run lint -- --fix`

### Key Rules
- No unused variables
- No console.log in production
- Proper React Hook dependencies
- No direct DOM manipulation

### Pre-commit Checks
```bash
npm run lint   # Must pass before commit
npm run build  # Verify TypeScript
```

---

## Git Commit Messages

**Format:** Conventional Commits

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting
- `refactor` - Code restructuring
- `test` - Tests
- `chore` - Build, deps, etc.

**Example:**
```
feat(manga-card): add bookmark button

- Implement bookmark toggle functionality
- Update UI to show bookmarked state
- Add bookmark service integration

Closes #42
```

---

## Code Review Checklist

Before submitting a PR:
- [ ] TypeScript strict mode passes (`npm run build`)
- [ ] ESLint passes (`npm run lint`)
- [ ] All tests pass (`npm test`)
- [ ] Components are properly typed
- [ ] No console.log statements
- [ ] Props are well-documented
- [ ] Accessibility considered
- [ ] Performance impact assessed
- [ ] Commit messages follow conventions

---

## Quick Reference

| Category | Standard |
|----------|----------|
| Components | PascalCase.tsx |
| Files | kebab-case.ts |
| Variables | camelCase |
| Constants | UPPER_SNAKE_CASE |
| Styles | kebab-case |
| Types | PascalCase (interfaces) |
| Indentation | 2 spaces |
| Semicolons | Required |
| Quotes | Single quotes (ESLint) |

---

## Additional Resources

- TypeScript Handbook: https://www.typescriptlang.org/docs/
- React Docs: https://react.dev
- ESLint Rules: https://eslint.org/docs/rules/
- Airbnb JavaScript Style Guide: https://github.com/airbnb/javascript

