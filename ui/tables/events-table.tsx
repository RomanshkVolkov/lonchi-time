'use client';

import { useCallback } from 'react';
import { Event } from '@prisma/client';

import { safeParseDateString } from '@/libs/utils/intl';
import DynamicTable from '@/ui/tables/dynamic-table';
import DeleteButton from '@/ui/buttons/delete-button';
import { TableColumns } from '@/types/common';
import EditButton from '../buttons/edit-button';

type DataTableTypes = Omit<Event, 'date' | 'cocaPrice'> & {
  date: string;
  cocaPrice: number;
};
const columns: TableColumns<DataTableTypes>[] = [
  { key: 'name', label: 'Nombre' },
  { key: 'date', label: 'Fecha' },
  { key: 'actions', label: 'Acciones' },
];
type Props = {
  data: DataTableTypes[];
};
export default function EventsTable({ data }: Props) {
  const renderFunciton = useCallback(
    (row: Props['data'][0], columnKey: keyof DataTableTypes & 'actions') => {
      const cellValue = row[columnKey];

      switch (columnKey) {
        case 'date':
          return safeParseDateString(row.date.replace('Z', ''))?.date.format;
        case 'actions':
          return (
            <div className="flex justify-center">
              <EditButton tooltip="Editar evento" href={`/events/${row.id}`} />
              <DeleteButton
                tooltip="Eliminar evento"
                href={`/delete-event/${row.id}?name=${encodeURIComponent(row.name)}`}
              />
            </div>
          );
        default:
          return String(cellValue);
      }
    },
    [],
  );

  return (
    <DynamicTable
      data={data}
      columns={columns}
      renderFunction={renderFunciton}
    />
  );
}
