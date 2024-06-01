import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

// api action
import { resetPasswordWithTokenApi } from '../../api/actions';

export function useChangePasswordWithToken(setServerValidationMessages) {
  const queryClient = useQueryClient();
  const { token } = useParams();
  const navigate = useNavigate();

  const { mutate: changePasswordWithToken, isLoading: isChangingPassword } =
    useMutation({
      mutationFn: ({ password, passwordConfirm }) =>
        resetPasswordWithTokenApi(token, password, passwordConfirm),
      onSuccess: (res) => {
        localStorage.setItem('jwt', res.token);
        setServerValidationMessages(() => ({
          serverFailMsg: '',
          serverSuccessMsg: '',
        }));
        res.user.role === 'admin'
          ? navigate('/dashboard/statistics')
          : navigate('dashboard/blogs?page=1');
        queryClient.invalidateQueries(['loggedUser']);
      },
      onError: (err) => {
        setServerValidationMessages(() => ({
          serverFailMsg: err.response?.data.message,
          serverSuccessMsg: '',
        }));
      },
    });

  return { changePasswordWithToken, isChangingPassword };
}
