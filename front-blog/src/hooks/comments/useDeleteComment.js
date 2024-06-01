import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

// api action
import { deleteCommentApi } from '../../api/actions';

// custom hooks
import { useInvalidateOnDelete } from '../universal/useInvalidateOnDelete';

export function useDeleteComment(comments) {
  const invalidateQueries = useInvalidateOnDelete();

  const { mutate: deleteComment, isLoading: isDeletingComment } = useMutation({
    mutationFn: (id) => deleteCommentApi(id),
    onSuccess: () => {
      toast.success('Comment deleted successfully');
      invalidateQueries('comments', comments?.data);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });

  return { deleteComment, isDeletingComment };
}
