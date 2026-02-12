# Web-Manga: Manga Reading Web Application

A modern, responsive web application for discovering, reading, and managing manga using React and TypeScript.

**Status:** Phase 1 - Complete (100%), Phase 2 - In Progress (60%)
**Version:** 0.2.0
**Last Updated:** 2026-02-12

---

## Quick Start

### Prerequisites
- Node.js 18+
- Git
- pnpm (npm install -g pnpm)

### Installation & Setup
```bash
# Clone repository
git clone <repository-url>
cd web-manga

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Visit http://localhost:5173
```

### Build for Production
```bash
pnpm build         # Creates optimized dist/ folder
pnpm preview       # Test production build locally
pnpm lint          # Check code quality
```

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Framework** | React | 19.2.0 |
| **Language** | TypeScript | 5.9.3 |
| **Build Tool** | Vite | 7.2.4 |
| **Compiler** | SWC (via plugin-react-swc) | 4.2.2 |
| **Linting** | ESLint | 9.39.1 |

---

## Project Structure

```
web-manga/
├── src/                        # Application source code (~6,664 LOC)
│   ├── components/            # Reusable React components (~3,400 LOC)
│   │   ├── layout/           # Layout components
│   │   │   ├── Layout.tsx    # Main layout wrapper
│   │   │   └── Navbar.tsx    # Fixed navigation bar
│   │   ├── navigation/       # Navigation controls
│   │   │   ├── SearchBar.tsx # Search input
│   │   │   ├── UserMenu.tsx  # User dropdown
│   │   │   └── GenreDropdown.tsx # Genre selector
│   │   ├── auth/             # Authentication components
│   │   │   ├── AuthLayout.tsx # Auth page layout
│   │   │   ├── LoginForm.tsx # Login form
│   │   │   └── RegisterForm.tsx # Registration form
│   │   ├── common/           # Common UI components
│   │   │   ├── Badge.tsx, GlassCard.tsx
│   │   │   ├── IconButton.tsx, PasswordField.tsx
│   │   │   ├── SocialLoginButton.tsx, StatusBadge.tsx
│   │   │   └── ErrorBoundary.tsx
│   │   ├── comment/          # Comment system
│   │   │   ├── CommentItem.tsx, CommentInput.tsx
│   │   │   ├── CommentList.tsx, ReactionButtons.tsx
│   │   │   ├── MangaCommentSection.tsx
│   │   │   ├── ChapterCommentSidebar.tsx
│   │   │   └── PageCommentModal.tsx
│   │   ├── manga/            # Manga components
│   │   │   ├── MangaInfo.tsx
│   │   │   └── ChapterList.tsx
│   │   └── reader/           # Reader interface
│   │       ├── VerticalReader.tsx, HorizontalReader.tsx
│   │       ├── ReaderToolbar.tsx
│   │       └── ReaderProgress.tsx
│   │
│   ├── pages/                 # Page-level components
│   │   ├── HomePage.tsx       # Manga discovery grid
│   │   ├── auth/             # Auth pages
│   │   │   ├── LoginPage.tsx
│   │   │   └── RegisterPage.tsx
│   │   ├── manga/            # Manga pages
│   │   │   └── MangaDetailPage.tsx
│   │   └── reader/           # Reader pages
│   │       └── ReaderPage.tsx
│   │
│   ├── store/                 # Redux state management
│   │   ├── index.ts          # Store configuration
│   │   ├── hooks.ts          # Typed hooks
│   │   └── slices/           # State slices
│   │       └── comment-slice.ts
│   │
│   ├── types/                 # TypeScript interfaces
│   │   ├── genre-types.ts, navigation-types.ts
│   │   ├── comment-types.ts  # Comment system types
│   │   └── manga-types.ts    # Manga/chapter types
│   │
│   ├── constants/             # Application constants
│   │   ├── genres.ts
│   │   ├── mock-chapter-data.ts
│   │   └── mock-comment-data.ts
│   │
│   ├── utils/                 # Utility functions
│   │   ├── format-relative-time.ts
│   │   └── format-number.ts
│   │
│   ├── i18n/                  # Internationalization
│   │   ├── i18n-config.ts    # i18n initialization
│   │   └── locales/          # Translation files
│   │       ├── en/           # English (common, home, auth, manga, reader, comment)
│   │       └── vi/           # Vietnamese (common, home, auth, manga, reader, comment)
│   │
│   ├── styles/                # Global styles
│   │   ├── reset.css, variables.css
│   │   ├── global.css, App.css
│   │
│   ├── App.tsx                # Root component with routing
│   └── main.tsx               # React entry point
│
├── public/                     # Static assets
├── docs/                       # Project documentation
│   ├── project-overview-pdr.md      # Project vision & requirements
│   ├── code-standards.md            # Coding conventions & patterns
│   ├── system-architecture.md       # Technical architecture
│   ├── codebase-summary.md          # File structure & organization
│   └── project-roadmap.md           # Development phases & timeline
│
├── plans/                      # Implementation plans & reports
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript configuration
├── eslint.config.js           # ESLint rules
├── package.json               # Dependencies & scripts
└── README.md                  # This file
```

