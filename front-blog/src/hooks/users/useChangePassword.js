import { useMutation } from '@tanstack/react-query';

// api action
import { changePasswordApi } from '../../api/actions';

export function useChangePassword(setServerValidation, reset) {
  const { mutate: changePassword, isLoading: isChangingPassword } = useMutation(
    {
      mutationFn: (passwords) => changePasswordApi(passwords),
      onSuccess: (res) => {
        localStorage.setItem('jwt', res.token);
        setServerValidation(() => ({
          msgSuccess: 'Password changed successfully',
        }));
        setTimeout(() => setServerValidation(''), 5000);
        reset();
      },
      onError: (err) => {
        setServerValidation(() => err?.response?.data?.message);
        reset();
      },
    }
  );

  return { changePassword, isChangingPassword };
}
