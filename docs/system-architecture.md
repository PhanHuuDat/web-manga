# Web-Manga: System Architecture

## Architecture Overview

Web-Manga is built as a **Single Page Application (SPA)** using React 19, Redux Toolkit, and React Router, providing a fast, responsive reading experience. The architecture emphasizes modularity, type safety, performance, and component reusability.

**Status:** Phase 1-6 complete (100%) with full feature implementation including anti-leak image scrambling. Auth system, comment system, manga detail, reader with scrambled page descrambling, file upload, view tracking, and CI/CD fully implemented.

---

## High-Level Architecture Diagram

```
┌────────────────────────────────────────────────────────┐
│              Browser (Client SPA)                       │
├────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │          React 19 + Router (Vite)               │  │
│  │                                                   │  │
│  │  ┌────────────────────────────────────────┐    │  │
│  │  │    UI Components (170 LOC)             │    │  │
│  │  │  ├─ Layout (Navbar + Outlet)           │    │  │
│  │  │  ├─ Navigation (SearchBar, Menus)      │    │  │
│  │  │  └─ Pages (HomePage with genres)       │    │  │
│  │  └────────────────────────────────────────┘    │  │
│  │                    ↓                            │  │
│  │  ┌────────────────────────────────────────┐   │  │
│  │  │    Redux Toolkit Store                 │   │  │
│  │  │  ├─ State management                   │   │  │
│  │  │  ├─ useAppDispatch / useAppSelector    │   │  │
│  │  │  └─ Slices (to be implemented)         │   │  │
│  │  └────────────────────────────────────────┘   │  │
│  │                    ↓                            │  │
│  │  ┌────────────────────────────────────────┐   │  │
│  │  │    Service Layer (planned)             │   │  │
│  │  │  ├─ API services                       │   │  │
│  │  │  └─ Storage services                   │   │  │
│  │  └────────────────────────────────────────┘   │  │
│  │                    ↓                            │  │
│  │  ┌────────────────────────────────────────┐   │  │
│  │  │    Data Layer                          │   │  │
│  │  │  ├─ Fetch API (planned)                │   │  │
│  │  │  ├─ localStorage                       │   │  │
│  │  │  └─ Session cache                      │   │  │
│  │  └────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
└────────────────────────────────────────────────────────┘
                        ↓ (API calls)
        ┌──────────────────────────────┐
        │    Backend APIs (planned)     │
        │  - Manga data                 │
        │  - User authentication        │
        │  - Bookmarks & history        │
        └──────────────────────────────┘
```

---

## Architecture Layers

### 1. Presentation Layer (UI Components)

**Responsibility:** Render UI and handle user interactions

**Current Components (Phase 1 + Phase 2):**
- **Pages:**
  - `HomePage.tsx` - Displays 12 genres in 2-column grid
  - `LoginPage.tsx`, `RegisterPage.tsx` - Auth pages
  - `MangaDetailPage.tsx` - Manga detail with info and chapters
  - `ReaderPage.tsx` - Chapter reader with vertical/horizontal modes

- **Layout:**
  - `Layout.tsx` - Main wrapper with React Router Outlet
  - `Navbar.tsx` - Fixed navbar with logo, search, menu, user profile
  - `AuthLayout.tsx` - Auth page wrapper

- **Navigation:**
  - `SearchBar.tsx` - Search input with icon
  - `GenreDropdown.tsx` - Genre selector with hover/click behavior
  - `UserMenu.tsx` - User profile dropdown

- **Auth Components:**
  - `LoginForm.tsx`, `RegisterForm.tsx` - Auth forms with validation
  - `SocialLoginButton.tsx` - Social auth buttons

- **Comment System (8 components):**
  - `CommentItem.tsx`, `CommentInput.tsx`, `CommentList.tsx`
  - `ReactionButtons.tsx` - Like/dislike reactions
  - `MangaCommentSection.tsx`, `ChapterCommentSidebar.tsx`, `PageCommentModal.tsx`

