# Component Structure Summary

## Implementation Overview

### Component Tree

```
App (Router)
├── Layout (with Navbar + Footer)
│   ├── HomePage
│   └── MangaDetailPage
│       ├── MangaInfo
│       │   ├── Badge (status)
│       │   └── Action Buttons
│       └── ChapterList
│           └── Chapter Items
├── ReaderPage (fullscreen, no layout)
│   ├── ReaderToolbar
│   ├── VerticalReader | HorizontalReader
│   └── ReaderProgress
├── LoginPage (no layout)
│   └── AuthLayout
│       └── LoginForm
│           ├── PasswordField
│           └── SocialLoginButton (x3)
└── RegisterPage (no layout)
    └── AuthLayout
        └── RegisterForm
            └── PasswordField
```

## File Organization

```
src/
├── components/
│   ├── common/              # Reusable UI components
│   │   ├── Badge.tsx        # Status badges (HOT, NEW, TOP, etc.)
│   │   ├── GlassCard.tsx    # Glass morphism card
│   │   ├── IconButton.tsx   # Styled icon button
│   │   ├── PasswordField.tsx # Password input with toggle
│   │   └── SocialLoginButton.tsx # Social auth buttons
│   │
│   ├── manga/               # Manga-specific components
│   │   ├── ChapterList.tsx  # Sortable chapter list
│   │   └── MangaInfo.tsx    # Manga metadata display
│   │
│   ├── reader/              # Reader interface components
│   │   ├── HorizontalReader.tsx  # Page-by-page reader
│   │   ├── ReaderProgress.tsx    # Progress bar
│   │   ├── ReaderToolbar.tsx     # Top controls
│   │   └── VerticalReader.tsx    # Vertical scroll reader
│   │
│   └── auth/                # Authentication components
│       ├── AuthLayout.tsx   # Centered auth layout
│       ├── LoginForm.tsx    # Login form with social
│       └── RegisterForm.tsx # Registration form
│
├── pages/
│   ├── HomePage.tsx         # Landing page (existing)
│   ├── manga/
│   │   └── MangaDetailPage.tsx   # Manga detail + chapters
│   ├── reader/
│   │   └── ReaderPage.tsx        # Reading interface
│   └── auth/
│       ├── LoginPage.tsx         # Login page
│       └── RegisterPage.tsx      # Register page
│
├── types/
│   └── manga-types.ts       # Updated with ChapterPage interface
│
├── constants/
│   └── mock-chapter-data.ts # Updated mock data
│
└── i18n/locales/
    ├── en/common.json       # +60 translation keys
    └── vi/common.json       # +60 translation keys
```

## Routes

| Path | Component | Layout | Description |
|------|-----------|--------|-------------|
| `/` | HomePage | Yes | Landing page with featured manga |
| `/manga/:slug` | MangaDetailPage | Yes | Manga details, synopsis, chapters |
| `/manga/:mangaSlug/:chapterSlug` | ReaderPage | No | Fullscreen reading interface |
| `/login` | LoginPage | No | Authentication login |
| `/register` | RegisterPage | No | User registration |

## Key Features by Component

### Shared Components
- **GlassCard**: Glass morphism styling with hover effects
- **Badge**: 6 badge types with color coding
- **IconButton**: Consistent icon button styling
- **PasswordField**: Visibility toggle, validation support
- **SocialLoginButton**: Google/Facebook/GitHub auth

### Manga Components
- **ChapterList**: Sort by newest/oldest, click navigation
- **MangaInfo**: Cover, metadata, ratings, genres, synopsis, action buttons

### Reader Components
- **ReaderToolbar**: Back, mode toggle, zoom, fullscreen controls
- **VerticalReader**: Webtoon-style vertical scrolling
- **HorizontalReader**: Traditional page navigation with arrows
- **ReaderProgress**: Visual progress bar with page count

### Auth Components
- **AuthLayout**: Centered container with branding
- **LoginForm**: Email/password, remember me, forgot password, social login
- **RegisterForm**: Username, email, password, confirm password, terms checkbox, client-side validation

## Styling Approach

All components use Material UI v7 with `sx` prop:
- Theme-aware colors from `theme.ts`
- Custom colors via `customColors` export
- Responsive breakpoints: `xs`, `sm`, `md`
- No external CSS/SCSS files
- Consistent spacing and typography

## i18n Keys Added

### manga.*
- chapters, newest, oldest, chapterNumber, views
- by, synopsis, readNow, bookmark
- notFound, notFoundDescription

### reader.*
- back, chapter, toggleMode
- zoomIn, zoomOut, fullscreen
- progress, pages

### auth.*
- email, password, username, confirmPassword
- rememberMe, forgotPassword, login, register
- welcomeBack, loginSubtitle, createAccount, registerSubtitle
- orContinueWith, continueWithGoogle/Facebook/Github
- dontHaveAccount, alreadyHaveAccount
- iAccept, termsOfService, and, privacyPolicy
- usernameMinLength, passwordMinLength, passwordMismatch, mustAcceptTerms

## Mock Data Structure

```typescript
// Chapter with views and chapterNumber
interface Chapter {
  id: string;
  chapterNumber: number;
  title?: string;
  slug: string;
  publishedAt: string;
  pages: number;
  views: number;
}

// Page for reader
interface ChapterPage {
  pageNumber: number;
  imageUrl: string;
}

// Extended manga detail
interface MangaDetail extends Manga {
  artist?: string;
  synopsis: string;
  rating: number;
  ratingCount: number;
  bannerUrl?: string;
  alternativeTitles?: string[];
  publishedYear?: number;
  chapters: Chapter[];
}
```

## Build Results

- **TypeScript**: ✓ No errors
- **ESLint**: ✓ No errors
- **Vite Build**: ✓ Success (1.46s)
- **Bundle Size**: 603.95 KB (slightly over 500 KB threshold)

## Next Integration Points

1. **API Integration**: Replace mock data with real API calls
2. **State Management**: Connect to Redux slices
3. **Authentication**: Implement real auth with JWT
4. **Reading Progress**: Save/restore progress
5. **Bookmarks**: Implement bookmark functionality
6. **Testing**: Add unit and E2E tests
