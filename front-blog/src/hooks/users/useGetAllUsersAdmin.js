import { useQuery } from '@tanstack/react-query';

// api action
import { getAllUsersApi } from '../../api/actions';

// custom hook
import { useGetParams } from '../universal/useGetParams';

export function useGetAllUsersAdmin() {
  const params = useGetParams();

  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryFn: () => getAllUsersApi(params),
    queryKey: ['users', params.toString()],
  });

  return { users, isLoadingUsers };
}
