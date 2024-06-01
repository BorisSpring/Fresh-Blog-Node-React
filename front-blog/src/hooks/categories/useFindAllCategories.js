import { useQuery } from '@tanstack/react-query';

// api action
import { findAllCategoriesApi } from '../../api/actions';

export function useFindAllCategories() {
  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: findAllCategoriesApi,
  });

  return { categories, isLoadingCategories };
}
