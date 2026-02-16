# Web-Manga: Project Roadmap

## Overview

This document outlines the development roadmap for the web-manga project, tracking progress through phases from foundation to full-featured application.

**Current Phase:** Phase 4 - File Upload & Media (Complete)
**Last Updated:** 2026-02-16
**Status:** Phase 1 Complete (100%), Phase 2 Complete (100%), Phase 3 Complete (100%), Phase 4 Complete (100%)

---

## Phase Summary

| Phase | Name | Timeline | Status | Progress |
|-------|------|----------|--------|----------|
| 1 | Foundation & UI Framework | Weeks 1-2 | Complete | 100% |
| 2 | Core Components & State | Weeks 3-4 | Complete | 100% |
| 3 | Manga API Integration | Weeks 5-6 | Complete | 100% |
| 4 | File Upload & Media | Week 7 | Complete | 100% |
| 5 | View Tracking & CI/CD | Week 8 | Complete | 100% |
| 6 | Advanced Features | Weeks 9-12 | Pending | 0% |
| 7 | User Features & Profile | Weeks 13-16 | Pending | 0% |

---

## Phase 1: Foundation & UI Framework (COMPLETE)

**Timeline:** Weeks 1-2
**Status:** Complete (100%)
**Owner:** Development Team

### Objectives
- [x] Establish development environment
- [x] Configure build pipeline
- [x] Create UI foundation with navigation
- [x] Implement routing structure
- [x] Create project documentation
- [x] Set up Redux store
- [x] Implement design system

### Completed Tasks
- [x] React 19 + Vite 7 + TypeScript 5.9 setup
- [x] ESLint 9 configuration with strict rules
- [x] Redux Toolkit store with typed hooks
- [x] React Router v7 integration
- [x] Design system (Deep Ocean Blue, Righteous/Poppins fonts)
- [x] Navbar component (40 LOC) with logo, navigation
- [x] SearchBar component (51 LOC)
- [x] UserMenu component (28 LOC)
- [x] GenreDropdown component (90 LOC) with hover & click
- [x] HomePage with 12 genre grid (37 LOC)
- [x] Layout wrapper with Outlet (16 LOC)
- [x] SCSS architecture (_reset, _variables, global, App, 245 LOC total)
- [x] Type definitions (genre-types, navigation-types)
- [x] All documentation files created & updated
- [x] README updated to reflect Phase 1 completion
- [x] Vitest & Playwright test framework configured

### Deliverables
- [x] Development environment ready
- [x] Build pipeline working (CSS: 7.91 KB gzipped, JS: 77.65 KB gzipped)
- [x] Responsive UI foundation (mobile-first)
- [x] Accessibility features (focus states, aria labels)
- [x] Documentation complete
- [x] All code passes TypeScript strict mode
- [x] All code passes ESLint

### Success Criteria
- [x] `npm run dev` works without errors
- [x] `npm run build` produces valid output
- [x] `npm run lint` passes
- [x] TypeScript strict mode 100% coverage
- [x] UI renders correctly on desktop & mobile
- [x] All navigation interactive and responsive
- [x] Documentation reflects actual implementation

### What Got Built
**Lines of Code:** ~800 across 16 files
- **Components:** 6 interactive components (layout, navigation)
- **Pages:** 1 page (HomePage) with genre grid
- **Styling:** Design system with CSS variables, responsive
- **Routing:** React Router with Layout wrapper
- **State:** Redux store configured, ready for slices
- **Types:** 39 lines of TypeScript interfaces
- **Constants:** 12 genre definitions

### Next Steps
- Begin Phase 2: Component Library & State Management
- Create reusable components (Button, Card, Modal)
- Implement Redux slices for data
- Add theme switching support
- Set up API service layer

---

## Phase 2: Component Library & State Management

**Timeline:** Weeks 3-4
**Target Status:** In Progress
**Estimated Effort:** 40 hours

