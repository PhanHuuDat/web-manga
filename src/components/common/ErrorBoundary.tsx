import { Component, type ReactNode } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            bgcolor: '#0a0c14',
            p: 3,
          }}
        >
          <ErrorOutline sx={{ fontSize: 64, color: '#ef4444', mb: 2 }} />
          <Typography
            sx={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 24,
              fontWeight: 700,
              color: '#f1f5f9',
              mb: 1,
            }}
          >
            Something went wrong
          </Typography>
          <Typography
            sx={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 14,
              color: '#94a3b8',
              mb: 3,
              textAlign: 'center',
            }}
          >
            {this.state.error?.message || 'An unexpected error occurred'}
          </Typography>
          <Button
            variant="contained"
            onClick={this.handleReload}
            sx={{
              bgcolor: '#3b82f6',
              fontFamily: 'JetBrains Mono, monospace',
              textTransform: 'none',
              px: 3,
              '&:hover': { bgcolor: '#2563eb' },
            }}
          >
            Try Again
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}