- **Manga Components:**
  - `MangaInfo.tsx` - Manga info display with cover, stats, synopsis
  - `ChapterList.tsx` - Chapter list with sort toggle

- **Reader Components:**
  - `VerticalReader.tsx`, `HorizontalReader.tsx` - Reading modes
  - `ScrambledPageCanvas.tsx` - Canvas-based image descrambler with IntersectionObserver (Phase 6)
  - `ReaderToolbar.tsx` - Controls (zoom, fullscreen, mode)
  - `ReaderProgress.tsx` - Progress bar with scroll tracking

- **Common Components:**
  - `Badge.tsx`, `GlassCard.tsx`, `IconButton.tsx`
  - `PasswordField.tsx`, `StatusBadge.tsx`, `ErrorBoundary.tsx`

**Phase 6 Additions:**
- ScrambledPageCanvas component for anti-leak image descrambling
- image-descrambler.ts utility with mulberry32 PRNG implementation
- Anti-leak CSS (user-select, context-menu disabled) on ReaderPage
- Lazy loading + IntersectionObserver for performance

**Technology:** React 19 functional components with hooks

**Styling:** CSS Modules pattern with BEM naming

```typescript
// Component Hierarchy Example
<App>
  <Router>
    <MainLayout>
      <Header />
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/manga/:id" element={<MangaDetailPage />} />
        <Route path="/read/:id" element={<ReaderPage />} />
      </Routes>
      <Footer />
    </MainLayout>
  </Router>
</App>
```

### 2. State Management Layer

**Responsibility:** Manage application state and side effects

**Current Approach:** Redux Toolkit (configured, not yet active)

**Configuration:**
- Redux store configured at `src/store/index.ts`
- Typed hooks exported from `src/store/hooks.ts`
  - `useAppDispatch` - Typed dispatch hook
  - `useAppSelector` - Typed selector hook

**State Slices (Implemented):**
- `commentSlice` - Comment state with nested replies, reactions, add/update/delete actions

**State Slices (Planned):**
- `mangaSlice` - Manga catalog, current manga, chapters
- `authSlice` - User authentication, profile, permissions
- `uiSlice` - Theme, modal states, sidebar visibility
- `readingSlice` - Reading history, bookmarks, progress

**Pattern Example:**
```typescript
// Store setup (done)
export const store = configureStore({ reducer: {} })

// Hook usage (ready for components)
const dispatch = useAppDispatch()
const mangaList = useAppSelector(state => state.manga.list)
```

**Phase 2 Tasks:**
- Create Redux slices for core features
- Implement thunk middleware for API calls
- Add Redux DevTools integration
- Create async actions for data fetching

### 3. Service Layer

**Responsibility:** Business logic and data operations

**Services:**
- **API Services:** HTTP requests to backend
  - `manga-service.ts` - Fetch manga, chapters, pages
  - `auth-service.ts` - Authentication operations
  - `user-service.ts` - User profile, preferences

- **Storage Services:** Local/session storage
  - `local-storage.ts` - Persistent user data
  - `session-storage.ts` - Temporary session data

- **Utility Services:** Shared business logic
  - `format-utils.ts` - Text formatting
  - `date-utils.ts` - Date operations
  - `validation.ts` - Input validation

**Design Pattern:** Singleton instances for shared services

```typescript
// API Service Example
export const mangaService = {
  async getManga(id: string): Promise<Manga> {
    const response = await fetch(`/api/manga/${id}`)
    if (!response.ok) throw new Error('Failed to fetch')
    return response.json()
  },

  async getChapters(mangaId: string): Promise<Chapter[]> {
    const response = await fetch(`/api/manga/${mangaId}/chapters`)
    if (!response.ok) throw new Error('Failed to fetch chapters')
    return response.json()
  },
}
```

### 4. Data Layer

**Responsibility:** Data persistence and retrieval

**Data Sources:**
- **Remote API:** Backend server (REST/GraphQL)
- **Local Storage:** Browser localStorage
- **Session Storage:** Browser sessionStorage
- **In-Memory:** JavaScript objects/arrays (caching)

