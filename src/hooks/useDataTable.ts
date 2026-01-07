import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { API_URL } from '@/constants';

interface UseDataTableProps {
  page?: number;
  pageCount?: number;
  search?: string;
  currency?: string;
}

export function useDataTable(props: UseDataTableProps) {
  const { page = 1, pageCount = 5, search, currency } = props;

  const query = `?${search && `search=${search}`}&${
    currency && `currency=${currency}`
  }&page=${page}&${!search && `pageSize=${pageCount}`}`;

  const response = useQuery({
    placeholderData: keepPreviousData,
    queryKey: ['payments', query],
    queryFn: () => fetch(`${API_URL}${query}`).then((res) => res.json()),
  });

  return { response };
}
