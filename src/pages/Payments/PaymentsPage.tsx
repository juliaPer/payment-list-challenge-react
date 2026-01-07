import {
  ClearButton,
  Container,
  FlexRow,
  SearchButton,
  SearchInput,
  Title,
} from '@/components/styles';
import { useTranslation } from 'react-i18next';
import { PaymentsTable } from './PaymentsTable';
import { useDataTable } from '@/hooks/useDataTable';
import { useState } from 'react';

export const PaymentsPage = () => {
  const { t } = useTranslation();

  const [page] = useState(1);
  const [pageCount] = useState(5);
  const [search, setSearch] = useState('');

  const {
    response: { isLoading, error, data },
  } = useDataTable({ page, pageCount, search });

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
        <SearchButton type='submit' onClick={() => setSearch(search)}>
          {t('SEARCH_BUTTON')}
        </SearchButton>
        {search && (
          <ClearButton onClick={() => setSearch('')}>
            {t('CLEAR_FILTERS')}
          </ClearButton>
        )}
      </FlexRow>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading data</div>}
      {data && <PaymentsTable data={data.payments} />}
    </Container>
  );
};
