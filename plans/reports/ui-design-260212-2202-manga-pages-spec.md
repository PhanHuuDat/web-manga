# UI Design Specification: Manga Reading Web App Pages

**Report ID:** ui-design-260212-2202-manga-pages-spec
**Date:** 2026-02-12
**Status:** Complete
**Project:** web-manga

---

## Design System Reference

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| darkNavy | `#0a0c14` | Page background |
| deepCharcoal | `#121520` | Navbar, elevated surfaces |
| cardBg | `#1a1e2e` | Cards, containers |
| cardBgHover | `#242938` | Card hover state |
| neonBlue | `#3b82f6` | Primary accent, CTAs |
| neonPurple | `#a855f7` | Secondary accent |
| textPrimary | `#f1f5f9` | Headings, body text |
| textSecondary | `#94a3b8` | Muted text, labels |
| textDisabled | `#64748b` | Inactive text |
| glass | `rgba(255,255,255,0.05)` | Glass backgrounds |
| glassBorder | `rgba(255,255,255,0.1)` | Subtle borders |
| error | `#ef4444` | Error states |
| success | `#22c55e` | Success states |
| warning | `#f59e0b` | Warning states |

### Typography
| Element | Font | Weight | Size |
|---------|------|--------|------|
| h1 | Outfit | 800 | 48px |
| h2 | Outfit | 800 | 36px |
| h3 | Outfit | 700 | 28px |
| h4 | Outfit | 700 | 24px |
| h5 | Outfit | 600 | 20px |
| h6 | Outfit | 600 | 18px |
| body | Spline Sans | 400 | 16px |
| small | Spline Sans | 400 | 14px |
| caption | Spline Sans | 400 | 12px |

### Spacing Scale
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px

### Border Radius
- small: 4px
- default: 8px
- medium: 12px
- large: 16px
- pill: 9999px

---

## Page 1: Manga Detail Page (`/manga/:slug`)

### Layout Structure (ASCII Wireframe)

```
Desktop (1200px+):
+------------------------------------------------------------------+
| [NAVBAR - sticky]                                                 |
+------------------------------------------------------------------+
|                                                                   |
| +-------------------------------------------------------------+  |
| |  HERO SECTION (gradient overlay)                             |  |
| |  +--------+   Title (h1)                                     |  |
| |  | Cover  |   Author | Status | Views | Rating               |  |
| |  | Image  |   [Genre Tags...]                                |  |
| |  | 300px  |   Synopsis text (3 lines, expandable)...         |  |
| |  |        |                                                  |  |
| |  +--------+   [Read First] [Continue] [+ Library] [Share]    |  |
| +-------------------------------------------------------------+  |
|                                                                   |
| +-------------------------------------------------------------+  |
| | CHAPTER LIST                              [Search] [Filter]  |  |
| | +----------------------------------------------------------+ |  |
| | | Ch 125 - Title Here           2h ago    [Views] [Read]   | |  |
| | +----------------------------------------------------------+ |  |
| | | Ch 124 - Another Title        1d ago    [Views] [Read]   | |  |
| | +----------------------------------------------------------+ |  |
| | | ... (virtualized list)                                   | |  |
| | +----------------------------------------------------------+ |  |
| +-------------------------------------------------------------+  |
|                                                                   |
| +-------------------------------------------------------------+  |
| | RELATED MANGA (6-column grid)                                |  |
| | [Card] [Card] [Card] [Card] [Card] [Card]                   |  |
| +-------------------------------------------------------------+  |
|                                                                   |
| [FOOTER]                                                          |
+------------------------------------------------------------------+

Mobile (< 768px):
+--------------------------------+
| [NAVBAR]                       |
+--------------------------------+
| +----------------------------+ |
| |   HERO (stacked layout)    | |
| |   +------------------+     | |
| |   |   Cover Image    |     | |
| |   |   (full width)   |     | |
| |   +------------------+     | |
| |   Title (centered)          | |
| |   Author | Status           | |
| |   [Genre] [Genre] [Genre]   | |
| |   [Read First Chapter]      | |
| |   [Continue] [+ Library]    | |
| +----------------------------+ |
|                                |
| +----------------------------+ |
| | Synopsis (collapsible)     | |
| +----------------------------+ |
|                                |
| +----------------------------+ |
| | [Search Chapters]          | |
| | Ch 125 - Title      2h ago | |
| | Ch 124 - Title      1d ago | |
| | ...                        | |
| +----------------------------+ |
|                                |
| +----------------------------+ |
| | Related (2-col grid)       | |
| | [Card] [Card]              | |
| | [Card] [Card]              | |
| +----------------------------+ |
+--------------------------------+
```

