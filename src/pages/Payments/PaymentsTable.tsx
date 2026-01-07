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
  FlexRow,
  StatusBadge,
  Table,
  TableBodyWrapper,
  TableCell,
  TableHeader,
  TableHeaderWrapper,
  TableRow,
} from '@/components/styles';
import { useTranslation } from 'react-i18next';
import { Payment } from '@/types/TData';

interface PaymentsTableProps {
  data: Payment[];
}

export const PaymentsTable = ({ data }: PaymentsTableProps) => {
  const { t } = useTranslation();

  const columnHelper = createColumnHelper();

  const columns = useMemo<ColumnDef<Payment>[]>(
    () =>
      [
        columnHelper.accessor('id', {
          header: t('TABLE_HEADER_PAYMENT_ID'),
          cell: (info: CellContext<unknown, never>) => info.getValue(),
        }),
        columnHelper.accessor('date', {
          header: t('TABLE_HEADER_DATE'),
          cell: (info: CellContext<unknown, never>) =>
            new Date(info.getValue()).toLocaleString(),
        }),
        columnHelper.accessor('amount', {
          header: t('TABLE_HEADER_AMOUNT'),
          cell: (info: CellContext<unknown, never>) =>
            Number.parseFloat(info.getValue()).toFixed(2),
        }),
        columnHelper.accessor('customerName', {
          header: t('TABLE_HEADER_CUSTOMER'),
          cell: (info: CellContext<unknown, never>) => info.getValue(),
        }),
        columnHelper.accessor('currency', {
          header: t('TABLE_HEADER_CURRENCY'),
          cell: (info: CellContext<unknown, never>) => info.getValue(),
        }),
        columnHelper.accessor('status', {
          header: t('TABLE_HEADER_STATUS'),
          cell: (info: CellContext<unknown, never>) => (
            <StatusBadge status={info.getValue()}>
              {info.getValue()}
            </StatusBadge>
          ),
        }),
      ] as ColumnDef<Payment>[],
    [columnHelper]
  );

  // TanStack Table configuration
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Render the table UI
  return (
    <FlexRow>
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
    </FlexRow>
  );
};
