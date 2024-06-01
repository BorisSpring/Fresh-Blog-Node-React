import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

// api action
import { deactivateAccountApi } from '../../api/actions';

export function useDeactivateAccount() {
  const navigate = useNavigate();
  const { mutate: deactivateAccount, isLoading: isDeactivating } = useMutation({
    mutationFn: () => deactivateAccountApi(),
    onSuccess: () => {
      localStorage.removeItem('jwt');
      toast.success('Account has been deactivated');
      navigate('/signin');
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });

  return { deactivateAccount, isDeactivating };
}
