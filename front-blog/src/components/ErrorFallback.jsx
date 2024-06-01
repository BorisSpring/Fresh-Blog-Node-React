import React from 'react';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className='bg-error-image h-screen flex items-center justify-center'>
      <h1 className='text-lg md:text-2lg font-bold text-center'>
        Ops Something went wrong please contact support!
      </h1>
      <p className='text-center'>{error?.message}</p>
      <button
        onClick={resetErrorBoundary}
        className=' bg-blue-75/80 hover:shadow-white transition-all duration-500 hover:shadow-md hover:-translate-y-3 text-white font-bold md:text-lg py-1 md:py-2 rounded-md px-2 md:px-4 '
      >
        Go Back To Home Page
      </button>
    </div>
  );
};

export default ErrorFallback;
