# Web-Manga: Manga Reading Web Application

A modern, responsive web application for discovering, reading, and managing manga using React and TypeScript.

**Status:** Phase 1 - Complete (100%), Phase 2 - In Progress
**Version:** 0.1.0
**Last Updated:** 2026-02-06

---

## Quick Start

### Prerequisites
- Node.js 18+ (with npm)
- Git

### Installation & Setup
```bash
# Clone repository
git clone <repository-url>
cd web-manga

# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:5173
```

### Build for Production
```bash
npm run build      # Creates optimized dist/ folder
npm run preview    # Test production build locally
npm run lint       # Check code quality
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
├── src/                        # Application source code (~800 LOC)
│   ├── components/            # Reusable React components (170 LOC)
│   │   ├── layout/           # Layout components
│   │   │   ├── Layout.tsx    # Main layout wrapper (16 LOC)
│   │   │   └── Navbar.tsx    # Fixed navigation bar (40 LOC)
│   │   └── navigation/       # Navigation controls
│   │       ├── SearchBar.tsx # Search input (47 LOC)
│   │       ├── UserMenu.tsx  # User dropdown (28 LOC)
│   │       └── GenreDropdown.tsx # Genre selector (85 LOC)
│   │
│   ├── pages/                 # Page-level components (107 LOC)
│   │   └── HomePage.tsx       # Manga discovery grid (37 LOC)
│   │
│   ├── store/                 # Redux state management
│   │   ├── index.ts          # Store configuration
│   │   └── hooks.ts          # Typed hooks
│   │
│   ├── types/                 # TypeScript interfaces (39 LOC)
│   │   ├── genre-types.ts
│   │   └── navigation-types.ts
│   │
│   ├── constants/             # Application constants (16 LOC)
│   │   └── genres.ts
│   │
│   ├── styles/                # Global styles (203 LOC)
│   │   ├── reset.css
│   │   ├── variables.css
│   │   ├── global.css
│   │   └── App.css
│   │
│   ├── App.tsx                # Root component (19 LOC)
│   └── main.tsx               # React entry point (10 LOC)
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
npm run dev              # Start dev server with HMR (http://localhost:5173)

# Production
npm run build           # Build for production (tsc -b && vite build)
npm run preview         # Preview production build locally

# Code Quality
npm run lint            # Run ESLint checks
npm run lint -- --fix   # Auto-fix linting issues
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
npm run lint   # Code quality check
npm run build  # Verify production build
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

### Phase 2: Component Library & State Management (In Progress)
- [ ] Reusable components (Button, Card, Modal, Form)
- [ ] Redux slices (manga, auth, ui, reading)
- [ ] Theme switching (dark/light mode)
- [ ] API service foundation
- [ ] Unit tests for components

### Phase 3: Manga Discovery (Pending)
- [ ] Manga catalog browsing with filters
- [ ] Search functionality
- [ ] Detail pages

### Phase 4: Reading Experience (Pending)
- [ ] Chapter reader interface
- [ ] Progress tracking & bookmarks

### Phase 5: User Features (Pending)
- [ ] Authentication system
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
npm run dev -- --port 3000

# On macOS/Linux
PORT=3000 npm run dev
```

### TypeScript Errors
```bash
# Verify TypeScript configuration
npm run build
```

### ESLint Issues
```bash
# Auto-fix common issues
npm run lint -- --fix
```

### Clear Build Cache
```bash
rm -rf dist node_modules/.vite
npm run build
```

---

## Performance Tips

### Development
- Use `npm run dev` for fast HMR (hot module replacement)
- Browser DevTools: Check React DevTools extension
- Performance profiling: Chrome DevTools Performance tab

### Production
- Check bundle size: `npm run build` output
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
A: We're in Phase 1 (Foundation). Core components will be built in Phase 2.

**Q: When will the manga reader be ready?**
A: Targeted for Phase 4 (Weeks 9-12). See roadmap for details.

**Q: How can I contribute?**
A: Follow the Contributing section above. Create a feature branch and submit a PR.

**Q: Is authentication implemented?**
A: Not yet. User authentication is planned for Phase 5.

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
| 0.1.0 | 2026-02-06 | Phase 1 Complete | UI foundation, routing, design system |
| 0.0.0 | Initial | Initial setup | Development environment |

---

## What's New in v0.1.0

**Phase 1 Complete!** The UI foundation is now ready:
- **Navigation System:** Fixed navbar with logo, search bar, genre dropdown, user menu
- **Homepage:** Displays 12 genres in a responsive 2-column grid
- **Design System:** Deep Ocean Blue theme with Righteous & Poppins fonts
- **Responsive:** Mobile-first design that adapts to all screen sizes
- **Accessible:** Focus states, ARIA labels, keyboard navigation
- **Tech Stack:** React 19 + Redux Toolkit + React Router v7
- **Documentation:** Comprehensive guides for architecture, standards, and roadmap

**Next (Phase 2):** Component library, Redux slices, theme switching

See `./docs/project-roadmap.md` for Phase 2 details.

---

**Last Updated:** 2026-02-06