### Component Breakdown

1. **MangaHeroSection**
   - Background: Blurred cover image with gradient overlay
   - Cover image with shadow and border
   - Info panel with metadata

2. **MangaMetadata**
   - Author link
   - Status badge (Ongoing/Completed/Hiatus)
   - View count with icon
   - Rating stars (average + count)
   - Release year

3. **GenreTagList**
   - Horizontal scrollable on mobile
   - Chip components with hover effect

4. **ActionButtonGroup**
   - Primary: "Read First Chapter" or "Continue Reading"
   - Secondary: "Add to Library" (toggle state)
   - Icon buttons: Share, Bookmark

5. **SynopsisSection**
   - Collapsible text (3 lines default)
   - "Show more" toggle
   - Rich text support

6. **ChapterList**
   - Search input with filter dropdown
   - Sort options: Newest/Oldest/Read/Unread
   - Virtualized list for performance
   - Each item: chapter number, title, date, views, read button

7. **ChapterListItem**
   - Read indicator (dot/highlight)
   - Chapter number + title
   - Upload date (relative)
   - View count
   - Quick read button

8. **RelatedMangaSection**
   - Reuses existing MangaFeaturedCard
   - 6-col desktop, 2-col mobile

### Styling Specifications

**Hero Section:**
```css
background: linear-gradient(
  to bottom,
  rgba(10, 12, 20, 0) 0%,
  rgba(10, 12, 20, 0.8) 50%,
  rgba(10, 12, 20, 1) 100%
);
backdrop-filter: blur(20px);
min-height: 500px; /* desktop */
min-height: 400px; /* mobile */
```

**Cover Image:**
```css
width: 280px; /* desktop */
width: 200px; /* tablet */
width: 160px; /* mobile */
aspect-ratio: 3 / 4;
border-radius: 16px;
box-shadow: 0 20px 50px rgba(0,0,0,0.5);
border: 3px solid rgba(255,255,255,0.1);
```

**Status Badge:**
```css
/* Ongoing */
background: rgba(34, 197, 94, 0.15);
color: #22c55e;
border: 1px solid rgba(34, 197, 94, 0.3);

/* Completed */
background: rgba(59, 130, 246, 0.15);
color: #3b82f6;

/* Hiatus */
background: rgba(245, 158, 11, 0.15);
color: #f59e0b;
```

**Chapter List Item:**
```css
padding: 16px;
border-bottom: 1px solid rgba(255,255,255,0.05);
transition: background 0.2s;

&:hover {
  background: rgba(255,255,255,0.03);
}

/* Unread indicator */
&.unread::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #3b82f6;
}
```

### Interactions/States

| Element | State | Effect |
|---------|-------|--------|
| Cover Image | Hover | Scale 1.02, glow effect |
| Genre Tag | Hover | Background brightens, cursor pointer |
| Read Button | Hover | Gradient shift, glow |
| Read Button | Loading | Spinner, disabled |
| Add to Library | Active | Icon filled, pulse animation |
| Chapter Item | Hover | Background highlight |
| Chapter Item | Read | Opacity 0.6, checkmark |

---

## Page 2: Reader Page (`/read/:slug/:chapter`)

### Layout Structure (ASCII Wireframe)

