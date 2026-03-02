import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('art-collector-auth') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/private" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
