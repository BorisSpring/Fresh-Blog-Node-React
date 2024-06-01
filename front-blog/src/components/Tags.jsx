import React from 'react';
import { Link } from 'react-router-dom';

// components
import Loader from './Loader';

// custom hooks
import { useFindAllTags } from '../hooks/tags/useFindAllTags';

const Tags = () => {
  const { tags, isLoadingTags } = useFindAllTags();

  if (isLoadingTags) return <Loader height='h-[150px]' />;

  return (
    <div className='font-roboto'>
      <h5 className='text-16 md:text-[20px] font-medium mb-3'>Tags</h5>
      <div className='flex gap-3 flex-wrap'>
        {tags?.data?.map(({ name, id }) => (
          <Link
            to={`/?tag=${name}`}
            key={id}
            className='text-[10px] px-3 py-1 md:py-1 rounded-md capitalize  hover:bg-blue-85 hover:shadow-md transition-all duration-300 bg-blue-75 md:text-[14px] text-white'
          >
            {name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Tags;
