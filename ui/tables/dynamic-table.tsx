import { useDelayedRender } from '@/libs/hooks/use-deplay-render';
import { TableProps } from '@/types/common';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';
import TableSkeletonWithoutFilters from '../skeletons/table-skeleton-without-filters';
import React from 'react';

export default function DynamicTable<T>({
  data,
  columns,
  renderFunction = (row, columnKey) => {
    const cellValue = row[columnKey];
    return String(cellValue);
  },
}: TableProps<T>) {
  const shouldRender = useDelayedRender(200, [data]);

  return !shouldRender ? (
    <TableSkeletonWithoutFilters />
  ) : (
    <Table isStriped aria-label="Example empty table">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={String(column.key)}
            align={
              column.key === 'actions'
                ? 'center'
                : column.align
                  ? column.align
                  : 'start'
            }
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={data} emptyContent="No hay datos para mostrar">
        {(row) => (
          <TableRow key={(row as any).key}>
            {(columnKey) => (
              <TableCell>{renderFunction(row, columnKey as any)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
