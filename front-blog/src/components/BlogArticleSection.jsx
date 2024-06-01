import React from 'react';

// components
import BlogArticleCard from '../components/BlogArticleCard';
import Loader from './Loader';
import Pagination from './Pagination';

// custom hooks
import { useGetMainPageBlogs } from '../hooks/blogs/useGetMainPageBlogs';

const BlogArticleSection = () => {
  const { mainPageBlogs, isLoading } = useGetMainPageBlogs();

  if (isLoading) return <Loader height='h-[150px]' />;
  return (
    <>
      <section className='container mx-auto  paddingX pt-12 md:pt-16 lg:pt-24 pb-8 flex flex-wrap gap-5 lg:gap-16 justify-center'>
        {mainPageBlogs?.data?.map((blog, index) => (
          <BlogArticleCard key={blog.id} {...blog} index={index} />
        ))}
      </section>
      <Pagination totalPages={mainPageBlogs?.totalPages} />
    </>
  );
};

export default BlogArticleSection;
