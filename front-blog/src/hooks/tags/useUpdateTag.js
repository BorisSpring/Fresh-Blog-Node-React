import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// api action
import { updateTagApi } from '../../api/actions';

export function useUpdateTag() {
  const queryClient = useQueryClient();

  const { mutate: updateTag, isLoading: isUpdateing } = useMutation({
    mutationFn: ({ id, name }) => updateTagApi(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries(['tags']);
      toast.success('Tag updated successfully');
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });

  return { updateTag, isUpdateing };
}