```
Vertical Mode (Webtoon):
+------------------------------------------------------------------+
| [TOOLBAR - auto-hide on scroll down]                              |
| [< Back] [Title - Ch X] [Ch Select v] [Mode] [Zoom] [Fullscreen] |
+------------------------------------------------------------------+
|                                                                   |
|                    +------------------------+                      |
|                    |                        |                      |
|                    |    Page Image 1        |                      |
|                    |    (width: 100%)       |                      |
|                    |                        |                      |
|                    +------------------------+                      |
|                    |                        |                      |
|                    |    Page Image 2        |                      |
|                    |                        |                      |
|                    +------------------------+                      |
|                    |                        |                      |
|                    |    Page Image 3        |                      |
|                    |    (infinite scroll)   |                      |
|                    |                        |                      |
|                    +------------------------+                      |
|                                                                   |
+------------------------------------------------------------------+
| [PROGRESS BAR]  ============|------------  Ch 5 / 125            |
| [< Prev Ch]                                         [Next Ch >]  |
+------------------------------------------------------------------+

Horizontal Mode (Manga):
+------------------------------------------------------------------+
| [TOOLBAR]                                                         |
+------------------------------------------------------------------+
|                                                                   |
|   [<]  +--------------------------------------------+  [>]       |
|        |                                            |             |
|        |                                            |             |
|        |           Single/Double Page               |             |
|        |                                            |             |
|        |                                            |             |
|        +--------------------------------------------+             |
|                                                                   |
|                    Page 5 of 24                                   |
|                                                                   |
+------------------------------------------------------------------+
| [PROGRESS BAR - clickable]                                        |
+------------------------------------------------------------------+

Mobile Fullscreen:
+--------------------------------+
|                                |
|     [Tap for controls]         |
|                                |
|   +------------------------+   |
|   |                        |   |
|   |    Page Content        |   |
|   |                        |   |
|   |                        |   |
|   +------------------------+   |
|                                |
|                                |
+--------------------------------+
| [< Prev]  5 / 24  [Next >]    |
+--------------------------------+
```

### Component Breakdown

1. **ReaderToolbar**
   - Back button (to manga detail)
   - Chapter title display
   - Chapter selector dropdown
   - Reading mode toggle (vertical/horizontal)
   - Zoom controls (+, -, fit)
   - Fullscreen toggle
   - Settings gear icon

2. **ReaderSettings** (Drawer/Modal)
   - Reading direction (LTR/RTL)
   - Page display (single/double/scroll)
   - Zoom level slider
   - Brightness slider
   - Background color (black/dark/sepia)
   - Auto-next chapter toggle

3. **VerticalReader**
   - Infinite scroll container
   - Lazy loading images
   - Intersection observer for progress
   - Touch/scroll detection

4. **HorizontalReader**
   - Single or double page view
   - Swipe/arrow navigation
   - Tap zones (left/center/right)
   - Preload adjacent pages

5. **PageImage**
   - Lazy loading with skeleton
   - Zoom/pinch support (mobile)
   - Error state with retry

6. **ChapterProgressBar**
   - Visual progress indicator
   - Clickable/draggable
   - Chapter number display
   - Prev/Next buttons

7. **ChapterSelector**
   - Dropdown with chapter list
   - Current chapter highlighted
   - Quick jump to first/last

8. **QuickNavigation**
   - Floating previous/next buttons
   - Keyboard shortcuts indicator

### Styling Specifications

**Toolbar:**
```css
position: fixed;
top: 0;
left: 0;
right: 0;
z-index: 100;
height: 56px;
background: rgba(10, 12, 20, 0.95);
backdrop-filter: blur(12px);
border-bottom: 1px solid rgba(255,255,255,0.05);
transition: transform 0.3s ease;

/* Hidden state */
&.hidden {
  transform: translateY(-100%);
}
```

**Reader Container:**
```css
/* Vertical mode */
.vertical-reader {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 16px;
  background: #0a0c14;
}

/* Horizontal mode */
.horizontal-reader {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 112px); /* toolbar + progress */
  background: #000000;
}
```

**Page Image:**
```css
width: 100%;
max-width: 800px;
height: auto;
display: block;
margin: 0 auto;

/* Loading skeleton */
&.loading {
  background: linear-gradient(
    90deg,
    #1a1e2e 0%,
    #242938 50%,
    #1a1e2e 100%
  );
  animation: shimmer 1.5s infinite;
}
```

