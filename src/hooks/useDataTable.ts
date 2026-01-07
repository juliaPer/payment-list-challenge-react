import { useQuery } from '@tanstack/react-query';
import { API_URL } from '@/constants';

interface UseDataTableProps {
  page: number;
  pageCount: number;
}

export function useDataTable(props: UseDataTableProps) {
  const { page = 1, pageCount = -1 } = props;

  const query = `?page=${page}&pageSize=${pageCount}`;

  return useQuery({
    queryKey: ['payments'],
    queryFn: () => fetch(`${API_URL}${query}`).then((res) => res.json()),
  });
}
