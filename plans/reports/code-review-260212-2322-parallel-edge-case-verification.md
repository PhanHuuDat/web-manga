# Edge Case Verification Report - Parallel Codebase Review

**Date:** 2026-02-12
**Scope:** Full codebase (Phase 2 implementation)
**Reviewers:** 5 parallel code-reviewer agents
**Categories:** Auth & Security, Comment System, Reader & Navigation, Data & Type Safety, UI/UX & Accessibility

---

## Summary

| Metric | Count |
|--------|-------|
| **Total edge cases** | **47** |
| **Handled** | **9** ✅ |
| **Unhandled** | **29** ❌ |
| **Partial** | **9** ⚠️ |

| Severity | Count |
|----------|-------|
| CRITICAL | 3 |
| HIGH | 14 |
| MEDIUM | 14 |
| LOW | 4 |

---

## CRITICAL Issues (3)

### 1. `console.log` leaks plaintext passwords
- **Files:** `src/pages/auth/LoginPage.tsx:14`, `src/pages/auth/RegisterPage.tsx:20-26`
- **Impact:** Plaintext passwords visible in browser DevTools
- **Fix:** Remove all `console.log` containing credentials

### 2. Synchronous "fetch" reducers (architecture failure)
- **Files:** `src/store/slices/comment-slice.ts:89-115`
- **Impact:** Cannot integrate with real backend; `loading` set true then immediately false
- **Fix:** Convert to `createAsyncThunk` with proper loading/error states

### 3. No Error Boundaries
- **Files:** `src/App.tsx`
- **Impact:** Component crash = white screen for entire app
- **Fix:** Wrap Routes with ErrorBoundary component with fallback UI

---

## HIGH Priority Issues (14)

| # | Edge Case | File(s) |
|---|-----------|---------|
| 4 | Social login type mismatch ('github' in handler, not in UI) | LoginPage.tsx, SocialLoginButton.tsx |
| 5 | No email regex validation (HTML5 only) | RegisterForm.tsx, LoginForm.tsx |
| 6 | No double-submit prevention | LoginPage.tsx, RegisterPage.tsx |
| 7 | Race condition: rapid comment submissions | comment-slice.ts |
| 8 | No error/loading states in Redux | comment-slice.ts |
| 9 | selectedPage never updates (always 1) | ReaderPage.tsx |
| 10 | ReaderProgress hardcoded current=1 | ReaderPage.tsx |
| 11 | Loading placeholder opacity always 0 | VerticalReader.tsx |
| 12 | Missing scroll position tracking | VerticalReader.tsx |
| 13 | Translation key mismatches (13+ keys) | RegisterForm, ChapterList, HorizontalReader vs i18n JSONs |
| 14 | Hardcoded colors (60+ instances) | All comment components |
| 15 | Missing aria-labels | ReactionButtons, CommentItem, CommentInput, sidebars, modals |
| 16 | Form errors not announced to screen readers | RegisterForm.tsx |
| 17 | Modal/drawer missing ARIA attributes | PageCommentModal, ChapterCommentSidebar |

---

## MEDIUM Priority Issues (14)

| # | Edge Case | File(s) |
|---|-----------|---------|
| 18 | Empty form relies on HTML5 only | LoginForm, RegisterForm |
| 19 | Weak password (length only) | RegisterForm.tsx |
| 20 | i18n key structure mismatch | RegisterForm vs auth.json |
| 21 | generateId uses Math.random | comment-slice.ts |
| 22 | MOCK_USER hardcoded | comment-types.ts, CommentInput.tsx |
| 23 | Reactions lost on refresh | ReactionButtons, comment-slice.ts |
| 24 | Missing keyboard navigation | HorizontalReader, VerticalReader |
| 25 | Fullscreen desyncs with ESC | ReaderPage.tsx |
| 26 | No broken image fallback | VerticalReader, HorizontalReader |
| 27 | No adjacent page preloading | HorizontalReader.tsx |
| 28 | Badge & StatusBadge duplicate | Badge.tsx, StatusBadge.tsx |
| 29 | Math.random in mock data | mock-chapter-data.ts |
| 30 | Missing 404 route | App.tsx |
| 31 | No chapter pagination | ChapterList.tsx |

---

## LOW Priority Issues (4)

| # | Edge Case | File(s) |
|---|-----------|---------|
| 32 | findUsername not memoized | MangaCommentSection.tsx |
| 33 | Max depth text not i18n'd | CommentItem.tsx |
| 34 | formatRelativeTime no future dates | format-relative-time.ts |
| 35 | formatNumber no locale support | format-number.ts |

---

## Handled (No Action) ✅

| # | Edge Case | Defense |
|---|-----------|---------|
| 1 | XSS in form fields | React auto-escaping |
| 2 | Password toggle state | Proper useState |
| 3 | Empty comment submission | content.trim() + disabled btn |
| 4 | Optional onOpen prop | No-op fallback |
| 5 | Zoom boundaries | Clamped 50-200% |
| 6 | ReaderProgress logic | Correct (bad input from parent) |
| 7 | Mobile controls hidden | Intentional responsive |
| 8 | Modal focus trap | Built-in MUI |
| 9 | MangaDetailPage nulls | Loading/error states present |

---

## Recommended Fix Priority

### Immediate (before any deploy)
1. Remove console.log credentials
2. Add Error Boundary
3. Fix translation key mismatches

### Short-term (next sprint)
4. Convert comment-slice to async thunks
5. Fix reader page tracking (selectedPage, progress, scroll)
6. Add aria-labels and ARIA attributes
7. Fix social login type mismatch
8. Add form validation (email regex, double-submit)

### Medium-term
9. Refactor hardcoded colors to theme tokens
10. Add keyboard navigation to reader
11. Add fullscreen event listener
12. Add 404 route
13. Consolidate Badge/StatusBadge
14. Add chapter pagination
