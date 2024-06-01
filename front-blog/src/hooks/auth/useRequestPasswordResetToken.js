import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// api action
import { requestPasswordResetTokenApi } from '../../api/actions';

export function useRequestPasswordResetToken(setForgotPasswordState) {
  const { mutate: requestResetToken, isLoading: isRequestingToken } =
    useMutation({
      mutationFn: (email) => requestPasswordResetTokenApi(email),
      onSuccess: (res) => {
        console.log(res);
        setForgotPasswordState(() => ({
          serverFailMsg: '',
          serverSuccessMsg: res.message,
          email: '',
        }));
        // we didnt need this but i like it so much so we show 2 message to the user :)
        toast.success('Reset Token has been successfully sent to the email!');
      },
      onError: (err) => {
        setForgotPasswordState(() => ({
          serverFailMsg: err?.response?.data?.message,
          serverSuccessMsg: '',
          email: '',
        }));
        console.error(err.response.data.message);
      },
    });

  return { requestResetToken, isRequestingToken };
}
