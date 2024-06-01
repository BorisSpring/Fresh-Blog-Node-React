import React from 'react';
import { Outlet } from 'react-router';

// components
import DashboardNavigation from '../components/DashboardNavigation';

const DashboardPage = () => {
  return (
    <div className=' flex bg-[#F9FCFF] h-screen'>
      <DashboardNavigation />
      <div className='w-full   font-roboto   ml-[52px] md:ml-0'>
        <h1 className='text-[27px]  p-3 py-5 md:p-6 lg:px-10 text-blue-75 font-bold md:text-[31px]  lg:text-[34px] text-center md:text-left'>
          Dashboard
        </h1>
        <Outlet />
      </div>
    </div>
  );
};
export default DashboardPage;
