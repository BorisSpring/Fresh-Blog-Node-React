import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

// api action
import { registerApi } from '../../api/actions';

export function useSignUpUser(setServerValidation, reset) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: registerUser, isLoading: isRegistering } = useMutation({
    mutationFn: (userInfo) => registerApi(userInfo),
    onSuccess: (res) => {
      reset();
      setServerValidation(() => ({}));
      localStorage.setItem('jwt', res.token);
      navigate('/dashboard/blogs?page=1');
      queryClient.invalidateQueries(['loggedUser']);
      toast.success('U have been successfully registered');
    },
    onError: (err) => {
      setServerValidation(() => err.response?.data?.message);
      reset();
    },
  });

  return { registerUser, isRegistering };
}
