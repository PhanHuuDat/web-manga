# Phase 3: Create LanguageSwitcher Component

## Context

- **Parent Plan:** [plan.md](./plan.md)
- **Depends on:** [Phase 2](./phase-02-create-translation-files.md)

## Overview

| Field | Value |
|-------|-------|
| Priority | P1 |
| Status | Complete |
| Effort | 1h |

Create a LanguageSwitcher component using MUI that allows users to toggle between Vietnamese and English.

## Key Insights

- Use MUI Select or IconButton with Menu for consistency with existing UI
- `useTranslation` hook provides `i18n.changeLanguage()` method
- Language change auto-persists to localStorage via detector plugin
- Component should show current language and available options

## Requirements

**Functional:**
- Display current language (flag icon or text)
- Allow switching between vi/en
- Persist selection automatically (handled by i18next)
- Accessible with keyboard navigation

**Non-functional:**
- Match existing MUI styling (Deep Ocean Blue theme)
- Responsive - works on mobile
- Small footprint in Navbar

## Architecture

```
src/components/common/
└── LanguageSwitcher.tsx
```

Component will be added to Navbar alongside UserMenu.

## Related Code Files

**Create:**
- `src/components/common/LanguageSwitcher.tsx`

**Modify:**
- `src/components/layout/Navbar.tsx` - Add LanguageSwitcher

## Implementation Steps

1. Create `src/components/common/` directory if not exists

2. Create `src/components/common/LanguageSwitcher.tsx`:
   ```tsx
   import { useTranslation } from 'react-i18next';
   import { useState } from 'react';
   import IconButton from '@mui/material/IconButton';
   import Menu from '@mui/material/Menu';
   import MenuItem from '@mui/material/MenuItem';
   import Typography from '@mui/material/Typography';
   import Box from '@mui/material/Box';

   const LANGUAGES = [
     { code: 'en', label: 'English', flag: '🇺🇸' },
     { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
   ] as const;

   function LanguageSwitcher() {
     const { i18n } = useTranslation();
     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
     const open = Boolean(anchorEl);

     const currentLang = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];

     const handleClick = (event: React.MouseEvent<HTMLElement>) => {
       setAnchorEl(event.currentTarget);
     };

     const handleClose = () => {
       setAnchorEl(null);
     };

     const handleLanguageChange = (langCode: string) => {
       i18n.changeLanguage(langCode);
       handleClose();
     };

     return (
       <>
         <IconButton
           onClick={handleClick}
           aria-label="Change language"
           aria-controls={open ? 'language-menu' : undefined}
           aria-haspopup="true"
           aria-expanded={open ? 'true' : undefined}
           sx={{
             color: 'text.secondary',
             '&:hover': { color: 'text.primary', bgcolor: 'action.hover' },
           }}
         >
           <Typography component="span" sx={{ fontSize: '1.25rem' }}>
             {currentLang.flag}
           </Typography>
         </IconButton>
         <Menu
           id="language-menu"
           anchorEl={anchorEl}
           open={open}
           onClose={handleClose}
           MenuListProps={{ 'aria-labelledby': 'language-button' }}
           anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
           transformOrigin={{ vertical: 'top', horizontal: 'right' }}
         >
           {LANGUAGES.map((lang) => (
             <MenuItem
               key={lang.code}
               onClick={() => handleLanguageChange(lang.code)}
               selected={lang.code === i18n.language}
               sx={{ gap: 1 }}
             >
               <Box component="span" sx={{ fontSize: '1.25rem' }}>
                 {lang.flag}
               </Box>
               <Typography>{lang.label}</Typography>
             </MenuItem>
           ))}
         </Menu>
       </>
     );
   }

   export default LanguageSwitcher;
   ```

3. Update `src/components/layout/Navbar.tsx`:
   - Add import: `import LanguageSwitcher from '../common/LanguageSwitcher';`
   - Add `<LanguageSwitcher />` before `<UserMenu />` in the Box with gap

## Todo List

- [ ] Create src/components/common directory
- [ ] Create LanguageSwitcher.tsx component
- [ ] Add LanguageSwitcher to Navbar
- [ ] Test language switching works
- [ ] Verify localStorage persistence
- [ ] Verify build passes

## Success Criteria

- [ ] LanguageSwitcher renders in Navbar
- [ ] Shows current language flag
- [ ] Dropdown shows both language options
- [ ] Clicking option changes language
- [ ] Language persists after page refresh
- [ ] Accessible (keyboard nav, aria labels)
- [ ] Matches existing UI style
- [ ] `pnpm build` passes

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Emoji flag rendering | Low | Use text fallback if needed |
| Menu positioning | Low | Use MUI anchor origin props |

## Security Considerations

- No user input to sanitize
- Language code validated against allowed list

## Next Steps

After completion, proceed to [Phase 4: Integrate Translations](./phase-04-integrate-translations.md)