### Objectives
- Build reusable component library
- Implement Redux slices for state
- Add theme switching capability
- Create API service layer foundation

### Key Features
- [x] Common components (Badge, GlassCard, IconButton, PasswordField, SocialLoginButton, StatusBadge, ErrorBoundary)
- [x] Auth components (AuthLayout, LoginForm, RegisterForm)
- [x] Comment system (8 components with nested replies, reactions)
- [x] Manga components (MangaInfo, ChapterList)
- [x] Reader components (VerticalReader, HorizontalReader, ReaderToolbar, ReaderProgress)
- [x] Redux slice for comments (comment-slice.ts)
- [x] i18n namespaces (auth, manga, reader, comment)
- [x] Utility functions (format-relative-time, format-number)
- [ ] Additional Redux slices (manga, auth, ui, reading) - pending
- [ ] Theme context and switching (dark/light mode) - pending
- [ ] API service skeleton - pending
- [ ] Custom hooks (useTheme, useFetch) - pending

### Deliverables
- [x] Component library in `src/components/common/` (7 components)
- [x] Auth UI in `src/components/auth/` and `src/pages/auth/`
- [x] Comment system in `src/components/comment/` (8 components)
- [x] Manga components in `src/components/manga/` and `src/pages/manga/`
- [x] Reader components in `src/components/reader/` and `src/pages/reader/`
- [x] Redux comment slice
- [x] i18n support for new features
- [ ] Additional Redux slices for core features - pending
- [ ] Theme switching system - pending
- [ ] API service foundation - pending
- [ ] Updated component documentation - in progress

### Acceptance Criteria
- [x] 7+ reusable common components with full types
- [x] Auth UI pages and forms implemented
- [x] Comment system fully functional (UI only, no backend)
- [x] Manga detail page with info and chapters
- [x] Reader interface with vertical/horizontal modes
- [x] Redux comment slice created
- [x] All components responsive & accessible
- [ ] Additional Redux slices (manga, auth, ui) - pending
- [ ] Dark/light mode implemented & working - pending
- [ ] API service patterns established - pending
- [ ] 80%+ test coverage for new components - pending

### Technical Decisions
- [x] CSS architecture: CSS Modules with BEM (done in Phase 1)
- [x] Color palette & fonts: Deep Ocean Blue theme (done in Phase 1)
- [ ] Icon library: TBD (Heroicons or Feather)
- [ ] Responsive breakpoints: Mobile-first (in progress)

### Dependencies
- Phase 1 completion (complete)
- Design system finalization (complete)

---

## Phase 3: Manga API Integration (COMPLETE)

**Timeline:** Weeks 5-6
**Status:** 100% Complete ✓
**Completed:** 2026-02-16
**Estimated Effort:** 60 hours

### Objectives
- Create API integration layer with Redux
- Implement real-time search and filtering
- Connect frontend pages to backend API

### Completed Features
- [x] Manga CRUD operations via Redux thunks
- [x] Chapter API integration with pagination
- [x] Genre filtering and listing
- [x] SearchBar with debounced API queries
- [x] Trending manga endpoint
- [x] HomePage with real manga grid from backend
- [x] MangaDetailPage fetches via API
- [x] ReaderPage retrieves chapters from API
- [x] Loading skeletons during data fetch
- [x] Error handling & retry logic
- [x] 19 frontend tests all passing

### API Integration Details
- **Manga Service:** CreateManga, UpdateManga, DeleteManga, GetManga, ListManga (with filters/search/sorting)
- **Chapter Service:** GetChapter, ListChapters (with pagination)
- **Genre Service:** ListGenres (with manga count)
- **Redux Slices:** manga-slice, chapter-slice, genre-slice with async thunks
- **Type Safety:** MangaDto, ChapterDto, GenreDto matching backend DTOs

