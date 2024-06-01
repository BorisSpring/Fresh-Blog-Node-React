import React from 'react';
import randomColor from 'randomcolor';
import { Doughnut } from 'react-chartjs-2';

// components
import Loader from '../components/Loader';

// custom hooks
import { useGetBlogPerCategoryPercent } from '../hooks/statistics/useGetBlogPerCategoryPercent';

const DoughnutChart = () => {
  const { blogPerCategoryPercent, isLoading } = useGetBlogPerCategoryPercent();

  if (isLoading) return <Loader height='h-[150px]' />;

  const backgroundColors = randomColor({
    count: blogPerCategoryPercent?.data?.length,
  });

  const options = {
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            console.log(context.dataIndex);

            return `Category: ${
              blogPerCategoryPercent.data[context.dataIndex]._id
            } Percent: ${blogPerCategoryPercent.data[
              context.dataIndex
            ].percent.toFixed(2)}%`;
          },
        },
      },
    },
  };

  const data = {
    labels: blogPerCategoryPercent?.data?.map?.(({ _id }) => _id) ?? [],
    datasets: [
      {
        label: `Total blogs ${blogPerCategoryPercent?.data?.[0].totalBlog}`,
        data:
          blogPerCategoryPercent?.data?.map?.(
            ({ blogPerCategory }) => blogPerCategory
          ) ?? [],

        backgroundColor: backgroundColors,
        borderColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className='h-[250px]    w-full flex items-center justify-center'>
      {' '}
      <Doughnut data={data} options={options} key='chart-1' />;
    </div>
  );
};

export default DoughnutChart;
