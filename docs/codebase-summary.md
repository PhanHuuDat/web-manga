# Web-Manga: Codebase Summary

## Quick Overview

Web-Manga is a React + TypeScript + Vite single-page application for reading and managing manga. The codebase uses modern development practices with type safety, fast refresh, and optimized builds.

**Current Lines of Code:** ~7,200+ across 85+ source files
**Source Directories:** 35+ directories
**TypeScript Coverage:** 100%
**Build Tool:** Vite 7.2.4
**Styling:** Material UI v7 + Emotion (Deep Ocean Blue theme)
**Status:** Phase 1 Complete (100%), Phase 2 Complete (100%), Phase 3 Complete (100%) - Full API integration with Redux, loading skeletons, real data fetching

---

## Directory Structure

```
web-manga/
├── src/                          # Application source code
│   ├── components/               # Reusable React components (MUI + sx props)
│   │   ├── layout/
│   │   │   ├── Layout.tsx        # Main layout wrapper with MUI Box
│   │   │   └── Navbar.tsx        # Fixed AppBar with Toolbar
│   │   └── navigation/
│   │       ├── SearchBar.tsx     # MUI InputBase search component
│   │       ├── UserMenu.tsx      # MUI IconButton user menu
│   │       └── GenreDropdown.tsx # MUI Button + Menu dropdown
│   │
│   ├── pages/                    # Page-level components
│   │   └── HomePage.tsx          # Landing page with MUI Container/Box/Paper
│   │
│   ├── theme/                    # MUI theming
│   │   └── theme.ts              # Deep Ocean Blue theme configuration
│   │
│   ├── types/                    # TypeScript interfaces
│   │   ├── genre-types.ts        # Genre interface
│   │   └── navigation-types.ts   # Component props types
│   │
│   ├── constants/                # Application constants
│   │   └── genres.ts             # 12 genre definitions
│   │
│   ├── i18n/                     # Internationalization (i18next)
│   │   ├── i18n-config.ts        # i18n initialization
│   │   ├── i18n-types.ts         # Type definitions
│   │   └── locales/              # Translation files
│   │       ├── en/               # English translations
│   │       │   ├── common.json
│   │       │   └── home.json
│   │       └── vi/               # Vietnamese translations
│   │           ├── common.json
│   │           └── home.json
│   │
│   ├── store/                    # Redux store setup
│   │   ├── index.ts              # Store configuration
│   │   └── hooks.ts              # Typed useAppDispatch & useAppSelector
│   │
│   ├── main.tsx                  # React entry point with ThemeProvider
│   └── App.tsx                   # Root component with routing
│
├── public/                        # Static assets served as-is
│   └── vite.svg                  # Vite logo
│
├── docs/                          # Project documentation
│   ├── project-overview-pdr.md    # Project requirements & vision
│   ├── codebase-summary.md        # This file
│   ├── code-standards.md          # Coding conventions
│   ├── system-architecture.md     # Technical design
│   └── project-roadmap.md         # Development timeline
│
├── plans/                         # Implementation plans
│   └── reports/                   # Reports from analysis/research
│
├── index.html                     # HTML entry point with Google Fonts
├── vite.config.ts                 # Vite configuration
├── tsconfig.json                  # TypeScript config reference
├── tsconfig.app.json              # Application TypeScript settings
├── tsconfig.node.json             # Node tooling TypeScript settings
├── eslint.config.js               # ESLint rules configuration
├── package.json                   # Dependencies & scripts
├── pnpm-lock.yaml                 # pnpm dependency lock file
├── README.md                       # Template documentation
└── .gitignore                      # Git ignore rules
```

---

## Key Files & Purposes

### Application Entry Points

#### `index.html` (14 lines)
- Main HTML document
- Contains root `<div id="root">` for React mounting
- References Vite client script with automatic HMR

#### `src/main.tsx`
- React entry point
- Creates root with React 19 APIs
- Wraps app with MUI ThemeProvider + CssBaseline
- Renders App component with StrictMode

#### `src/App.tsx` (19 lines)
- Root component with React Router setup
- Uses Layout wrapper with Outlet
- Configures main routes (/ → HomePage)
- Responsive design with fixed navbar

### Styling System (Material UI v7)

