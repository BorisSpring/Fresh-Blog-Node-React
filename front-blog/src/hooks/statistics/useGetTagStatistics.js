import { useQuery } from '@tanstack/react-query';

// api action
import { getTagsStats } from '../../api/actions';

export function useGetTagStatistics() {
  const { data: tagsStats, isLoading } = useQuery({
    queryFn: () => getTagsStats(),
    queryKey: ['tagsStats'],
  });

  return { tagsStats, isLoading };
}
