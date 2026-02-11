# Phase 1: Theme Update

## Status: pending

## Overview
Update MUI theme to match reference design colors and typography.

---

## Changes Required

### 1. Update `index.html` - Add Google Fonts
```html
<link href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700&family=Outfit:wght@400;600;800&display=swap" rel="stylesheet">
```

### 2. Update `src/theme/theme.ts`

#### Colors
```typescript
palette: {
  mode: 'dark',
  primary: {
    main: '#3b82f6',      // neon-blue
    light: '#60a5fa',
    dark: '#2563eb',
  },
  secondary: {
    main: '#a855f7',      // neon-purple
    light: '#c084fc',
    dark: '#9333ea',
  },
  background: {
    default: '#0a0c14',   // dark-navy
    paper: '#1a1e2e',     // card-bg
  },
  text: {
    primary: '#f1f5f9',
    secondary: '#94a3b8',
    disabled: '#64748b',
  },
  divider: 'rgba(255, 255, 255, 0.05)',
  success: { main: '#22c55e' },
  warning: { main: '#f59e0b' },
  error: { main: '#ef4444' },
}
```

#### Typography
```typescript
typography: {
  fontFamily: '"Spline Sans", sans-serif',
  h1: { fontFamily: '"Outfit", sans-serif', fontWeight: 800 },
  h2: { fontFamily: '"Outfit", sans-serif', fontWeight: 800 },
  h3: { fontFamily: '"Outfit", sans-serif', fontWeight: 700 },
  h4: { fontFamily: '"Outfit", sans-serif', fontWeight: 700 },
  h5: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
  h6: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
}
```

#### Custom Colors (extend theme)
```typescript
// Add to theme for easy access
customColors: {
  darkNavy: '#0a0c14',
  deepCharcoal: '#121520',
  cardBg: '#1a1e2e',
  neonBlue: '#3b82f6',
  neonPurple: '#a855f7',
  glass: 'rgba(255, 255, 255, 0.05)',
}
```

---

## Files to Modify

| File | Action |
|------|--------|
| `index.html` | Add Outfit + Spline Sans fonts |
| `src/theme/theme.ts` | Update palette + typography |

---

## Validation

- [ ] App loads without errors
- [ ] Background is dark-navy (#0a0c14)
- [ ] Text is readable
- [ ] Fonts loaded (check Network tab)
- [ ] `pnpm build` passes
