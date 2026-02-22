import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { selectIsAuthenticated, selectCurrentUser } from '../../store/slices/auth-slice';
import { ADMIN_ROLES } from './admin-navigation-config';
import AdminForbiddenPage from '../../pages/admin/AdminForbiddenPage';

function AdminRoute() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const hasAdminRole = user?.roles.some((r) => ADMIN_ROLES.includes(r));
  if (!hasAdminRole) {
    return <AdminForbiddenPage />;
  }

  return <Outlet />;
}

export default AdminRoute;