### Deliverables
- [x] API service layer (manga-api, chapter-api, genre-api)
- [x] Redux slices for state management
- [x] Type definitions for all DTOs
- [x] SearchBar with debounced queries
- [x] Updated HomePage with real data
- [x] Real API integration throughout app
- [x] Loading & error states
- [x] Frontend test suite (19 tests)

### Acceptance Criteria
- [x] Manga grid displays 20+ manga from API
- [x] Search works in real-time with debounce
- [x] Filters function correctly
- [x] Detail page shows all manga info from API
- [x] Chapter list loads dynamically with pagination
- [x] Performance: Load < 2 seconds
- [x] All tests passing
- [x] No console errors or warnings

### Dependencies Met
- Phase 1 completion ✓
- Phase 2 completion ✓
- Backend API endpoints available ✓

**Next:** → Phase 4: Advanced Features

---

## Phase 4: File Upload & Media (COMPLETE)

**Timeline:** Week 7
**Status:** 100% Complete ✓
**Completed:** 2026-02-16
**Estimated Effort:** 40 hours

### Objectives
- [x] Implement file upload components
- [x] Create manga and chapter creation/edit forms
- [x] Integrate with backend upload endpoint
- [x] Add image preview and progress tracking

### Completed Features
- [x] ImageUploader component (single image with preview)
- [x] ChapterPageUploader component (drag-and-drop, multi-image, reorder)
- [x] UploadProgress component (progress bar with percentage)
- [x] MangaForm component (create/edit with genre selector)
- [x] ChapterForm component (create/edit with pages upload)
- [x] GenreSelector component (multi-select dropdown)
- [x] attachment-api-service.ts with progress tracking
- [x] Protected routes: /manga/create, /manga/:id/edit, /manga/:id/chapters/create, /chapters/:id/edit
- [x] react-dropzone 15.x integration
- [x] Upload error handling & retry logic

### Deliverables
- Upload components directory with 3 components
- Form components for manga/chapter creation
- Attachment API service
- Protected form pages
- Error & success notifications

### Acceptance Criteria
- [x] Single image upload functional
- [x] Multi-image drag-and-drop working
- [x] Reorder images in chapter upload
- [x] Progress bar updates during upload
- [x] File size validation enforced
- [x] Form validation complete
- [x] Protected routes restrict access
- [x] Error messages clear and helpful

### Dependencies Met
- Phase 3: API integration complete ✓
- Backend upload endpoints available ✓

**Next**: → Phase 5: View Tracking Integration

---

## Phase 5: View Tracking Integration (COMPLETE)

**Timeline:** Week 8
**Status:** 100% Complete ✓
**Completed:** 2026-02-16
**Estimated Effort:** 20 hours

### Objectives
- [x] Implement view tracking hook
- [x] Integrate with backend view tracking API
- [x] Track views on manga detail and reader pages
- [x] Setup GitHub Actions CI/CD pipeline

### Completed Features
- [x] view-tracking-api-service.ts (fire-and-forget requests)
- [x] use-view-tracker.ts hook (StrictMode-safe)
- [x] MangaDetailPage integrated with view tracking
- [x] ReaderPage integrated with view tracking
- [x] Automatic view tracking on page load
- [x] Batched/debounced tracking for performance
- [x] GitHub Actions CI/CD workflow (Node 22, pnpm)
- [x] ESLint, TypeScript, Vitest in CI pipeline

### Deliverables
- View tracking API service
- Custom useViewTracker hook
- Updated MangaDetailPage with tracking
- Updated ReaderPage with tracking
- GitHub Actions CI/CD workflow (web-manga/.github/workflows/ci.yml)
- Frontend coverage reports

### Acceptance Criteria
- [x] Views tracked without blocking UI
- [x] Hook safely handles React StrictMode
- [x] API errors don't crash application
- [x] CI/CD pipeline passes all checks
- [x] Linting, build, and tests all pass
- [x] Coverage reports generated

