# Web-Manga: Codebase Summary

## Quick Overview

Web-Manga is a React + TypeScript + Vite single-page application for reading and managing manga. The codebase uses modern development practices with type safety, fast refresh, and optimized builds.

**Current Lines of Code:** ~450 TS/TSX (MUI components with sx props)
**TypeScript Coverage:** 100%
**Build Tool:** Vite 7.2.4
**Styling:** Material UI v7 + Emotion (Deep Ocean Blue theme)
**Status:** Phase 1 (Foundation) Complete - UI foundation, routing & state management established

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

### Implemented Structure (Phase 1 Complete)

```
src/                              # All styling via MUI sx props
├── components/                   # Reusable UI components
│   ├── layout/
│   │   ├── Layout.tsx           # MUI Box wrapper with main padding
│   │   └── Navbar.tsx           # MUI AppBar + Toolbar + Container
│   └── navigation/
│       ├── SearchBar.tsx        # MUI Box + InputBase + IconButton
│       ├── UserMenu.tsx         # MUI IconButton with inline SVG
│       └── GenreDropdown.tsx    # MUI Button + Menu + MenuItem grid
│
├── pages/
│   └── HomePage.tsx             # MUI Container + Box + Typography + Paper
│
├── i18n/
│   ├── i18n-config.ts           # i18next setup with language detection
│   ├── i18n-types.ts            # TypeScript types for translations
│   └── locales/                 # Translation JSON files
│       ├── en/ (common.json, home.json)
│       └── vi/ (common.json, home.json)
│
├── theme/
│   └── theme.ts                 # MUI createTheme with Deep Ocean Blue palette
│
├── types/
│   ├── genre-types.ts
│   └── navigation-types.ts
│
├── constants/
│   └── genres.ts
│
├── store/
│   ├── index.ts                 # Redux store configuration
│   └── hooks.ts                 # Typed useAppDispatch & useAppSelector
│
├── App.tsx                      # Root component with routing
└── main.tsx                     # Entry point with ThemeProvider + i18n
```

### Planned Structure (Phase 2+)

Future additions:
- `src/components/common/` - Shared components (Button, Card, etc.)
- `src/components/manga/` - Manga-specific components
- `src/components/reader/` - Reader interface
- `src/services/` - API & business logic
- `src/hooks/` - Custom React hooks
- `src/utils/` - Utility functions
- `src/assets/` - Images, icons, fonts

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

## Current Capabilities (Phase 1 Complete 100%)

### Implemented
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

### Not Yet Implemented (Phase 2+)
- [ ] Redux slices & state management
- [ ] Extended MUI components (Cards for manga, Modals, etc.)
- [ ] API integration / backend connection
- [ ] Search functionality with real data
- [ ] Genre filtering with API
- [ ] Theme switching (dark/light mode) - theme infrastructure ready
- [ ] Additional language support (currently English & Vietnamese)
- [ ] Manga detail pages
- [ ] Reader interface
- [ ] User authentication
- [ ] @mui/icons-material (noted as future enhancement)

---

## Phase 2 Priorities

1. Create reusable component library (Button, Card, Input, Modal)
2. Implement theme switching (dark/light mode)
3. Add form components and validation
4. Expand layout system (Sidebar, Footer)
5. Set up API service layer
6. Create Redux slices for state management
7. Build unit tests for components

See `project-roadmap.md` for detailed timeline and dependencies.

