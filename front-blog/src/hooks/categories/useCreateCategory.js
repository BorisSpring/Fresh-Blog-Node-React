import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// api action
import { createCategoryApi } from '../../api/actions';

export function useCreateCategory() {
  const queryClient = useQueryClient();
  const { mutate: createCategory, isLoading: isCreating } = useMutation({
    mutationFn: (name) => createCategoryApi(name),
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
      toast.success('Category created successfully');
    },
    onError: () => {
      toast.error('Fail to create category!');
    },
  });

  return { createCategory, isCreating };
}
