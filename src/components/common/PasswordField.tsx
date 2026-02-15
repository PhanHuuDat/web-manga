import { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
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
                <Icon sx={{ fontSize: 20 }}>
                  {showPassword ? 'visibility_off' : 'visibility'}
                </Icon>
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

export default PasswordField;