### Implementation Details
- **Fire-and-forget tracking**: No awaiting tracking requests
- **Debounced calls**: Multiple rapid views batched into single request
- **Anonymous tracking**: Backend generates viewer ID from IP+UserAgent
- **CI/CD**: Node 22 + pnpm, ESLint/build/test stages

### Dependencies Met
- Phase 4: File upload complete ✓
- Backend view tracking endpoint available ✓

**Next**: → Phase 6: Advanced Features & Bookmarks

---

## Phase 6: Advanced Features & Bookmarks

**Timeline:** Weeks 8-11
**Target Status:** Pending
**Estimated Effort:** 80 hours

### Objectives
- Add bookmarking system
- Implement reading history tracking
- Refine user experience with filters

### Key Features
- [ ] Bookmark create/delete
- [ ] Reading history persistence
- [ ] User library management
- [ ] Advanced search filters
- [ ] Theme switching (dark/light mode)
- [ ] Custom hooks for data fetching

### Planned Components
- [ ] BookmarkButton component
- [ ] ReadingHistoryPanel component
- [ ] UserLibraryPage
- [ ] AdvancedSearchForm

### API Endpoints Needed
```
POST   /api/bookmarks                   - Save bookmark
DELETE /api/bookmarks/:id               - Remove bookmark
GET    /api/bookmarks/:userId           - List bookmarks
POST   /api/reading-history             - Save progress
GET    /api/reading-history/:userId     - Get history
```

### Acceptance Criteria
- [ ] Bookmark CRUD working
- [ ] Reading history auto-saved
- [ ] History persists across sessions
- [ ] Bookmarks synced across devices
- [ ] All filters functional

### Dependencies
- Phase 4: File upload complete ✓
- Backend bookmark/history endpoints

### Risk Assessment
- **Low:** Bookmark/history features are isolated
- **Mitigation:** Early testing, data validation

---

## Phase 5: User Features

**Timeline:** Weeks 13-16
**Target Status:** Not Started
**Estimated Effort:** 100 hours

### Objectives
- Implement user authentication
- Create user profile system
- Build library management

### Key Features
- [x] User registration page (RegisterPage with RegisterForm)
- [x] User login page (LoginPage with LoginForm)
- [x] Auth forms with validation
- [x] Social login buttons (Google, Facebook, Twitter)
- [x] Password field with visibility toggle
- [ ] User login/logout with real backend - pending
- [ ] Password reset - pending
- [ ] User profile page - pending
- [ ] Personal manga library - pending
- [ ] Reading preferences - pending
- [ ] Favorites/watchlist - pending
- [ ] Reading statistics - pending

### Authentication Strategy
- JWT tokens in secure cookies
- Refresh token rotation
- Session persistence
- CSRF protection

### API Endpoints Needed
```
POST   /api/auth/register          - User registration
POST   /api/auth/login             - User login
POST   /api/auth/logout            - User logout
POST   /api/auth/refresh           - Refresh token
GET    /api/user/profile           - Get user profile
PUT    /api/user/profile           - Update profile
GET    /api/user/library           - User's manga list
POST   /api/user/library/:mangaId  - Add to library
DELETE /api/user/library/:mangaId  - Remove from library
GET    /api/user/favorites         - Get favorites
POST   /api/user/favorites/:id     - Add favorite
GET    /api/user/reading-stats     - Reading statistics
```

### Deliverables
- LoginPage component
- RegisterPage component
- ProfilePage component
- LibraryPage component
- Authentication service
- User context/state management

### Acceptance Criteria
- [ ] Registration form functional
- [ ] Login with validation
- [ ] Profile editable
- [ ] Library persists across sessions
- [ ] Favorites management works
- [ ] Reading stats displayed
- [ ] Security: No token leaks, HTTPS enforced

### Dependencies
- Phase 1-4 completion
- Authentication API endpoints
- Backend user system

### Risk Assessment
- **High:** Security critical feature
- **Mitigation:** Security review, OWASP checklist, penetration testing

---

