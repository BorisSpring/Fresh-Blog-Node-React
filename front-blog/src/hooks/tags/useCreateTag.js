import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// api action
import { createTagApi } from '../../api/actions';

export function useCreateTag() {
  const queryClient = useQueryClient();

  const { mutate: createTag, isLoading: isCreating } = useMutation({
    mutationFn: (body) => createTagApi(body),
    onSuccess: () => {
      queryClient.invalidateQueries(['tags']);
      toast.success('Tag has been created successfully');
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });

  return { createTag, isCreating };
}