**Progress Bar:**
```css
position: fixed;
bottom: 0;
left: 0;
right: 0;
height: 48px;
background: rgba(10, 12, 20, 0.95);
backdrop-filter: blur(8px);
display: flex;
align-items: center;
padding: 0 16px;

.progress-track {
  flex: 1;
  height: 4px;
  background: rgba(255,255,255,0.1);
  border-radius: 2px;
  cursor: pointer;

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #3b82f6, #a855f7);
    border-radius: 2px;
  }
}
```

**Navigation Buttons:**
```css
width: 48px;
height: 48px;
border-radius: 50%;
background: rgba(255,255,255,0.1);
border: 1px solid rgba(255,255,255,0.1);
display: flex;
align-items: center;
justify-content: center;
transition: all 0.2s;

&:hover {
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.3);
}

&:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
```

### Interactions/States

| Element | State | Effect |
|---------|-------|--------|
| Toolbar | Scroll down | Slide up, hide |
| Toolbar | Scroll up/tap | Slide down, show |
| Page Image | Loading | Shimmer skeleton |
| Page Image | Error | Error icon + retry button |
| Nav Arrows | Hover | Scale 1.1, highlight |
| Progress Bar | Drag | Update position, show tooltip |
| Reading Mode | Toggle | Smooth transition animation |
| Chapter Select | Open | Dropdown with scroll |

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Left Arrow | Previous page (horizontal mode) |
| Right Arrow | Next page (horizontal mode) |
| Space | Scroll down (vertical mode) |
| F | Toggle fullscreen |
| Escape | Exit fullscreen / close modal |
| + / - | Zoom in / out |
| [ / ] | Previous / next chapter |

---

## Page 3: Login Page (`/login`)

### Layout Structure (ASCII Wireframe)

```
Desktop:
+------------------------------------------------------------------+
|                                                                   |
|               [Background gradient + subtle pattern]              |
|                                                                   |
|                    +------------------------+                      |
|                    |  GLASS MORPHISM CARD   |                      |
|                    |                        |                      |
|                    |      [Logo Icon]       |                      |
|                    |       MANGAVOID        |                      |
|                    |   "Your manga journey  |                      |
|                    |      starts here"      |                      |
|                    |                        |                      |
|                    |   +----------------+   |                      |
|                    |   |     Email      |   |                      |
|                    |   +----------------+   |                      |
|                    |                        |                      |
|                    |   +----------------+   |                      |
|                    |   |    Password  o |   |                      |
|                    |   +----------------+   |                      |
|                    |                        |                      |
|                    |   [x] Remember me      |                      |
|                    |        Forgot password?|                      |
|                    |                        |                      |
|                    |   [====== LOGIN ======]|                      |
|                    |                        |                      |
|                    |   -------- or -------- |                      |
|                    |                        |                      |
|                    |   [G] Continue w Google|                      |
|                    |   [f] Continue w FB    |                      |
|                    |                        |                      |
|                    |   Don't have account?  |                      |
|                    |   Sign up              |                      |
|                    +------------------------+                      |
|                                                                   |
+------------------------------------------------------------------+

Mobile:
+--------------------------------+
|                                |
|   [Background gradient]         |
|                                |
|        [Logo Icon]              |
|         MANGAVOID               |
|     Your manga journey          |
|        starts here              |
|                                |
| +----------------------------+ |
| | Email                      | |
| +----------------------------+ |
|                                |
| +----------------------------+ |
| | Password                 o | |
| +----------------------------+ |
|                                |
| [x] Remember me                |
|            Forgot password?    |
|                                |
| [========= LOGIN ============] |
|                                |
| ----------- or --------------- |
|                                |
| [G] Continue with Google       |
| [f] Continue with Facebook     |
|                                |
| Don't have an account?         |
| Sign up                        |
|                                |
+--------------------------------+
```

### Component Breakdown

1. **AuthBackground**
   - Gradient background
   - Subtle animated pattern/noise
   - Optional floating manga covers (decorative)

2. **GlassCard**
   - Frosted glass effect
   - Subtle border
   - Shadow

3. **AuthLogo**
   - Logo icon with gradient
   - Brand name
   - Tagline

