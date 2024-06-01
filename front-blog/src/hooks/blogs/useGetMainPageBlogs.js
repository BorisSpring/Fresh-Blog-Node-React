import { useQuery } from '@tanstack/react-query';

// api action
import { getMainPageBlogsApi } from '../../api/actions';

// custom hook
import { useGetParams } from '../universal/useGetParams';

export function useGetMainPageBlogs() {
  const params = useGetParams();

  const { data: mainPageBlogs, isLoading } = useQuery({
    queryFn: () => getMainPageBlogsApi(params),
    queryKey: ['mainPageBlogs', params.toString()],
  });

  return { mainPageBlogs, isLoading };
}
