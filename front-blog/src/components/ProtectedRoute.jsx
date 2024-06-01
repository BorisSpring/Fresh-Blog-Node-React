import React from 'react';

import Loader from '../components/Loader';

// custom hook
import { useGetLoggedUser } from '../hooks/users/useGetLoggedUser';
import { Navigate, Outlet, useLocation } from 'react-router';

const adminRoutes = [
  '/dashboard/statistics',
  '/dashboard/messages?page=1',
  '/dashboard/users?page=1',
  '/dashboard/categories',
  '/dashboard/tags',
];

const ProtectedRoute = () => {
  const { loggedUser, isLoadingUser } = useGetLoggedUser();
  const location = useLocation();

  if (isLoadingUser) return <Loader />;

  if (
    loggedUser?.data?.role !== 'admin' &&
    adminRoutes.includes(location.pathname)
  ) {
    return <Navigate to='/dashboard/blogs?page=1' replace={true} />;
  }

  return loggedUser?.data ? (
    <Outlet />
  ) : (
    <Navigate to='/signin' replace={true} />
  );
};

export default ProtectedRoute;