**Caching Strategy:**
- Memory cache for current session data
- localStorage for user preferences
- API calls with cache invalidation

```typescript
// Data layer separation
const dataLayer = {
  api: {
    getManga: async (id: string) => fetch(`/api/manga/${id}`),
  },
  storage: {
    savePreferences: (prefs: UserPreferences) => localStorage.setItem(...),
    getPreferences: () => JSON.parse(localStorage.getItem(...)),
  },
}
```

---

## Technology Stack

### Frontend Framework
- **React 19.2.0**
  - Functional components with hooks
  - Context API for state
  - Error boundaries for error handling

### Language & Tooling
- **TypeScript 5.9.3**
  - Strict mode enabled
  - Type-safe development
  - Better IDE support

- **Vite 7.2.4**
  - Fast dev server with HMR
  - Optimized production builds
  - Native ES modules

### Compilation & Optimization
- **SWC (via @vitejs/plugin-react-swc)**
  - Fast TypeScript transformation
  - React Fast Refresh support
  - Optimized builds

### Code Quality
- **ESLint 9.39.1**
  - JavaScript/TypeScript linting
  - React plugin
  - React Hooks validation

---

## Build Pipeline

### Development Build
```
Source Code (TS/TSX)
        ↓
    ESLint check
        ↓
  Vite Dev Server
        ↓
   HMR (browser)
```

**Characteristics:**
- No minification (readability)
- Source maps included (debugging)
- Hot Module Replacement (fast refresh)

### Production Build
```
Source Code (TS/TSX)
        ↓
TypeScript Check (tsc -b)
        ↓
    ESLint Verify
        ↓
    Vite Build
        ├── Tree-shake unused code
        ├── Minify/compress
        ├── Code split (routes)
        ├── Optimize images
        └── Generate source maps
        ↓
    dist/ directory
```

**Build Command:** `npm run build`
1. Type checking: `tsc -b`
2. Bundling: `vite build`
3. Output: Production-ready `/dist` folder

**Optimization:**
- Code splitting by route
- Image optimization (WebP)
- CSS minification
- Minified JavaScript

---

## Routing Architecture

### Current Routing (Phase 1 + Phase 2)
```
/                      → HomePage (12 genre grid)
/login                 → LoginPage (authentication)
/register              → RegisterPage (user registration)
/manga/:id             → MangaDetailPage (info, chapters)
/read/:mangaId/:chapterId → ReaderPage (chapter viewer)
*                      → 404 Not Found page
```

**Implementation:** React Router v7.13.0 (integrated in App.tsx with ErrorBoundary)

```typescript
<ErrorBoundary>
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/manga/:id" element={<MangaDetailPage />} />
        <Route path="/read/:mangaId/:chapterId" element={<ReaderPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
</ErrorBoundary>
```

### Planned Routing (Phase 3+)
```
/library               → LibraryPage (user's manga)
/search                → SearchResultsPage
/settings              → SettingsPage (preferences)
/profile               → ProfilePage (user profile)
```

---

## Data Flow Example

### Reading a Manga Chapter (Data Flow)

```
User clicks "Read Chapter"
        ↓
ReaderPage component mounts
        ↓
useEffect → useManga(mangaId) hook
        ↓
mangaService.getChapter(id)
        ↓
API call → fetch('/api/manga/:id/chapter/:num')
        ↓
Backend returns chapter data + page images
        ↓
Hook updates state → Component re-renders
        ↓
PageViewer displays current page
        ↓
User scrolls/navigates → Update page state
```

---

## Error Handling Strategy

### Error Types & Handling

| Error Type | Location | Handling |
|------------|----------|----------|
| Network errors | Service layer | Try-catch, retry logic, user notification |
| Type errors | All layers | TypeScript prevents at compile time |
| Render errors | Components | Error boundary catches, fallback UI |
| Validation errors | Service layer | Early validation, clear error messages |
| State errors | Hooks/Components | Default values, null checks |

