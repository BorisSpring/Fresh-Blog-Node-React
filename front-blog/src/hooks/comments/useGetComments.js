import { useQuery } from '@tanstack/react-query';

// api action
import { getAllCommentsApi, getUserCommentsApi } from '../../api/actions';

// custom hooks
import { useGetParams } from '../universal/useGetParams';
import { useGetLoggedUser } from '../users/useGetLoggedUser';

export function useGetComments() {
  const loggedUser = useGetLoggedUser();
  const params = useGetParams();

  const { data: comments, isLoading: isLoadingComments } = useQuery({
    queryFn: () =>
      loggedUser?.data?.role === 'admin'
        ? getUserCommentsApi(params)
        : getAllCommentsApi(params),
    queryKey: ['comments', params.toString()],
  });

  return { comments, isLoadingComments };
}
