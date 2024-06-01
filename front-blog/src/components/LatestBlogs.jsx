import React from 'react';

// components
import LatestBlogCard from './LatestBlogCard';
import Loader from './Loader';

// custom hooks
import { useGetLatestArticles } from '../hooks/blogs/useGetLatestArticles';

const LatestBlogs = () => {
  const { latestArticles, isLoadingArticles } = useGetLatestArticles();

  if (isLoadingArticles) return <Loader />;
  return (
    <div className='font-roboto text-[16px] md:text-[20px]'>
      <h5 className='text-16 md:text-[20px] font-medium mb-3'>
        Latest Article
      </h5>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-col 2xl:grid-cols-2 2xl:grid gap-5'>
        {latestArticles?.data?.map((latestBlog) => (
          <LatestBlogCard key={latestBlog.id} {...latestBlog} />
        ))}
      </div>
    </div>
  );
};

export default LatestBlogs;
