import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { useGetParams } from './useGetParams';

// custom hook
import { useGetCurrentPage } from './useGetCurrentPage';

export function useInvalidateOnDelete() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useGetParams();
  const currentPage = useGetCurrentPage();

  const invalidateQuery = (queryKeyWord, data) => {
    if (data?.length === 1) {
      queryClient.removeQueries([queryKeyWord, params.toString()]);
      if (currentPage > 1) {
        params.set('page', currentPage - 1);
        navigate(`?${params.toString()}`);
      }
    } else {
      queryClient.invalidateQueries([queryKeyWord, params.toString()]);
    }
  };

  return invalidateQuery;
}
