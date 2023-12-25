import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

function UserProtectedRoute() {
  const token = localStorage.getItem('accessToken');
  const role = localStorage.getItem('loggedUserRole');

  return token && role === 'user' ? <Outlet /> : <Navigate to={'/login'} />;
}

export default UserProtectedRoute;