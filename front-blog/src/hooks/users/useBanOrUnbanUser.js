import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

// api action
import { banUnbanUserApi } from '../../api/actions';

// custom hook
import { useGetParams } from '../universal/useGetParams';

export function useBanOrUnbanUser() {
  const queryClient = useQueryClient();
  const params = useGetParams();

  const { mutate: banOrUnban, isLoading: isBanOrUnban } = useMutation({
    mutationFn: ({ userId, isBanned }) => banUnbanUserApi(userId, isBanned),
    onSuccess: (res) => {
      queryClient.invalidateQueries(['users', params.toString()]);
      toast.success(res.message);
    },
    onError: (err) => {
      const msg = err.response?.data?.message;
      toast.error(
        typeof msg === 'string'
          ? msg
          : 'There was an error performing ban/unban account action!'
      );
    },
  });

  return { banOrUnban, isBanOrUnban };
}
