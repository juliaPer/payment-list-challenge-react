import { useTranslation } from 'react-i18next';
import { ErrorBox } from './styles';

export const Error = ({ message }: { message: string }) => {
  const { t } = useTranslation();

  if (message === 'Internal Server Error') {
    return <ErrorBox>{t('INTERNAL_SERVER_ERROR')}</ErrorBox>;
  } else if (message === 'Payment not found') {
    return <ErrorBox>{t('PAYMENT_NOT_FOUND')}</ErrorBox>;
  } else {
    return <ErrorBox>{t('SOMETHING_WENT_WRONG')}</ErrorBox>;
  }
};
