import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import type { AdminUserDto } from '../../types/admin-api-types';

const ALL_ROLES = ['Reader', 'Uploader', 'Moderator', 'Admin'];

interface UserRoleEditDialogProps {
  open: boolean;
  user: AdminUserDto | null;
  onClose: () => void;
  onSave: (userId: string, changes: { role: string; grant: boolean }[]) => Promise<void>;
  loading?: boolean;
}

function UserRoleEditDialog({ open, user, onClose, onSave, loading = false }: UserRoleEditDialogProps) {
  const [selectedRoles, setSelectedRoles] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (user) setSelectedRoles(new Set(user.roles));
  }, [user]);

  const handleToggle = (role: string) => {
    setSelectedRoles((prev) => {
      const next = new Set(prev);
      if (next.has(role)) next.delete(role);
      else next.add(role);
      return next;
    });
  };

  const handleSave = async () => {
    if (!user) return;
    const original = new Set(user.roles);
    const changes: { role: string; grant: boolean }[] = [];
    for (const role of selectedRoles) {
      if (!original.has(role)) changes.push({ role, grant: true });
    }
    for (const role of original) {
      if (!selectedRoles.has(role)) changes.push({ role, grant: false });
    }
    if (changes.length > 0) await onSave(user.id, changes);
    else onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ color: '#f1f5f9', bgcolor: '#1a1e2e' }}>
        Edit Roles — {user?.username}
      </DialogTitle>
      <DialogContent sx={{ bgcolor: '#1a1e2e' }}>
        <FormGroup>
          {ALL_ROLES.map((role) => (
            <FormControlLabel
              key={role}
              control={
                <Checkbox
                  checked={selectedRoles.has(role)}
                  onChange={() => handleToggle(role)}
                  disabled={loading}
                  sx={{ color: '#94a3b8', '&.Mui-checked': { color: '#3b82f6' } }}
                />
              }
              label={role}
              sx={{ color: '#f1f5f9' }}
            />
          ))}
        </FormGroup>
      </DialogContent>
      <DialogActions sx={{ bgcolor: '#1a1e2e', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <Button onClick={onClose} disabled={loading} sx={{ color: '#94a3b8' }}>
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" disabled={loading} sx={{ bgcolor: '#3b82f6' }}>
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserRoleEditDialog;
