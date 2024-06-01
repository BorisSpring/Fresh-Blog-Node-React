import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

// api action
import { loginApi } from '../../api/actions';

export function useLoginUser(setServerValidation, reset) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading: IsLogging } = useMutation({
    mutationFn: (credentials) => loginApi(credentials),
    onSuccess: (res) => {
      localStorage.setItem('jwt', res.token);
      queryClient.invalidateQueries(['loggedUser']);

      res.user.role === 'admin'
        ? navigate('/dashboard/statistics')
        : navigate('/dashboard/blogs?page=1');
      toast.success('Successfully logged in!');
      setServerValidation(() => ({}));
      reset();
    },
    onError: (err) => {
      setServerValidation(() => err.response?.data?.message);
      reset();
    },
  });

  return { login, IsLogging };
}
