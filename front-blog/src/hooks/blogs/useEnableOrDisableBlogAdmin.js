import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// api action
import { updateBlogStatusApi } from '../../api/actions';

// custom hook
import { useGetParams } from '../universal/useGetParams';

export function useEnableOrDisableBlogAdmin() {
  const queryClient = useQueryClient();
  const params = useGetParams();

  const { mutate: enableDisable, isLoading: isEnablingOrDisabling } =
    useMutation({
      mutationFn: ({ id, enabled }) => updateBlogStatusApi(id, enabled),
      onSuccess: () => {
        toast.success('Blog status has been updated successfully.');
        queryClient.invalidateQueries(['blogs', params.toString()]);
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message);
      },
    });

  return { enableDisable, isEnablingOrDisabling };
}
