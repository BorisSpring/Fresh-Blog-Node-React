import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from 'date-fns';

// utils
import { getImageUrl } from '../../utils/utils';

const LatestBlogCard = ({ title, image, views, createdAt, slug }) => {
  return (
    <Link to={`/blog/${slug}`} className='flex gap-4 '>
      <img
        src={getImageUrl(image)}
        alt='blog cover image'
        className='w-[59px] h-[59px] rounded-md md:w-[80px] md:h-[80px]'
      />
      <div className='flex  justify-center gap-1 flex-col max-w-[170px]'>
        <h6 className='text-blue-100 text-[14px] tracking-[1px] leading-5 md:leading-6 lg:leading-7  md:text-[16px] font-medium'>
          {title}
        </h6>
        <p className='font-sans text-textColor text-[10px]'>Views: {views}</p>
        <p className='font-sans text-textColor text-[10px]'>
          {formatDate(createdAt, 'dd MMM, yyyy')}
        </p>
      </div>
    </Link>
  );
};

export default LatestBlogCard;
