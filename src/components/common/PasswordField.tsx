import { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import type { TextFieldProps } from '@mui/material/TextField';

type PasswordFieldProps = Omit<TextFieldProps, 'type'>;

function PasswordField({ ...props }: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <TextField
      {...props}
      type={showPassword ? 'text' : 'password'}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type="button"
                onClick={handleToggleVisibility}
                edge="end"
                size="small"
                sx={{ color: 'text.secondary' }}
              >
                {showPassword
                  ? <VisibilityOff sx={{ fontSize: 20 }} />
                  : <Visibility sx={{ fontSize: 20 }} />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

export default PasswordField;
