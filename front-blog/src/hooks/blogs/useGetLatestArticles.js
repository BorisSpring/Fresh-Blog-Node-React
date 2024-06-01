import { useQuery } from '@tanstack/react-query';

// api action
import { getLast4BlogsApi } from '../../api/actions';

export function useGetLatestArticles() {
  const { data: latestArticles, isLoading: isLoadingArticles } = useQuery({
    queryKey: ['latestArticles'],
    queryFn: getLast4BlogsApi,
  });

  return { latestArticles, isLoadingArticles };
}