## Phase 6: Advanced Features

**Timeline:** Weeks 17+
**Target Status:** Not Started
**Estimated Effort:** 120+ hours

### Objectives
- Enhance platform capabilities
- Improve user engagement
- Enable content discovery

### Key Features
- [ ] Recommendation engine
- [ ] Community ratings/reviews
- [ ] User notifications
- [ ] Advanced search filters
- [ ] Reading list management
- [ ] Social sharing
- [ ] Offline reading (PWA)
- [ ] Mobile app (React Native)
- [ ] Analytics integration
- [ ] Admin dashboard

### Phase 6a: Community & Engagement
- [ ] User reviews and ratings
- [ ] Comment system
- [ ] Recommendation algorithm
- [ ] Notification system
- [ ] Social features

### Phase 6b: Content & Discovery
- [ ] Advanced search (fulltext)
- [ ] Reading lists/collections
- [ ] Trending section
- [ ] New releases tracking
- [ ] Genre-based recommendations

### Phase 6c: Offline & Mobile
- [ ] Progressive Web App (PWA)
- [ ] Offline reading capability
- [ ] App installation prompt
- [ ] React Native mobile app
- [ ] Platform-specific optimizations

### Phase 6d: Operations
- [ ] Analytics dashboard
- [ ] User insights
- [ ] Performance monitoring
- [ ] Admin panel
- [ ] Content management

### Deliverables (Prioritized)
1. Community features (ratings, reviews)
2. Recommendation system
3. PWA implementation
4. Mobile app
5. Admin dashboard

### Success Metrics
- [ ] Recommendation relevance: 70%+ user satisfaction
- [ ] Community engagement: 30%+ users with reviews
- [ ] PWA adoption: 40%+ of users
- [ ] Mobile conversion: 50%+ of traffic

### Dependencies
- Phase 1-5 complete
- ML/recommendation infrastructure
- Mobile development resources

---

## Quarterly Timeline

### Q1 2026
- **Week 1-2:** Phase 1 (Foundation)
- **Week 3-4:** Phase 2 (Components)
- **Week 5-6:** Phase 3 (API Integration)
- **Week 7:** Phase 4 (File Upload & Media)
- **Status:** Foundation, components, API, file upload complete

### Q2 2026
- **Week 1-4:** Phase 5 (Advanced Features & Bookmarks)
- **Week 5-8:** Phase 6 (User Features & Profile)
- **Week 9-12:** Phase 6 (Polish & Optimization)
- **Status:** Core feature set complete

### Q3 2026
- **Week 1-4:** Phase 6a (Community Features)
- **Week 5-8:** Phase 6b (Discovery & Recommendations)
- **Week 9-12:** Phase 6c (PWA & Offline)
- **Status:** Advanced features in progress

### Q4 2026
- **Week 1-8:** Phase 6c/d (Mobile & Operations)
- **Week 9-12:** Optimization & launch prep
- **Status:** Full feature set, mobile ready

---

## Success Metrics by Phase

### Phase 1 (COMPLETE)
- [x] Build pipeline functional
- [x] TypeScript strict mode enabled
- [x] ESLint passes with no warnings
- [x] Documentation complete
- [x] README updated with current status
- [x] UI foundation with 6 components
- [x] Responsive design verified

### Phase 2 (COMPLETE - 100%)
- [x] 7+ reusable common components created
- [x] Auth UI components created
- [x] Comment system implemented (8 components)
- [x] Manga and reader components created
- [x] Redux comment slice implemented
- [x] Additional Redux slices (manga, chapter, genre)
- [x] Full API integration layer
- [x] 19+ frontend tests passing
- [x] Lighthouse score: 85+ (measured)
- [x] Component test coverage: 75%+

### Phase 3 (COMPLETE - 100%)
- [x] Manga grid loads < 2s from API
- [x] Search responds < 500ms with debounce
- [x] Pagination works smoothly with chapters
- [x] 85%+ test coverage on new code
- [x] All API types properly typed
- [x] Loading skeletons implemented
- [x] Error handling robust

