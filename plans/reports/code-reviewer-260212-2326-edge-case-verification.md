# Edge Case Verification Report

**Date:** 2026-02-12 23:26
**Scope:** Data Integrity & Type Safety
**Files Analyzed:** 15

---

## 1. Badge.tsx and StatusBadge.tsx duplicate functionality

**Files:**
- `src/components/common/Badge.tsx`
- `src/components/common/StatusBadge.tsx`

❌ **Unhandled** | **Severity: MEDIUM**

**Findings:**
- Both components render identical badge types (`hot`, `new`, `top`, `ongoing`, `completed`, `hiatus`)
- Different color schemes for same variants (e.g., `hot` uses purple in StatusBadge vs red in Badge)
- StatusBadge has customizable labels, Badge does not
- StatusBadge extends ChipProps, Badge does not
- Creates maintenance burden and inconsistent UI

**Impact:**
- UI inconsistency across app
- Developers won't know which to use
- Double maintenance for updates

**Recommendation:**
Consolidate into single Badge component with configurable styles or remove one implementation.

---

## 2. Translation key mismatches across modules

### 2a. RegisterForm.tsx vs auth.json

**Files:**
- `src/components/auth/RegisterForm.tsx`
- `src/i18n/locales/en/auth.json`

❌ **Unhandled** | **Severity: HIGH**

**Missing Keys in auth.json:**
- `auth.usernameMinLength` (line 38)
- `auth.passwordMinLength` (line 42)
- `auth.passwordMismatch` (line 46)
- `auth.mustAcceptTerms` (line 50)
- `auth.username` (line 66)
- `auth.email` (line 79)
- `auth.password` (line 92)
- `auth.confirmPassword` (line 104)
- `auth.iAccept` (line 125)
- `auth.termsOfService` (line 127)
- `auth.and` (line 129)
- `auth.privacyPolicy` (line 131)
- `auth.register` (line 151)

**Available Keys in auth.json:**
- `register.username`, `register.email`, `register.password`, `register.confirmPassword`
- `validation.usernameMin`, `validation.passwordMin`, `validation.passwordMismatch`, `validation.termsRequired`

**Impact:**
- Runtime errors showing raw translation keys instead of user-facing text
- Breaks UX completely for registration flow

**Recommendation:**
Either update RegisterForm to use `register.*` and `validation.*` namespaces, or add missing `auth.*` keys to JSON.

---

### 2b. ChapterList.tsx vs manga.json

**Files:**
- `src/components/manga/ChapterList.tsx`
- `src/i18n/locales/en/manga.json`

❌ **Unhandled** | **Severity: HIGH**

**Missing Keys in manga.json:**
- `manga.newest` (line 45)
- `manga.oldest` (line 51)
- `manga.chapterNumber` (line 81)

**Available Keys:**
- `detail.sortNewest`, `detail.sortOldest` exist but not used
- No `chapterNumber` key at all

**Impact:**
- "Newest"/"Oldest" buttons show raw keys
- Chapter numbers show raw interpolation strings

**Recommendation:**
Add `newest`, `oldest`, `chapterNumber` to manga.json root or update component to use `detail.*` namespace.

---

### 2c. HorizontalReader.tsx vs reader.json

**Files:**
- `src/components/reader/HorizontalReader.tsx`
- `src/i18n/locales/en/reader.json`

❌ **Unhandled** | **Severity: MEDIUM**

**Missing Key in reader.json:**
- `reader.pages` (line 124)

**Impact:**
- Page counter shows raw key instead of "pages" text

**Recommendation:**
Add `pages` key to reader.json or use existing `progress.page` interpolation.

---

## 3. Math.random() in mock data causing inconsistent renders

**File:** `src/constants/mock-chapter-data.ts`

❌ **Unhandled** | **Severity: MEDIUM**

**Findings:**
- Line 30: `pages: 15 + Math.floor(Math.random() * 10)` in chapter generation
- Line 31: `views: 50000 + Math.floor(Math.random() * 100000)` in chapter generation
- Line 57: `pageCount = 15 + Math.floor(Math.random() * 10)` in getChapterDetail
- Line 65: `views: 50000 + Math.floor(Math.random() * 100000)` in getChapterDetail
- Lines 105, 106, 134, 135: Same pattern in other manga details

**Impact:**
- React re-renders show different chapter page counts
- View counts change on each render
- Breaks React reconciliation (keys might mismatch)
- User confusion seeing flickering numbers
- Test instability

**Recommendation:**
Use seeded pseudo-random generator or deterministic values based on chapter ID/number.

---

## 4. formatRelativeTime no future date handling

**File:** `src/utils/format-relative-time.ts`

❌ **Unhandled** | **Severity: LOW**

