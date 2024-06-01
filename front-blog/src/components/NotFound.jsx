import React from 'react';
import { useNavigate } from 'react-router';
import { useGetParams } from '../hooks/universal/useGetParams';

const NotFound = () => {
  const navigate = useNavigate();
  const params = useGetParams();

  const onHandleNavigateToHome = () => navigate('/');
  return (
    <div className='h-calc-vh'>
      <img
        src='\img\404.jpg'
        alt='image describing that page is not found!'
        className='w-full  h-full'
      />
      <div className='absolute bottom-[40%] flex items-center justify-center gap-10 flex-col translate-y-1/2 z-10 left-[50%] -translate-x-1/2'>
        <p className='mx-auto text-lg font-bold tracking-widest lg:text-2xl text-white'>
          {params?.get('message')?.replaceAll('-', ' ') || 'Not Found!'}
        </p>
        <button
          onClick={onHandleNavigateToHome}
          className=' bg-blue-75/80 hover:shadow-white transition-all duration-500 hover:shadow-md hover:-translate-y-3 text-white font-bold md:text-lg py-1 md:py-2 rounded-md px-2 md:px-4 '
        >
          Go Back To Home Page
        </button>
      </div>
    </div>
  );
};

export default NotFound;
