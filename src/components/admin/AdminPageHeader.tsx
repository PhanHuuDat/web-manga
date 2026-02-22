import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface AdminPageHeaderProps {
  title: string;
  action?: React.ReactNode;
  backPath?: string;
}

function AdminPageHeader({ title, action, backPath }: AdminPageHeaderProps) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 3,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {backPath && (
          <IconButton onClick={() => navigate(backPath)} sx={{ color: '#94a3b8' }}>
            <ArrowBack />
          </IconButton>
        )}
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 700,
            color: '#f1f5f9',
          }}
        >
          {title}
        </Typography>
      </Box>
      {action}
    </Box>
  );
}

export default AdminPageHeader;
