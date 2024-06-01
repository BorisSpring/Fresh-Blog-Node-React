import { useQuery } from '@tanstack/react-query';

// api action
import { getCommentsStats } from '../../api/actions';

export function useGetCommentStats() {
  const { data: commentStats, isLoading } = useQuery({
    queryFn: (params) => getCommentsStats(params),
    queryKey: ['commentStats'],
  });

  return { commentStats, isLoading };
}
