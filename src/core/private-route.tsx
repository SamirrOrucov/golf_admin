import { Navigate } from 'react-router';

const PrivateRoute = (props: any) => {
  const { children } = props;

  if (!localStorage.getItem('user')) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};

export default PrivateRoute;
