import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

// components
import FormGroupElement from './FormGroupElement';

// utils
import { cn } from '../../utils/utils';

// custom hooks
import { useChangePassword } from '../hooks/users/useChangePassword';

const ChangePasswordForm = () => {
  const [serverValidation, setServerValidation] = useState('');
  const {
    formState: { errors },
    getValues,
    register,
    handleSubmit,
    reset,
  } = useForm();
  const { changePassword, isChangingPassword } = useChangePassword(
    setServerValidation,
    reset
  );

  const onHandleSubmit = (data) => {
    changePassword(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onHandleSubmit)}
      className='w-[90%] max-w-[400px] flex flex-col gap-3 text-textColor bg-white  mx-auto rounded-md p-3 md:p-5 lg:p-8 shadow-md'
    >
      <h3 className=' text-center font-semibold  mb-3 md:mb-5 lg:mb-8 text-blue-75 text-lg md:text-xl'>
        Change Password
      </h3>
      <p
        className={cn('text-center text-red-700', {
          'text-green-700': serverValidation?.msgSuccess,
        })}
      >
        {typeof serverValidation === 'string' && serverValidation}
        {serverValidation?.msgSuccess}
      </p>
      <FormGroupElement
        label='Old Password'
        name='oldPassword'
        id='oldPassword'
        type='password'
        placeholder='Old password'
        register={{
          ...register('oldPassword', {
            required: 'Old Password is required!',
          }),
        }}
        errorMsg={errors?.oldPassword?.message}
      />
      <FormGroupElement
        label='Password'
        name='password'
        id='password'
        type='password'
        placeholder='New password'
        register={{
          ...register('password', {
            required: 'Password is required!',
            minLength: ['8', 'Password must be at least 8 characters long'],
          }),
        }}
        errorMsg={errors?.password?.message}
        errorMsgTwo={serverValidation?.password?.message}
      />
      <FormGroupElement
        label='Repeat New Password'
        name='passwordConfirm'
        id='passwordConfirm'
        type='password'
        placeholder='Repeat new password'
        register={{
          ...register('passwordConfirm', {
            required: 'Repeated password is required!',
            validate: (value) =>
              value === getValues('password') || 'Password must match!',
          }),
        }}
        errorMsg={errors?.passwordConfirm?.message}
        errorMsgTwo={serverValidation?.passwordConfirm?.message}
      />
      <button
        disabled={isChangingPassword}
        type='submit'
        className='bg-blue-75 rounded-sm hover:bg-blue-100 transition-all duration-500 font-semibold text-white py-1 w-full'
      >
        Change Password
      </button>
    </form>
  );
};

export default ChangePasswordForm;
