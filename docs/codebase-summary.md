# Web-Manga: Codebase Summary

## Quick Overview

Web-Manga is a React + TypeScript + Vite single-page application for reading and managing manga. The codebase uses modern development practices with type safety, fast refresh, and optimized builds.

**Current Lines of Code:** ~800 (UI foundation phase)
**TypeScript Coverage:** 100%
**Build Tool:** Vite 7.2.4
**Status:** Phase 1 (Foundation) - UI foundation complete, routing & state management active

---

## Directory Structure

```
web-manga/
├── src/                          # Application source code
│   ├── components/               # Reusable React components
│   │   ├── layout/
│   │   │   ├── Layout.tsx        # Main layout wrapper (16 LOC)
│   │   │   ├── Layout.css        # Layout styles (18 LOC)
│   │   │   ├── Navbar.tsx        # Fixed navigation bar (40 LOC)
│   │   │   └── Navbar.css        # Navbar styles (73 LOC)
│   │   └── navigation/
│   │       ├── SearchBar.tsx     # Search input component (47 LOC)
│   │       ├── SearchBar.css     # SearchBar styles (48 LOC)
│   │       ├── UserMenu.tsx      # User profile menu (28 LOC)
│   │       ├── UserMenu.css      # UserMenu styles (24 LOC)
│   │       ├── GenreDropdown.tsx # Genre filter dropdown (85 LOC)
│   │       └── GenreDropdown.css # GenreDropdown styles (98 LOC)
│   │
│   ├── pages/                    # Page-level components
│   │   ├── HomePage.tsx          # Landing page with genres (37 LOC)
│   │   └── HomePage.css          # HomePage styles (70 LOC)
│   │
│   ├── types/                    # TypeScript interfaces
│   │   ├── genre-types.ts        # Genre interface (20 LOC)
│   │   └── navigation-types.ts   # Component props types (19 LOC)
│   │
│   ├── constants/                # Application constants
│   │   └── genres.ts             # 12 genre definitions (16 LOC)
│   │
│   ├── store/                    # Redux store setup
│   │   ├── index.ts              # Store configuration
│   │   └── hooks.ts              # Typed useAppDispatch & useAppSelector
│   │
│   ├── styles/                   # Global and shared styles
│   │   ├── reset.css             # Browser normalization (51 LOC)
│   │   ├── variables.css         # CSS design tokens (86 LOC)
│   │   ├── global.css            # Global imports & fonts (66 LOC)
│   │   └── App.css               # App wrapper styles
│   │
│   ├── main.tsx                  # React entry point (10 LOC)
│   └── App.tsx                   # Root component with routing (19 LOC)
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
├── index.html                     # HTML entry point (14 lines)
├── vite.config.ts                 # Vite configuration (7 lines)
├── tsconfig.json                  # TypeScript config reference
├── tsconfig.app.json              # Application TypeScript settings
├── tsconfig.node.json             # Node tooling TypeScript settings
├── eslint.config.js               # ESLint rules configuration
├── package.json                   # Dependencies & scripts
├── package-lock.json              # Dependency lock file
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

#### `src/main.tsx` (10 lines)
- React entry point
- Creates root with React 19 APIs
- Renders App component with StrictMode
- Imports global styles

#### `src/App.tsx` (19 lines)
- Root component with React Router setup
- Uses Layout wrapper with Outlet
- Configures main routes (/ → HomePage)
- Responsive design with fixed navbar

### Styling System

#### Design System Colors (Deep Ocean Blue Theme)
```css
--bg-primary: #0F172A (slate-900)
--bg-secondary: #1E293B (slate-800)
--bg-tertiary: #334155 (slate-700)
--accent-primary: #0EA5E9 (sky-500)
--accent-secondary: #38BDF8 (sky-400)
--text-primary: #F8FAFC (slate-50)
--text-secondary: #94A3B8 (slate-400)
```

#### Typography
- **Display:** Righteous (Google Fonts) - Bold, distinctive headings
- **Body:** Poppins (Google Fonts) - Readable, modern content

#### Style Files
- **`src/styles/reset.css`** - Browser normalization (51 LOC)
- **`src/styles/variables.css`** - CSS design tokens & colors (86 LOC)
- **`src/styles/global.css`** - Global imports, fonts, base styles (66 LOC)
- **Component styles** - Scoped CSS files alongside components (BEM naming)

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
  "react-router-dom": "^7.13.0"    // Client-side routing
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

### Implemented Structure (Phase 1)

```
src/
├── components/                  # Reusable UI components (170 LOC)
│   ├── layout/                 # Layout system
│   │   ├── Layout.tsx          # Main layout wrapper
│   │   ├── Layout.css
│   │   ├── Navbar.tsx          # Fixed navigation bar
│   │   └── Navbar.css
│   └── navigation/             # Navigation controls
│       ├── SearchBar.tsx       # Search input
│       ├── SearchBar.css
│       ├── UserMenu.tsx        # User profile dropdown
│       ├── UserMenu.css
│       ├── GenreDropdown.tsx   # Genre selector
│       └── GenreDropdown.css
│
├── pages/                       # Page-level components (107 LOC)
│   ├── HomePage.tsx            # Manga discovery grid
│   └── HomePage.css
│
├── types/                       # TypeScript interfaces (39 LOC)
│   ├── genre-types.ts
│   └── navigation-types.ts
│
├── constants/                   # Application constants (16 LOC)
│   └── genres.ts
│
├── store/                       # Redux store setup
│   ├── index.ts                # Store configuration
│   └── hooks.ts                # Typed hooks
│
├── styles/                      # Global styles (203 LOC)
│   ├── reset.css
│   ├── variables.css
│   ├── global.css
│   └── App.css
│
├── App.tsx                      # Root component (19 LOC)
└── main.tsx                     # Entry point (10 LOC)
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

## Current Capabilities (Phase 1 Complete)

### Implemented
- [x] React Router setup with Layout wrapper
- [x] Redux store configuration with hooks
- [x] Design system with CSS variables
- [x] Navigation UI (Navbar, SearchBar, UserMenu, GenreDropdown)
- [x] HomePage with 12 genre grid
- [x] Responsive design (mobile-first)
- [x] Accessibility features (focus states, aria labels)
- [x] TypeScript strict mode throughout
- [x] ESLint configuration

### Not Yet Implemented
- [ ] API integration / backend connection
- [ ] User authentication
- [ ] Redux slices & state logic
- [ ] Component library (Button, Card, Modal, etc.)
- [ ] Search functionality
- [ ] Genre filtering
- [ ] Manga detail pages
- [ ] Reader interface

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

