import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

// components
import FormGroupElement from '../components/FormGroupElement';

// custom hooks
import { useLoginUser } from '../hooks/auth/useLoginUser';
import { useSignUpUser } from '../hooks/auth/useSignUpUser';
import { fadeIn } from '../../utils/variants';

const SignUpLoginPage = () => {
  const location = useLocation();
  const [serverValidation, setServerValidation] = useState('');
  const isLoginSession = location.pathname.startsWith('/signin');
  const {
    getValues,
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm();
  const { login, IsLogging } = useLoginUser(setServerValidation, reset);
  const { registerUser, isRegistering } = useSignUpUser(
    setServerValidation,
    reset
  );

  const onHandleSubmit = (data) => {
    isLoginSession ? login(data) : registerUser(data);
  };

  return (
    <motion.div
      variants={fadeIn(0.1, 1, 'down', 'easeIn', 200)}
      initial='hidden'
      animate='show'
      className='paddingX flex items-center flex-col gap-5 justify-center grow h-full'
    >
      <h2 className='text-[30px] font-bold text-blue-100'>
        {isLoginSession ? 'Sign in' : 'Sign Up'}
      </h2>
      <p className='text-red-700 '>
        {typeof serverValidation === 'string' && serverValidation}
      </p>
      <form
        onSubmit={handleSubmit(onHandleSubmit)}
        className='text-textColor flex flex-col gap-3 text-[16px] font-sans w-full max-w-[370px]'
      >
        {!isLoginSession && (
          <FormGroupElement
            label='Name'
            name='name'
            id='name'
            errorMsgTwo={serverValidation?.name?.message}
            errorMsg={errors?.name?.message}
            placeholder='Enter name'
            register={{
              ...register('name', {
                required: 'Name is required!',
                validate: (value) =>
                  value.trim().length > 2 ||
                  'Name must be above 2 characters long!',
              }),
            }}
          />
        )}

        <FormGroupElement
          label='Email Adress'
          name='email'
          id='email'
          type='email'
          errorMsgTwo={
            serverValidation?.email?.message || serverValidation?.email
          }
          placeholder='borisdimitrijevicit@example.com'
          register={{
            ...register('email', {
              required: 'Email is required!',
            }),
          }}
          errorMsg={errors?.email?.message}
        />

        <FormGroupElement
          label='Password'
          name='password'
          id='password'
          type='password'
          placeholder='******'
          register={{
            ...register('password', {
              required: 'Password is required!',
            }),
          }}
          errorMsg={errors?.password?.message}
          errorMsgTwo={serverValidation?.password?.message}
        />
        {!isLoginSession && (
          <FormGroupElement
            label='Repeat Password'
            name='passwordConfirm'
            id='passwordConfirm'
            type='password'
            placeholder='Repeat passwords'
            register={{
              ...register('passwordConfirm', {
                required: 'Password Confirm is required!',
                validate: (value) =>
                  getValues('password') === value || 'Password must match!',
              }),
            }}
            errorMsgTwo={serverValidation?.passwordConfirm?.message}
            errorMsg={errors?.passwordConfirm?.message}
          />
        )}
        <div className='flex items-center justify-between'>
          <Link
            to='/forgotPassword/reset'
            className='font-semibold text-blue-75 text-sm md:text-base hover:underline hover:text-blue-85 transition-all duration-300'
          >
            Forgot Password?
          </Link>
          {isLoginSession && (
            <Link
              onClick={() => reset()}
              to='/signup'
              className=' text-blue-75 font-semibold text-sm md:text-base hover:underline hover:text-blue-85 transition-all  duration-300'
            >
              Sign Up
            </Link>
          )}
        </div>
        <button
          disabled={IsLogging || isRegistering}
          className='outline-none border-none bg-blue-75 text-white font-semibold text-[18px] py-1 lg:text-[20px] rounded-md'
          type='submit'
        >
          {isLoginSession ? 'Login' : 'Register'}
        </button>
      </form>
      {!isLoginSession && (
        <p className='text-left w-full max-w-[370px] text-[14px] '>
          You have an account?{' '}
          <Link
            onClick={() => reset()}
            to='/signin'
            className='font-semibold text-blue-75 hover:underline hover:text-blue-85 transition-all duration-300'
          >
            Login now
          </Link>
        </p>
      )}
    </motion.div>
  );
};

export default SignUpLoginPage;
