import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

// api action
import { deleteMessageApi } from '../../api/actions';

// custom hook
import { useInvalidateOnDelete } from '../universal/useInvalidateOnDelete';

export function useDeleteMessage(allMessage) {
  const invalidateQueries = useInvalidateOnDelete();

  const { mutate: deleteMessage, isLoading: isDeleting } = useMutation({
    mutationFn: (msgId) => deleteMessageApi(msgId),
    onSuccess: () => {
      invalidateQueries('messages', allMessage);
      toast.success('Successfully deleted message');
    },
    onError: (err) => {
      const errMsg = err.response.data.message;
      toast.error(
        typeof errMsg === 'string' ? errMsg : 'Fail to delete message!'
      );
    },
  });

  return { deleteMessage, isDeleting };
}
