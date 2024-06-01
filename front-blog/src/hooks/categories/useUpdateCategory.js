import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// api action
import { updateCategoryApi } from '../../api/actions';

export function useUpdateCategory(setServerValidation, reset) {
  const queryClient = useQueryClient();

  const { mutate: updateCategory, isLoading: isUpdateing } = useMutation({
    mutationFn: ({ id, name }) => updateCategoryApi(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
      toast.success('Category updated successfully');
      reset();
    },
    onError: (err) => {
      setServerValidation(() => err.response?.data?.message);
      toast.error(err.response?.data?.message);
      reset();
    },
  });
  return { updateCategory, isUpdateing };
}
