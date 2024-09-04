import { getBppEnrollData } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export const useGetEnrollData = (offset, pageLimit, country) => {
  return useQuery({
    queryKey: ['bppenroll', offset, pageLimit, country],
    queryFn: async () => getBppEnrollData(offset, pageLimit, country)
  });
};