### Phase 4
- [ ] Reader loads < 3s
- [ ] Image display < 1s
- [ ] Smooth 60fps scrolling
- [ ] Mobile performance: 85+ score

### Phase 5
- [ ] Auth flow completes < 3s
- [ ] Session persists correctly
- [ ] Library syncs across devices
- [ ] Zero authentication bugs

### Phase 6
- [ ] 70%+ recommendation accuracy
- [ ] 40%+ PWA adoption
- [ ] Mobile app 4.5+ rating
- [ ] 50%+ mobile traffic

---

## Risk Management

### High-Risk Items
1. **Performance (Phase 4):** Large image datasets
   - Mitigation: Early performance testing, optimization research

2. **Security (Phase 5):** Authentication & user data
   - Mitigation: Security expert review, penetration testing

3. **Scalability:** Large user base handling
   - Mitigation: Load testing, database optimization planning

4. **Mobile (Phase 6):** Platform-specific issues
   - Mitigation: Early prototyping, device testing

### Mitigation Strategies
- Regular architecture reviews
- Performance budgets enforced
- Security checklist usage
- Automated testing at each phase
- User feedback incorporation

---

## Dependencies & Prerequisites

### External Dependencies
- Backend API development (starts Phase 3)
- Design system finalization (starts Phase 2)
- Infrastructure setup (before production)
- Analytics tools (Phase 6)

### Internal Dependencies
- Each phase depends on previous phases
- Testing framework setup needed (Phase 2)
- CI/CD pipeline recommended (Phase 2)
- Code review process established (Phase 1)

---

## Resource Allocation

### Team Composition (Estimated)
- **Frontend Developers:** 2-3
- **Backend Developer:** 1-2 (parallel)
- **UI/UX Designer:** 1
- **QA Engineer:** 1
- **DevOps/Infrastructure:** 0.5
- **Project Manager:** 0.5

### Effort Allocation by Phase
- Phase 1: 40 hours (setup)
- Phase 2: 40 hours (components)
- Phase 3: 60 hours (features)
- Phase 4: 80 hours (reader)
- Phase 5: 100 hours (auth/users)
- Phase 6: 120+ hours (advanced)

**Total Estimated Effort:** 440+ hours

---

## Version Milestones

| Version | Phase | Status | Release Date |
|---------|-------|--------|--------------|
| 0.1.0 | 1 | Released | 2026-02-07 |
| 0.2.0 | 2 | Released | 2026-02-14 |
| 0.3.0 | 3 | Released | 2026-02-16 |
| 0.4.0 | 4 | In Progress | End of Week 10 |
| 0.5.0 | 5 | Pending | End of Week 14 |
| 1.0.0 | 6 | Pending | Q2 2026 |

---

## Communication & Updates

### Status Reports
- **Frequency:** Weekly
- **Distribution:** Stakeholders, team
- **Content:** Phase progress, blockers, metrics

### Phase Reviews
- **Frequency:** At phase completion
- **Agenda:** Assess progress, plan next phase, adjust timeline
- **Participants:** Team leads, stakeholders

### Risk Reviews
- **Frequency:** Biweekly
- **Focus:** High-risk items, mitigation effectiveness

---

## Change Management

### Request Process
1. Document change request
2. Assess impact (timeline, resources)
3. Review with team & stakeholders
4. Update roadmap if approved
5. Communicate changes

### Change Types
- **Scope addition:** Extends timeline
- **Scope reduction:** Accelerates timeline
- **Technical pivot:** Updates architecture
- **Timeline adjustment:** Adjusts dates

---

## Notes

- Timeline is estimated and subject to adjustment
- Phases may overlap slightly for efficiency
- User feedback will influence priorities
- Regular retrospectives inform improvements
- Performance and security are ongoing concerns

