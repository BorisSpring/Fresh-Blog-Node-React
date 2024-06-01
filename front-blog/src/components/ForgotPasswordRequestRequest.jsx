import React, { useState } from 'react';

// custom hooks
import { useRequestPasswordResetToken } from '../hooks/auth/useRequestPasswordResetToken';

// utils
import { cn } from '../../utils/utils';

const ForgotPasswordRequestRequest = () => {
  const [forgotPasswordState, setForgotPasswordState] = useState({
    serverFailMsg: '',
    serverSuccessMsg: '',
    email: '',
  });
  const { requestResetToken, isRequestingToken } = useRequestPasswordResetToken(
    setForgotPasswordState
  );

  return (
    <div className='flex flex-col gap-3'>
      <h2 className='text-[30px] font-bold text-blue-100 text-center'>
        Forgot Password
      </h2>
      <p
        className={cn('text-blue-75 font-semibold text-center', {
          'text-red-700 font-normal': forgotPasswordState?.serverFailMsg,
        })}
      >
        {forgotPasswordState?.serverFailMsg ||
          forgotPasswordState?.serverSuccessMsg}
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestResetToken({ email: forgotPasswordState.email });
        }}
        className='flex flex-col gap-4'
      >
        <div className='flex flex-col gap-1'>
          <label htmlFor='email' className='font-semibold'>
            Email Adress
          </label>
          <input
            value={forgotPasswordState.email}
            onChange={(e) =>
              setForgotPasswordState((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            type='email'
            name='email'
            id='email'
            required
            className='placeholder:text-textColor text-xs md:text-sm text-gray-900 px-3 placeholder:text-xs py-1 outline-none border-2 border-gray-200 rounded-md'
            placeholder='borisdimitrijevicit@gmail.com'
          />
        </div>
        <button
          disabled={isRequestingToken}
          className='outline-none border-none bg-blue-75 text-white font-bold text-[18px] py-1 rounded-md'
          type='submit'
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordRequestRequest;
