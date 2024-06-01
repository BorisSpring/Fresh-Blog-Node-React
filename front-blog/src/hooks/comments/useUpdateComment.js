import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// api action
import { updateCommentApi } from '../../api/actions';

// custom hook
import { useGetParams } from '../universal/useGetParams';

export function useUpdateComment() {
  const queryClient = useQueryClient();
  const params = useGetParams();

  const { mutate: updateComment, isLoading: isUpdateing } = useMutation({
    mutationFn: ({ commentId, comment }) =>
      updateCommentApi(commentId, comment),
    onSuccess: () => {
      toast.success('Comment updated successfully');
      queryClient.invalidateQueries(['comments', params.toString()]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message);
    },
  });

  return { updateComment, isUpdateing };
}
