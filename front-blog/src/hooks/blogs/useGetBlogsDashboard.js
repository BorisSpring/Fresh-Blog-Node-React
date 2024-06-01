import { useQuery } from '@tanstack/react-query';

// api actions
import {
  getBlogsDashboardAdminApi,
  getBlogsDashboardUserApi,
} from '../../api/actions';

// cusotm hooks
import { useGetParams } from '../universal/useGetParams';
import { useGetLoggedUser } from '../users/useGetLoggedUser';

export function useGetBlogsDashboard() {
  const params = useGetParams();
  const loggedUser = useGetLoggedUser();

  const { data: blogs, isLoading: isLoadingBlogs } = useQuery({
    queryFn: () =>
      loggedUser?.data?.role === 'admin'
        ? getBlogsDashboardAdminApi(params)
        : getBlogsDashboardUserApi(params),
    queryKey: ['blogs', params.toString()],
  });

  return { blogs, isLoadingBlogs };
}
