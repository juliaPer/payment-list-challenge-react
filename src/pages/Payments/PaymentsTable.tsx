import { Container } from '@/components/styles';
import { useQuery } from '@tanstack/react-query';

export const PaymentsTable = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['payments'],
    queryFn: () => fetch('/api/payments').then((res) => res.json()),
  });

  console.log(data);

  return (
    <Container>
      {isPending && <p>Loading...</p>}
      {error && <p>An error has occurred: {error.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </Container>
  );
};
