import { useQuery } from '@tanstack/react-query';

// custom hook
import { useParams } from 'react-router';

// api action
import { getSingleBlogBySlugApi } from '../../api/actions';

export function useGetBlogBySlug() {
  const { blogSlug } = useParams();
  const {
    data: blog,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getSingleBlogBySlugApi(blogSlug),
    queryKey: ['blog', blogSlug],
    retry: false,
  });

  return { blog, isError, isLoading, error };
}
