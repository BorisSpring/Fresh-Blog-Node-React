import { useMutation, useQueryClient } from '@tanstack/react-query';
import { verifyAccountUserApi } from '../../api/actions';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

export function useVerifyAccount() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: verifyAcc, isLoading: isVerifying } = useMutation({
    mutationFn: (token) => verifyAccountUserApi(token),
    onSuccess: (res) => {
      queryClient.invalidateQueries(['loggedUser']);
      navigate('/dashboard/settings', { replace: true });
      toast.success(res?.message);
    },
    onError: (err) => {
      toast.error(err?.response?.data.message);
    },
  });

  return { verifyAcc, isVerifying };
}