### Error Boundary Implementation
```typescript
// Implemented in src/components/common/ErrorBoundary.tsx
// Wraps all routes in App.tsx
<ErrorBoundary>
  <Routes>
    {/* All routes */}
  </Routes>
</ErrorBoundary>
```

**Features:**
- Catches React render errors
- Displays user-friendly fallback UI
- Logs error details for debugging
- Reload button for recovery

---

## Performance Considerations

### Code Splitting
- Route-based code splitting
- Component lazy loading
- Third-party library extraction

### Caching Strategy
- API response caching (memory + localStorage)
- Image lazy loading
- Asset preloading for critical resources

### Optimization Techniques
- React.memo for expensive components
- useCallback for stable function references
- useMemo for expensive calculations
- Image optimization (WebP, responsive sizes)

### Bundle Size Target
- **Target:** < 500KB gzipped
- **Monitoring:** Vite analyze plugin
- **Strategy:** Tree-shake unused code, lazy load routes

---

## Security Architecture

### Authentication Flow
```
User Login Form
        ↓
    API POST /auth/login
        ↓
Backend validates credentials
        ↓
Returns JWT token
        ↓
Store in secure cookie/localStorage
        ↓
Include in API requests (Authorization header)
```

### Anti-Leak Image Descrambling (Phase 6)
```
User views chapter page
        ↓
ScrambledPageCanvas receives scrambled image + seed
        ↓
Mulberry32 PRNG generates deterministic tile order
        ↓
Fisher-Yates descramble (reverse of 8x8 tile shuffle)
        ↓
Canvas renders descrambled image
        ↓
Context menu & screenshot disabled via CSS
```

**Features:**
- Deterministic descrambling (same seed always produces same image)
- Cross-platform parity: frontend/backend use identical mulberry32 PRNG
- Lazy loading: only descrambles visible images
- Transparent to users: no speed penalty

### Security Headers
- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- Strict-Transport-Security (HTTPS only)

### Data Protection
- No sensitive data in localStorage
- XSS prevention (React auto-escapes)
- CSRF protection via tokens
- Input validation & sanitization
- Image scrambling prevents visual spoiler leakage

---

## Scalability Considerations

### When to Upgrade Architecture

**Current (0-50KB components):**
- React hooks + Context API sufficient
- Services for business logic

**Medium (50-200KB components):**
- Consider Redux/Zustand for state
- Module federation for large features
- API request caching layer

**Large (200KB+ components):**
- Full state management system
- Micro-frontend architecture
- Separate data layer service
- API GraphQL layer

### Horizontal Scaling
- Component library extraction
- Feature-based module structure
- Shared services across modules

---

## External Dependencies & APIs

### Backend API Endpoints (Planned)
```
GET    /api/manga              - List manga
GET    /api/manga/:id          - Manga details
GET    /api/manga/:id/chapters - Chapters list
GET    /api/manga/:id/chapter/:num - Chapter pages
POST   /api/auth/login         - User authentication
GET    /api/user/profile       - User profile
POST   /api/bookmarks          - Save bookmarks
```

### Third-Party Libraries (Future)
- **State:** Redux/Zustand
- **Routing:** React Router v6
- **HTTP:** Axios or fetch API
- **Forms:** React Hook Form
- **Validation:** Zod or Joi
- **Date:** date-fns

---

## Development to Production Flow

```
Development Branch
        ↓
Feature implementation + testing
        ↓
Code review + quality checks
        ↓
Merge to main
        ↓
CI/CD Pipeline
  ├── Lint (ESLint)
  ├── Type check (TypeScript)
  ├── Test (Vitest & Playwright)
  ├── Build (Vite)
  └── Deploy to production
        ↓
Monitoring & analytics
        ↓
Bug fixes/patches
```

---

## Deployment Architecture

### Target Platforms
- **Web:** Modern browsers (Chrome, Firefox, Safari, Edge)
- **Mobile:** iOS Safari, Chrome Mobile (responsive design)
- **Progressive Enhancement:** Graceful degradation for older browsers

