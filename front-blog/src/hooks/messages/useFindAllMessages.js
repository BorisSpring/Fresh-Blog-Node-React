import { useQuery } from '@tanstack/react-query';

// api action
import { findMessagesApi } from '../../api/actions';

// custom hook
import { useGetParams } from '../../../../front-tours/src/hooks/universal/useGetParams';

export function useFindAllMessages() {
  const params = useGetParams();

  const { data: messages, isLoading: isLoadingMessages } = useQuery({
    queryFn: () => findMessagesApi(params),
    queryKey: ['messages', params.toString()],
  });

  return { messages, isLoadingMessages };
}
