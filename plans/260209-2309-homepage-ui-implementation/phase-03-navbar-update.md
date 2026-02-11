# Phase 3: Navbar Update

## Context
- [Navbar.tsx](../../src/components/layout/Navbar.tsx) - Current navbar
- Reference HTML design

## Overview
- **Priority:** P1
- **Status:** pending
- **Effort:** 30m

Update navbar to match reference: Logo | SearchBar | Nav Links | LanguageSwitcher | Login

---

## Reference Design

```
┌─────────────────────────────────────────────────────────────────────┐
│  [🔵] MANGAVOID  |  [========SearchBar========]  | Browse Popular Schedule | [LOGIN] │
└─────────────────────────────────────────────────────────────────────┘
```

### Key Features
- Sticky header with backdrop blur
- Logo: gradient icon + glow text
- SearchBar: full-width (hidden on mobile)
- Nav links: hidden on mobile (lg:flex)
- Login button: gradient background

---

## Changes to Navbar.tsx

### Structure
```tsx
<AppBar position="sticky" sx={{
  bgcolor: 'rgba(10, 12, 20, 0.8)',
  backdropFilter: 'blur(12px)',
  borderBottom: '1px solid rgba(255,255,255,0.05)'
}}>
  <Container maxWidth="xl">
    <Toolbar sx={{ height: 80, gap: 4 }}>
      {/* Logo with gradient icon */}
      {/* SearchBar (flex: 1, hidden xs) */}
      {/* Nav Links (hidden xs/md) */}
      {/* LanguageSwitcher + Login Button */}
    </Toolbar>
  </Container>
</AppBar>
```

### Logo Styling
```tsx
// Gradient icon box
sx={{
  width: 40, height: 40,
  background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
  borderRadius: 2,
  boxShadow: '0 0 15px rgba(59,130,246,0.4)'
}}

// Text glow
sx={{ textShadow: '0 0 10px rgba(59,130,246,0.5)' }}
```

### Login Button
```tsx
sx={{
  background: 'linear-gradient(90deg, #3b82f6, #2563eb)',
  fontWeight: 700,
  '&:hover': { boxShadow: '0 0 20px rgba(59,130,246,0.3)' }
}}
```

---

## i18n Keys

### en/common.json
```json
{
  "navbar": {
    "browse": "Browse",
    "popular": "Popular",
    "schedule": "Schedule",
    "login": "LOGIN"
  }
}
```

### vi/common.json
```json
{
  "navbar": {
    "browse": "Duyệt",
    "popular": "Phổ biến",
    "schedule": "Lịch",
    "login": "ĐĂNG NHẬP"
  }
}
```

---

## Files to Modify

| File | Action |
|------|--------|
| `src/components/layout/Navbar.tsx` | Update layout, styling |
| `src/i18n/locales/en/common.json` | Add navbar keys |
| `src/i18n/locales/vi/common.json` | Add navbar keys |

---

## Todo

- [ ] Update Navbar.tsx with new layout
- [ ] Add gradient logo styling
- [ ] Add nav links (Browse, Popular, Schedule)
- [ ] Update Login button styling
- [ ] Add i18n keys
- [ ] Run `pnpm build`

---

## Success Criteria

- [ ] Logo displays with gradient icon + glow
- [ ] SearchBar centered and responsive
- [ ] Nav links visible on lg screens
- [ ] Login button has gradient
- [ ] Sticky with blur effect
- [ ] i18n works EN/VI
