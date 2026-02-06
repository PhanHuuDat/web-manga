# Web-Manga: System Architecture

## Architecture Overview

Web-Manga is built as a **Single Page Application (SPA)** using React, providing a fast, responsive reading experience. The architecture emphasizes modularity, type safety, and performance.

---

## High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Browser (Client)                      │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌──────────────────────────────────────────────────┐   │
│  │           React SPA (Vite Build)                 │   │
│  │                                                   │   │
│  │  ┌─────────────────────────────────────────┐    │   │
│  │  │     UI Layer (React Components)         │    │   │
│  │  │  ┌──────────────────────────────────┐  │    │   │
│  │  │  │ Pages (Home, Reader, Library)    │  │    │   │
│  │  │  │ Components (MangaCard, Header)   │  │    │   │
│  │  │  └──────────────────────────────────┘  │    │   │
│  │  └─────────────────────────────────────────┘    │   │
│  │                      ↓                          │   │
│  │  ┌─────────────────────────────────────────┐   │   │
│  │  │    Hooks & State Management             │   │   │
│  │  │  - React Hooks (useState, useEffect)    │   │   │
│  │  │  - Custom hooks (useManga, etc.)        │   │   │
│  │  │  - Context API (if needed)              │   │   │
│  │  └─────────────────────────────────────────┘   │   │
│  │                      ↓                          │   │
│  │  ┌─────────────────────────────────────────┐   │   │
│  │  │    Service Layer                        │   │   │
│  │  │  - API services                         │   │   │
│  │  │  - Storage services                     │   │   │
│  │  │  - Business logic                       │   │   │
│  │  └─────────────────────────────────────────┘   │   │
│  │                      ↓                          │   │
│  │  ┌─────────────────────────────────────────┐   │   │
│  │  │    Data Layer                           │   │   │
│  │  │  - API calls (fetch/axios)              │   │   │
│  │  │  - Local storage                        │   │   │
│  │  │  - Session storage                      │   │   │
│  │  └─────────────────────────────────────────┘   │   │
│  └──────────────────────────────────────────────────┘  │
│                                                           │
└─────────────────────────────────────────────────────────┘
                          ↓
                ┌──────────────────────┐
                │   Backend APIs       │
                │ (to be integrated)   │
                │                      │
                │ - Manga data         │
                │ - User auth          │
                │ - Bookmarks/history  │
                └──────────────────────┘
```

---

## Architecture Layers

### 1. Presentation Layer (UI Components)

**Responsibility:** Render UI and handle user interactions

**Components:**
- **Pages:** Full-screen view containers
  - HomePage
  - MangaDetailPage
  - ReaderPage
  - LibraryPage

- **Components:** Reusable UI building blocks
  - MangaCard
  - ChapterList
  - Header/Navigation
  - ErrorBoundary

- **Layouts:** Container components
  - MainLayout
  - ReaderLayout

**Technology:** React 19 functional components with hooks

**State Management:** React hooks (useState, useContext, useReducer)

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

**Approach:** React Hooks + Context API (initial), optional Redux/Zustand for scale

**Current State:**
- Local component state (useState)
- Side effects (useEffect)
- Custom hooks for shared logic

**Future Enhancements:**
- Global state management (Redux/Zustand)
- Authentication context
- Theme/preferences context

```typescript
// Example: Custom hook managing state
function useManga(id: string) {
  const [manga, setManga] = useState<Manga | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetchManga(id)
      .then(setManga)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [id])

  return { manga, loading, error }
}
```

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
    // Implementation
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

### Planned Routing Structure
```
/                      → HomePage (browse manga)
/manga/:id             → MangaDetailPage (info, chapters)
/read/:id/:chapter     → ReaderPage (chapter viewer)
/library               → LibraryPage (user's manga)
/settings              → SettingsPage (preferences)
/login                 → LoginPage (authentication)
/profile               → ProfilePage (user profile)
/404                   → NotFoundPage
```

**Implementation:** React Router v6+ (to be integrated)

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

### Error Boundary Example
```typescript
<ErrorBoundary fallback={<ErrorFallback />}>
  <ReaderPage />
</ErrorBoundary>
```

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

### Authentication Flow (Planned)
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
  ├── Test (Jest)
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

## Next Architecture Phases

### Phase 2: Enhancement
- Add routing (React Router)
- Implement state management (Redux/Zustand)
- API integration foundation
- Component library completion

### Phase 3: Features
- Manga browsing with filters
- Reading experience optimization
- User authentication
- Bookmark/history system

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

