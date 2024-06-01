import React from 'react';

// components
import Loader from './Loader';
import Pagination from './Pagination';
import DashboardBlogCard from './DashboardBlogCard';

// api actions for prefetching data
import {
  getBlogsDashboardAdminApi,
  getBlogsDashboardUserApi,
} from '../api/actions';

// custom hooks
import { usePrefetchData } from '../hooks/universal/usePrefetchData';
import { useGetLoggedUser } from '../hooks/users/useGetLoggedUser';
import { useGetBlogsDashboard } from '../hooks/blogs/useGetBlogsDashboard';
import { useDeleteBlog } from '../hooks/blogs/useDeleteBlog';
import { useEnableOrDisableBlogAdmin } from '../hooks/blogs/useEnableOrDisableBlogAdmin';

const DashboardBlogs = () => {
  const loggedUser = useGetLoggedUser();
  const { blogs, isLoadingBlogs } = useGetBlogsDashboard();
  const { deleteBlog, isDeleting } = useDeleteBlog(blogs);
  const { enableDisable, isEnablingOrDisabling } =
    useEnableOrDisableBlogAdmin();
  const prefetchData = usePrefetchData();

  if (isLoadingBlogs) return <Loader />;

  prefetchData(
    blogs?.totalPages,
    loggedUser?.data?.role === 'admin'
      ? getBlogsDashboardAdminApi
      : getBlogsDashboardUserApi,
    'blogs'
  );

  return (
    <div className='flex flex-col gap-3  md:gap-5 overflow-y-auto h-calc-vh paddingDashboard'>
      {blogs.data?.map((blog) => (
        <DashboardBlogCard
          key={blog.id}
          {...blog}
          enableDisable={enableDisable}
          isPeformingAction={isDeleting || isEnablingOrDisabling}
          deleteBlog={deleteBlog}
        />
      ))}
      <Pagination totalPages={blogs?.totalPages} />
    </div>
  );
};

export default DashboardBlogs;