**Findings:**
- Lines 4-11: Only handles past dates (subtracts date from now)
- Future dates return negative values → nonsensical output like "-5m ago"
- No validation or error handling for invalid date strings

**Impact:**
- UI breaks if server returns future timestamps (scheduled releases, timezones)
- Shows confusing negative time values

**Recommendation:**
```typescript
if (diffMs < 0) return 'Just now'; // or 'Scheduled for [date]'
if (isNaN(diffMs)) return 'Invalid date';
```

---

## 5. formatNumber no locale support

**File:** `src/utils/format-number.ts`

⚠️ **Partial** | **Severity: LOW**

**Findings:**
- Hardcoded English abbreviations ('M', 'k')
- No i18n support for different locales
- Uses hardcoded decimal separator (`.`)
- No support for different numbering systems (e.g., Arabic, Japanese)

**Current Behavior:**
- Works for English only
- May confuse non-English users expecting localized numbers

**Impact:**
- Limited i18n support despite app using react-i18next
- Inconsistent with localization strategy

**Recommendation:**
Use `Intl.NumberFormat` with locale parameter or integrate with i18n system:
```typescript
export function formatNumber(num: number, locale = 'en'): string {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'short'
  }).format(num);
}
```

---

## 6. Missing null checks on URL params (useParams)

### 6a. MangaDetailPage.tsx

**File:** `src/pages/manga/MangaDetailPage.tsx`

✅ **Handled**

**Findings:**
- Line 16: `const { slug } = useParams<{ slug: string }>();`
- Line 27: Conditional check `if (slug)` before using
- Lines 70-80: Fallback UI when manga not found

**Assessment:** Properly handled with defensive checks and user-facing error state.

---

### 6b. ReaderPage.tsx

**File:** `src/pages/reader/ReaderPage.tsx`

⚠️ **Partial** | **Severity: MEDIUM**

**Findings:**
- Line 14-17: `const { mangaSlug, chapterSlug } = useParams()`
- Line 34: Conditional check `if (mangaSlug && chapterSlug)` exists
- Line 35: `parseInt(chapterSlug.replace('chapter-', ''))` - **NO NaN handling**
- Line 45: `navigate(\`/manga/${mangaSlug}\`)` - uses mangaSlug without null check
- Lines 87-100: Loading/null state only checks `!chapter`, not invalid params

**Impact:**
- If chapterSlug is malformed (e.g., "abc"), parseInt returns NaN → corrupt data
- Navigate on line 45 could navigate to "/manga/undefined"
- No error UI for invalid URL format

**Recommendation:**
```typescript
const chapterNumber = parseInt(chapterSlug.replace('chapter-', ''));
if (isNaN(chapterNumber)) {
  // Show error state
}
```

---

## 7. MangaDetailPage no error handling for failed fetch

**File:** `src/pages/manga/MangaDetailPage.tsx`

✅ **Handled**

**Findings:**
- Lines 21-35: Simulated fetch with timeout
- Lines 27-29: Returns null if slug invalid or manga not found
- Lines 70-80: User-facing error state for not found scenario
- No try/catch, but mock data doesn't throw

**Assessment:**
For production, needs try/catch around fetch, but current implementation handles missing data gracefully.

---

## 8. Missing route for 404 / invalid manga IDs

**File:** `src/App.tsx`

❌ **Unhandled** | **Severity: MEDIUM**

**Findings:**
- Lines 11-24: Only 5 routes defined
- No catch-all `path="*"` route
- No 404 page component
- Invalid URLs show blank page

**Impact:**
- Users navigating to `/invalid-url` see blank page
- No way to recover or navigate back
- Poor UX for typos or broken links

**Recommendation:**
```tsx
<Route path="*" element={<NotFoundPage />} />
```

---

## Summary Statistics

| Status | Count |
|--------|-------|
| ✅ Handled | 2 |
| ⚠️ Partial | 2 |
| ❌ Unhandled | 6 |

### Severity Breakdown

| Severity | Count | Issues |
|----------|-------|--------|
| **CRITICAL** | 0 | - |
| **HIGH** | 2 | Translation mismatches (RegisterForm, ChapterList) |
| **MEDIUM** | 5 | Badge duplication, HorizontalReader i18n, Math.random(), ReaderPage params, 404 route |
| **LOW** | 2 | formatRelativeTime future dates, formatNumber locale |

---

## Recommended Action Priority

1. **Immediate (HIGH):**
   - Fix all translation key mismatches in auth and manga modules
   - Runtime errors affecting user experience

2. **Next Sprint (MEDIUM):**
   - Add 404 route and error handling
   - Consolidate Badge components
   - Fix Math.random() in mock data
   - Add NaN handling in ReaderPage

3. **Backlog (LOW):**
   - Improve formatRelativeTime edge cases
   - Enhance formatNumber with i18n support