4. **LoginForm**
   - Email input with icon
   - Password input with toggle visibility
   - Remember me checkbox
   - Forgot password link
   - Submit button

5. **SocialLoginButtons**
   - Google button (branded)
   - Facebook button (branded)
   - Divider with "or"

6. **AuthFooterLink**
   - Register prompt
   - Link to register page

### Styling Specifications

**Background:**
```css
background: linear-gradient(
  135deg,
  #0a0c14 0%,
  #121520 50%,
  #0a0c14 100%
);
min-height: 100vh;
display: flex;
align-items: center;
justify-content: center;

/* Subtle grid pattern overlay */
&::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
    rgba(59,130,246,0.1) 1px,
    transparent 1px
  );
  background-size: 40px 40px;
  opacity: 0.3;
}
```

**Glass Card:**
```css
width: 100%;
max-width: 440px;
padding: 48px 40px;
background: rgba(26, 30, 46, 0.7);
backdrop-filter: blur(20px);
border: 1px solid rgba(255,255,255,0.1);
border-radius: 24px;
box-shadow:
  0 25px 50px -12px rgba(0,0,0,0.5),
  0 0 100px rgba(59,130,246,0.1);
```

**Input Fields:**
```css
width: 100%;
height: 56px;
padding: 0 16px 0 48px;
background: rgba(255,255,255,0.05);
border: 1px solid rgba(255,255,255,0.1);
border-radius: 12px;
color: #f1f5f9;
font-size: 16px;
transition: all 0.2s;

&:focus {
  border-color: #3b82f6;
  background: rgba(255,255,255,0.08);
  box-shadow: 0 0 0 3px rgba(59,130,246,0.2);
}

&::placeholder {
  color: #64748b;
}

/* Left icon */
.input-icon {
  position: absolute;
  left: 16px;
  color: #64748b;
}
```

**Primary Button (Login):**
```css
width: 100%;
height: 56px;
background: linear-gradient(90deg, #3b82f6, #2563eb);
border: none;
border-radius: 12px;
color: white;
font-family: 'Outfit', sans-serif;
font-size: 16px;
font-weight: 700;
cursor: pointer;
transition: all 0.2s;

&:hover {
  background: linear-gradient(90deg, #60a5fa, #3b82f6);
  box-shadow: 0 0 30px rgba(59,130,246,0.4);
  transform: translateY(-2px);
}

&:active {
  transform: translateY(0);
}

&:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

**Social Buttons:**
```css
width: 100%;
height: 48px;
display: flex;
align-items: center;
justify-content: center;
gap: 12px;
border-radius: 12px;
font-weight: 600;
font-size: 14px;
transition: all 0.2s;

/* Google */
&.google {
  background: white;
  color: #374151;

  &:hover {
    background: #f3f4f6;
  }
}

/* Facebook */
&.facebook {
  background: #1877f2;
  color: white;

  &:hover {
    background: #166fe5;
  }
}
```

### Interactions/States

| Element | State | Effect |
|---------|-------|--------|
| Input | Focus | Blue border, glow, background lighten |
| Input | Error | Red border, error message below |
| Input | Valid | Green checkmark icon (optional) |
| Password Toggle | Click | Icon changes, type toggles |
| Login Button | Hover | Gradient shift, glow, lift |
| Login Button | Loading | Spinner, disabled |
| Login Button | Success | Green flash, redirect |
| Social Buttons | Hover | Background change |
| Forgot Password | Hover | Underline, color change |

### Form Validation

| Field | Validation | Error Message |
|-------|------------|---------------|
| Email | Required | "Email is required" |
| Email | Format | "Please enter a valid email" |
| Password | Required | "Password is required" |
| Password | Min length | "Password must be at least 8 characters" |

---

## Page 4: Register Page (`/register`)

### Layout Structure (ASCII Wireframe)

```
Desktop:
+------------------------------------------------------------------+
|                                                                   |
|               [Background gradient + subtle pattern]              |
|                                                                   |
|                    +------------------------+                      |
|                    |  GLASS MORPHISM CARD   |                      |
|                    |                        |                      |
|                    |      [Logo Icon]       |                      |
|                    |       MANGAVOID        |                      |
|                    |   "Create your account"|                      |
|                    |                        |                      |
|                    |   +----------------+   |                      |
|                    |   |    Username    |   |                      |
|                    |   +----------------+   |                      |
|                    |                        |                      |
|                    |   +----------------+   |                      |
|                    |   |     Email      |   |                      |
|                    |   +----------------+   |                      |
|                    |                        |                      |
|                    |   +----------------+   |                      |
|                    |   |    Password  o |   |                      |
|                    |   +----------------+   |                      |
|                    |                        |                      |
|                    |   +----------------+   |                      |
|                    |   | Confirm Pass o |   |                      |
|                    |   +----------------+   |                      |
|                    |                        |                      |
|                    |   [x] I agree to Terms |                      |
|                    |   & Privacy Policy     |                      |
|                    |                        |                      |
|                    |   [==== SIGN UP ====]  |                      |
|                    |                        |                      |
|                    |   -------- or -------- |                      |
|                    |                        |                      |
|                    |   [G] Sign up w Google |                      |
|                    |                        |                      |
|                    |   Already have account?|                      |
|                    |   Log in               |                      |
|                    +------------------------+                      |
|                                                                   |
+------------------------------------------------------------------+

