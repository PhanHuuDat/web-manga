# Phase 8: Footer Component

## Context
- Reference HTML footer design
- [Layout.tsx](../../src/components/layout/Layout.tsx)

## Overview
- **Priority:** P1
- **Status:** pending
- **Effort:** 30m

Create footer matching reference design.

---

## Reference Design

```
┌─────────────────────────────────────────────────────────────────┐
│  FOOTER (bg: #121520 deep-charcoal)                             │
│                                                                  │
│  ┌──────────────────┐ ┌───────────┐ ┌───────────┐              │
│  │  [Logo]          │ │ Navigation│ │ Support   │              │
│  │  MANGAVOID       │ │ Home      │ │ Privacy   │              │
│  │  Description...  │ │ Latest    │ │ Terms     │              │
│  │  [🌐] [📡]       │ │ Popular   │ │ Contact   │              │
│  └──────────────────┘ └───────────┘ └───────────┘              │
│  ─────────────────────────────────────────────────────────────  │
│  © 2026 MANGAVOID. ALL RIGHTS RESERVED.    [API] [DMCA]         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Files to Create

| File | Purpose | Lines |
|------|---------|-------|
| `src/components/layout/Footer.tsx` | Footer component | ~120 |

## Files to Modify

| File | Action |
|------|--------|
| `src/components/layout/Layout.tsx` | Add Footer |
| `src/i18n/locales/en/common.json` | Add footer keys |
| `src/i18n/locales/vi/common.json` | Add footer keys |

---

## Component Structure

```tsx
<Box component="footer" sx={{
  mt: 10,
  borderTop: '1px solid rgba(255,255,255,0.05)',
  bgcolor: '#121520',
  py: 10,
}}>
  <Container maxWidth="xl">
    {/* 3-column grid: Brand | Navigation | Support */}
    <Grid>...</Grid>

    {/* Divider */}
    <Divider />

    {/* Bottom: Copyright + Links */}
    <Box>...</Box>
  </Container>
</Box>
```

---

## i18n Keys

### en/common.json
```json
{
  "footer": {
    "description": "LuvManga is your premium destination for high-quality manga reading.",
    "navigation": "Navigation",
    "support": "Support",
    "nav": {
      "home": "Home",
      "latest": "Latest Updates",
      "popular": "Popular Manga",
      "genres": "Genres"
    },
    "supportLinks": {
      "privacy": "Privacy Policy",
      "terms": "Terms of Service",
      "contact": "Contact Us",
      "discord": "Discord Community"
    }
  }
}
```

### vi/common.json
```json
{
  "footer": {
    "description": "LuvManga là điểm đến cao cấp để đọc manga chất lượng cao.",
    "navigation": "Điều hướng",
    "support": "Hỗ trợ",
    "nav": {
      "home": "Trang chủ",
      "latest": "Mới cập nhật",
      "popular": "Phổ biến",
      "genres": "Thể loại"
    },
    "supportLinks": {
      "privacy": "Chính sách bảo mật",
      "terms": "Điều khoản",
      "contact": "Liên hệ",
      "discord": "Discord"
    }
  }
}
```

---

## Update Layout.tsx

```tsx
import Footer from './Footer';

// In return:
<>
  <Navbar />
  <Box component="main" sx={{ pt: 10 }}>
    <Outlet />
  </Box>
  <Footer />
</>
```

---

## Todo

- [ ] Create Footer.tsx
- [ ] Update Layout.tsx
- [ ] Add i18n keys
- [ ] Run `pnpm build`

---

## Success Criteria

- [ ] Footer renders at bottom
- [ ] 3-column on desktop
- [ ] Single column on mobile
- [ ] Social icons hover effect
- [ ] Links hover color change
- [ ] i18n works EN/VI
