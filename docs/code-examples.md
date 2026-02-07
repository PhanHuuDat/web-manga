# Web-Manga: Code Examples & Patterns

Detailed code examples referenced from [Code Standards](./code-standards.md).

---

## Design System (CSS Variables)

```css
/* src/styles/variables.css */
:root {
  /* Backgrounds */
  --bg-primary: #0F172A;    /* slate-900 - Main background */
  --bg-secondary: #1E293B;  /* slate-800 - Cards, surfaces */
  --bg-tertiary: #334155;   /* slate-700 - Hover states */

  /* Accents */
  --accent-primary: #0EA5E9;   /* sky-500 - Primary actions */
  --accent-secondary: #38BDF8; /* sky-400 - Hover/highlights */

  /* Text */
  --text-primary: #F8FAFC;     /* slate-50 - Main text */
  --text-secondary: #94A3B8;   /* slate-400 - Muted text */
  --text-tertiary: #64748B;    /* slate-500 - Disabled */

  /* Borders */
  --border-primary: #334155;   /* slate-700 */
  --border-secondary: #475569; /* slate-600 */

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;

  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;

  /* Transitions */
  --transition-fast: 150ms ease-in-out;
  --transition-base: 200ms ease-in-out;
}
```

---

## TypeScript Examples

### Type Annotations

```typescript
// Good: Explicit types
function calculateTotal(items: MangaItem[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// Good: Inferred from context
const items = manga.chapters.filter(ch => ch.available);

// Avoid: Any type
function process(data: any) { }  // BAD

// Better: Unknown or specific type
function process(data: unknown) { }
function process(data: MangaData) { }
```

### Interfaces vs Types

```typescript
// Interface: extendable object contract
interface MangaBase {
  id: string;
  title: string;
}

interface Manga extends MangaBase {
  chapters: Chapter[];
  author: string;
}

// Type: union or specialized
type MangaStatus = 'ongoing' | 'completed' | 'hiatus';
type MangaOrChapter = Manga | Chapter;
```

---

## React Component Examples

### Basic Component Pattern

```typescript
// src/components/manga/MangaCard.tsx
import type { Manga } from '../../types/manga-types';
import './MangaCard.css';

interface MangaCardProps {
  manga: Manga;
  onSelect: (id: string) => void;
}

function MangaCard({ manga, onSelect }: MangaCardProps) {
  return (
    <div className="manga-card" onClick={() => onSelect(manga.id)}>
      <h2 className="manga-card__title">{manga.title}</h2>
    </div>
  );
}

export default MangaCard;
```

### SearchBar (Phase 1 Implementation)

```typescript
// src/components/navigation/SearchBar.tsx (47 LOC)
import { useState } from 'react';
import type { SearchBarProps } from '../../types/navigation-types';
import './SearchBar.css';

function SearchBar({ onSearch, placeholder = 'Search manga...' }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <button type="submit" className="search-bar__button" aria-label="Search">
        {/* SVG icon */}
      </button>
      <input
        type="text"
        className="search-bar__input"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search manga"
      />
    </form>
  );
}

export default SearchBar;
```

### GenreDropdown (Phase 1 Implementation)

```typescript
// src/components/navigation/GenreDropdown.tsx (85 LOC)
import { useState, useRef, useEffect } from 'react';
import type { GenreDropdownProps } from '../../types/navigation-types';
import './GenreDropdown.css';

function GenreDropdown({ genres, onGenreSelect }: GenreDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div
      className="genre-dropdown"
      ref={dropdownRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="genre-dropdown__button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Genres
      </button>
      {isOpen && (
        <div className="genre-dropdown__menu">
          {genres.map((genre) => (
            <button
              key={genre.id}
              className="genre-dropdown__item"
              onClick={() => {
                onGenreSelect(genre.id);
                setIsOpen(false);
              }}
            >
              {genre.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default GenreDropdown;
```

---

## Custom Hooks Example

```typescript
// src/hooks/use-manga.ts
import { useState, useEffect } from 'react';
import type { Manga } from '../types/manga-types';

function useManga(id: string): { manga: Manga | null; loading: boolean } {
  const [manga, setManga] = useState<Manga | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchManga(id)
      .then(setManga)
      .finally(() => setLoading(false));
  }, [id]);

  return { manga, loading };
}
```

---

## CSS Examples

### BEM Pattern

```css
/* src/components/navigation/SearchBar.css */
.search-bar {
  display: flex;
  align-items: center;
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  transition: var(--transition-fast);
}

.search-bar:focus-within {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.15);
}

.search-bar__input {
  flex: 1;
  padding: var(--space-3) var(--space-4);
  background: transparent;
  border: none;
  color: var(--text-primary);
  outline: none;
}

.search-bar__input::placeholder {
  color: var(--text-tertiary);
}

.search-bar__button {
  padding: var(--space-3);
  color: var(--text-secondary);
  transition: var(--transition-fast);
  cursor: pointer;
}

.search-bar__button:hover {
  color: var(--accent-primary);
}
```

### Responsive Design

```css
/* Mobile first approach */
.manga-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

@media (min-width: 768px) {
  .manga-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .manga-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## Error Handling Example

```typescript
async function fetchMangaData(id: string): Promise<Manga> {
  try {
    const response = await fetch(`/api/manga/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      console.error('Network error fetching manga:', error);
    } else {
      console.error('Failed to fetch manga:', error);
    }
    throw error;
  }
}
```

---

## Performance Patterns

```typescript
import { memo, useCallback } from 'react';

// Memoized component
const MangaCard = memo(function MangaCard({ manga, onSelect }: Props) {
  return <div onClick={() => onSelect(manga.id)}>{manga.title}</div>;
});

// Stable callback
function MangaList() {
  const navigate = useNavigate();

  const handleSelect = useCallback((id: string) => {
    navigate(`/manga/${id}`);
  }, [navigate]);

  return <MangaCard manga={manga} onSelect={handleSelect} />;
}
```

---

## Git Commit Example

```
feat(navbar): add genre dropdown with hover effect

- Implement genre dropdown component with hover/click toggle
- Add 2-column grid layout for 12 genres
- Include click-outside handler to close dropdown
- Support mobile responsive design

Closes #15
```

---

## Related Documentation

- [Code Standards](./code-standards.md) - Guidelines and conventions
- [System Architecture](./system-architecture.md) - Technical design
- [Codebase Summary](./codebase-summary.md) - File structure
