import React from 'react';
import DoughnutChart from '../components/DoughnutChart';
import BarTagChart from './BarTagChart';
import BarCommentChart from './BarCommentChart';
const DashboardStandard = () => {
  return (
    <div className='grid grid-cols-1 bg-gray-50 md:grid-cols-2 lg:grid-cols-3 flex-col gap-3 md:gap-5 overflow-y-auto h-calc-vh paddingDashboard'>
      <DoughnutChart />
      <BarTagChart />
      <BarCommentChart />
    </div>
  );
};

export default DashboardStandard;