---

## Available Commands

```bash
# Development
pnpm dev              # Start dev server with HMR (http://localhost:5173)

# Production
pnpm build            # Build for production (tsc -b && vite build)
pnpm preview          # Preview production build locally

# Code Quality
pnpm lint             # Run ESLint checks
pnpm lint -- --fix    # Auto-fix linting issues

# Testing
pnpm test             # Run unit tests (Vitest)
pnpm test:e2e         # Run end-to-end tests (Playwright)
```

---

## Development Guidelines

### Code Standards
Follow the standards defined in `./docs/code-standards.md`:
- TypeScript strict mode enabled
- ESLint rules enforced
- Component naming: PascalCase (e.g., `MangaCard.tsx`)
- File naming: kebab-case (e.g., `manga-service.ts`)
- 2-space indentation
- Semicolons required

### Before Committing
```bash
pnpm lint   # Code quality check
pnpm build  # Verify production build
```

### Git Workflow
- Use descriptive commit messages
- Follow conventional commits format
- One feature per pull request
- Ensure all checks pass before merging

---

## Documentation

Comprehensive documentation is available in the `./docs` directory:

- **[project-overview-pdr.md](./docs/project-overview-pdr.md)** - Project vision, requirements, success metrics
- **[code-standards.md](./docs/code-standards.md)** - Coding conventions and style guide
- **[system-architecture.md](./docs/system-architecture.md)** - Technical architecture and design decisions
- **[codebase-summary.md](./docs/codebase-summary.md)** - Directory structure and file purposes
- **[project-roadmap.md](./docs/project-roadmap.md)** - Development timeline and phases

---

## Project Status

### Phase 1: Foundation & UI Framework (COMPLETE)
- [x] Development environment setup
- [x] TypeScript & ESLint configuration
- [x] UI foundation with 6 components (170 LOC)
- [x] Navigation system (navbar, search, menus)
- [x] Homepage with 12 genre grid
- [x] React Router v7 integration
- [x] Redux store configuration
- [x] Design system (colors, typography)
- [x] Project documentation complete
- [x] README updated
- [x] All code passes TypeScript strict mode
- [x] Responsive design (mobile-first)

### Phase 2: Component Library & State Management (In Progress - 60%)
- [x] Common components (Badge, GlassCard, IconButton, PasswordField, SocialLoginButton, StatusBadge, ErrorBoundary)
- [x] Auth UI components (AuthLayout, LoginForm, RegisterForm)
- [x] Comment system (8 components with nested replies, reactions)
- [x] Manga components (MangaInfo, ChapterList)
- [x] Reader components (Vertical/Horizontal modes, toolbar, progress tracking)
- [x] Redux slice for comments (comment-slice.ts)
- [x] i18n namespaces (auth, manga, reader, comment)
- [x] Utility functions (format-relative-time, format-number)
- [ ] Theme switching (dark/light mode) - infrastructure ready
- [ ] API service foundation - still planned
- [ ] Unit tests for components - not started

### Phase 3: Manga Discovery (Early Implementation - 20%)
- [x] Manga detail page (MangaDetailPage) with info and chapter list
- [ ] Manga catalog browsing with filters
- [ ] Search functionality with real data

### Phase 4: Reading Experience (Early Implementation - 40%)
- [x] Chapter reader interface (VerticalReader, HorizontalReader)
- [x] Reader toolbar with zoom, fullscreen, mode controls
- [x] Progress tracking with Intersection Observer
- [x] Page comment modal
- [ ] Real API integration for chapters
- [ ] Bookmarks system

### Phase 5: User Features (Early Implementation - 30%)
- [x] Authentication UI pages (LoginPage, RegisterPage)
- [x] Auth forms with validation (LoginForm, RegisterForm)
- [x] Social login buttons (Google, Facebook, Twitter)
- [ ] Real authentication backend integration
- [ ] User library management

### Phase 6: Advanced Features (Pending)
- [ ] Community features
- [ ] PWA & mobile optimization

See `./docs/project-roadmap.md` for detailed timeline and roadmap.

---

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Performance

