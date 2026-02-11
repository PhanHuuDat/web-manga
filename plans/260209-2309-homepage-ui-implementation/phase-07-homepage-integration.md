# Phase 7: Homepage Integration

## Context
- All section components from Phases 4-6
- [HomePage.tsx](../../src/pages/HomePage.tsx)

## Overview
- **Priority:** P1
- **Status:** pending
- **Effort:** 30m

Integrate all sections into HomePage with two-column layout.

---

## Reference Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  NAVBAR                                                         │
├─────────────────────────────────────────────────────────────────┤
│  ┌─ FEATURED SECTION (full width, py: 40px) ──────────────────┐ │
│  │  [card] [card] [card] [card] [card]                        │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌─ MAIN CONTENT (py: 40px) ──────────────────────────────────┐ │
│  │  ┌─ LEFT (65%) ─────────────┐  ┌─ RIGHT (35%) ───────────┐ │ │
│  │  │  LatestMangaSection      │  │  HomeSidebar            │ │ │
│  │  └──────────────────────────┘  └─────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  FOOTER                                                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## Update HomePage.tsx

```tsx
import { Box, Container } from '@mui/material';
import FeaturedSection from '../components/home/FeaturedSection';
import LatestMangaSection from '../components/home/LatestMangaSection';
import HomeSidebar from '../components/home/HomeSidebar';

function HomePage() {
  return (
    <>
      {/* Featured Section */}
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <FeaturedSection />
      </Container>

      {/* Main Content - Two Columns */}
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          gap: 6
        }}>
          {/* Left Column */}
          <Box sx={{ width: { xs: '100%', lg: '65%' } }}>
            <LatestMangaSection />
          </Box>

          {/* Right Column */}
          <Box sx={{ width: { xs: '100%', lg: '35%' } }}>
            <HomeSidebar />
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default HomePage;
```

---

## Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| xs (0-600px) | Single column |
| sm (600-900px) | Single column |
| md (900-1200px) | Single column |
| lg (1200px+) | Two columns (65%/35%) |

---

## Files to Modify

| File | Action |
|------|--------|
| `src/pages/HomePage.tsx` | Replace with integrated layout |

---

## Todo

- [ ] Update HomePage.tsx
- [ ] Test responsive layout
- [ ] Verify all sections render
- [ ] Run `pnpm build`

---

## Success Criteria

- [ ] Featured section at top
- [ ] Two-column on lg screens
- [ ] Single column on mobile
- [ ] All sections render
- [ ] No horizontal scroll
