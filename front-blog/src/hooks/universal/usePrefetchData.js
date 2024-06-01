import { useQueryClient } from '@tanstack/react-query';

// custom hooks
import { useGetCurrentPage } from './useGetCurrentPage';
import { useGetParams } from './useGetParams';

export function usePrefetchData(totalPages, queryFn, queryKeyWord) {
  const currentPage = useGetCurrentPage();
  const params = useGetParams();
  const queryClient = useQueryClient();

  const prefetchData = () => {
    if (currentPage < totalPages) {
      params.set('page', currentPage + 1);
      queryClient.prefetchQuery({
        queryKey: [queryKeyWord, params.toString()],
        queryFn: () => queryFn(params),
      });
    }
  };
  return prefetchData;
}
