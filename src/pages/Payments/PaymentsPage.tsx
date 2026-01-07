import {
  ClearButton,
  Container,
  FlexRow,
  SearchButton,
  SearchInput,
  Select,
  Title,
} from '@/components/styles';
import { useTranslation } from 'react-i18next';
import { PaymentsTable } from './PaymentsTable';
import { useDataTable } from '@/hooks/useDataTable';
import { useState } from 'react';
import { Error } from '@/components/Error';
import { CURRENCIES } from '@/constants';

export const PaymentsPage = () => {
  const { t } = useTranslation();

  const [page] = useState(1);
  const [pageCount] = useState(5);
  const [search, setSearch] = useState('');
  const [currency, setCurrency] = useState('');

  const {
    response: { isLoading, error, data },
  } = useDataTable({ page, pageCount, search, currency });

  const clearFilters = () => {
    setSearch('');
    setCurrency('');
  };

  return (
    <Container>
      <Title>{t('PAGE_TITLE')}</Title>
      <FlexRow style={{ justifyContent: 'flex-start' }}>
        <SearchInput
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          role='searchbox'
          placeholder={t('SEARCH_PLACEHOLDER')}
          aria-label={t('SEARCH_LABEL')}
        />
        <Select
          aria-label={t('CURRENCY_FILTER_LABEL')}
          value={currency}
          onChange={(e) => setCurrency(e.target.value as string)}
        >
          <option value=''>{t('CURRENCIES_OPTION')}</option>
          {CURRENCIES.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </Select>
        <SearchButton type='submit' onClick={() => setSearch(search)}>
          {t('SEARCH_BUTTON')}
        </SearchButton>
        {(search || currency) && (
          <ClearButton onClick={clearFilters}>{t('CLEAR_FILTERS')}</ClearButton>
        )}
      </FlexRow>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading data</div>}
      {!!data && !!data.message && <Error message={data.message} />}
      {!!data && <PaymentsTable data={data.payments} />}
    </Container>
  );
};
