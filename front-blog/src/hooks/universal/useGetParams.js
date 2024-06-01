import { useLocation } from 'react-router-dom';

export function useGetParams() {
  const location = useLocation();
  return new URLSearchParams(location.search);
}
