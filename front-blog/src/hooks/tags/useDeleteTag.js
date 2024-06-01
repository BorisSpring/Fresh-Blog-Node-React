import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// api action
import { deleteTagApi } from '../../api/actions';

export function useDeleteTag() {
  const queryClient = useQueryClient();

  const { mutate: deleteTag, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteTagApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['tags']);
      toast.success('Tag has been deleted successfully');
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });

  return { deleteTag, isDeleting };
}
