import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';

function UserMenu() {
  const { t } = useTranslation('common');

  return (
    <IconButton
      aria-label={t('nav.userMenu')}
      sx={{
        color: 'text.secondary',
        '&:hover': { color: 'text.primary', bgcolor: 'action.hover' },
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
        <path
          d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </IconButton>
  );
}

export default UserMenu;
