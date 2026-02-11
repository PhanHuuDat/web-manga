import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface SectionHeaderProps {
  title: string;
  action?: React.ReactNode;
}

function SectionHeader({ title, action }: SectionHeaderProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            width: 48,
            height: 4,
            bgcolor: 'primary.main',
            borderRadius: 1,
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontFamily: '"Outfit", sans-serif',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'text.primary',
          }}
        >
          {title}
        </Typography>
      </Box>
      {action}
    </Box>
  );
}

export default SectionHeader;