Mobile (same structure as login, with additional fields):
+--------------------------------+
|                                |
|   [Background gradient]         |
|                                |
|        [Logo Icon]              |
|         MANGAVOID               |
|     Create your account         |
|                                |
| +----------------------------+ |
| | Username                   | |
| +----------------------------+ |
|                                |
| +----------------------------+ |
| | Email                      | |
| +----------------------------+ |
|                                |
| +----------------------------+ |
| | Password                 o | |
| +----------------------------+ |
| [Password strength indicator]   |
|                                |
| +----------------------------+ |
| | Confirm Password         o | |
| +----------------------------+ |
|                                |
| [x] I agree to Terms of        |
|     Service and Privacy Policy |
|                                |
| [========= SIGN UP ==========] |
|                                |
| ----------- or --------------- |
|                                |
| [G] Sign up with Google        |
|                                |
| Already have an account?       |
| Log in                         |
|                                |
+--------------------------------+
```

### Component Breakdown

1. **AuthBackground** (reused from Login)
2. **GlassCard** (reused from Login)
3. **AuthLogo** (reused, different tagline)

4. **RegisterForm**
   - Username input with validation
   - Email input with validation
   - Password input with strength indicator
   - Confirm password input with match check
   - Terms checkbox with links
   - Submit button

5. **PasswordStrengthIndicator**
   - Visual bar showing strength
   - Color: red → orange → green
   - Text feedback: Weak, Fair, Good, Strong

6. **TermsCheckbox**
   - Custom checkbox styling
   - Links to Terms and Privacy Policy

7. **SocialSignupButtons** (simplified)
   - Google only for registration

8. **AuthFooterLink**
   - Login prompt
   - Link to login page

### Styling Specifications

**Password Strength Indicator:**
```css
.strength-bar {
  height: 4px;
  border-radius: 2px;
  background: rgba(255,255,255,0.1);
  margin-top: 8px;
  overflow: hidden;

  .strength-fill {
    height: 100%;
    transition: width 0.3s, background 0.3s;

    /* Weak */
    &.weak { width: 25%; background: #ef4444; }

    /* Fair */
    &.fair { width: 50%; background: #f59e0b; }

    /* Good */
    &.good { width: 75%; background: #3b82f6; }

    /* Strong */
    &.strong { width: 100%; background: #22c55e; }
  }
}

.strength-text {
  font-size: 12px;
  margin-top: 4px;
  color: #94a3b8;
}
```

**Custom Checkbox:**
```css
.checkbox-container {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;

  .checkbox {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255,255,255,0.2);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    flex-shrink: 0;

    &.checked {
      background: #3b82f6;
      border-color: #3b82f6;

      svg {
        color: white;
      }
    }
  }

  .label {
    font-size: 14px;
    color: #94a3b8;

    a {
      color: #3b82f6;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
```

**Sign Up Button:** (same as Login button)

### Interactions/States

| Element | State | Effect |
|---------|-------|--------|
| Username | Typing | Check availability (debounced) |
| Username | Available | Green checkmark |
| Username | Taken | Red X, error message |
| Password | Typing | Strength indicator updates |
| Confirm Password | Match | Green checkmark |
| Confirm Password | No match | Red X, error message |
| Terms Checkbox | Unchecked | Submit disabled |
| Terms Checkbox | Checked | Submit enabled |
| Sign Up Button | Hover | Same as login |
| Sign Up Button | Success | Green, redirect to verify email |

### Form Validation

| Field | Validation | Error Message |
|-------|------------|---------------|
| Username | Required | "Username is required" |
| Username | Min 3 chars | "Username must be at least 3 characters" |
| Username | Max 20 chars | "Username cannot exceed 20 characters" |
| Username | Alphanumeric | "Username can only contain letters, numbers, and underscores" |
| Username | Unique | "This username is already taken" |
| Email | Required | "Email is required" |
| Email | Format | "Please enter a valid email" |
| Email | Unique | "An account with this email already exists" |
| Password | Required | "Password is required" |
| Password | Min 8 chars | "Password must be at least 8 characters" |
| Password | Strength | "Password is too weak" |
| Confirm | Required | "Please confirm your password" |
| Confirm | Match | "Passwords do not match" |
| Terms | Required | "You must agree to the terms" |

---

## Responsive Breakpoints

| Breakpoint | Width | Description |
|------------|-------|-------------|
| xs | 0 - 599px | Mobile phones |
| sm | 600 - 899px | Small tablets |
| md | 900 - 1199px | Tablets, small laptops |
| lg | 1200 - 1535px | Desktops |
| xl | 1536px+ | Large screens |

---

## Accessibility Requirements

1. **Focus States**: All interactive elements must have visible focus indicators
2. **Color Contrast**: Meet WCAG AA standards (4.5:1 for text, 3:1 for large text)
3. **Keyboard Navigation**: Full keyboard support for all interactions
4. **Screen Readers**: Proper ARIA labels and semantic HTML
5. **Skip Links**: Skip to main content for reader page
6. **Reduced Motion**: Respect prefers-reduced-motion setting

---

## Icon Reference

Using Material Icons (Material Symbols Outlined):

| Usage | Icon Name |
|-------|-----------|
| Back | arrow_back |
| Close | close |
| Menu | menu |
| Search | search |
| Share | share |
| Bookmark | bookmark / bookmark_border |
| Add Library | library_add / library_add_check |
| Fullscreen | fullscreen / fullscreen_exit |
| Settings | settings |
| Zoom In | zoom_in |
| Zoom Out | zoom_out |
| Visibility | visibility / visibility_off |
| Email | email |
| Lock | lock |
| Person | person |
| Check | check |
| Error | error |
| Navigate Prev | navigate_before |
| Navigate Next | navigate_next |
| Expand More | expand_more |
| Expand Less | expand_less |

---

## Animation Guidelines

**Transitions:**
- Duration: 200ms for micro-interactions, 300ms for larger transitions
- Easing: `ease` or `cubic-bezier(0.4, 0, 0.2, 1)`

**Entrance Animations:**
- Fade in: opacity 0 → 1 over 300ms
- Slide up: translateY(20px) → 0 over 300ms
- Scale in: scale(0.95) → 1 over 200ms

**Exit Animations:**
- Fade out: opacity 1 → 0 over 200ms
- Slide out: Same as entrance, reversed

---

## Unresolved Questions

1. **Reader Page**: Should we support RTL reading direction for Japanese manga? (common feature)
2. **Reader Page**: What's the desired behavior when reaching the last chapter? Auto-suggest next manga?
3. **Social Login**: Are Discord and Twitter social login options needed in addition to Google/Facebook?
4. **Email Verification**: Should we show verification required screen after registration?
5. **Password Reset**: Need design for forgot password flow (enter email, email sent confirmation, reset password page)?
6. **Offline Reading**: Should the reader support PWA offline mode with cached chapters?
7. **Comments**: Should chapter reader include a comments section at the bottom?
