import React from 'react';
import { Outlet } from 'react-router';

const ForgotPasswordPage = () => {
  return (
    <div className='grow flex items-center min-h-[60vh] justify-center'>
      <Outlet />
    </div>
  );
};

export default ForgotPasswordPage;