### Hosting (Recommended)
- **Static hosting:** Vercel, Netlify, GitHub Pages
- **Backend:** Cloud platform (AWS, GCP, Azure)
- **CDN:** CloudFlare, AWS CloudFront

### CI/CD Pipeline
- Automated tests on every push
- Build verification
- Automated deployment to staging
- Manual approval for production

---

## System Architecture Diagram (Detailed)

```
┌──────────────────────────────────────────────────────────┐
│                  Client Browser (SPA)                    │
├──────────────────────────────────────────────────────────┤
│                                                            │
│ UI Components Layer                                        │
│  ├─ HomePage            │ MangaDetailPage                │
│  ├─ ReaderPage          │ LibraryPage                    │
│  ├─ Header/Footer       │ Navigation                     │
│  └─ Shared Components   │ (Card, Grid, Modal, etc.)      │
│                                                            │
│  ↓ State via Hooks & Props                               │
│                                                            │
│ State Management Layer                                     │
│  ├─ useState/useContext │ useReducer                      │
│  ├─ Custom Hooks        │ Effect Management               │
│  └─ Context Providers   │ (Auth, Theme, etc.)             │
│                                                            │
│  ↓ Service calls                                          │
│                                                            │
│ Service Layer                                              │
│  ├─ mangaService        │ authService                     │
│  ├─ storageService      │ userService                     │
│  └─ utilityFunctions    │ validators                      │
│                                                            │
│  ↓ API & Storage                                          │
│                                                            │
│ Data Layer                                                 │
│  ├─ HTTP Client         │ fetch/axios                    │
│  ├─ localStorage        │ sessionStorage                 │
│  └─ In-memory cache     │ (JavaScript objects)            │
│                                                            │
└──────────────────────────────────────────────────────────┘
            ↓ (API Requests)        ↑ (JSON Responses)
┌──────────────────────────────────────────────────────────┐
│              Backend API Server                            │
│  - Manga data  │ User authentication                      │
│  - Chapters    │ Bookmarks & history                      │
│  - Images      │ User preferences                         │
└──────────────────────────────────────────────────────────┘
            ↓ (Database Queries)    ↑ (Results)
┌──────────────────────────────────────────────────────────┐
│              Database & File Storage                       │
│  - PostgreSQL  │ MongoDB                                  │
│  - Redis Cache │ Object storage (S3, GCS, etc.)           │
└──────────────────────────────────────────────────────────┘
```

---

## Design System (Phase 1)

### Color Palette
**Deep Ocean Blue Theme** with high contrast for readability:
```
Primary Background:  #0F172A (slate-900)
Secondary BG:        #1E293B (slate-800)
Tertiary BG:         #334155 (slate-700)
Primary Accent:      #0EA5E9 (sky-500)
Secondary Accent:    #38BDF8 (sky-400)
Primary Text:        #F8FAFC (slate-50)
Secondary Text:      #94A3B8 (slate-400)
```

### Typography
- **Display Font:** Righteous (Bold, distinctive)
- **Body Font:** Poppins (Readable, modern)
- Imported from Google Fonts in `src/styles/global.css`

### CSS Variables
Defined in `src/styles/variables.css` for easy theming:
```css
:root {
  --bg-primary, --bg-secondary, --bg-tertiary,
  --accent-primary, --accent-secondary,
  --text-primary, --text-secondary
}
```

---

## Next Architecture Phases

### Phase 2: Component Library & State
- Expand component library (Button, Card, Modal, Form components)
- Implement Redux slices for state management
- Add theme switching (dark/light mode)
- Create API service layer
- Set up unit tests

### Phase 3: Features
- Manga browsing with filters
- Search functionality
- Reading experience foundation
- User authentication scaffolding

### Phase 4: Scale
- Performance optimization
- Caching strategies
- CDN integration
- Analytics & monitoring

---

## References

- React Documentation: https://react.dev
- Vite Guide: https://vite.dev
- TypeScript Handbook: https://www.typescriptlang.org/docs/

