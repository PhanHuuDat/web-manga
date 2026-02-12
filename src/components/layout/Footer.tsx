import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import PublicIcon from '@mui/icons-material/Public';
import RssFeedIcon from '@mui/icons-material/RssFeed';

function Footer() {
  const { t } = useTranslation('common');

  return (
    <Box
      component="footer"
      sx={{
        mt: 10,
        borderTop: '1px solid rgba(255,255,255,0.05)',
        bgcolor: '#121520',
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        {/* Main Footer Content */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 6,
            mb: 4,
          }}
        >
          {/* Brand Column */}
          <Box sx={{ maxWidth: { md: 600 }, flex: { md: '0 0 auto' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: '#3b82f6',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  sx={{ color: 'white', fontWeight: 800, fontSize: 14 }}
                >
                  M
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontFamily: '"Outfit", sans-serif',
                  fontWeight: 800,
                  fontSize: 20,
                  color: 'white',
                }}
              >
                MANGAVOID
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: 14,
                color: 'text.secondary',
                mb: 3,
                maxWidth: 280,
              }}
            >
              {t('footer.description')}
            </Typography>
            {/* Social Icons */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: 'rgba(255,255,255,0.05)',
                  borderRadius: 1,
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                }}
              >
                <PublicIcon sx={{ fontSize: 18, color: 'white' }} />
              </IconButton>
              <IconButton
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: 'rgba(255,255,255,0.05)',
                  borderRadius: 1,
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                }}
              >
                <RssFeedIcon sx={{ fontSize: 18, color: 'white' }} />
              </IconButton>
            </Box>
          </Box>

          {/* Navigation Column */}
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 12,
                mb: 2,
                color: 'white',
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}
            >
              {t('footer.navigation')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Link
                href="/"
                underline="none"
                sx={{
                  color: 'text.secondary',
                  fontSize: 14,
                  '&:hover': { color: 'primary.main' },
                }}
              >
                {t('footer.nav.home')}
              </Link>
              <Link
                href="/latest"
                underline="none"
                sx={{
                  color: 'text.secondary',
                  fontSize: 14,
                  '&:hover': { color: 'primary.main' },
                }}
              >
                {t('footer.nav.latest')}
              </Link>
              <Link
                href="/popular"
                underline="none"
                sx={{
                  color: 'text.secondary',
                  fontSize: 14,
                  '&:hover': { color: 'primary.main' },
                }}
              >
                {t('footer.nav.popular')}
              </Link>
              <Link
                href="/genres"
                underline="none"
                sx={{
                  color: 'text.secondary',
                  fontSize: 14,
                  '&:hover': { color: 'primary.main' },
                }}
              >
                {t('footer.nav.genres')}
              </Link>
            </Box>
          </Box>

          {/* Support Column */}
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 12,
                mb: 2,
                color: 'white',
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}
            >
              {t('footer.support')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Link
                href="/privacy"
                underline="none"
                sx={{
                  color: 'text.secondary',
                  fontSize: 14,
                  '&:hover': { color: 'primary.main' },
                }}
              >
                {t('footer.supportLinks.privacy')}
              </Link>
              <Link
                href="/terms"
                underline="none"
                sx={{
                  color: 'text.secondary',
                  fontSize: 14,
                  '&:hover': { color: 'primary.main' },
                }}
              >
                {t('footer.supportLinks.terms')}
              </Link>
              <Link
                href="/contact"
                underline="none"
                sx={{
                  color: 'text.secondary',
                  fontSize: 14,
                  '&:hover': { color: 'primary.main' },
                }}
              >
                {t('footer.supportLinks.contact')}
              </Link>
              <Link
                href="/discord"
                underline="none"
                sx={{
                  color: 'text.secondary',
                  fontSize: 14,
                  '&:hover': { color: 'primary.main' },
                }}
              >
                {t('footer.supportLinks.discord')}
              </Link>
            </Box>
          </Box>
        </Box>

        {/* Bottom Bar */}
        <Box
          sx={{
            borderTop: '1px solid rgba(255,255,255,0.05)',
            pt: 4,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 1,
              color: '#4B5563',
            }}
          >
            © 2026 MANGAVOID. ALL RIGHTS RESERVED.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link
              href="/api"
              underline="none"
              sx={{
                fontSize: 10,
                fontWeight: 700,
                color: '#4B5563',
                '&:hover': { color: 'text.secondary' },
              }}
            >
              API
            </Link>
            <Link
              href="/dmca"
              underline="none"
              sx={{
                fontSize: 10,
                fontWeight: 700,
                color: '#4B5563',
                '&:hover': { color: 'text.secondary' },
              }}
            >
              DMCA
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
