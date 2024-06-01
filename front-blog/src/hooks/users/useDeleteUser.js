import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// api action
import { deleteUserApi } from '../../api/actions';

// custom hook
import { useInvalidateOnDelete } from '../universal/useInvalidateOnDelete';

export function useDeleteUser(Users) {
  const invalidateQuery = useInvalidateOnDelete();
  const queryClient = useQueryClient();

  const { mutate: deleteUser, isLoading: isDeleting } = useMutation({
    mutationFn: (userId) => deleteUserApi(userId),
    onSuccess: () => {
      toast.success('User has been deleted successfully!');
      invalidateQuery('users', Users?.data);
      queryClient.invalidateQueries(['mainPageBlogs', 'page=1']);
      queryClient.invalidateQueries(['comments', 'page=1']);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });

  return { deleteUser, isDeleting };
}
