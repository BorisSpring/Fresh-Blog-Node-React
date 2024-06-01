import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// api action
import { sendMessageApi } from '../../api/actions';

export function useSendMessage(setServerValidation, reset) {
  const { mutate: sendMsg, isLoading: isSending } = useMutation({
    mutationFn: (msg) => sendMessageApi(msg),
    onSuccess: () => {
      setServerValidation({});
      toast.success('Message sent successfully');
      reset();
    },
    onError: (err) => {
      setServerValidation(() => err?.response?.data?.message);
    },
  });

  return { sendMsg, isSending };
}
