import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// api action
import { deleteCategoryApi } from '../../api/actions';

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  const { mutate: deleteCategory, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteCategoryApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
      toast.success('Category has been deleted successfully');
    },
    onError: (err) => {
      toast.error(err?.response.data?.message);
    },
  });

  return { deleteCategory, isDeleting };
}
