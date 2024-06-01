import { useMutation, useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';
// api action
import { updateMessageApi } from '../../api/actions';

// cusotm hook
import { useGetParams } from '../../../../front-tours/src/hooks/universal/useGetParams';

export function useUpdateMessageStatus() {
  const queryClient = useQueryClient();
  const params = useGetParams();

  const { mutate: updateMessageStatus, isLoading: isUpdateing } = useMutation({
    mutationFn: ({ msgId, isRead }) => updateMessageApi(msgId, isRead),
    onSuccess: () => {
      queryClient.invalidateQueries(['messages', params.toString()]);
      toast.success('Successfully updated message status');
    },
    onError: (err) => {
      const errMsg = err.response.data.message;
      toast.error(
        typeof errMsg === 'string'
          ? errMsg
          : 'Fail to update message status! Please try again later!'
      );
    },
  });

  return { updateMessageStatus, isUpdateing };
}
