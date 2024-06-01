import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// api action
import { postCommentApi } from '../../api/actions';

// custom hook
import { useParams } from 'react-router';

export function useCreateComment(reset) {
  const queryClient = useQueryClient();
  const { blogSlug } = useParams();
  const { mutate: addComment, isLoading: isAddingComment } = useMutation({
    mutationFn: (commentBody) => postCommentApi(commentBody),
    onSuccess: () => {
      toast.success('Comment posted successfully');
      queryClient.invalidateQueries(['blog', blogSlug]);
      reset();
    },
    onError: () => {
      toast.error('Fail to post comment!');
    },
  });

  return { addComment, isAddingComment };
}
