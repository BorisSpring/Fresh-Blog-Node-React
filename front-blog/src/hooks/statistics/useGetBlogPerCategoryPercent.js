import { useQuery } from '@tanstack/react-query';
import { getBlogPerCategoryPercentApi } from '../../api/actions';

export function useGetBlogPerCategoryPercent() {
  const { data: blogPerCategoryPercent, isLoading } = useQuery({
    queryFn: () => getBlogPerCategoryPercentApi(),
    queryKey: ['blogPerCategoryPercent'],
  });

  return { blogPerCategoryPercent, isLoading };
}
