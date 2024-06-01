import React from 'react';

// components
import DashboardCommentCard from './DashboardCommentCard';
import Loader from './Loader';
import Pagination from './Pagination';

// custom hooks
import { useGetComments } from '../hooks/comments/useGetComments';
import { useGetLoggedUser } from '../hooks/users/useGetLoggedUser';
import { useDeleteComment } from '../hooks/comments/useDeleteComment';
import { usePrefetchData } from '../hooks/universal/usePrefetchData';
import { getAllCommentsApi, getUserCommentsApi } from '../api/actions';

const DashboardComments = () => {
  const { comments, isLoadingComments } = useGetComments();
  const { loggedUser } = useGetLoggedUser();
  const { deleteComment, isDeletingComment } = useDeleteComment(comments);
  const prefetchData = usePrefetchData(
    comments?.totalPages,
    loggedUser?.role === 'admin' ? getUserCommentsApi : getAllCommentsApi,
    'comments'
  );

  if (isLoadingComments) return <Loader />;

  prefetchData();

  return (
    <div className='flex flex-col gap-3  md:gap-5 overflow-y-auto h-calc-vh paddingDashboard'>
      {comments?.data?.map((comment) => (
        <DashboardCommentCard
          isPeformingAction={isDeletingComment}
          deleteComment={deleteComment}
          key={comment.id}
          {...comment}
          loggedUser={loggedUser?.data}
        />
      ))}
      <Pagination totalPages={comments?.totalPages} />
    </div>
  );
};

export default DashboardComments;
