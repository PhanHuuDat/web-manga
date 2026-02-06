# Web-Manga: Codebase Summary

## Quick Overview

Web-Manga is a React + TypeScript + Vite single-page application for reading and managing manga. The codebase uses modern development practices with type safety, fast refresh, and optimized builds.

**Current Lines of Code:** ~110 (template phase)
**TypeScript Coverage:** 100%
**Build Tool:** Vite 7.2.4

---

## Directory Structure

```
web-manga/
├── src/                          # Application source code
│   ├── main.tsx                  # React root entry point (10 lines)
│   ├── App.tsx                   # Main App component (35 lines)
│   ├── App.css                   # App component styles (42 lines)
│   ├── index.css                 # Global styles (68 lines)
│   └── assets/
│       └── react.svg             # React logo asset
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

#### `src/App.tsx` (35 lines)
- Main App component (template counter demo)
- Uses React hooks (useState)
- Renders Vite + React logos and demo UI
- Will be replaced with actual manga app logic

### Styling

#### `src/index.css` (68 lines)
- Global styles and CSS variables
- Root element styling
- Reset and baseline styles
- Color definitions for light theme

#### `src/App.css` (42 lines)
- Component-specific styles
- Logo animations
- Card and button styling
- Responsive media queries

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
  "react": "^19.2.0",           // UI framework
  "react-dom": "^19.2.0"        // DOM rendering
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

## Code Organization Plans

### Planned Structure (Post-Template Cleanup)

```
src/
├── components/                  # Reusable UI components
│   ├── common/                 # Shared components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── ErrorBoundary.tsx
│   ├── manga/                  # Manga-specific components
│   │   ├── MangaCard.tsx
│   │   ├── MangaGrid.tsx
│   │   └── MangaFilter.tsx
│   └── reader/                 # Reader interface components
│       ├── PageViewer.tsx
│       ├── ChapterNav.tsx
│       └── ReadingControls.tsx
│
├── pages/                       # Page-level components
│   ├── HomePage.tsx
│   ├── MangaDetailPage.tsx
│   ├── ReaderPage.tsx
│   ├── LibraryPage.tsx
│   └── NotFoundPage.tsx
│
├── services/                    # API and business logic
│   ├── api/
│   │   ├── manga-service.ts
│   │   ├── auth-service.ts
│   │   └── user-service.ts
│   └── storage/
│       ├── local-storage.ts
│       └── session-storage.ts
│
├── hooks/                       # Custom React hooks
│   ├── use-manga.ts
│   ├── use-auth.ts
│   ├── use-local-storage.ts
│   └── use-reading-progress.ts
│
├── types/                       # TypeScript interfaces
│   ├── manga.ts
│   ├── user.ts
│   ├── api.ts
│   └── ui.ts
│
├── utils/                       # Utility functions
│   ├── constants.ts
│   ├── format.ts
│   ├── validation.ts
│   └── date-utils.ts
│
├── styles/                      # Global and shared styles
│   ├── globals.css
│   ├── variables.css
│   └── theme.css
│
├── assets/                      # Images, icons, fonts
│   ├── icons/
│   ├── images/
│   └── fonts/
│
├── App.tsx                      # Root component
├── main.tsx                     # Entry point
└── index.css                    # Root styles
```

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

## Current Limitations (Template Phase)

- No routing system implemented yet
- No state management (Redux, Zustand, etc.)
- No API integration
- No authentication
- App component contains demo code (counter)
- Static content only

---

## Next Steps

1. Remove template demo code from App.tsx
2. Implement routing structure
3. Create base component library
4. Set up state management
5. Design and implement API services
6. Build manga browsing features

See `project-roadmap.md` for detailed timeline.