#### Design System Colors (Deep Ocean Blue Theme)
Defined in `src/theme/theme.ts` using MUI's `createTheme()`:
```typescript
palette: {
  mode: 'dark',
  primary.main: '#0EA5E9',      // Ocean blue accent
  secondary.main: '#38BDF8',    // Light blue
  background.default: '#0F172A', // Dark slate
  background.paper: '#1E293B',   // Lighter slate
  text.primary: '#F8FAFC',       // Near white
  text.secondary: '#94A3B8',     // Muted gray
}
```

#### Typography
- **Display (h1-h6):** Righteous (Google Fonts) - Bold, distinctive headings
- **Body:** Poppins (Google Fonts) - Readable, modern content
- Configured via MUI theme `typography` property

#### Styling Approach
- **MUI CssBaseline** - Provides browser normalization (replaces reset.css)
- **sx prop** - All component styling via MUI's sx prop (type-safe, theme-aware)
- **Theme tokens** - Colors, spacing, typography accessed via theme
- **No CSS/SCSS files** - All styles co-located with components in TSX

### Configuration Files

#### `vite.config.ts` (7 lines)
- Defines Vite plugins: react-swc
- Configures build and dev server
- Entry point: index.html
- Output directory: dist/

#### `tsconfig.*.json` (3 files)
- **tsconfig.json:** Config references and shared settings
- **tsconfig.app.json:** Application code type checking
- **tsconfig.node.json:** Build tool type checking (vite.config.ts)

#### `eslint.config.js`
- Flat config format (ESLint 9+)
- Ignores: dist, node_modules
- Rules for JS/TS files
- React and React Hooks plugins enabled

#### `package.json`
- **Dependencies:** react, react-dom
- **DevDependencies:** Build tools, TypeScript, ESLint
- **Scripts:**
  - `dev` - Start Vite dev server
  - `build` - TypeScript check + Vite build
  - `lint` - Run ESLint
  - `preview` - Preview production build

---

## Technology Dependencies

### Runtime Dependencies
```json
{
  "react": "^19.2.0",              // UI framework
  "react-dom": "^19.2.0",          // DOM rendering
  "react-redux": "^9.2.0",         // Redux integration
  "@reduxjs/toolkit": "^2.11.2",   // Redux state management
  "react-router-dom": "^7.13.0",   // Client-side routing
  "@mui/material": "^7.3.7",       // Material UI component library
  "@mui/icons-material": "^7.3.7", // Material UI icons
  "@emotion/react": "^11.14.0",    // CSS-in-JS (MUI dependency)
  "@emotion/styled": "^11.14.1",   // Styled components (MUI dependency)
  "i18next": "^23.7.6",            // Internationalization framework
  "react-i18next": "^14.0.3",      // React i18n integration
  "i18next-browser-languagedetector": "^8.0.0" // Auto language detection
}
```

### Development Dependencies
```json
{
  "@vitejs/plugin-react-swc": "^4.2.2",  // Fast Refresh (SWC)
  "@types/react": "^19.2.5",              // React type definitions
  "@types/react-dom": "^19.2.3",          // React DOM type definitions
  "@types/node": "^24.10.1",              // Node.js type definitions
  "@eslint/js": "^9.39.1",                // ESLint core
  "typescript": "~5.9.3",                 // TypeScript compiler
  "typescript-eslint": "^8.46.4",         // TypeScript ESLint integration
  "eslint": "^9.39.1",                    // Code linter
  "eslint-plugin-react-hooks": "^7.0.1",  // React Hooks rules
  "eslint-plugin-react-refresh": "^0.4.24", // React Fast Refresh rules
  "vite": "^7.2.4",                       // Build tool
  "globals": "^16.5.0"                    // Global variable definitions
}
```

---

## Code Organization (Current State)

### Implemented Structure (Phase 1 Complete, Phase 2 60%)

