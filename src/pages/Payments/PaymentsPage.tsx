import { Container, Title } from '@/components/styles';
import { useTranslation } from 'react-i18next';
import { PaymentsTable } from './PaymentsTable';

export const PaymentsPage = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Title>{t('PAGE_TITLE')}</Title>
      <PaymentsTable />
    </Container>
  );
};
