import { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  CellContext,
  ColumnDef,
} from '@tanstack/react-table';
import {
  Container,
  StatusBadge,
  Table,
  TableBodyWrapper,
  TableCell,
  TableHeader,
  TableHeaderWrapper,
  TableRow,
} from '@/components/styles';
import { useDataTable } from '@/hooks/useDataTable';
import { I18N } from '../../constants/i18n';
import { useTranslation } from 'react-i18next';
import { Payment } from '@/types/TData';

export const PaymentsTable = () => {
  const { t } = useTranslation();

  const { isPending, error, data } = useDataTable({ page: 1, pageCount: 5 });

  const columnHelper = createColumnHelper();

  const columns = useMemo<ColumnDef<Payment>[]>(
    () =>
      [
        columnHelper.accessor('id', {
          header: t('TABLE_HEADER_PAYMENT_ID'),
          cell: (info: CellContext<unknown, never>) => info.getValue(),
        }),
        columnHelper.accessor('date', {
          header: I18N.TABLE_HEADER_DATE,
          cell: (info: CellContext<unknown, never>) =>
            new Date(info.getValue()).toLocaleString(),
        }),
        columnHelper.accessor('amount', {
          header: I18N.TABLE_HEADER_AMOUNT,
          cell: (info: CellContext<unknown, never>) =>
            Number.parseFloat(info.getValue()).toFixed(2),
        }),
        columnHelper.accessor('customerName', {
          header: I18N.TABLE_HEADER_CUSTOMER,
          cell: (info: CellContext<unknown, never>) => info.getValue(),
        }),
        columnHelper.accessor('currency', {
          header: I18N.TABLE_HEADER_CURRENCY,
          cell: (info: CellContext<unknown, never>) => info.getValue(),
        }),
        columnHelper.accessor('status', {
          header: I18N.TABLE_HEADER_STATUS,
          cell: (info: CellContext<unknown, never>) => (
            <StatusBadge status={info.getValue()}>
              {info.getValue()}
            </StatusBadge>
          ),
        }),
      ] as ColumnDef<Payment>[],
    [columnHelper]
  );

  const paymentData = useMemo(() => data ?? [], [data]);

  // TanStack Table configuration
  const table = useReactTable({
    data: paymentData.payments,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Render the table UI
  return (
    <Container>
      {isPending && <div>Loading...</div>}
      {error && <div>Error loading data</div>}
      {data && (
        <Table>
          <TableHeaderWrapper>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHeader key={header.id} colSpan={header.colSpan}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHeader>
                ))}
              </TableRow>
            ))}
          </TableHeaderWrapper>
          <TableBodyWrapper>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBodyWrapper>
        </Table>
      )}
    </Container>
  );
};
