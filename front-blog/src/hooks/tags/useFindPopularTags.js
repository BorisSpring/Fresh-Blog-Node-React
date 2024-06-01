import { useQuery } from '@tanstack/react-query';

// api action
import { findPopularTagsApi } from '../../api/actions';

export function useFindPopularTags() {
  const { data: tags, isLoading: isLoadingTags } = useQuery({
    queryFn: findPopularTagsApi,
    queryKey: ['popularTags'],
  });

  return { tags, isLoadingTags };
}