```
src/                              # All styling via MUI sx props
├── components/                   # Reusable UI components (~3,400 LOC)
│   ├── layout/
│   │   ├── Layout.tsx           # MUI Box wrapper with main padding
│   │   ├── Navbar.tsx           # MUI AppBar + Toolbar + Container
│   │   ├── ProtectedRoute.tsx   # Auth-gated route wrapper
│   │   └── AuthProvider.tsx     # Auth context + axios interceptors
│   ├── navigation/
│   │   ├── SearchBar.tsx        # MUI Box + InputBase + IconButton
│   │   ├── UserMenu.tsx         # MUI IconButton with inline SVG
│   │   └── GenreDropdown.tsx    # MUI Button + Menu + MenuItem grid
│   ├── auth/                    # Authentication components (Redux integrated)
│   │   ├── AuthLayout.tsx       # Auth page wrapper
│   │   ├── LoginForm.tsx        # Login form with API integration
│   │   ├── RegisterForm.tsx     # Registration form with validation
│   │   └── EmailVerification.tsx # Email verification flow
│   ├── common/                  # Shared UI components
│   │   ├── Badge.tsx            # Status badge component
│   │   ├── GlassCard.tsx        # Glassmorphism card
│   │   ├── IconButton.tsx       # Custom icon button
│   │   ├── PasswordField.tsx    # Password input with visibility toggle
│   │   ├── SocialLoginButton.tsx # Social auth button
│   │   ├── StatusBadge.tsx      # Manga status badge
│   │   └── ErrorBoundary.tsx    # Error boundary wrapper
│   ├── comment/                 # Comment system (8 components)
│   │   ├── CommentItem.tsx      # Individual comment
│   │   ├── CommentInput.tsx     # Comment input field
│   │   ├── CommentList.tsx      # Nested comment list
│   │   ├── ReactionButtons.tsx  # Like/dislike buttons
│   │   ├── MangaCommentSection.tsx # Manga page comments
│   │   ├── ChapterCommentSidebar.tsx # Chapter sidebar comments
│   │   ├── PageCommentModal.tsx # Page-specific comments
│   │   └── index.ts             # Comment exports
│   ├── manga/                   # Manga components
│   │   ├── MangaInfo.tsx        # Manga info display
│   │   └── ChapterList.tsx      # Chapter list with sorting
│   └── reader/                  # Reader components
│       ├── VerticalReader.tsx   # Vertical reading mode
│       ├── HorizontalReader.tsx # Horizontal reading mode
│       ├── ReaderToolbar.tsx    # Reader controls
│       └── ReaderProgress.tsx   # Progress bar
│
├── pages/                       # Page-level components
│   ├── HomePage.tsx             # MUI Container + Box + Typography + Paper
│   ├── auth/                    # Auth pages
│   │   ├── LoginPage.tsx        # Login page
│   │   └── RegisterPage.tsx     # Registration page
│   ├── manga/                   # Manga pages
│   │   └── MangaDetailPage.tsx  # Manga detail page
│   └── reader/                  # Reader pages
│       └── ReaderPage.tsx       # Chapter reader page
│
├── i18n/
│   ├── i18n-config.ts           # i18next setup with namespaces
│   ├── i18n-types.ts            # TypeScript types for translations
│   └── locales/                 # Translation JSON files
│       ├── en/                  # English
│       │   ├── common.json, home.json
│       │   ├── auth.json, manga.json
│       │   ├── reader.json, comment.json
│       └── vi/                  # Vietnamese
│           ├── common.json, home.json
│           ├── auth.json, manga.json
│           ├── reader.json, comment.json
│
├── theme/
│   └── theme.ts                 # MUI createTheme with Deep Ocean Blue palette
│
├── types/
│   ├── genre-types.ts           # Genre types
│   ├── navigation-types.ts      # Navigation types
│   ├── comment-types.ts         # Comment system types
│   ├── manga-types.ts           # Manga, Chapter, Page types
│   ├── api-types/               # API DTOs
│   │   ├── manga-dto.ts         # MangaDto, MangaDetailDto, CreateMangaRequest
│   │   ├── chapter-dto.ts       # ChapterDto, ChapterDetailDto
│   │   └── genre-dto.ts         # GenreDto
│   └── index.ts                 # Type exports
│
├── constants/
│   ├── genres.ts                # Genre definitions
│   ├── mock-chapter-data.ts     # Mock chapter data
│   └── mock-comment-data.ts     # Mock comment data
│
├── utils/                       # Utility functions
│   ├── format-relative-time.ts  # Relative time formatter
│   └── format-number.ts         # Number formatter
│
├── services/                    # API & business logic
│   ├── api-client.ts            # Axios instance with interceptors
│   ├── auth-service.ts          # Auth API calls (login, register, refresh, logout)
│   ├── manga-api.ts             # Manga CRUD + search/trending queries
│   ├── chapter-api.ts           # Chapter fetching and listing
│   ├── genre-api.ts             # Genre management & filtering
│   └── token-manager.ts         # Access/refresh token management
│
├── store/
│   ├── index.ts                 # Redux store configuration
│   ├── hooks.ts                 # Typed useAppDispatch & useAppSelector
│   └── slices/                  # Redux slices
│       ├── comment-slice.ts     # Comment state management
│       ├── auth-slice.ts        # Auth state (user, tokens, loading, error)
│       ├── manga-slice.ts       # Manga list, search results, filters (Phase 3)
│       ├── chapter-slice.ts     # Chapter data for reader (Phase 3)
│       ├── genre-slice.ts       # Genre list for filtering (Phase 3)
│       └── ui-slice.ts          # UI state (notifications, modals)
│
├── App.tsx                      # Root component with routing + ErrorBoundary
└── main.tsx                     # Entry point with ThemeProvider + i18n
```

