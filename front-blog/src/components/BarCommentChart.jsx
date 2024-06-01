import React from 'react';
import Chart, { plugins } from 'chart.js/auto';

import { Bar } from 'react-chartjs-2';
import { format, sub } from 'date-fns';

// components
import Loader from './Loader';

// custom hooks
import { useGetCommentStats } from '../hooks/statistics/useGetCommentStats';

const BarCommentChart = () => {
  const { commentStats, isLoading } = useGetCommentStats();

  const labels = Array.from({ length: 7 })?.map((_, i) => {
    const subtractDate = sub(new Date(), { days: i + 1 });
    return format(subtractDate, 'dd MMM yyyy');
  });

  const commentData = labels.map((label) => {
    const stat = commentStats?.stats?.find(
      ({ _id }) => format(new Date(_id), 'dd MMM yyyy') === label
    );
    return stat ? stat.numberOfComments : 0;
  });

  const totalNumberOfComments = commentStats?.stats?.reduce(
    (acc, val) => acc + val.numberOfComments,
    0
  );

  if (isLoading) return <Loader height='h-[150px]' />;

  const data = {
    labels: labels.reverse(),
    datasets: [
      {
        label: `Number of comments per day`,
        data: commentData,
        backgroundColor: '#1565D8',
        borderColor: '#1565D8',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scale: {
      y: {
        min: 0,
        max: totalNumberOfComments,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Date: ${context.label} posted comments: ${
              context.dataset.data[context.dataIndex]
            }`;
          },
        },
      },
    },
  };

  return (
    <div className='h-[250px]  p-3 md:p-5  w-full flex items-center justify-center'>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarCommentChart;
