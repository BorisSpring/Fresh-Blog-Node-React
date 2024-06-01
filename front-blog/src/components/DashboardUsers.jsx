import React from 'react';

// components
import Pagination from './Pagination';
import UserCard from './UserCard';
import Loader from './Loader';

// custom hooks
import { useGetAllUsersAdmin } from '../hooks/users/useGetAllUsersAdmin';
import { useBanOrUnbanUser } from '../hooks/users/useBanOrUnbanUser';
import { useDeleteUser } from '../hooks/users/useDeleteUser';
import { usePrefetchData } from '../hooks/universal/usePrefetchData';
import { getAllUsersApi } from '../api/actions';

const DashboardUsers = () => {
  const { users, isLoadingUsers } = useGetAllUsersAdmin();
  const { banOrUnban, isBanOrUnban } = useBanOrUnbanUser();
  const { deleteUser, isDeleting } = useDeleteUser(users);
  const prefetchData = usePrefetchData(
    users?.totalPages,
    getAllUsersApi,
    'users'
  );

  if (isLoadingUsers) return <Loader />;

  prefetchData();

  return (
    <div className='flex flex-col gap-3 bg-gray-50  md:gap-5 overflow-y-auto h-calc-vh paddingDashboard'>
      {users?.data?.map((user) => (
        <UserCard
          key={user.id}
          {...user}
          isPeformingAction={isBanOrUnban || isDeleting}
          banOrUnban={banOrUnban}
          deleteUser={deleteUser}
        />
      ))}
      <Pagination totalPages={users?.totalPages} />
    </div>
  );
};

export default DashboardUsers;
