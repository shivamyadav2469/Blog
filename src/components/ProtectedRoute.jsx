import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const currentUser = useSelector((state) => state.auth.user);

  if (!currentUser) {
    return <Navigate to="/signup" />;
  }

  return children;
};

export default ProtectedRoute;
