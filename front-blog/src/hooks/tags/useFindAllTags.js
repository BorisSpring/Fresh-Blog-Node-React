import { useQuery } from '@tanstack/react-query';

// api action
import { findAllTagsApi } from '../../api/actions';

export function useFindAllTags() {
  const { data: tags, isLoading: isLoadingTags } = useQuery({
    queryFn: findAllTagsApi,
    queryKey: ['tags'],
  });

  return { tags, isLoadingTags };
}