### Planned Structure (Phase 2+ Remaining)

Future additions:
- `src/services/` - API & business logic
- `src/hooks/` - Custom React hooks
- `src/assets/` - Images, icons, fonts
- Additional Redux slices (manga, auth, ui, reading)

---

## Entry Points

### Browser Entry Point
- **File:** `index.html`
- **Action:** Loaded by browser, includes Vite client script
- **Next:** Loads React app at `<div id="root">`

### React Entry Point
- **File:** `src/main.tsx`
- **Action:** Mounts React app to DOM
- **Next:** Renders App component

### Module Entry Point
- **File:** `src/App.tsx`
- **Default export:** App component
- **Dependency:** Consumed by main.tsx

---

## Build Pipeline

### Development Build
```bash
npm run dev
```
- Starts Vite dev server (default: http://localhost:5173)
- Enables Hot Module Replacement (HMR)
- Serves files without bundling
- Fast refresh on file changes

### Production Build
```bash
npm run build
```
1. **TypeScript Check:** `tsc -b`
   - Validates all TypeScript without emitting
   - Catches type errors before bundling
2. **Vite Build:** `vite build`
   - Bundles and minifies
   - Optimizes images and assets
   - Tree-shakes unused code
   - Output: `dist/` directory

### Preview Build
```bash
npm run preview
```
- Serves production build locally
- Useful for testing before deployment
- Static file serving only

---

## Linting & Quality

### ESLint Configuration
- **File:** `eslint.config.js`
- **Format:** Flat config (ESLint 9+)
- **Includes:**
  - Core JS/TS rules
  - React plugin
  - React Hooks plugin
  - React Refresh plugin

### Run Linting
```bash
npm run lint          # Check code
npm run lint -- --fix # Auto-fix issues
```

---

## Development Workflow

### Making Changes
1. **Edit** files in `src/`
2. **HMR** automatically updates browser
3. **Type checking** prevents errors
4. **Linting** ensures code quality

### Before Committing
```bash
npm run lint   # Check code quality
npm run build  # Test production build
```

### File Conventions
- **Components:** PascalCase (`MyComponent.tsx`)
- **Utilities/Services:** camelCase (`myUtility.ts`)
- **Styles:** Match component name (`MyComponent.css`)
- **Types:** Descriptive names (`MangaData.ts`)

---

## Current Capabilities

### Phase 1 Complete (100%)
- [x] React Router v7 setup with Layout wrapper
- [x] Redux Toolkit store configuration with typed hooks
- [x] **Material UI v7 theming** with Deep Ocean Blue palette
- [x] **MUI components** throughout (AppBar, Box, Container, Typography, etc.)
- [x] **sx prop styling** - no external CSS/SCSS files
- [x] Navigation UI (Navbar, SearchBar, UserMenu, GenreDropdown)
- [x] HomePage with 12 genre grid (mobile-first responsive)
- [x] Layout wrapper with dynamic Outlet
- [x] **Internationalization (i18n)** - English & Vietnamese support
- [x] LanguageSwitcher component for language selection
- [x] Accessibility features (focus states, aria labels)
- [x] TypeScript strict mode 100% coverage
- [x] ESLint configuration with React/Hooks plugins
- [x] Comprehensive project documentation

### Phase 2 Implemented (100% - Auth Complete)
- [x] **Auth System:** LoginPage, RegisterPage with LoginForm, RegisterForm
- [x] **Auth API Integration:** axios interceptors, token refresh, logout
- [x] **Protected Routes:** ProtectedRoute component guards authenticated pages
- [x] **Auth Provider:** AuthProvider with context + interceptors
- [x] **Auth Slice:** Redux auth-slice for user state, token caching, loading
- [x] **Token Management:** Access/refresh token handling, HttpOnly cookie support
- [x] **Social Login:** Google, Facebook, Twitter buttons (UI ready for backend)
- [x] **Email Verification:** EmailVerification component for email verification flow
- [x] **Password Reset:** Forms for forgot password & reset password flows
- [x] **Comment System:** Full featured with nested replies (max depth 3), reactions (like/dislike)
- [x] **Comment Components:** CommentItem, CommentInput, CommentList, ReactionButtons, MangaCommentSection, ChapterCommentSidebar, PageCommentModal
- [x] **Manga Detail:** MangaDetailPage with MangaInfo (cover/stats/synopsis), ChapterList (sort toggle)
- [x] **Reader Interface:** ReaderPage with VerticalReader, HorizontalReader modes
- [x] **Reader Controls:** ReaderToolbar (zoom, fullscreen, mode switching), ReaderProgress (scroll tracking)
- [x] **Common Components:** Badge, GlassCard, IconButton, PasswordField, SocialLoginButton, StatusBadge, ErrorBoundary
- [x] **Redux State:** comment-slice.ts, auth-slice.ts, ui-slice.ts implemented
- [x] **API Services:** auth-service, manga-service, token-manager, api-client
- [x] **Routing:** /login, /register, /manga/:id, /read/:mangaId/:chapterId, 404 route
- [x] **i18n Namespaces:** auth, manga, reader, comment (English & Vietnamese)
- [x] **Utilities:** format-relative-time, format-number
- [x] **Mock Data:** mock-chapter-data, mock-comment-data
- [x] **@mui/icons-material** - Included

### Phase 3 Complete (100% - Manga API Integration)
- [x] Manga CRUD API integration via Redux thunks
- [x] Chapter API integration with pagination
- [x] Genre API integration with filtering
- [x] Search API with debounced input (SearchBar component)
- [x] Trending manga endpoint integration
- [x] Redux slices: manga-slice, chapter-slice, genre-slice
- [x] API types: MangaDto, ChapterDto, GenreDto (DTOs matching backend)
- [x] API services: manga-api.ts, chapter-api.ts, genre-api.ts
- [x] Loading skeletons for async data fetches
- [x] HomePage displays real manga grid from API
- [x] MangaDetailPage fetches data via Redux
- [x] ReaderPage retrieves chapters from API
- [x] 19 frontend tests all passing

### Not Yet Implemented (Phase 4+)
- [ ] Theme switching (dark/light mode) - infrastructure ready
- [ ] Unit tests for new Redux slices
- [ ] Custom hooks for API data fetching
- [ ] Infinite scroll / pagination UI
- [ ] Optimistic updates for mutations

---

## Phase 3 Summary: Manga API Endpoints Integration

**Status:** 100% Complete (Feb 16, 2026)

**What Was Built:**
- Full API integration layer: manga-api.ts, chapter-api.ts, genre-api.ts
- Redux slices for manga, chapter, genre state management with async thunks
- API request types (DTOs) matching backend responses
- SearchBar with debounced API queries
- HomePage displaying real manga grid from backend
- MangaDetailPage fetches manga info + chapters via Redux
- ReaderPage retrieves chapter pages from API
- Loading skeletons during data fetch operations
- 19 new frontend tests, all passing
- Error handling & retry logic in Redux thunks

**Key Files Added/Modified:**
- `src/services/manga-api.ts` — Manga CRUD & search queries
- `src/services/chapter-api.ts` — Chapter fetching
- `src/services/genre-api.ts` — Genre listing
- `src/store/slices/manga-slice.ts` — Manga state + async thunks
- `src/store/slices/chapter-slice.ts` — Chapter state
- `src/store/slices/genre-slice.ts` — Genre state
- `src/types/api-types/` — Request/response DTOs
- Updated components: SearchBar, HomePage, MangaDetailPage, ReaderPage

**Next Phase:** Phase 4 (Advanced Search, Bookmarks, Reading History)

See `project-roadmap.md` for detailed timeline and dependencies.

