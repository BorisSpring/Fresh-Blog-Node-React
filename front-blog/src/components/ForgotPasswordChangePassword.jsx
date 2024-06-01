import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

// components
import FormGroupElement from './FormGroupElement';

// custom hook
import { useChangePasswordWithToken } from '../hooks/auth/useChangePasswordWithToken';

// utils
import { cn } from '../../utils/utils';

const ForgotPasswordChangePassword = () => {
  const [serverValidationMessages, setServerValidationMessages] = useState({
    serverFailMsg: '',
    serverSuccessMsg: '',
  });
  const {
    formState: { errors },
    getValues,
    register,
    handleSubmit,
  } = useForm();
  const { changePasswordWithToken, isChangingPassword } =
    useChangePasswordWithToken(setServerValidationMessages);

  const onHandleSubmit = (data) => {
    const { password, passwordConfirm } = data;
    changePasswordWithToken({ password, passwordConfirm });
  };

  return (
    <div className='flex items-center justify-center min-h-[60vh]  flex-col gap-3 md:gap-5'>
      <h2 className='text-[18px] md:text-[20px] font-semibold text-blue-75'>
        Update Password
      </h2>
      <p
        className={cn('text-green-700 font-semibold', {
          'text-red-700': serverValidationMessages.serverFailMsg,
        })}
      >
        {serverValidationMessages.serverFailMsg ||
          serverValidationMessages.serverSuccessMsg}
      </p>
      <form
        onSubmit={handleSubmit(onHandleSubmit)}
        className='flex flex-col gap-2 md:gap-3'
      >
        <FormGroupElement
          label='New Password'
          name='password'
          id='password'
          type='password'
          errorMsg={errors?.password?.message}
          placeholder='Enter new password'
          register={{
            ...register('password', {
              required: 'Password is required!',
              validate: (value) =>
                value.trim().length > 7 ||
                'Name must be above 7 characters long!',
            }),
          }}
        />
        <FormGroupElement
          label='Repeat New Password'
          name='passwordConfirm'
          id='passwordConfirm'
          type='password'
          errorMsg={errors?.passwordConfirm?.message}
          placeholder='Repeat new password'
          register={{
            ...register('passwordConfirm', {
              required: 'Repeated password is required!',
              validate: (value) =>
                value === getValues('password') || 'Password must match!',
            }),
          }}
        />
        <button
          disabled={isChangingPassword}
          className='outline-none border-none bg-blue-75 mt-1  text-white font-semibold text-[16px] hover:bg-blue-85 transition-all duration-200  py-1 lg:text-[18px] rounded-md'
          type='submit'
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordChangePassword;
