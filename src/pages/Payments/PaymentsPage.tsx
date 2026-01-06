import { Container, Title } from '@/components/styles';
import { useTranslation } from 'react-i18next';

export const PaymentsPage = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Title>{t('PAGE_TITLE')}</Title>
    </Container>
  );
};
