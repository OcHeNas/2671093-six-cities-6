import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  isAuth: boolean;
  children: JSX.Element;
};

function PrivateRoute({ isAuth, children }: PrivateRouteProps): JSX.Element {
  return isAuth ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
