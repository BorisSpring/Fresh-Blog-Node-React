import React, { useEffect } from 'react';

// components
import ChangePictureForm from './ChangePictureForm';
import ChangePasswordForm from './ChangePasswordForm';

// custom hooks
import { useDeactivateAccount } from '../hooks/users/useDeactivateAccount';
import { useParams } from 'react-router';
import { useVerifyAccount } from '../hooks/users/useVerifyAccount';

const DashboardSettings = () => {
  const { token } = useParams();
  const { deactivateAccount, isDeactivating } = useDeactivateAccount();
  const { verifyAcc, isVerifying } = useVerifyAccount();

  useEffect(() => {
    if (token) {
      verifyAcc(token);
    }
  }, [token, verifyAcc]);

  return (
    <div className='flex flex-col gap-10  lg:gap-16 overflow-y-auto h-calc-vh paddingDashboard'>
      {isVerifying && (
        <h2 className='text-blue-75 font-semibold md:text-lg text-center'>
          Account is Verifying....
        </h2>
      )}
      <ChangePictureForm />
      <ChangePasswordForm />
      <button
        disabled={isDeactivating}
        onClick={() => deactivateAccount()}
        className='w-[90%] max-w-[400px] text-white py-1 mx-auto md:py-2   font-semibold bg-blue-75 hover:bg-blue-100 transition-all duration-300 hover:shadow-md hover:shadow-blue-100 hover:scale-105'
      >
        Deactivate Account
      </button>
    </div>
  );
};

export default DashboardSettings;