- **Target Bundle Size:** < 500KB (gzipped)
- **Lighthouse Score Target:** 90+
- **Initial Load Time Target:** < 3 seconds

---

## Security

The application implements:
- TypeScript strict type checking
- XSS prevention (React auto-escaping)
- Planned: CSRF protection
- Planned: Secure authentication

---

## Contributing

### For Team Members

1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make your changes and ensure tests pass
3. Follow code standards (run `npm run lint`)
4. Submit a pull request with clear description
5. Address review feedback
6. Merge once approved

### Code Review Checklist
- [ ] TypeScript strict mode passes
- [ ] ESLint passes without warnings
- [ ] Code follows naming conventions
- [ ] Components are properly typed
- [ ] No console.log statements
- [ ] Accessibility considered
- [ ] Commit messages follow conventions

---

## Troubleshooting

### Port Already in Use
```bash
# On Windows (change 5173 to your desired port)
pnpm dev -- --port 3000

# On macOS/Linux
PORT=3000 pnpm dev
```

### TypeScript Errors
```bash
# Verify TypeScript configuration
pnpm build
```

### ESLint Issues
```bash
# Auto-fix common issues
pnpm lint -- --fix
```

### Clear Build Cache
```bash
rm -rf dist node_modules/.vite
npm run build
```

---

## Performance Tips

### Development
- Use `pnpm dev` for fast HMR (hot module replacement)
- Browser DevTools: Check React DevTools extension
- Performance profiling: Chrome DevTools Performance tab

### Production
- Check bundle size: `pnpm build` output
- Lighthouse audit: Chrome DevTools → Lighthouse
- Network tab: Verify caching and compression

---

## Resources

- **React Documentation:** https://react.dev
- **Vite Guide:** https://vite.dev
- **TypeScript Handbook:** https://www.typescriptlang.org/docs/
- **ESLint Rules:** https://eslint.org/docs/rules/
- **Web Accessibility (WCAG):** https://www.w3.org/WAI/WCAG21/quickref/

---

## Project Metrics

| Metric | Target | Status |
|--------|--------|--------|
| TypeScript Coverage | 100% | ✓ |
| ESLint Passing | All | ✓ |
| Bundle Size (gzipped) | < 500KB | ✓ |
| Lighthouse Score | 90+ | Pending |
| Test Coverage | 80%+ | Pending |

---

## FAQ

**Q: What's the current status of the project?**
A: Phase 1 (Foundation) is complete. Phase 2 (Component library & state management) is 60% complete with auth UI, comment system, manga detail, and reader components implemented.

**Q: When will the manga reader be ready?**
A: Reader UI is implemented (vertical/horizontal modes, toolbar, progress tracking). Backend integration for real manga data is pending.

**Q: How can I contribute?**
A: Follow the Contributing section above. Create a feature branch and submit a PR.

**Q: Is authentication implemented?**
A: Authentication UI pages and forms are complete. Backend integration is pending.

---

## Support

For questions, issues, or suggestions:
- Create an issue on GitHub
- Check existing documentation in `./docs`
- Review code standards for implementation guidelines

---

## License

TBD

---

## Version History

| Version | Date | Status | Highlights |
|---------|------|--------|-----------|
| 0.2.0 | 2026-02-12 | Phase 2 (60%) | Auth UI, comment system, manga detail, reader components |
| 0.1.0 | 2026-02-06 | Phase 1 Complete | UI foundation, routing, design system |
| 0.0.0 | Initial | Initial setup | Development environment |

---

## What's New in v0.2.0

**Phase 2 Progress (60%)!** Major component implementations:
- **Auth System:** LoginPage, RegisterPage with forms, validation, social login buttons
- **Comment System:** Full featured with nested replies (max depth 3), reactions (like/dislike), manga/chapter/page comments
- **Manga Detail:** MangaInfo component with cover/stats/synopsis, ChapterList with sort toggle
- **Reader Interface:** Vertical + Horizontal reading modes, toolbar with zoom/fullscreen/mode controls, progress bar with scroll tracking, page comment modal
- **Common Components:** Badge, GlassCard, IconButton, PasswordField, SocialLoginButton, StatusBadge, ErrorBoundary
- **State Management:** Redux comment slice implemented
- **Routing:** Added /login, /register, /manga/:id, /read/:mangaId/:chapterId, 404 page
- **i18n:** Added auth, manga, reader, comment namespaces (English & Vietnamese)
- **Utilities:** format-relative-time, format-number helpers

**What's Missing:** Real API integration, theme switching implementation, unit tests

See `./docs/project-roadmap.md` for updated Phase 2 details.

---

**Last Updated:** 2026-02-12

