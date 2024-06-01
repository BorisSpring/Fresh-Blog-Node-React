import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

import { Bar } from 'react-chartjs-2';

// components
import Loader from './Loader';

// custom hooks
import { useGetTagStatistics } from '../hooks/statistics/useGetTagStatistics';

const BarTagChart = () => {
  const { tagsStats, isLoading } = useGetTagStatistics();

  if (isLoading) return <Loader height='h-[150px]' />;

  const totalBlogs = tagsStats?.data?.reduce(
    (acc, tag) => acc + tag?.tagPerCategory,
    0
  );

  const data = {
    labels: tagsStats?.data?.map?.((tag) => tag._id),
    datasets: [
      {
        label: `Blog Per Tag Compared with blogs count (${totalBlogs})`,
        data: tagsStats?.data?.map((tag) => tag.tagPerCategory),
        backgroundColor: '#1565D8',
        borderColor: '#1565D8',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        max: totalBlogs,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const stats = tagsStats?.data?.[context.dataIndex];
            return `Blogs: ${stats.tagPerCategory} Percent: ${
              stats?.percent?.toFixed(2) ?? 0
            }`;
          },
        },
      },
    },
  };

  return (
    <div className='h-[250px]  p-3 md:p-5  w-full flex items-center justify-center'>
      <Bar data={data} key='chart-2' options={options} />
    </div>
  );
};

export default BarTagChart;
