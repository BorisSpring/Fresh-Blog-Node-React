import { useQuery } from '@tanstack/react-query';

// api action
import { getLoggedUserApi } from '../../api/actions';
import { useNavigate } from 'react-router';

export function useGetLoggedUser() {
  const navigate = useNavigate();
  const {
    data: loggedUser,
    isLoading: isLoadingUser,
    error: userError,
  } = useQuery({
    queryFn: getLoggedUserApi,
    queryKey: ['loggedUser'],
    enabled: !!localStorage.getItem('jwt'),
    retry: 2,
  });

  if (userError) {
    localStorage.removeItem('jwt');
    navigate('/signin');
  }

  return { loggedUser, isLoadingUser };
}
