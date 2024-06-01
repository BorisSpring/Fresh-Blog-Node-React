import { useGetParams } from './useGetParams';

export function useGetCurrentPage() {
  const params = useGetParams();
  return Number(params?.get('page')) || 1;
}
